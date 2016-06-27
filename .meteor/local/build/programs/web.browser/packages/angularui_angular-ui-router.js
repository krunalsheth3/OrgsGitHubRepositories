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

(function(){

///////////////////////////////////////////////////////////////////////
//                                                                   //
// packages/angularui_angular-ui-router/packages/angularui_angular-u //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
(function () {                                                       // 1
                                                                     // 2
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/angularui:angular-ui-router/release/angular-ui-router.js                                                  //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
/**                                                                                                                   // 1
 * State-based routing for AngularJS                                                                                  // 2
 * @version v0.2.15                                                                                                   // 3
 * @link http://angular-ui.github.com/                                                                                // 4
 * @license MIT License, http://www.opensource.org/licenses/MIT                                                       // 5
 */                                                                                                                   // 6
                                                                                                                      // 7
/* commonjs package manager support (eg componentjs) */                                                               // 8
if (typeof module !== "undefined" && typeof exports !== "undefined" && module.exports === exports){                   // 9
  module.exports = 'ui.router';                                                                                       // 10
}                                                                                                                     // 11
                                                                                                                      // 12
(function (window, angular, undefined) {                                                                              // 13
/*jshint globalstrict:true*/                                                                                          // 14
/*global angular:false*/                                                                                              // 15
'use strict';                                                                                                         // 16
                                                                                                                      // 17
var isDefined = angular.isDefined,                                                                                    // 18
    isFunction = angular.isFunction,                                                                                  // 19
    isString = angular.isString,                                                                                      // 20
    isObject = angular.isObject,                                                                                      // 21
    isArray = angular.isArray,                                                                                        // 22
    forEach = angular.forEach,                                                                                        // 23
    extend = angular.extend,                                                                                          // 24
    copy = angular.copy;                                                                                              // 25
                                                                                                                      // 26
function inherit(parent, extra) {                                                                                     // 27
  return extend(new (extend(function() {}, { prototype: parent }))(), extra);                                         // 28
}                                                                                                                     // 29
                                                                                                                      // 30
function merge(dst) {                                                                                                 // 31
  forEach(arguments, function(obj) {                                                                                  // 32
    if (obj !== dst) {                                                                                                // 33
      forEach(obj, function(value, key) {                                                                             // 34
        if (!dst.hasOwnProperty(key)) dst[key] = value;                                                               // 35
      });                                                                                                             // 36
    }                                                                                                                 // 37
  });                                                                                                                 // 38
  return dst;                                                                                                         // 39
}                                                                                                                     // 40
                                                                                                                      // 41
/**                                                                                                                   // 42
 * Finds the common ancestor path between two states.                                                                 // 43
 *                                                                                                                    // 44
 * @param {Object} first The first state.                                                                             // 45
 * @param {Object} second The second state.                                                                           // 46
 * @return {Array} Returns an array of state names in descending order, not including the root.                       // 47
 */                                                                                                                   // 48
function ancestors(first, second) {                                                                                   // 49
  var path = [];                                                                                                      // 50
                                                                                                                      // 51
  for (var n in first.path) {                                                                                         // 52
    if (first.path[n] !== second.path[n]) break;                                                                      // 53
    path.push(first.path[n]);                                                                                         // 54
  }                                                                                                                   // 55
  return path;                                                                                                        // 56
}                                                                                                                     // 57
                                                                                                                      // 58
/**                                                                                                                   // 59
 * IE8-safe wrapper for `Object.keys()`.                                                                              // 60
 *                                                                                                                    // 61
 * @param {Object} object A JavaScript object.                                                                        // 62
 * @return {Array} Returns the keys of the object as an array.                                                        // 63
 */                                                                                                                   // 64
function objectKeys(object) {                                                                                         // 65
  if (Object.keys) {                                                                                                  // 66
    return Object.keys(object);                                                                                       // 67
  }                                                                                                                   // 68
  var result = [];                                                                                                    // 69
                                                                                                                      // 70
  forEach(object, function(val, key) {                                                                                // 71
    result.push(key);                                                                                                 // 72
  });                                                                                                                 // 73
  return result;                                                                                                      // 74
}                                                                                                                     // 75
                                                                                                                      // 76
/**                                                                                                                   // 77
 * IE8-safe wrapper for `Array.prototype.indexOf()`.                                                                  // 78
 *                                                                                                                    // 79
 * @param {Array} array A JavaScript array.                                                                           // 80
 * @param {*} value A value to search the array for.                                                                  // 81
 * @return {Number} Returns the array index value of `value`, or `-1` if not present.                                 // 82
 */                                                                                                                   // 83
function indexOf(array, value) {                                                                                      // 84
  if (Array.prototype.indexOf) {                                                                                      // 85
    return array.indexOf(value, Number(arguments[2]) || 0);                                                           // 86
  }                                                                                                                   // 87
  var len = array.length >>> 0, from = Number(arguments[2]) || 0;                                                     // 88
  from = (from < 0) ? Math.ceil(from) : Math.floor(from);                                                             // 89
                                                                                                                      // 90
  if (from < 0) from += len;                                                                                          // 91
                                                                                                                      // 92
  for (; from < len; from++) {                                                                                        // 93
    if (from in array && array[from] === value) return from;                                                          // 94
  }                                                                                                                   // 95
  return -1;                                                                                                          // 96
}                                                                                                                     // 97
                                                                                                                      // 98
/**                                                                                                                   // 99
 * Merges a set of parameters with all parameters inherited between the common parents of the                         // 100
 * current state and a given destination state.                                                                       // 101
 *                                                                                                                    // 102
 * @param {Object} currentParams The value of the current state parameters ($stateParams).                            // 103
 * @param {Object} newParams The set of parameters which will be composited with inherited params.                    // 104
 * @param {Object} $current Internal definition of object representing the current state.                             // 105
 * @param {Object} $to Internal definition of object representing state to transition to.                             // 106
 */                                                                                                                   // 107
function inheritParams(currentParams, newParams, $current, $to) {                                                     // 108
  var parents = ancestors($current, $to), parentParams, inherited = {}, inheritList = [];                             // 109
                                                                                                                      // 110
  for (var i in parents) {                                                                                            // 111
    if (!parents[i].params) continue;                                                                                 // 112
    parentParams = objectKeys(parents[i].params);                                                                     // 113
    if (!parentParams.length) continue;                                                                               // 114
                                                                                                                      // 115
    for (var j in parentParams) {                                                                                     // 116
      if (indexOf(inheritList, parentParams[j]) >= 0) continue;                                                       // 117
      inheritList.push(parentParams[j]);                                                                              // 118
      inherited[parentParams[j]] = currentParams[parentParams[j]];                                                    // 119
    }                                                                                                                 // 120
  }                                                                                                                   // 121
  return extend({}, inherited, newParams);                                                                            // 122
}                                                                                                                     // 123
                                                                                                                      // 124
/**                                                                                                                   // 125
 * Performs a non-strict comparison of the subset of two objects, defined by a list of keys.                          // 126
 *                                                                                                                    // 127
 * @param {Object} a The first object.                                                                                // 128
 * @param {Object} b The second object.                                                                               // 129
 * @param {Array} keys The list of keys within each object to compare. If the list is empty or not specified,         // 130
 *                     it defaults to the list of keys in `a`.                                                        // 131
 * @return {Boolean} Returns `true` if the keys match, otherwise `false`.                                             // 132
 */                                                                                                                   // 133
function equalForKeys(a, b, keys) {                                                                                   // 134
  if (!keys) {                                                                                                        // 135
    keys = [];                                                                                                        // 136
    for (var n in a) keys.push(n); // Used instead of Object.keys() for IE8 compatibility                             // 137
  }                                                                                                                   // 138
                                                                                                                      // 139
  for (var i=0; i<keys.length; i++) {                                                                                 // 140
    var k = keys[i];                                                                                                  // 141
    if (a[k] != b[k]) return false; // Not '===', values aren't necessarily normalized                                // 142
  }                                                                                                                   // 143
  return true;                                                                                                        // 144
}                                                                                                                     // 145
                                                                                                                      // 146
/**                                                                                                                   // 147
 * Returns the subset of an object, based on a list of keys.                                                          // 148
 *                                                                                                                    // 149
 * @param {Array} keys                                                                                                // 150
 * @param {Object} values                                                                                             // 151
 * @return {Boolean} Returns a subset of `values`.                                                                    // 152
 */                                                                                                                   // 153
function filterByKeys(keys, values) {                                                                                 // 154
  var filtered = {};                                                                                                  // 155
                                                                                                                      // 156
  forEach(keys, function (name) {                                                                                     // 157
    filtered[name] = values[name];                                                                                    // 158
  });                                                                                                                 // 159
  return filtered;                                                                                                    // 160
}                                                                                                                     // 161
                                                                                                                      // 162
// like _.indexBy                                                                                                     // 163
// when you know that your index values will be unique, or you want last-one-in to win                                // 164
function indexBy(array, propName) {                                                                                   // 165
  var result = {};                                                                                                    // 166
  forEach(array, function(item) {                                                                                     // 167
    result[item[propName]] = item;                                                                                    // 168
  });                                                                                                                 // 169
  return result;                                                                                                      // 170
}                                                                                                                     // 171
                                                                                                                      // 172
// extracted from underscore.js                                                                                       // 173
// Return a copy of the object only containing the whitelisted properties.                                            // 174
function pick(obj) {                                                                                                  // 175
  var copy = {};                                                                                                      // 176
  var keys = Array.prototype.concat.apply(Array.prototype, Array.prototype.slice.call(arguments, 1));                 // 177
  forEach(keys, function(key) {                                                                                       // 178
    if (key in obj) copy[key] = obj[key];                                                                             // 179
  });                                                                                                                 // 180
  return copy;                                                                                                        // 181
}                                                                                                                     // 182
                                                                                                                      // 183
// extracted from underscore.js                                                                                       // 184
// Return a copy of the object omitting the blacklisted properties.                                                   // 185
function omit(obj) {                                                                                                  // 186
  var copy = {};                                                                                                      // 187
  var keys = Array.prototype.concat.apply(Array.prototype, Array.prototype.slice.call(arguments, 1));                 // 188
  for (var key in obj) {                                                                                              // 189
    if (indexOf(keys, key) == -1) copy[key] = obj[key];                                                               // 190
  }                                                                                                                   // 191
  return copy;                                                                                                        // 192
}                                                                                                                     // 193
                                                                                                                      // 194
function pluck(collection, key) {                                                                                     // 195
  var result = isArray(collection) ? [] : {};                                                                         // 196
                                                                                                                      // 197
  forEach(collection, function(val, i) {                                                                              // 198
    result[i] = isFunction(key) ? key(val) : val[key];                                                                // 199
  });                                                                                                                 // 200
  return result;                                                                                                      // 201
}                                                                                                                     // 202
                                                                                                                      // 203
function filter(collection, callback) {                                                                               // 204
  var array = isArray(collection);                                                                                    // 205
  var result = array ? [] : {};                                                                                       // 206
  forEach(collection, function(val, i) {                                                                              // 207
    if (callback(val, i)) {                                                                                           // 208
      result[array ? result.length : i] = val;                                                                        // 209
    }                                                                                                                 // 210
  });                                                                                                                 // 211
  return result;                                                                                                      // 212
}                                                                                                                     // 213
                                                                                                                      // 214
function map(collection, callback) {                                                                                  // 215
  var result = isArray(collection) ? [] : {};                                                                         // 216
                                                                                                                      // 217
  forEach(collection, function(val, i) {                                                                              // 218
    result[i] = callback(val, i);                                                                                     // 219
  });                                                                                                                 // 220
  return result;                                                                                                      // 221
}                                                                                                                     // 222
                                                                                                                      // 223
/**                                                                                                                   // 224
 * @ngdoc overview                                                                                                    // 225
 * @name ui.router.util                                                                                               // 226
 *                                                                                                                    // 227
 * @description                                                                                                       // 228
 * # ui.router.util sub-module                                                                                        // 229
 *                                                                                                                    // 230
 * This module is a dependency of other sub-modules. Do not include this module as a dependency                       // 231
 * in your angular app (use {@link ui.router} module instead).                                                        // 232
 *                                                                                                                    // 233
 */                                                                                                                   // 234
angular.module('ui.router.util', ['ng']);                                                                             // 235
                                                                                                                      // 236
/**                                                                                                                   // 237
 * @ngdoc overview                                                                                                    // 238
 * @name ui.router.router                                                                                             // 239
 *                                                                                                                    // 240
 * @requires ui.router.util                                                                                           // 241
 *                                                                                                                    // 242
 * @description                                                                                                       // 243
 * # ui.router.router sub-module                                                                                      // 244
 *                                                                                                                    // 245
 * This module is a dependency of other sub-modules. Do not include this module as a dependency                       // 246
 * in your angular app (use {@link ui.router} module instead).                                                        // 247
 */                                                                                                                   // 248
angular.module('ui.router.router', ['ui.router.util']);                                                               // 249
                                                                                                                      // 250
/**                                                                                                                   // 251
 * @ngdoc overview                                                                                                    // 252
 * @name ui.router.state                                                                                              // 253
 *                                                                                                                    // 254
 * @requires ui.router.router                                                                                         // 255
 * @requires ui.router.util                                                                                           // 256
 *                                                                                                                    // 257
 * @description                                                                                                       // 258
 * # ui.router.state sub-module                                                                                       // 259
 *                                                                                                                    // 260
 * This module is a dependency of the main ui.router module. Do not include this module as a dependency               // 261
 * in your angular app (use {@link ui.router} module instead).                                                        // 262
 *                                                                                                                    // 263
 */                                                                                                                   // 264
angular.module('ui.router.state', ['ui.router.router', 'ui.router.util']);                                            // 265
                                                                                                                      // 266
/**                                                                                                                   // 267
 * @ngdoc overview                                                                                                    // 268
 * @name ui.router                                                                                                    // 269
 *                                                                                                                    // 270
 * @requires ui.router.state                                                                                          // 271
 *                                                                                                                    // 272
 * @description                                                                                                       // 273
 * # ui.router                                                                                                        // 274
 *                                                                                                                    // 275
 * ## The main module for ui.router                                                                                   // 276
 * There are several sub-modules included with the ui.router module, however only this module is needed               // 277
 * as a dependency within your angular app. The other modules are for organization purposes.                          // 278
 *                                                                                                                    // 279
 * The modules are:                                                                                                   // 280
 * * ui.router - the main "umbrella" module                                                                           // 281
 * * ui.router.router -                                                                                               // 282
 *                                                                                                                    // 283
 * *You'll need to include **only** this module as the dependency within your angular app.*                           // 284
 *                                                                                                                    // 285
 * <pre>                                                                                                              // 286
 * <!doctype html>                                                                                                    // 287
 * <html ng-app="myApp">                                                                                              // 288
 * <head>                                                                                                             // 289
 *   <script src="js/angular.js"></script>                                                                            // 290
 *   <!-- Include the ui-router script -->                                                                            // 291
 *   <script src="js/angular-ui-router.min.js"></script>                                                              // 292
 *   <script>                                                                                                         // 293
 *     // ...and add 'ui.router' as a dependency                                                                      // 294
 *     var myApp = angular.module('myApp', ['ui.router']);                                                            // 295
 *   </script>                                                                                                        // 296
 * </head>                                                                                                            // 297
 * <body>                                                                                                             // 298
 * </body>                                                                                                            // 299
 * </html>                                                                                                            // 300
 * </pre>                                                                                                             // 301
 */                                                                                                                   // 302
angular.module('ui.router', ['ui.router.state']);                                                                     // 303
                                                                                                                      // 304
angular.module('ui.router.compat', ['ui.router']);                                                                    // 305
                                                                                                                      // 306
/**                                                                                                                   // 307
 * @ngdoc object                                                                                                      // 308
 * @name ui.router.util.$resolve                                                                                      // 309
 *                                                                                                                    // 310
 * @requires $q                                                                                                       // 311
 * @requires $injector                                                                                                // 312
 *                                                                                                                    // 313
 * @description                                                                                                       // 314
 * Manages resolution of (acyclic) graphs of promises.                                                                // 315
 */                                                                                                                   // 316
$Resolve.$inject = ['$q', '$injector'];                                                                               // 317
function $Resolve(  $q,    $injector) {                                                                               // 318
                                                                                                                      // 319
  var VISIT_IN_PROGRESS = 1,                                                                                          // 320
      VISIT_DONE = 2,                                                                                                 // 321
      NOTHING = {},                                                                                                   // 322
      NO_DEPENDENCIES = [],                                                                                           // 323
      NO_LOCALS = NOTHING,                                                                                            // 324
      NO_PARENT = extend($q.when(NOTHING), { $$promises: NOTHING, $$values: NOTHING });                               // 325
                                                                                                                      // 326
                                                                                                                      // 327
  /**                                                                                                                 // 328
   * @ngdoc function                                                                                                  // 329
   * @name ui.router.util.$resolve#study                                                                              // 330
   * @methodOf ui.router.util.$resolve                                                                                // 331
   *                                                                                                                  // 332
   * @description                                                                                                     // 333
   * Studies a set of invocables that are likely to be used multiple times.                                           // 334
   * <pre>                                                                                                            // 335
   * $resolve.study(invocables)(locals, parent, self)                                                                 // 336
   * </pre>                                                                                                           // 337
   * is equivalent to                                                                                                 // 338
   * <pre>                                                                                                            // 339
   * $resolve.resolve(invocables, locals, parent, self)                                                               // 340
   * </pre>                                                                                                           // 341
   * but the former is more efficient (in fact `resolve` just calls `study`                                           // 342
   * internally).                                                                                                     // 343
   *                                                                                                                  // 344
   * @param {object} invocables Invocable objects                                                                     // 345
   * @return {function} a function to pass in locals, parent and self                                                 // 346
   */                                                                                                                 // 347
  this.study = function (invocables) {                                                                                // 348
    if (!isObject(invocables)) throw new Error("'invocables' must be an object");                                     // 349
    var invocableKeys = objectKeys(invocables || {});                                                                 // 350
                                                                                                                      // 351
    // Perform a topological sort of invocables to build an ordered plan                                              // 352
    var plan = [], cycle = [], visited = {};                                                                          // 353
    function visit(value, key) {                                                                                      // 354
      if (visited[key] === VISIT_DONE) return;                                                                        // 355
                                                                                                                      // 356
      cycle.push(key);                                                                                                // 357
      if (visited[key] === VISIT_IN_PROGRESS) {                                                                       // 358
        cycle.splice(0, indexOf(cycle, key));                                                                         // 359
        throw new Error("Cyclic dependency: " + cycle.join(" -> "));                                                  // 360
      }                                                                                                               // 361
      visited[key] = VISIT_IN_PROGRESS;                                                                               // 362
                                                                                                                      // 363
      if (isString(value)) {                                                                                          // 364
        plan.push(key, [ function() { return $injector.get(value); }], NO_DEPENDENCIES);                              // 365
      } else {                                                                                                        // 366
        var params = $injector.annotate(value);                                                                       // 367
        forEach(params, function (param) {                                                                            // 368
          if (param !== key && invocables.hasOwnProperty(param)) visit(invocables[param], param);                     // 369
        });                                                                                                           // 370
        plan.push(key, value, params);                                                                                // 371
      }                                                                                                               // 372
                                                                                                                      // 373
      cycle.pop();                                                                                                    // 374
      visited[key] = VISIT_DONE;                                                                                      // 375
    }                                                                                                                 // 376
    forEach(invocables, visit);                                                                                       // 377
    invocables = cycle = visited = null; // plan is all that's required                                               // 378
                                                                                                                      // 379
    function isResolve(value) {                                                                                       // 380
      return isObject(value) && value.then && value.$$promises;                                                       // 381
    }                                                                                                                 // 382
                                                                                                                      // 383
    return function (locals, parent, self) {                                                                          // 384
      if (isResolve(locals) && self === undefined) {                                                                  // 385
        self = parent; parent = locals; locals = null;                                                                // 386
      }                                                                                                               // 387
      if (!locals) locals = NO_LOCALS;                                                                                // 388
      else if (!isObject(locals)) {                                                                                   // 389
        throw new Error("'locals' must be an object");                                                                // 390
      }                                                                                                               // 391
      if (!parent) parent = NO_PARENT;                                                                                // 392
      else if (!isResolve(parent)) {                                                                                  // 393
        throw new Error("'parent' must be a promise returned by $resolve.resolve()");                                 // 394
      }                                                                                                               // 395
                                                                                                                      // 396
      // To complete the overall resolution, we have to wait for the parent                                           // 397
      // promise and for the promise for each invokable in our plan.                                                  // 398
      var resolution = $q.defer(),                                                                                    // 399
          result = resolution.promise,                                                                                // 400
          promises = result.$$promises = {},                                                                          // 401
          values = extend({}, locals),                                                                                // 402
          wait = 1 + plan.length/3,                                                                                   // 403
          merged = false;                                                                                             // 404
                                                                                                                      // 405
      function done() {                                                                                               // 406
        // Merge parent values we haven't got yet and publish our own $$values                                        // 407
        if (!--wait) {                                                                                                // 408
          if (!merged) merge(values, parent.$$values);                                                                // 409
          result.$$values = values;                                                                                   // 410
          result.$$promises = result.$$promises || true; // keep for isResolve()                                      // 411
          delete result.$$inheritedValues;                                                                            // 412
          resolution.resolve(values);                                                                                 // 413
        }                                                                                                             // 414
      }                                                                                                               // 415
                                                                                                                      // 416
      function fail(reason) {                                                                                         // 417
        result.$$failure = reason;                                                                                    // 418
        resolution.reject(reason);                                                                                    // 419
      }                                                                                                               // 420
                                                                                                                      // 421
      // Short-circuit if parent has already failed                                                                   // 422
      if (isDefined(parent.$$failure)) {                                                                              // 423
        fail(parent.$$failure);                                                                                       // 424
        return result;                                                                                                // 425
      }                                                                                                               // 426
                                                                                                                      // 427
      if (parent.$$inheritedValues) {                                                                                 // 428
        merge(values, omit(parent.$$inheritedValues, invocableKeys));                                                 // 429
      }                                                                                                               // 430
                                                                                                                      // 431
      // Merge parent values if the parent has already resolved, or merge                                             // 432
      // parent promises and wait if the parent resolve is still in progress.                                         // 433
      extend(promises, parent.$$promises);                                                                            // 434
      if (parent.$$values) {                                                                                          // 435
        merged = merge(values, omit(parent.$$values, invocableKeys));                                                 // 436
        result.$$inheritedValues = omit(parent.$$values, invocableKeys);                                              // 437
        done();                                                                                                       // 438
      } else {                                                                                                        // 439
        if (parent.$$inheritedValues) {                                                                               // 440
          result.$$inheritedValues = omit(parent.$$inheritedValues, invocableKeys);                                   // 441
        }                                                                                                             // 442
        parent.then(done, fail);                                                                                      // 443
      }                                                                                                               // 444
                                                                                                                      // 445
      // Process each invocable in the plan, but ignore any where a local of the same name exists.                    // 446
      for (var i=0, ii=plan.length; i<ii; i+=3) {                                                                     // 447
        if (locals.hasOwnProperty(plan[i])) done();                                                                   // 448
        else invoke(plan[i], plan[i+1], plan[i+2]);                                                                   // 449
      }                                                                                                               // 450
                                                                                                                      // 451
      function invoke(key, invocable, params) {                                                                       // 452
        // Create a deferred for this invocation. Failures will propagate to the resolution as well.                  // 453
        var invocation = $q.defer(), waitParams = 0;                                                                  // 454
        function onfailure(reason) {                                                                                  // 455
          invocation.reject(reason);                                                                                  // 456
          fail(reason);                                                                                               // 457
        }                                                                                                             // 458
        // Wait for any parameter that we have a promise for (either from parent or from this                         // 459
        // resolve; in that case study() will have made sure it's ordered before us in the plan).                     // 460
        forEach(params, function (dep) {                                                                              // 461
          if (promises.hasOwnProperty(dep) && !locals.hasOwnProperty(dep)) {                                          // 462
            waitParams++;                                                                                             // 463
            promises[dep].then(function (result) {                                                                    // 464
              values[dep] = result;                                                                                   // 465
              if (!(--waitParams)) proceed();                                                                         // 466
            }, onfailure);                                                                                            // 467
          }                                                                                                           // 468
        });                                                                                                           // 469
        if (!waitParams) proceed();                                                                                   // 470
        function proceed() {                                                                                          // 471
          if (isDefined(result.$$failure)) return;                                                                    // 472
          try {                                                                                                       // 473
            invocation.resolve($injector.invoke(invocable, self, values));                                            // 474
            invocation.promise.then(function (result) {                                                               // 475
              values[key] = result;                                                                                   // 476
              done();                                                                                                 // 477
            }, onfailure);                                                                                            // 478
          } catch (e) {                                                                                               // 479
            onfailure(e);                                                                                             // 480
          }                                                                                                           // 481
        }                                                                                                             // 482
        // Publish promise synchronously; invocations further down in the plan may depend on it.                      // 483
        promises[key] = invocation.promise;                                                                           // 484
      }                                                                                                               // 485
                                                                                                                      // 486
      return result;                                                                                                  // 487
    };                                                                                                                // 488
  };                                                                                                                  // 489
                                                                                                                      // 490
  /**                                                                                                                 // 491
   * @ngdoc function                                                                                                  // 492
   * @name ui.router.util.$resolve#resolve                                                                            // 493
   * @methodOf ui.router.util.$resolve                                                                                // 494
   *                                                                                                                  // 495
   * @description                                                                                                     // 496
   * Resolves a set of invocables. An invocable is a function to be invoked via                                       // 497
   * `$injector.invoke()`, and can have an arbitrary number of dependencies.                                          // 498
   * An invocable can either return a value directly,                                                                 // 499
   * or a `$q` promise. If a promise is returned it will be resolved and the                                          // 500
   * resulting value will be used instead. Dependencies of invocables are resolved                                    // 501
   * (in this order of precedence)                                                                                    // 502
   *                                                                                                                  // 503
   * - from the specified `locals`                                                                                    // 504
   * - from another invocable that is part of this `$resolve` call                                                    // 505
   * - from an invocable that is inherited from a `parent` call to `$resolve`                                         // 506
   *   (or recursively                                                                                                // 507
   * - from any ancestor `$resolve` of that parent).                                                                  // 508
   *                                                                                                                  // 509
   * The return value of `$resolve` is a promise for an object that contains                                          // 510
   * (in this order of precedence)                                                                                    // 511
   *                                                                                                                  // 512
   * - any `locals` (if specified)                                                                                    // 513
   * - the resolved return values of all injectables                                                                  // 514
   * - any values inherited from a `parent` call to `$resolve` (if specified)                                         // 515
   *                                                                                                                  // 516
   * The promise will resolve after the `parent` promise (if any) and all promises                                    // 517
   * returned by injectables have been resolved. If any invocable                                                     // 518
   * (or `$injector.invoke`) throws an exception, or if a promise returned by an                                      // 519
   * invocable is rejected, the `$resolve` promise is immediately rejected with the                                   // 520
   * same error. A rejection of a `parent` promise (if specified) will likewise be                                    // 521
   * propagated immediately. Once the `$resolve` promise has been rejected, no                                        // 522
   * further invocables will be called.                                                                               // 523
   *                                                                                                                  // 524
   * Cyclic dependencies between invocables are not permitted and will caues `$resolve`                               // 525
   * to throw an error. As a special case, an injectable can depend on a parameter                                    // 526
   * with the same name as the injectable, which will be fulfilled from the `parent`                                  // 527
   * injectable of the same name. This allows inherited values to be decorated.                                       // 528
   * Note that in this case any other injectable in the same `$resolve` with the same                                 // 529
   * dependency would see the decorated value, not the inherited value.                                               // 530
   *                                                                                                                  // 531
   * Note that missing dependencies -- unlike cyclic dependencies -- will cause an                                    // 532
   * (asynchronous) rejection of the `$resolve` promise rather than a (synchronous)                                   // 533
   * exception.                                                                                                       // 534
   *                                                                                                                  // 535
   * Invocables are invoked eagerly as soon as all dependencies are available.                                        // 536
   * This is true even for dependencies inherited from a `parent` call to `$resolve`.                                 // 537
   *                                                                                                                  // 538
   * As a special case, an invocable can be a string, in which case it is taken to                                    // 539
   * be a service name to be passed to `$injector.get()`. This is supported primarily                                 // 540
   * for backwards-compatibility with the `resolve` property of `$routeProvider`                                      // 541
   * routes.                                                                                                          // 542
   *                                                                                                                  // 543
   * @param {object} invocables functions to invoke or                                                                // 544
   * `$injector` services to fetch.                                                                                   // 545
   * @param {object} locals  values to make available to the injectables                                              // 546
   * @param {object} parent  a promise returned by another call to `$resolve`.                                        // 547
   * @param {object} self  the `this` for the invoked methods                                                         // 548
   * @return {object} Promise for an object that contains the resolved return value                                   // 549
   * of all invocables, as well as any inherited and local values.                                                    // 550
   */                                                                                                                 // 551
  this.resolve = function (invocables, locals, parent, self) {                                                        // 552
    return this.study(invocables)(locals, parent, self);                                                              // 553
  };                                                                                                                  // 554
}                                                                                                                     // 555
                                                                                                                      // 556
angular.module('ui.router.util').service('$resolve', $Resolve);                                                       // 557
                                                                                                                      // 558
                                                                                                                      // 559
/**                                                                                                                   // 560
 * @ngdoc object                                                                                                      // 561
 * @name ui.router.util.$templateFactory                                                                              // 562
 *                                                                                                                    // 563
 * @requires $http                                                                                                    // 564
 * @requires $templateCache                                                                                           // 565
 * @requires $injector                                                                                                // 566
 *                                                                                                                    // 567
 * @description                                                                                                       // 568
 * Service. Manages loading of templates.                                                                             // 569
 */                                                                                                                   // 570
$TemplateFactory.$inject = ['$http', '$templateCache', '$injector'];                                                  // 571
function $TemplateFactory(  $http,   $templateCache,   $injector) {                                                   // 572
                                                                                                                      // 573
  /**                                                                                                                 // 574
   * @ngdoc function                                                                                                  // 575
   * @name ui.router.util.$templateFactory#fromConfig                                                                 // 576
   * @methodOf ui.router.util.$templateFactory                                                                        // 577
   *                                                                                                                  // 578
   * @description                                                                                                     // 579
   * Creates a template from a configuration object.                                                                  // 580
   *                                                                                                                  // 581
   * @param {object} config Configuration object for which to load a template.                                        // 582
   * The following properties are search in the specified order, and the first one                                    // 583
   * that is defined is used to create the template:                                                                  // 584
   *                                                                                                                  // 585
   * @param {string|object} config.template html string template or function to                                       // 586
   * load via {@link ui.router.util.$templateFactory#fromString fromString}.                                          // 587
   * @param {string|object} config.templateUrl url to load or a function returning                                    // 588
   * the url to load via {@link ui.router.util.$templateFactory#fromUrl fromUrl}.                                     // 589
   * @param {Function} config.templateProvider function to invoke via                                                 // 590
   * {@link ui.router.util.$templateFactory#fromProvider fromProvider}.                                               // 591
   * @param {object} params  Parameters to pass to the template function.                                             // 592
   * @param {object} locals Locals to pass to `invoke` if the template is loaded                                      // 593
   * via a `templateProvider`. Defaults to `{ params: params }`.                                                      // 594
   *                                                                                                                  // 595
   * @return {string|object}  The template html as a string, or a promise for                                         // 596
   * that string,or `null` if no template is configured.                                                              // 597
   */                                                                                                                 // 598
  this.fromConfig = function (config, params, locals) {                                                               // 599
    return (                                                                                                          // 600
      isDefined(config.template) ? this.fromString(config.template, params) :                                         // 601
      isDefined(config.templateUrl) ? this.fromUrl(config.templateUrl, params) :                                      // 602
      isDefined(config.templateProvider) ? this.fromProvider(config.templateProvider, params, locals) :               // 603
      null                                                                                                            // 604
    );                                                                                                                // 605
  };                                                                                                                  // 606
                                                                                                                      // 607
  /**                                                                                                                 // 608
   * @ngdoc function                                                                                                  // 609
   * @name ui.router.util.$templateFactory#fromString                                                                 // 610
   * @methodOf ui.router.util.$templateFactory                                                                        // 611
   *                                                                                                                  // 612
   * @description                                                                                                     // 613
   * Creates a template from a string or a function returning a string.                                               // 614
   *                                                                                                                  // 615
   * @param {string|object} template html template as a string or function that                                       // 616
   * returns an html template as a string.                                                                            // 617
   * @param {object} params Parameters to pass to the template function.                                              // 618
   *                                                                                                                  // 619
   * @return {string|object} The template html as a string, or a promise for that                                     // 620
   * string.                                                                                                          // 621
   */                                                                                                                 // 622
  this.fromString = function (template, params) {                                                                     // 623
    return isFunction(template) ? template(params) : template;                                                        // 624
  };                                                                                                                  // 625
                                                                                                                      // 626
  /**                                                                                                                 // 627
   * @ngdoc function                                                                                                  // 628
   * @name ui.router.util.$templateFactory#fromUrl                                                                    // 629
   * @methodOf ui.router.util.$templateFactory                                                                        // 630
   *                                                                                                                  // 631
   * @description                                                                                                     // 632
   * Loads a template from the a URL via `$http` and `$templateCache`.                                                // 633
   *                                                                                                                  // 634
   * @param {string|Function} url url of the template to load, or a function                                          // 635
   * that returns a url.                                                                                              // 636
   * @param {Object} params Parameters to pass to the url function.                                                   // 637
   * @return {string|Promise.<string>} The template html as a string, or a promise                                    // 638
   * for that string.                                                                                                 // 639
   */                                                                                                                 // 640
  this.fromUrl = function (url, params) {                                                                             // 641
    if (isFunction(url)) url = url(params);                                                                           // 642
    if (url == null) return null;                                                                                     // 643
    else return $http                                                                                                 // 644
        .get(url, { cache: $templateCache, headers: { Accept: 'text/html' }})                                         // 645
        .then(function(response) { return response.data; });                                                          // 646
  };                                                                                                                  // 647
                                                                                                                      // 648
  /**                                                                                                                 // 649
   * @ngdoc function                                                                                                  // 650
   * @name ui.router.util.$templateFactory#fromProvider                                                               // 651
   * @methodOf ui.router.util.$templateFactory                                                                        // 652
   *                                                                                                                  // 653
   * @description                                                                                                     // 654
   * Creates a template by invoking an injectable provider function.                                                  // 655
   *                                                                                                                  // 656
   * @param {Function} provider Function to invoke via `$injector.invoke`                                             // 657
   * @param {Object} params Parameters for the template.                                                              // 658
   * @param {Object} locals Locals to pass to `invoke`. Defaults to                                                   // 659
   * `{ params: params }`.                                                                                            // 660
   * @return {string|Promise.<string>} The template html as a string, or a promise                                    // 661
   * for that string.                                                                                                 // 662
   */                                                                                                                 // 663
  this.fromProvider = function (provider, params, locals) {                                                           // 664
    return $injector.invoke(provider, null, locals || { params: params });                                            // 665
  };                                                                                                                  // 666
}                                                                                                                     // 667
                                                                                                                      // 668
angular.module('ui.router.util').service('$templateFactory', $TemplateFactory);                                       // 669
                                                                                                                      // 670
var $$UMFP; // reference to $UrlMatcherFactoryProvider                                                                // 671
                                                                                                                      // 672
/**                                                                                                                   // 673
 * @ngdoc object                                                                                                      // 674
 * @name ui.router.util.type:UrlMatcher                                                                               // 675
 *                                                                                                                    // 676
 * @description                                                                                                       // 677
 * Matches URLs against patterns and extracts named parameters from the path or the search                            // 678
 * part of the URL. A URL pattern consists of a path pattern, optionally followed by '?' and a list                   // 679
 * of search parameters. Multiple search parameter names are separated by '&'. Search parameters                      // 680
 * do not influence whether or not a URL is matched, but their values are passed through into                         // 681
 * the matched parameters returned by {@link ui.router.util.type:UrlMatcher#methods_exec exec}.                       // 682
 *                                                                                                                    // 683
 * Path parameter placeholders can be specified using simple colon/catch-all syntax or curly brace                    // 684
 * syntax, which optionally allows a regular expression for the parameter to be specified:                            // 685
 *                                                                                                                    // 686
 * * `':'` name - colon placeholder                                                                                   // 687
 * * `'*'` name - catch-all placeholder                                                                               // 688
 * * `'{' name '}'` - curly placeholder                                                                               // 689
 * * `'{' name ':' regexp|type '}'` - curly placeholder with regexp or type name. Should the                          // 690
 *   regexp itself contain curly braces, they must be in matched pairs or escaped with a backslash.                   // 691
 *                                                                                                                    // 692
 * Parameter names may contain only word characters (latin letters, digits, and underscore) and                       // 693
 * must be unique within the pattern (across both path and search parameters). For colon                              // 694
 * placeholders or curly placeholders without an explicit regexp, a path parameter matches any                        // 695
 * number of characters other than '/'. For catch-all placeholders the path parameter matches                         // 696
 * any number of characters.                                                                                          // 697
 *                                                                                                                    // 698
 * Examples:                                                                                                          // 699
 *                                                                                                                    // 700
 * * `'/hello/'` - Matches only if the path is exactly '/hello/'. There is no special treatment for                   // 701
 *   trailing slashes, and patterns have to match the entire path, not just a prefix.                                 // 702
 * * `'/user/:id'` - Matches '/user/bob' or '/user/1234!!!' or even '/user/' but not '/user' or                       // 703
 *   '/user/bob/details'. The second path segment will be captured as the parameter 'id'.                             // 704
 * * `'/user/{id}'` - Same as the previous example, but using curly brace syntax.                                     // 705
 * * `'/user/{id:[^/]*}'` - Same as the previous example.                                                             // 706
 * * `'/user/{id:[0-9a-fA-F]{1,8}}'` - Similar to the previous example, but only matches if the id                    // 707
 *   parameter consists of 1 to 8 hex digits.                                                                         // 708
 * * `'/files/{path:.*}'` - Matches any URL starting with '/files/' and captures the rest of the                      // 709
 *   path into the parameter 'path'.                                                                                  // 710
 * * `'/files/*path'` - ditto.                                                                                        // 711
 * * `'/calendar/{start:date}'` - Matches "/calendar/2014-11-12" (because the pattern defined                         // 712
 *   in the built-in  `date` Type matches `2014-11-12`) and provides a Date object in $stateParams.start              // 713
 *                                                                                                                    // 714
 * @param {string} pattern  The pattern to compile into a matcher.                                                    // 715
 * @param {Object} config  A configuration object hash:                                                               // 716
 * @param {Object=} parentMatcher Used to concatenate the pattern/config onto                                         // 717
 *   an existing UrlMatcher                                                                                           // 718
 *                                                                                                                    // 719
 * * `caseInsensitive` - `true` if URL matching should be case insensitive, otherwise `false`, the default value (for backward compatibility) is `false`.
 * * `strict` - `false` if matching against a URL with a trailing slash should be treated as equivalent to a URL without a trailing slash, the default value is `true`.
 *                                                                                                                    // 722
 * @property {string} prefix  A static prefix of this pattern. The matcher guarantees that any                        // 723
 *   URL matching this matcher (i.e. any string for which {@link ui.router.util.type:UrlMatcher#methods_exec exec()} returns
 *   non-null) will start with this prefix.                                                                           // 725
 *                                                                                                                    // 726
 * @property {string} source  The pattern that was passed into the constructor                                        // 727
 *                                                                                                                    // 728
 * @property {string} sourcePath  The path portion of the source property                                             // 729
 *                                                                                                                    // 730
 * @property {string} sourceSearch  The search portion of the source property                                         // 731
 *                                                                                                                    // 732
 * @property {string} regex  The constructed regex that will be used to match against the url when                    // 733
 *   it is time to determine which url will match.                                                                    // 734
 *                                                                                                                    // 735
 * @returns {Object}  New `UrlMatcher` object                                                                         // 736
 */                                                                                                                   // 737
function UrlMatcher(pattern, config, parentMatcher) {                                                                 // 738
  config = extend({ params: {} }, isObject(config) ? config : {});                                                    // 739
                                                                                                                      // 740
  // Find all placeholders and create a compiled pattern, using either classic or curly syntax:                       // 741
  //   '*' name                                                                                                       // 742
  //   ':' name                                                                                                       // 743
  //   '{' name '}'                                                                                                   // 744
  //   '{' name ':' regexp '}'                                                                                        // 745
  // The regular expression is somewhat complicated due to the need to allow curly braces                             // 746
  // inside the regular expression. The placeholder regexp breaks down as follows:                                    // 747
  //    ([:*])([\w\[\]]+)              - classic placeholder ($1 / $2) (search version has - for snake-case)          // 748
  //    \{([\w\[\]]+)(?:\:( ... ))?\}  - curly brace placeholder ($3) with optional regexp/type ... ($4) (search version has - for snake-case
  //    (?: ... | ... | ... )+         - the regexp consists of any number of atoms, an atom being either             // 750
  //    [^{}\\]+                       - anything other than curly braces or backslash                                // 751
  //    \\.                            - a backslash escape                                                           // 752
  //    \{(?:[^{}\\]+|\\.)*\}          - a matched set of curly braces containing other atoms                         // 753
  var placeholder       = /([:*])([\w\[\]]+)|\{([\w\[\]]+)(?:\:((?:[^{}\\]+|\\.|\{(?:[^{}\\]+|\\.)*\})+))?\}/g,       // 754
      searchPlaceholder = /([:]?)([\w\[\]-]+)|\{([\w\[\]-]+)(?:\:((?:[^{}\\]+|\\.|\{(?:[^{}\\]+|\\.)*\})+))?\}/g,     // 755
      compiled = '^', last = 0, m,                                                                                    // 756
      segments = this.segments = [],                                                                                  // 757
      parentParams = parentMatcher ? parentMatcher.params : {},                                                       // 758
      params = this.params = parentMatcher ? parentMatcher.params.$$new() : new $$UMFP.ParamSet(),                    // 759
      paramNames = [];                                                                                                // 760
                                                                                                                      // 761
  function addParameter(id, type, config, location) {                                                                 // 762
    paramNames.push(id);                                                                                              // 763
    if (parentParams[id]) return parentParams[id];                                                                    // 764
    if (!/^\w+(-+\w+)*(?:\[\])?$/.test(id)) throw new Error("Invalid parameter name '" + id + "' in pattern '" + pattern + "'");
    if (params[id]) throw new Error("Duplicate parameter name '" + id + "' in pattern '" + pattern + "'");            // 766
    params[id] = new $$UMFP.Param(id, type, config, location);                                                        // 767
    return params[id];                                                                                                // 768
  }                                                                                                                   // 769
                                                                                                                      // 770
  function quoteRegExp(string, pattern, squash, optional) {                                                           // 771
    var surroundPattern = ['',''], result = string.replace(/[\\\[\]\^$*+?.()|{}]/g, "\\$&");                          // 772
    if (!pattern) return result;                                                                                      // 773
    switch(squash) {                                                                                                  // 774
      case false: surroundPattern = ['(', ')' + (optional ? "?" : "")]; break;                                        // 775
      case true:  surroundPattern = ['?(', ')?']; break;                                                              // 776
      default:    surroundPattern = ['(' + squash + "|", ')?']; break;                                                // 777
    }                                                                                                                 // 778
    return result + surroundPattern[0] + pattern + surroundPattern[1];                                                // 779
  }                                                                                                                   // 780
                                                                                                                      // 781
  this.source = pattern;                                                                                              // 782
                                                                                                                      // 783
  // Split into static segments separated by path parameter placeholders.                                             // 784
  // The number of segments is always 1 more than the number of parameters.                                           // 785
  function matchDetails(m, isSearch) {                                                                                // 786
    var id, regexp, segment, type, cfg, arrayMode;                                                                    // 787
    id          = m[2] || m[3]; // IE[78] returns '' for unmatched groups instead of null                             // 788
    cfg         = config.params[id];                                                                                  // 789
    segment     = pattern.substring(last, m.index);                                                                   // 790
    regexp      = isSearch ? m[4] : m[4] || (m[1] == '*' ? '.*' : null);                                              // 791
    type        = $$UMFP.type(regexp || "string") || inherit($$UMFP.type("string"), { pattern: new RegExp(regexp, config.caseInsensitive ? 'i' : undefined) });
    return {                                                                                                          // 793
      id: id, regexp: regexp, segment: segment, type: type, cfg: cfg                                                  // 794
    };                                                                                                                // 795
  }                                                                                                                   // 796
                                                                                                                      // 797
  var p, param, segment;                                                                                              // 798
  while ((m = placeholder.exec(pattern))) {                                                                           // 799
    p = matchDetails(m, false);                                                                                       // 800
    if (p.segment.indexOf('?') >= 0) break; // we're into the search part                                             // 801
                                                                                                                      // 802
    param = addParameter(p.id, p.type, p.cfg, "path");                                                                // 803
    compiled += quoteRegExp(p.segment, param.type.pattern.source, param.squash, param.isOptional);                    // 804
    segments.push(p.segment);                                                                                         // 805
    last = placeholder.lastIndex;                                                                                     // 806
  }                                                                                                                   // 807
  segment = pattern.substring(last);                                                                                  // 808
                                                                                                                      // 809
  // Find any search parameter names and remove them from the last segment                                            // 810
  var i = segment.indexOf('?');                                                                                       // 811
                                                                                                                      // 812
  if (i >= 0) {                                                                                                       // 813
    var search = this.sourceSearch = segment.substring(i);                                                            // 814
    segment = segment.substring(0, i);                                                                                // 815
    this.sourcePath = pattern.substring(0, last + i);                                                                 // 816
                                                                                                                      // 817
    if (search.length > 0) {                                                                                          // 818
      last = 0;                                                                                                       // 819
      while ((m = searchPlaceholder.exec(search))) {                                                                  // 820
        p = matchDetails(m, true);                                                                                    // 821
        param = addParameter(p.id, p.type, p.cfg, "search");                                                          // 822
        last = placeholder.lastIndex;                                                                                 // 823
        // check if ?&                                                                                                // 824
      }                                                                                                               // 825
    }                                                                                                                 // 826
  } else {                                                                                                            // 827
    this.sourcePath = pattern;                                                                                        // 828
    this.sourceSearch = '';                                                                                           // 829
  }                                                                                                                   // 830
                                                                                                                      // 831
  compiled += quoteRegExp(segment) + (config.strict === false ? '\/?' : '') + '$';                                    // 832
  segments.push(segment);                                                                                             // 833
                                                                                                                      // 834
  this.regexp = new RegExp(compiled, config.caseInsensitive ? 'i' : undefined);                                       // 835
  this.prefix = segments[0];                                                                                          // 836
  this.$$paramNames = paramNames;                                                                                     // 837
}                                                                                                                     // 838
                                                                                                                      // 839
/**                                                                                                                   // 840
 * @ngdoc function                                                                                                    // 841
 * @name ui.router.util.type:UrlMatcher#concat                                                                        // 842
 * @methodOf ui.router.util.type:UrlMatcher                                                                           // 843
 *                                                                                                                    // 844
 * @description                                                                                                       // 845
 * Returns a new matcher for a pattern constructed by appending the path part and adding the                          // 846
 * search parameters of the specified pattern to this pattern. The current pattern is not                             // 847
 * modified. This can be understood as creating a pattern for URLs that are relative to (or                           // 848
 * suffixes of) the current pattern.                                                                                  // 849
 *                                                                                                                    // 850
 * @example                                                                                                           // 851
 * The following two matchers are equivalent:                                                                         // 852
 * <pre>                                                                                                              // 853
 * new UrlMatcher('/user/{id}?q').concat('/details?date');                                                            // 854
 * new UrlMatcher('/user/{id}/details?q&date');                                                                       // 855
 * </pre>                                                                                                             // 856
 *                                                                                                                    // 857
 * @param {string} pattern  The pattern to append.                                                                    // 858
 * @param {Object} config  An object hash of the configuration for the matcher.                                       // 859
 * @returns {UrlMatcher}  A matcher for the concatenated pattern.                                                     // 860
 */                                                                                                                   // 861
UrlMatcher.prototype.concat = function (pattern, config) {                                                            // 862
  // Because order of search parameters is irrelevant, we can add our own search                                      // 863
  // parameters to the end of the new pattern. Parse the new pattern by itself                                        // 864
  // and then join the bits together, but it's much easier to do this on a string level.                              // 865
  var defaultConfig = {                                                                                               // 866
    caseInsensitive: $$UMFP.caseInsensitive(),                                                                        // 867
    strict: $$UMFP.strictMode(),                                                                                      // 868
    squash: $$UMFP.defaultSquashPolicy()                                                                              // 869
  };                                                                                                                  // 870
  return new UrlMatcher(this.sourcePath + pattern + this.sourceSearch, extend(defaultConfig, config), this);          // 871
};                                                                                                                    // 872
                                                                                                                      // 873
UrlMatcher.prototype.toString = function () {                                                                         // 874
  return this.source;                                                                                                 // 875
};                                                                                                                    // 876
                                                                                                                      // 877
/**                                                                                                                   // 878
 * @ngdoc function                                                                                                    // 879
 * @name ui.router.util.type:UrlMatcher#exec                                                                          // 880
 * @methodOf ui.router.util.type:UrlMatcher                                                                           // 881
 *                                                                                                                    // 882
 * @description                                                                                                       // 883
 * Tests the specified path against this matcher, and returns an object containing the captured                       // 884
 * parameter values, or null if the path does not match. The returned object contains the values                      // 885
 * of any search parameters that are mentioned in the pattern, but their value may be null if                         // 886
 * they are not present in `searchParams`. This means that search parameters are always treated                       // 887
 * as optional.                                                                                                       // 888
 *                                                                                                                    // 889
 * @example                                                                                                           // 890
 * <pre>                                                                                                              // 891
 * new UrlMatcher('/user/{id}?q&r').exec('/user/bob', {                                                               // 892
 *   x: '1', q: 'hello'                                                                                               // 893
 * });                                                                                                                // 894
 * // returns { id: 'bob', q: 'hello', r: null }                                                                      // 895
 * </pre>                                                                                                             // 896
 *                                                                                                                    // 897
 * @param {string} path  The URL path to match, e.g. `$location.path()`.                                              // 898
 * @param {Object} searchParams  URL search parameters, e.g. `$location.search()`.                                    // 899
 * @returns {Object}  The captured parameter values.                                                                  // 900
 */                                                                                                                   // 901
UrlMatcher.prototype.exec = function (path, searchParams) {                                                           // 902
  var m = this.regexp.exec(path);                                                                                     // 903
  if (!m) return null;                                                                                                // 904
  searchParams = searchParams || {};                                                                                  // 905
                                                                                                                      // 906
  var paramNames = this.parameters(), nTotal = paramNames.length,                                                     // 907
    nPath = this.segments.length - 1,                                                                                 // 908
    values = {}, i, j, cfg, paramName;                                                                                // 909
                                                                                                                      // 910
  if (nPath !== m.length - 1) throw new Error("Unbalanced capture group in route '" + this.source + "'");             // 911
                                                                                                                      // 912
  function decodePathArray(string) {                                                                                  // 913
    function reverseString(str) { return str.split("").reverse().join(""); }                                          // 914
    function unquoteDashes(str) { return str.replace(/\\-/g, "-"); }                                                  // 915
                                                                                                                      // 916
    var split = reverseString(string).split(/-(?!\\)/);                                                               // 917
    var allReversed = map(split, reverseString);                                                                      // 918
    return map(allReversed, unquoteDashes).reverse();                                                                 // 919
  }                                                                                                                   // 920
                                                                                                                      // 921
  for (i = 0; i < nPath; i++) {                                                                                       // 922
    paramName = paramNames[i];                                                                                        // 923
    var param = this.params[paramName];                                                                               // 924
    var paramVal = m[i+1];                                                                                            // 925
    // if the param value matches a pre-replace pair, replace the value before decoding.                              // 926
    for (j = 0; j < param.replace; j++) {                                                                             // 927
      if (param.replace[j].from === paramVal) paramVal = param.replace[j].to;                                         // 928
    }                                                                                                                 // 929
    if (paramVal && param.array === true) paramVal = decodePathArray(paramVal);                                       // 930
    values[paramName] = param.value(paramVal);                                                                        // 931
  }                                                                                                                   // 932
  for (/**/; i < nTotal; i++) {                                                                                       // 933
    paramName = paramNames[i];                                                                                        // 934
    values[paramName] = this.params[paramName].value(searchParams[paramName]);                                        // 935
  }                                                                                                                   // 936
                                                                                                                      // 937
  return values;                                                                                                      // 938
};                                                                                                                    // 939
                                                                                                                      // 940
/**                                                                                                                   // 941
 * @ngdoc function                                                                                                    // 942
 * @name ui.router.util.type:UrlMatcher#parameters                                                                    // 943
 * @methodOf ui.router.util.type:UrlMatcher                                                                           // 944
 *                                                                                                                    // 945
 * @description                                                                                                       // 946
 * Returns the names of all path and search parameters of this pattern in an unspecified order.                       // 947
 *                                                                                                                    // 948
 * @returns {Array.<string>}  An array of parameter names. Must be treated as read-only. If the                       // 949
 *    pattern has no parameters, an empty array is returned.                                                          // 950
 */                                                                                                                   // 951
UrlMatcher.prototype.parameters = function (param) {                                                                  // 952
  if (!isDefined(param)) return this.$$paramNames;                                                                    // 953
  return this.params[param] || null;                                                                                  // 954
};                                                                                                                    // 955
                                                                                                                      // 956
/**                                                                                                                   // 957
 * @ngdoc function                                                                                                    // 958
 * @name ui.router.util.type:UrlMatcher#validate                                                                      // 959
 * @methodOf ui.router.util.type:UrlMatcher                                                                           // 960
 *                                                                                                                    // 961
 * @description                                                                                                       // 962
 * Checks an object hash of parameters to validate their correctness according to the parameter                       // 963
 * types of this `UrlMatcher`.                                                                                        // 964
 *                                                                                                                    // 965
 * @param {Object} params The object hash of parameters to validate.                                                  // 966
 * @returns {boolean} Returns `true` if `params` validates, otherwise `false`.                                        // 967
 */                                                                                                                   // 968
UrlMatcher.prototype.validates = function (params) {                                                                  // 969
  return this.params.$$validates(params);                                                                             // 970
};                                                                                                                    // 971
                                                                                                                      // 972
/**                                                                                                                   // 973
 * @ngdoc function                                                                                                    // 974
 * @name ui.router.util.type:UrlMatcher#format                                                                        // 975
 * @methodOf ui.router.util.type:UrlMatcher                                                                           // 976
 *                                                                                                                    // 977
 * @description                                                                                                       // 978
 * Creates a URL that matches this pattern by substituting the specified values                                       // 979
 * for the path and search parameters. Null values for path parameters are                                            // 980
 * treated as empty strings.                                                                                          // 981
 *                                                                                                                    // 982
 * @example                                                                                                           // 983
 * <pre>                                                                                                              // 984
 * new UrlMatcher('/user/{id}?q').format({ id:'bob', q:'yes' });                                                      // 985
 * // returns '/user/bob?q=yes'                                                                                       // 986
 * </pre>                                                                                                             // 987
 *                                                                                                                    // 988
 * @param {Object} values  the values to substitute for the parameters in this pattern.                               // 989
 * @returns {string}  the formatted URL (path and optionally search part).                                            // 990
 */                                                                                                                   // 991
UrlMatcher.prototype.format = function (values) {                                                                     // 992
  values = values || {};                                                                                              // 993
  var segments = this.segments, params = this.parameters(), paramset = this.params;                                   // 994
  if (!this.validates(values)) return null;                                                                           // 995
                                                                                                                      // 996
  var i, search = false, nPath = segments.length - 1, nTotal = params.length, result = segments[0];                   // 997
                                                                                                                      // 998
  function encodeDashes(str) { // Replace dashes with encoded "\-"                                                    // 999
    return encodeURIComponent(str).replace(/-/g, function(c) { return '%5C%' + c.charCodeAt(0).toString(16).toUpperCase(); });
  }                                                                                                                   // 1001
                                                                                                                      // 1002
  for (i = 0; i < nTotal; i++) {                                                                                      // 1003
    var isPathParam = i < nPath;                                                                                      // 1004
    var name = params[i], param = paramset[name], value = param.value(values[name]);                                  // 1005
    var isDefaultValue = param.isOptional && param.type.equals(param.value(), value);                                 // 1006
    var squash = isDefaultValue ? param.squash : false;                                                               // 1007
    var encoded = param.type.encode(value);                                                                           // 1008
                                                                                                                      // 1009
    if (isPathParam) {                                                                                                // 1010
      var nextSegment = segments[i + 1];                                                                              // 1011
      if (squash === false) {                                                                                         // 1012
        if (encoded != null) {                                                                                        // 1013
          if (isArray(encoded)) {                                                                                     // 1014
            result += map(encoded, encodeDashes).join("-");                                                           // 1015
          } else {                                                                                                    // 1016
            result += encodeURIComponent(encoded);                                                                    // 1017
          }                                                                                                           // 1018
        }                                                                                                             // 1019
        result += nextSegment;                                                                                        // 1020
      } else if (squash === true) {                                                                                   // 1021
        var capture = result.match(/\/$/) ? /\/?(.*)/ : /(.*)/;                                                       // 1022
        result += nextSegment.match(capture)[1];                                                                      // 1023
      } else if (isString(squash)) {                                                                                  // 1024
        result += squash + nextSegment;                                                                               // 1025
      }                                                                                                               // 1026
    } else {                                                                                                          // 1027
      if (encoded == null || (isDefaultValue && squash !== false)) continue;                                          // 1028
      if (!isArray(encoded)) encoded = [ encoded ];                                                                   // 1029
      encoded = map(encoded, encodeURIComponent).join('&' + name + '=');                                              // 1030
      result += (search ? '&' : '?') + (name + '=' + encoded);                                                        // 1031
      search = true;                                                                                                  // 1032
    }                                                                                                                 // 1033
  }                                                                                                                   // 1034
                                                                                                                      // 1035
  return result;                                                                                                      // 1036
};                                                                                                                    // 1037
                                                                                                                      // 1038
/**                                                                                                                   // 1039
 * @ngdoc object                                                                                                      // 1040
 * @name ui.router.util.type:Type                                                                                     // 1041
 *                                                                                                                    // 1042
 * @description                                                                                                       // 1043
 * Implements an interface to define custom parameter types that can be decoded from and encoded to                   // 1044
 * string parameters matched in a URL. Used by {@link ui.router.util.type:UrlMatcher `UrlMatcher`}                    // 1045
 * objects when matching or formatting URLs, or comparing or validating parameter values.                             // 1046
 *                                                                                                                    // 1047
 * See {@link ui.router.util.$urlMatcherFactory#methods_type `$urlMatcherFactory#type()`} for more                    // 1048
 * information on registering custom types.                                                                           // 1049
 *                                                                                                                    // 1050
 * @param {Object} config  A configuration object which contains the custom type definition.  The object's            // 1051
 *        properties will override the default methods and/or pattern in `Type`'s public interface.                   // 1052
 * @example                                                                                                           // 1053
 * <pre>                                                                                                              // 1054
 * {                                                                                                                  // 1055
 *   decode: function(val) { return parseInt(val, 10); },                                                             // 1056
 *   encode: function(val) { return val && val.toString(); },                                                         // 1057
 *   equals: function(a, b) { return this.is(a) && a === b; },                                                        // 1058
 *   is: function(val) { return angular.isNumber(val) isFinite(val) && val % 1 === 0; },                              // 1059
 *   pattern: /\d+/                                                                                                   // 1060
 * }                                                                                                                  // 1061
 * </pre>                                                                                                             // 1062
 *                                                                                                                    // 1063
 * @property {RegExp} pattern The regular expression pattern used to match values of this type when                   // 1064
 *           coming from a substring of a URL.                                                                        // 1065
 *                                                                                                                    // 1066
 * @returns {Object}  Returns a new `Type` object.                                                                    // 1067
 */                                                                                                                   // 1068
function Type(config) {                                                                                               // 1069
  extend(this, config);                                                                                               // 1070
}                                                                                                                     // 1071
                                                                                                                      // 1072
/**                                                                                                                   // 1073
 * @ngdoc function                                                                                                    // 1074
 * @name ui.router.util.type:Type#is                                                                                  // 1075
 * @methodOf ui.router.util.type:Type                                                                                 // 1076
 *                                                                                                                    // 1077
 * @description                                                                                                       // 1078
 * Detects whether a value is of a particular type. Accepts a native (decoded) value                                  // 1079
 * and determines whether it matches the current `Type` object.                                                       // 1080
 *                                                                                                                    // 1081
 * @param {*} val  The value to check.                                                                                // 1082
 * @param {string} key  Optional. If the type check is happening in the context of a specific                         // 1083
 *        {@link ui.router.util.type:UrlMatcher `UrlMatcher`} object, this is the name of the                         // 1084
 *        parameter in which `val` is stored. Can be used for meta-programming of `Type` objects.                     // 1085
 * @returns {Boolean}  Returns `true` if the value matches the type, otherwise `false`.                               // 1086
 */                                                                                                                   // 1087
Type.prototype.is = function(val, key) {                                                                              // 1088
  return true;                                                                                                        // 1089
};                                                                                                                    // 1090
                                                                                                                      // 1091
/**                                                                                                                   // 1092
 * @ngdoc function                                                                                                    // 1093
 * @name ui.router.util.type:Type#encode                                                                              // 1094
 * @methodOf ui.router.util.type:Type                                                                                 // 1095
 *                                                                                                                    // 1096
 * @description                                                                                                       // 1097
 * Encodes a custom/native type value to a string that can be embedded in a URL. Note that the                        // 1098
 * return value does *not* need to be URL-safe (i.e. passed through `encodeURIComponent()`), it                       // 1099
 * only needs to be a representation of `val` that has been coerced to a string.                                      // 1100
 *                                                                                                                    // 1101
 * @param {*} val  The value to encode.                                                                               // 1102
 * @param {string} key  The name of the parameter in which `val` is stored. Can be used for                           // 1103
 *        meta-programming of `Type` objects.                                                                         // 1104
 * @returns {string}  Returns a string representation of `val` that can be encoded in a URL.                          // 1105
 */                                                                                                                   // 1106
Type.prototype.encode = function(val, key) {                                                                          // 1107
  return val;                                                                                                         // 1108
};                                                                                                                    // 1109
                                                                                                                      // 1110
/**                                                                                                                   // 1111
 * @ngdoc function                                                                                                    // 1112
 * @name ui.router.util.type:Type#decode                                                                              // 1113
 * @methodOf ui.router.util.type:Type                                                                                 // 1114
 *                                                                                                                    // 1115
 * @description                                                                                                       // 1116
 * Converts a parameter value (from URL string or transition param) to a custom/native value.                         // 1117
 *                                                                                                                    // 1118
 * @param {string} val  The URL parameter value to decode.                                                            // 1119
 * @param {string} key  The name of the parameter in which `val` is stored. Can be used for                           // 1120
 *        meta-programming of `Type` objects.                                                                         // 1121
 * @returns {*}  Returns a custom representation of the URL parameter value.                                          // 1122
 */                                                                                                                   // 1123
Type.prototype.decode = function(val, key) {                                                                          // 1124
  return val;                                                                                                         // 1125
};                                                                                                                    // 1126
                                                                                                                      // 1127
/**                                                                                                                   // 1128
 * @ngdoc function                                                                                                    // 1129
 * @name ui.router.util.type:Type#equals                                                                              // 1130
 * @methodOf ui.router.util.type:Type                                                                                 // 1131
 *                                                                                                                    // 1132
 * @description                                                                                                       // 1133
 * Determines whether two decoded values are equivalent.                                                              // 1134
 *                                                                                                                    // 1135
 * @param {*} a  A value to compare against.                                                                          // 1136
 * @param {*} b  A value to compare against.                                                                          // 1137
 * @returns {Boolean}  Returns `true` if the values are equivalent/equal, otherwise `false`.                          // 1138
 */                                                                                                                   // 1139
Type.prototype.equals = function(a, b) {                                                                              // 1140
  return a == b;                                                                                                      // 1141
};                                                                                                                    // 1142
                                                                                                                      // 1143
Type.prototype.$subPattern = function() {                                                                             // 1144
  var sub = this.pattern.toString();                                                                                  // 1145
  return sub.substr(1, sub.length - 2);                                                                               // 1146
};                                                                                                                    // 1147
                                                                                                                      // 1148
Type.prototype.pattern = /.*/;                                                                                        // 1149
                                                                                                                      // 1150
Type.prototype.toString = function() { return "{Type:" + this.name + "}"; };                                          // 1151
                                                                                                                      // 1152
/** Given an encoded string, or a decoded object, returns a decoded object */                                         // 1153
Type.prototype.$normalize = function(val) {                                                                           // 1154
  return this.is(val) ? val : this.decode(val);                                                                       // 1155
};                                                                                                                    // 1156
                                                                                                                      // 1157
/*                                                                                                                    // 1158
 * Wraps an existing custom Type as an array of Type, depending on 'mode'.                                            // 1159
 * e.g.:                                                                                                              // 1160
 * - urlmatcher pattern "/path?{queryParam[]:int}"                                                                    // 1161
 * - url: "/path?queryParam=1&queryParam=2                                                                            // 1162
 * - $stateParams.queryParam will be [1, 2]                                                                           // 1163
 * if `mode` is "auto", then                                                                                          // 1164
 * - url: "/path?queryParam=1 will create $stateParams.queryParam: 1                                                  // 1165
 * - url: "/path?queryParam=1&queryParam=2 will create $stateParams.queryParam: [1, 2]                                // 1166
 */                                                                                                                   // 1167
Type.prototype.$asArray = function(mode, isSearch) {                                                                  // 1168
  if (!mode) return this;                                                                                             // 1169
  if (mode === "auto" && !isSearch) throw new Error("'auto' array mode is for query parameters only");                // 1170
                                                                                                                      // 1171
  function ArrayType(type, mode) {                                                                                    // 1172
    function bindTo(type, callbackName) {                                                                             // 1173
      return function() {                                                                                             // 1174
        return type[callbackName].apply(type, arguments);                                                             // 1175
      };                                                                                                              // 1176
    }                                                                                                                 // 1177
                                                                                                                      // 1178
    // Wrap non-array value as array                                                                                  // 1179
    function arrayWrap(val) { return isArray(val) ? val : (isDefined(val) ? [ val ] : []); }                          // 1180
    // Unwrap array value for "auto" mode. Return undefined for empty array.                                          // 1181
    function arrayUnwrap(val) {                                                                                       // 1182
      switch(val.length) {                                                                                            // 1183
        case 0: return undefined;                                                                                     // 1184
        case 1: return mode === "auto" ? val[0] : val;                                                                // 1185
        default: return val;                                                                                          // 1186
      }                                                                                                               // 1187
    }                                                                                                                 // 1188
    function falsey(val) { return !val; }                                                                             // 1189
                                                                                                                      // 1190
    // Wraps type (.is/.encode/.decode) functions to operate on each value of an array                                // 1191
    function arrayHandler(callback, allTruthyMode) {                                                                  // 1192
      return function handleArray(val) {                                                                              // 1193
        val = arrayWrap(val);                                                                                         // 1194
        var result = map(val, callback);                                                                              // 1195
        if (allTruthyMode === true)                                                                                   // 1196
          return filter(result, falsey).length === 0;                                                                 // 1197
        return arrayUnwrap(result);                                                                                   // 1198
      };                                                                                                              // 1199
    }                                                                                                                 // 1200
                                                                                                                      // 1201
    // Wraps type (.equals) functions to operate on each value of an array                                            // 1202
    function arrayEqualsHandler(callback) {                                                                           // 1203
      return function handleArray(val1, val2) {                                                                       // 1204
        var left = arrayWrap(val1), right = arrayWrap(val2);                                                          // 1205
        if (left.length !== right.length) return false;                                                               // 1206
        for (var i = 0; i < left.length; i++) {                                                                       // 1207
          if (!callback(left[i], right[i])) return false;                                                             // 1208
        }                                                                                                             // 1209
        return true;                                                                                                  // 1210
      };                                                                                                              // 1211
    }                                                                                                                 // 1212
                                                                                                                      // 1213
    this.encode = arrayHandler(bindTo(type, 'encode'));                                                               // 1214
    this.decode = arrayHandler(bindTo(type, 'decode'));                                                               // 1215
    this.is     = arrayHandler(bindTo(type, 'is'), true);                                                             // 1216
    this.equals = arrayEqualsHandler(bindTo(type, 'equals'));                                                         // 1217
    this.pattern = type.pattern;                                                                                      // 1218
    this.$normalize = arrayHandler(bindTo(type, '$normalize'));                                                       // 1219
    this.name = type.name;                                                                                            // 1220
    this.$arrayMode = mode;                                                                                           // 1221
  }                                                                                                                   // 1222
                                                                                                                      // 1223
  return new ArrayType(this, mode);                                                                                   // 1224
};                                                                                                                    // 1225
                                                                                                                      // 1226
                                                                                                                      // 1227
                                                                                                                      // 1228
/**                                                                                                                   // 1229
 * @ngdoc object                                                                                                      // 1230
 * @name ui.router.util.$urlMatcherFactory                                                                            // 1231
 *                                                                                                                    // 1232
 * @description                                                                                                       // 1233
 * Factory for {@link ui.router.util.type:UrlMatcher `UrlMatcher`} instances. The factory                             // 1234
 * is also available to providers under the name `$urlMatcherFactoryProvider`.                                        // 1235
 */                                                                                                                   // 1236
function $UrlMatcherFactory() {                                                                                       // 1237
  $$UMFP = this;                                                                                                      // 1238
                                                                                                                      // 1239
  var isCaseInsensitive = false, isStrictMode = true, defaultSquashPolicy = false;                                    // 1240
                                                                                                                      // 1241
  function valToString(val) { return val != null ? val.toString().replace(/\//g, "%2F") : val; }                      // 1242
  function valFromString(val) { return val != null ? val.toString().replace(/%2F/g, "/") : val; }                     // 1243
                                                                                                                      // 1244
  var $types = {}, enqueue = true, typeQueue = [], injector, defaultTypes = {                                         // 1245
    string: {                                                                                                         // 1246
      encode: valToString,                                                                                            // 1247
      decode: valFromString,                                                                                          // 1248
      // TODO: in 1.0, make string .is() return false if value is undefined/null by default.                          // 1249
      // In 0.2.x, string params are optional by default for backwards compat                                         // 1250
      is: function(val) { return val == null || !isDefined(val) || typeof val === "string"; },                        // 1251
      pattern: /[^/]*/                                                                                                // 1252
    },                                                                                                                // 1253
    int: {                                                                                                            // 1254
      encode: valToString,                                                                                            // 1255
      decode: function(val) { return parseInt(val, 10); },                                                            // 1256
      is: function(val) { return isDefined(val) && this.decode(val.toString()) === val; },                            // 1257
      pattern: /\d+/                                                                                                  // 1258
    },                                                                                                                // 1259
    bool: {                                                                                                           // 1260
      encode: function(val) { return val ? 1 : 0; },                                                                  // 1261
      decode: function(val) { return parseInt(val, 10) !== 0; },                                                      // 1262
      is: function(val) { return val === true || val === false; },                                                    // 1263
      pattern: /0|1/                                                                                                  // 1264
    },                                                                                                                // 1265
    date: {                                                                                                           // 1266
      encode: function (val) {                                                                                        // 1267
        if (!this.is(val))                                                                                            // 1268
          return undefined;                                                                                           // 1269
        return [ val.getFullYear(),                                                                                   // 1270
          ('0' + (val.getMonth() + 1)).slice(-2),                                                                     // 1271
          ('0' + val.getDate()).slice(-2)                                                                             // 1272
        ].join("-");                                                                                                  // 1273
      },                                                                                                              // 1274
      decode: function (val) {                                                                                        // 1275
        if (this.is(val)) return val;                                                                                 // 1276
        var match = this.capture.exec(val);                                                                           // 1277
        return match ? new Date(match[1], match[2] - 1, match[3]) : undefined;                                        // 1278
      },                                                                                                              // 1279
      is: function(val) { return val instanceof Date && !isNaN(val.valueOf()); },                                     // 1280
      equals: function (a, b) { return this.is(a) && this.is(b) && a.toISOString() === b.toISOString(); },            // 1281
      pattern: /[0-9]{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[1-2][0-9]|3[0-1])/,                                             // 1282
      capture: /([0-9]{4})-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])/                                                // 1283
    },                                                                                                                // 1284
    json: {                                                                                                           // 1285
      encode: angular.toJson,                                                                                         // 1286
      decode: angular.fromJson,                                                                                       // 1287
      is: angular.isObject,                                                                                           // 1288
      equals: angular.equals,                                                                                         // 1289
      pattern: /[^/]*/                                                                                                // 1290
    },                                                                                                                // 1291
    any: { // does not encode/decode                                                                                  // 1292
      encode: angular.identity,                                                                                       // 1293
      decode: angular.identity,                                                                                       // 1294
      equals: angular.equals,                                                                                         // 1295
      pattern: /.*/                                                                                                   // 1296
    }                                                                                                                 // 1297
  };                                                                                                                  // 1298
                                                                                                                      // 1299
  function getDefaultConfig() {                                                                                       // 1300
    return {                                                                                                          // 1301
      strict: isStrictMode,                                                                                           // 1302
      caseInsensitive: isCaseInsensitive                                                                              // 1303
    };                                                                                                                // 1304
  }                                                                                                                   // 1305
                                                                                                                      // 1306
  function isInjectable(value) {                                                                                      // 1307
    return (isFunction(value) || (isArray(value) && isFunction(value[value.length - 1])));                            // 1308
  }                                                                                                                   // 1309
                                                                                                                      // 1310
  /**                                                                                                                 // 1311
   * [Internal] Get the default value of a parameter, which may be an injectable function.                            // 1312
   */                                                                                                                 // 1313
  $UrlMatcherFactory.$$getDefaultValue = function(config) {                                                           // 1314
    if (!isInjectable(config.value)) return config.value;                                                             // 1315
    if (!injector) throw new Error("Injectable functions cannot be called at configuration time");                    // 1316
    return injector.invoke(config.value);                                                                             // 1317
  };                                                                                                                  // 1318
                                                                                                                      // 1319
  /**                                                                                                                 // 1320
   * @ngdoc function                                                                                                  // 1321
   * @name ui.router.util.$urlMatcherFactory#caseInsensitive                                                          // 1322
   * @methodOf ui.router.util.$urlMatcherFactory                                                                      // 1323
   *                                                                                                                  // 1324
   * @description                                                                                                     // 1325
   * Defines whether URL matching should be case sensitive (the default behavior), or not.                            // 1326
   *                                                                                                                  // 1327
   * @param {boolean} value `false` to match URL in a case sensitive manner; otherwise `true`;                        // 1328
   * @returns {boolean} the current value of caseInsensitive                                                          // 1329
   */                                                                                                                 // 1330
  this.caseInsensitive = function(value) {                                                                            // 1331
    if (isDefined(value))                                                                                             // 1332
      isCaseInsensitive = value;                                                                                      // 1333
    return isCaseInsensitive;                                                                                         // 1334
  };                                                                                                                  // 1335
                                                                                                                      // 1336
  /**                                                                                                                 // 1337
   * @ngdoc function                                                                                                  // 1338
   * @name ui.router.util.$urlMatcherFactory#strictMode                                                               // 1339
   * @methodOf ui.router.util.$urlMatcherFactory                                                                      // 1340
   *                                                                                                                  // 1341
   * @description                                                                                                     // 1342
   * Defines whether URLs should match trailing slashes, or not (the default behavior).                               // 1343
   *                                                                                                                  // 1344
   * @param {boolean=} value `false` to match trailing slashes in URLs, otherwise `true`.                             // 1345
   * @returns {boolean} the current value of strictMode                                                               // 1346
   */                                                                                                                 // 1347
  this.strictMode = function(value) {                                                                                 // 1348
    if (isDefined(value))                                                                                             // 1349
      isStrictMode = value;                                                                                           // 1350
    return isStrictMode;                                                                                              // 1351
  };                                                                                                                  // 1352
                                                                                                                      // 1353
  /**                                                                                                                 // 1354
   * @ngdoc function                                                                                                  // 1355
   * @name ui.router.util.$urlMatcherFactory#defaultSquashPolicy                                                      // 1356
   * @methodOf ui.router.util.$urlMatcherFactory                                                                      // 1357
   *                                                                                                                  // 1358
   * @description                                                                                                     // 1359
   * Sets the default behavior when generating or matching URLs with default parameter values.                        // 1360
   *                                                                                                                  // 1361
   * @param {string} value A string that defines the default parameter URL squashing behavior.                        // 1362
   *    `nosquash`: When generating an href with a default parameter value, do not squash the parameter value from the URL
   *    `slash`: When generating an href with a default parameter value, squash (remove) the parameter value, and, if the
   *             parameter is surrounded by slashes, squash (remove) one slash from the URL                           // 1365
   *    any other string, e.g. "~": When generating an href with a default parameter value, squash (remove)           // 1366
   *             the parameter value from the URL and replace it with this string.                                    // 1367
   */                                                                                                                 // 1368
  this.defaultSquashPolicy = function(value) {                                                                        // 1369
    if (!isDefined(value)) return defaultSquashPolicy;                                                                // 1370
    if (value !== true && value !== false && !isString(value))                                                        // 1371
      throw new Error("Invalid squash policy: " + value + ". Valid policies: false, true, arbitrary-string");         // 1372
    defaultSquashPolicy = value;                                                                                      // 1373
    return value;                                                                                                     // 1374
  };                                                                                                                  // 1375
                                                                                                                      // 1376
  /**                                                                                                                 // 1377
   * @ngdoc function                                                                                                  // 1378
   * @name ui.router.util.$urlMatcherFactory#compile                                                                  // 1379
   * @methodOf ui.router.util.$urlMatcherFactory                                                                      // 1380
   *                                                                                                                  // 1381
   * @description                                                                                                     // 1382
   * Creates a {@link ui.router.util.type:UrlMatcher `UrlMatcher`} for the specified pattern.                         // 1383
   *                                                                                                                  // 1384
   * @param {string} pattern  The URL pattern.                                                                        // 1385
   * @param {Object} config  The config object hash.                                                                  // 1386
   * @returns {UrlMatcher}  The UrlMatcher.                                                                           // 1387
   */                                                                                                                 // 1388
  this.compile = function (pattern, config) {                                                                         // 1389
    return new UrlMatcher(pattern, extend(getDefaultConfig(), config));                                               // 1390
  };                                                                                                                  // 1391
                                                                                                                      // 1392
  /**                                                                                                                 // 1393
   * @ngdoc function                                                                                                  // 1394
   * @name ui.router.util.$urlMatcherFactory#isMatcher                                                                // 1395
   * @methodOf ui.router.util.$urlMatcherFactory                                                                      // 1396
   *                                                                                                                  // 1397
   * @description                                                                                                     // 1398
   * Returns true if the specified object is a `UrlMatcher`, or false otherwise.                                      // 1399
   *                                                                                                                  // 1400
   * @param {Object} object  The object to perform the type check against.                                            // 1401
   * @returns {Boolean}  Returns `true` if the object matches the `UrlMatcher` interface, by                          // 1402
   *          implementing all the same methods.                                                                      // 1403
   */                                                                                                                 // 1404
  this.isMatcher = function (o) {                                                                                     // 1405
    if (!isObject(o)) return false;                                                                                   // 1406
    var result = true;                                                                                                // 1407
                                                                                                                      // 1408
    forEach(UrlMatcher.prototype, function(val, name) {                                                               // 1409
      if (isFunction(val)) {                                                                                          // 1410
        result = result && (isDefined(o[name]) && isFunction(o[name]));                                               // 1411
      }                                                                                                               // 1412
    });                                                                                                               // 1413
    return result;                                                                                                    // 1414
  };                                                                                                                  // 1415
                                                                                                                      // 1416
  /**                                                                                                                 // 1417
   * @ngdoc function                                                                                                  // 1418
   * @name ui.router.util.$urlMatcherFactory#type                                                                     // 1419
   * @methodOf ui.router.util.$urlMatcherFactory                                                                      // 1420
   *                                                                                                                  // 1421
   * @description                                                                                                     // 1422
   * Registers a custom {@link ui.router.util.type:Type `Type`} object that can be used to                            // 1423
   * generate URLs with typed parameters.                                                                             // 1424
   *                                                                                                                  // 1425
   * @param {string} name  The type name.                                                                             // 1426
   * @param {Object|Function} definition   The type definition. See                                                   // 1427
   *        {@link ui.router.util.type:Type `Type`} for information on the values accepted.                           // 1428
   * @param {Object|Function} definitionFn (optional) A function that is injected before the app                      // 1429
   *        runtime starts.  The result of this function is merged into the existing `definition`.                    // 1430
   *        See {@link ui.router.util.type:Type `Type`} for information on the values accepted.                       // 1431
   *                                                                                                                  // 1432
   * @returns {Object}  Returns `$urlMatcherFactoryProvider`.                                                         // 1433
   *                                                                                                                  // 1434
   * @example                                                                                                         // 1435
   * This is a simple example of a custom type that encodes and decodes items from an                                 // 1436
   * array, using the array index as the URL-encoded value:                                                           // 1437
   *                                                                                                                  // 1438
   * <pre>                                                                                                            // 1439
   * var list = ['John', 'Paul', 'George', 'Ringo'];                                                                  // 1440
   *                                                                                                                  // 1441
   * $urlMatcherFactoryProvider.type('listItem', {                                                                    // 1442
   *   encode: function(item) {                                                                                       // 1443
   *     // Represent the list item in the URL using its corresponding index                                          // 1444
   *     return list.indexOf(item);                                                                                   // 1445
   *   },                                                                                                             // 1446
   *   decode: function(item) {                                                                                       // 1447
   *     // Look up the list item by index                                                                            // 1448
   *     return list[parseInt(item, 10)];                                                                             // 1449
   *   },                                                                                                             // 1450
   *   is: function(item) {                                                                                           // 1451
   *     // Ensure the item is valid by checking to see that it appears                                               // 1452
   *     // in the list                                                                                               // 1453
   *     return list.indexOf(item) > -1;                                                                              // 1454
   *   }                                                                                                              // 1455
   * });                                                                                                              // 1456
   *                                                                                                                  // 1457
   * $stateProvider.state('list', {                                                                                   // 1458
   *   url: "/list/{item:listItem}",                                                                                  // 1459
   *   controller: function($scope, $stateParams) {                                                                   // 1460
   *     console.log($stateParams.item);                                                                              // 1461
   *   }                                                                                                              // 1462
   * });                                                                                                              // 1463
   *                                                                                                                  // 1464
   * // ...                                                                                                           // 1465
   *                                                                                                                  // 1466
   * // Changes URL to '/list/3', logs "Ringo" to the console                                                         // 1467
   * $state.go('list', { item: "Ringo" });                                                                            // 1468
   * </pre>                                                                                                           // 1469
   *                                                                                                                  // 1470
   * This is a more complex example of a type that relies on dependency injection to                                  // 1471
   * interact with services, and uses the parameter name from the URL to infer how to                                 // 1472
   * handle encoding and decoding parameter values:                                                                   // 1473
   *                                                                                                                  // 1474
   * <pre>                                                                                                            // 1475
   * // Defines a custom type that gets a value from a service,                                                       // 1476
   * // where each service gets different types of values from                                                        // 1477
   * // a backend API:                                                                                                // 1478
   * $urlMatcherFactoryProvider.type('dbObject', {}, function(Users, Posts) {                                         // 1479
   *                                                                                                                  // 1480
   *   // Matches up services to URL parameter names                                                                  // 1481
   *   var services = {                                                                                               // 1482
   *     user: Users,                                                                                                 // 1483
   *     post: Posts                                                                                                  // 1484
   *   };                                                                                                             // 1485
   *                                                                                                                  // 1486
   *   return {                                                                                                       // 1487
   *     encode: function(object) {                                                                                   // 1488
   *       // Represent the object in the URL using its unique ID                                                     // 1489
   *       return object.id;                                                                                          // 1490
   *     },                                                                                                           // 1491
   *     decode: function(value, key) {                                                                               // 1492
   *       // Look up the object by ID, using the parameter                                                           // 1493
   *       // name (key) to call the correct service                                                                  // 1494
   *       return services[key].findById(value);                                                                      // 1495
   *     },                                                                                                           // 1496
   *     is: function(object, key) {                                                                                  // 1497
   *       // Check that object is a valid dbObject                                                                   // 1498
   *       return angular.isObject(object) && object.id && services[key];                                             // 1499
   *     }                                                                                                            // 1500
   *     equals: function(a, b) {                                                                                     // 1501
   *       // Check the equality of decoded objects by comparing                                                      // 1502
   *       // their unique IDs                                                                                        // 1503
   *       return a.id === b.id;                                                                                      // 1504
   *     }                                                                                                            // 1505
   *   };                                                                                                             // 1506
   * });                                                                                                              // 1507
   *                                                                                                                  // 1508
   * // In a config() block, you can then attach URLs with                                                            // 1509
   * // type-annotated parameters:                                                                                    // 1510
   * $stateProvider.state('users', {                                                                                  // 1511
   *   url: "/users",                                                                                                 // 1512
   *   // ...                                                                                                         // 1513
   * }).state('users.item', {                                                                                         // 1514
   *   url: "/{user:dbObject}",                                                                                       // 1515
   *   controller: function($scope, $stateParams) {                                                                   // 1516
   *     // $stateParams.user will now be an object returned from                                                     // 1517
   *     // the Users service                                                                                         // 1518
   *   },                                                                                                             // 1519
   *   // ...                                                                                                         // 1520
   * });                                                                                                              // 1521
   * </pre>                                                                                                           // 1522
   */                                                                                                                 // 1523
  this.type = function (name, definition, definitionFn) {                                                             // 1524
    if (!isDefined(definition)) return $types[name];                                                                  // 1525
    if ($types.hasOwnProperty(name)) throw new Error("A type named '" + name + "' has already been defined.");        // 1526
                                                                                                                      // 1527
    $types[name] = new Type(extend({ name: name }, definition));                                                      // 1528
    if (definitionFn) {                                                                                               // 1529
      typeQueue.push({ name: name, def: definitionFn });                                                              // 1530
      if (!enqueue) flushTypeQueue();                                                                                 // 1531
    }                                                                                                                 // 1532
    return this;                                                                                                      // 1533
  };                                                                                                                  // 1534
                                                                                                                      // 1535
  // `flushTypeQueue()` waits until `$urlMatcherFactory` is injected before invoking the queued `definitionFn`s       // 1536
  function flushTypeQueue() {                                                                                         // 1537
    while(typeQueue.length) {                                                                                         // 1538
      var type = typeQueue.shift();                                                                                   // 1539
      if (type.pattern) throw new Error("You cannot override a type's .pattern at runtime.");                         // 1540
      angular.extend($types[type.name], injector.invoke(type.def));                                                   // 1541
    }                                                                                                                 // 1542
  }                                                                                                                   // 1543
                                                                                                                      // 1544
  // Register default types. Store them in the prototype of $types.                                                   // 1545
  forEach(defaultTypes, function(type, name) { $types[name] = new Type(extend({name: name}, type)); });               // 1546
  $types = inherit($types, {});                                                                                       // 1547
                                                                                                                      // 1548
  /* No need to document $get, since it returns this */                                                               // 1549
  this.$get = ['$injector', function ($injector) {                                                                    // 1550
    injector = $injector;                                                                                             // 1551
    enqueue = false;                                                                                                  // 1552
    flushTypeQueue();                                                                                                 // 1553
                                                                                                                      // 1554
    forEach(defaultTypes, function(type, name) {                                                                      // 1555
      if (!$types[name]) $types[name] = new Type(type);                                                               // 1556
    });                                                                                                               // 1557
    return this;                                                                                                      // 1558
  }];                                                                                                                 // 1559
                                                                                                                      // 1560
  this.Param = function Param(id, type, config, location) {                                                           // 1561
    var self = this;                                                                                                  // 1562
    config = unwrapShorthand(config);                                                                                 // 1563
    type = getType(config, type, location);                                                                           // 1564
    var arrayMode = getArrayMode();                                                                                   // 1565
    type = arrayMode ? type.$asArray(arrayMode, location === "search") : type;                                        // 1566
    if (type.name === "string" && !arrayMode && location === "path" && config.value === undefined)                    // 1567
      config.value = ""; // for 0.2.x; in 0.3.0+ do not automatically default to ""                                   // 1568
    var isOptional = config.value !== undefined;                                                                      // 1569
    var squash = getSquashPolicy(config, isOptional);                                                                 // 1570
    var replace = getReplace(config, arrayMode, isOptional, squash);                                                  // 1571
                                                                                                                      // 1572
    function unwrapShorthand(config) {                                                                                // 1573
      var keys = isObject(config) ? objectKeys(config) : [];                                                          // 1574
      var isShorthand = indexOf(keys, "value") === -1 && indexOf(keys, "type") === -1 &&                              // 1575
                        indexOf(keys, "squash") === -1 && indexOf(keys, "array") === -1;                              // 1576
      if (isShorthand) config = { value: config };                                                                    // 1577
      config.$$fn = isInjectable(config.value) ? config.value : function () { return config.value; };                 // 1578
      return config;                                                                                                  // 1579
    }                                                                                                                 // 1580
                                                                                                                      // 1581
    function getType(config, urlType, location) {                                                                     // 1582
      if (config.type && urlType) throw new Error("Param '"+id+"' has two type configurations.");                     // 1583
      if (urlType) return urlType;                                                                                    // 1584
      if (!config.type) return (location === "config" ? $types.any : $types.string);                                  // 1585
      return config.type instanceof Type ? config.type : new Type(config.type);                                       // 1586
    }                                                                                                                 // 1587
                                                                                                                      // 1588
    // array config: param name (param[]) overrides default settings.  explicit config overrides param name.          // 1589
    function getArrayMode() {                                                                                         // 1590
      var arrayDefaults = { array: (location === "search" ? "auto" : false) };                                        // 1591
      var arrayParamNomenclature = id.match(/\[\]$/) ? { array: true } : {};                                          // 1592
      return extend(arrayDefaults, arrayParamNomenclature, config).array;                                             // 1593
    }                                                                                                                 // 1594
                                                                                                                      // 1595
    /**                                                                                                               // 1596
     * returns false, true, or the squash value to indicate the "default parameter url squash policy".                // 1597
     */                                                                                                               // 1598
    function getSquashPolicy(config, isOptional) {                                                                    // 1599
      var squash = config.squash;                                                                                     // 1600
      if (!isOptional || squash === false) return false;                                                              // 1601
      if (!isDefined(squash) || squash == null) return defaultSquashPolicy;                                           // 1602
      if (squash === true || isString(squash)) return squash;                                                         // 1603
      throw new Error("Invalid squash policy: '" + squash + "'. Valid policies: false, true, or arbitrary string");   // 1604
    }                                                                                                                 // 1605
                                                                                                                      // 1606
    function getReplace(config, arrayMode, isOptional, squash) {                                                      // 1607
      var replace, configuredKeys, defaultPolicy = [                                                                  // 1608
        { from: "",   to: (isOptional || arrayMode ? undefined : "") },                                               // 1609
        { from: null, to: (isOptional || arrayMode ? undefined : "") }                                                // 1610
      ];                                                                                                              // 1611
      replace = isArray(config.replace) ? config.replace : [];                                                        // 1612
      if (isString(squash))                                                                                           // 1613
        replace.push({ from: squash, to: undefined });                                                                // 1614
      configuredKeys = map(replace, function(item) { return item.from; } );                                           // 1615
      return filter(defaultPolicy, function(item) { return indexOf(configuredKeys, item.from) === -1; }).concat(replace);
    }                                                                                                                 // 1617
                                                                                                                      // 1618
    /**                                                                                                               // 1619
     * [Internal] Get the default value of a parameter, which may be an injectable function.                          // 1620
     */                                                                                                               // 1621
    function $$getDefaultValue() {                                                                                    // 1622
      if (!injector) throw new Error("Injectable functions cannot be called at configuration time");                  // 1623
      var defaultValue = injector.invoke(config.$$fn);                                                                // 1624
      if (defaultValue !== null && defaultValue !== undefined && !self.type.is(defaultValue))                         // 1625
        throw new Error("Default value (" + defaultValue + ") for parameter '" + self.id + "' is not an instance of Type (" + self.type.name + ")");
      return defaultValue;                                                                                            // 1627
    }                                                                                                                 // 1628
                                                                                                                      // 1629
    /**                                                                                                               // 1630
     * [Internal] Gets the decoded representation of a value if the value is defined, otherwise, returns the          // 1631
     * default value, which may be the result of an injectable function.                                              // 1632
     */                                                                                                               // 1633
    function $value(value) {                                                                                          // 1634
      function hasReplaceVal(val) { return function(obj) { return obj.from === val; }; }                              // 1635
      function $replace(value) {                                                                                      // 1636
        var replacement = map(filter(self.replace, hasReplaceVal(value)), function(obj) { return obj.to; });          // 1637
        return replacement.length ? replacement[0] : value;                                                           // 1638
      }                                                                                                               // 1639
      value = $replace(value);                                                                                        // 1640
      return !isDefined(value) ? $$getDefaultValue() : self.type.$normalize(value);                                   // 1641
    }                                                                                                                 // 1642
                                                                                                                      // 1643
    function toString() { return "{Param:" + id + " " + type + " squash: '" + squash + "' optional: " + isOptional + "}"; }
                                                                                                                      // 1645
    extend(this, {                                                                                                    // 1646
      id: id,                                                                                                         // 1647
      type: type,                                                                                                     // 1648
      location: location,                                                                                             // 1649
      array: arrayMode,                                                                                               // 1650
      squash: squash,                                                                                                 // 1651
      replace: replace,                                                                                               // 1652
      isOptional: isOptional,                                                                                         // 1653
      value: $value,                                                                                                  // 1654
      dynamic: undefined,                                                                                             // 1655
      config: config,                                                                                                 // 1656
      toString: toString                                                                                              // 1657
    });                                                                                                               // 1658
  };                                                                                                                  // 1659
                                                                                                                      // 1660
  function ParamSet(params) {                                                                                         // 1661
    extend(this, params || {});                                                                                       // 1662
  }                                                                                                                   // 1663
                                                                                                                      // 1664
  ParamSet.prototype = {                                                                                              // 1665
    $$new: function() {                                                                                               // 1666
      return inherit(this, extend(new ParamSet(), { $$parent: this}));                                                // 1667
    },                                                                                                                // 1668
    $$keys: function () {                                                                                             // 1669
      var keys = [], chain = [], parent = this,                                                                       // 1670
        ignore = objectKeys(ParamSet.prototype);                                                                      // 1671
      while (parent) { chain.push(parent); parent = parent.$$parent; }                                                // 1672
      chain.reverse();                                                                                                // 1673
      forEach(chain, function(paramset) {                                                                             // 1674
        forEach(objectKeys(paramset), function(key) {                                                                 // 1675
            if (indexOf(keys, key) === -1 && indexOf(ignore, key) === -1) keys.push(key);                             // 1676
        });                                                                                                           // 1677
      });                                                                                                             // 1678
      return keys;                                                                                                    // 1679
    },                                                                                                                // 1680
    $$values: function(paramValues) {                                                                                 // 1681
      var values = {}, self = this;                                                                                   // 1682
      forEach(self.$$keys(), function(key) {                                                                          // 1683
        values[key] = self[key].value(paramValues && paramValues[key]);                                               // 1684
      });                                                                                                             // 1685
      return values;                                                                                                  // 1686
    },                                                                                                                // 1687
    $$equals: function(paramValues1, paramValues2) {                                                                  // 1688
      var equal = true, self = this;                                                                                  // 1689
      forEach(self.$$keys(), function(key) {                                                                          // 1690
        var left = paramValues1 && paramValues1[key], right = paramValues2 && paramValues2[key];                      // 1691
        if (!self[key].type.equals(left, right)) equal = false;                                                       // 1692
      });                                                                                                             // 1693
      return equal;                                                                                                   // 1694
    },                                                                                                                // 1695
    $$validates: function $$validate(paramValues) {                                                                   // 1696
      var keys = this.$$keys(), i, param, rawVal, normalized, encoded;                                                // 1697
      for (i = 0; i < keys.length; i++) {                                                                             // 1698
        param = this[keys[i]];                                                                                        // 1699
        rawVal = paramValues[keys[i]];                                                                                // 1700
        if ((rawVal === undefined || rawVal === null) && param.isOptional)                                            // 1701
          break; // There was no parameter value, but the param is optional                                           // 1702
        normalized = param.type.$normalize(rawVal);                                                                   // 1703
        if (!param.type.is(normalized))                                                                               // 1704
          return false; // The value was not of the correct Type, and could not be decoded to the correct Type        // 1705
        encoded = param.type.encode(normalized);                                                                      // 1706
        if (angular.isString(encoded) && !param.type.pattern.exec(encoded))                                           // 1707
          return false; // The value was of the correct type, but when encoded, did not match the Type's regexp       // 1708
      }                                                                                                               // 1709
      return true;                                                                                                    // 1710
    },                                                                                                                // 1711
    $$parent: undefined                                                                                               // 1712
  };                                                                                                                  // 1713
                                                                                                                      // 1714
  this.ParamSet = ParamSet;                                                                                           // 1715
}                                                                                                                     // 1716
                                                                                                                      // 1717
// Register as a provider so it's available to other providers                                                        // 1718
angular.module('ui.router.util').provider('$urlMatcherFactory', $UrlMatcherFactory);                                  // 1719
angular.module('ui.router.util').run(['$urlMatcherFactory', function($urlMatcherFactory) { }]);                       // 1720
                                                                                                                      // 1721
/**                                                                                                                   // 1722
 * @ngdoc object                                                                                                      // 1723
 * @name ui.router.router.$urlRouterProvider                                                                          // 1724
 *                                                                                                                    // 1725
 * @requires ui.router.util.$urlMatcherFactoryProvider                                                                // 1726
 * @requires $locationProvider                                                                                        // 1727
 *                                                                                                                    // 1728
 * @description                                                                                                       // 1729
 * `$urlRouterProvider` has the responsibility of watching `$location`.                                               // 1730
 * When `$location` changes it runs through a list of rules one by one until a                                        // 1731
 * match is found. `$urlRouterProvider` is used behind the scenes anytime you specify                                 // 1732
 * a url in a state configuration. All urls are compiled into a UrlMatcher object.                                    // 1733
 *                                                                                                                    // 1734
 * There are several methods on `$urlRouterProvider` that make it useful to use directly                              // 1735
 * in your module config.                                                                                             // 1736
 */                                                                                                                   // 1737
$UrlRouterProvider.$inject = ['$locationProvider', '$urlMatcherFactoryProvider'];                                     // 1738
function $UrlRouterProvider(   $locationProvider,   $urlMatcherFactory) {                                             // 1739
  var rules = [], otherwise = null, interceptDeferred = false, listener;                                              // 1740
                                                                                                                      // 1741
  // Returns a string that is a prefix of all strings matching the RegExp                                             // 1742
  function regExpPrefix(re) {                                                                                         // 1743
    var prefix = /^\^((?:\\[^a-zA-Z0-9]|[^\\\[\]\^$*+?.()|{}]+)*)/.exec(re.source);                                   // 1744
    return (prefix != null) ? prefix[1].replace(/\\(.)/g, "$1") : '';                                                 // 1745
  }                                                                                                                   // 1746
                                                                                                                      // 1747
  // Interpolates matched values into a String.replace()-style pattern                                                // 1748
  function interpolate(pattern, match) {                                                                              // 1749
    return pattern.replace(/\$(\$|\d{1,2})/, function (m, what) {                                                     // 1750
      return match[what === '$' ? 0 : Number(what)];                                                                  // 1751
    });                                                                                                               // 1752
  }                                                                                                                   // 1753
                                                                                                                      // 1754
  /**                                                                                                                 // 1755
   * @ngdoc function                                                                                                  // 1756
   * @name ui.router.router.$urlRouterProvider#rule                                                                   // 1757
   * @methodOf ui.router.router.$urlRouterProvider                                                                    // 1758
   *                                                                                                                  // 1759
   * @description                                                                                                     // 1760
   * Defines rules that are used by `$urlRouterProvider` to find matches for                                          // 1761
   * specific URLs.                                                                                                   // 1762
   *                                                                                                                  // 1763
   * @example                                                                                                         // 1764
   * <pre>                                                                                                            // 1765
   * var app = angular.module('app', ['ui.router.router']);                                                           // 1766
   *                                                                                                                  // 1767
   * app.config(function ($urlRouterProvider) {                                                                       // 1768
   *   // Here's an example of how you might allow case insensitive urls                                              // 1769
   *   $urlRouterProvider.rule(function ($injector, $location) {                                                      // 1770
   *     var path = $location.path(),                                                                                 // 1771
   *         normalized = path.toLowerCase();                                                                         // 1772
   *                                                                                                                  // 1773
   *     if (path !== normalized) {                                                                                   // 1774
   *       return normalized;                                                                                         // 1775
   *     }                                                                                                            // 1776
   *   });                                                                                                            // 1777
   * });                                                                                                              // 1778
   * </pre>                                                                                                           // 1779
   *                                                                                                                  // 1780
   * @param {object} rule Handler function that takes `$injector` and `$location`                                     // 1781
   * services as arguments. You can use them to return a valid path as a string.                                      // 1782
   *                                                                                                                  // 1783
   * @return {object} `$urlRouterProvider` - `$urlRouterProvider` instance                                            // 1784
   */                                                                                                                 // 1785
  this.rule = function (rule) {                                                                                       // 1786
    if (!isFunction(rule)) throw new Error("'rule' must be a function");                                              // 1787
    rules.push(rule);                                                                                                 // 1788
    return this;                                                                                                      // 1789
  };                                                                                                                  // 1790
                                                                                                                      // 1791
  /**                                                                                                                 // 1792
   * @ngdoc object                                                                                                    // 1793
   * @name ui.router.router.$urlRouterProvider#otherwise                                                              // 1794
   * @methodOf ui.router.router.$urlRouterProvider                                                                    // 1795
   *                                                                                                                  // 1796
   * @description                                                                                                     // 1797
   * Defines a path that is used when an invalid route is requested.                                                  // 1798
   *                                                                                                                  // 1799
   * @example                                                                                                         // 1800
   * <pre>                                                                                                            // 1801
   * var app = angular.module('app', ['ui.router.router']);                                                           // 1802
   *                                                                                                                  // 1803
   * app.config(function ($urlRouterProvider) {                                                                       // 1804
   *   // if the path doesn't match any of the urls you configured                                                    // 1805
   *   // otherwise will take care of routing the user to the                                                         // 1806
   *   // specified url                                                                                               // 1807
   *   $urlRouterProvider.otherwise('/index');                                                                        // 1808
   *                                                                                                                  // 1809
   *   // Example of using function rule as param                                                                     // 1810
   *   $urlRouterProvider.otherwise(function ($injector, $location) {                                                 // 1811
   *     return '/a/valid/url';                                                                                       // 1812
   *   });                                                                                                            // 1813
   * });                                                                                                              // 1814
   * </pre>                                                                                                           // 1815
   *                                                                                                                  // 1816
   * @param {string|object} rule The url path you want to redirect to or a function                                   // 1817
   * rule that returns the url path. The function version is passed two params:                                       // 1818
   * `$injector` and `$location` services, and must return a url string.                                              // 1819
   *                                                                                                                  // 1820
   * @return {object} `$urlRouterProvider` - `$urlRouterProvider` instance                                            // 1821
   */                                                                                                                 // 1822
  this.otherwise = function (rule) {                                                                                  // 1823
    if (isString(rule)) {                                                                                             // 1824
      var redirect = rule;                                                                                            // 1825
      rule = function () { return redirect; };                                                                        // 1826
    }                                                                                                                 // 1827
    else if (!isFunction(rule)) throw new Error("'rule' must be a function");                                         // 1828
    otherwise = rule;                                                                                                 // 1829
    return this;                                                                                                      // 1830
  };                                                                                                                  // 1831
                                                                                                                      // 1832
                                                                                                                      // 1833
  function handleIfMatch($injector, handler, match) {                                                                 // 1834
    if (!match) return false;                                                                                         // 1835
    var result = $injector.invoke(handler, handler, { $match: match });                                               // 1836
    return isDefined(result) ? result : true;                                                                         // 1837
  }                                                                                                                   // 1838
                                                                                                                      // 1839
  /**                                                                                                                 // 1840
   * @ngdoc function                                                                                                  // 1841
   * @name ui.router.router.$urlRouterProvider#when                                                                   // 1842
   * @methodOf ui.router.router.$urlRouterProvider                                                                    // 1843
   *                                                                                                                  // 1844
   * @description                                                                                                     // 1845
   * Registers a handler for a given url matching. if handle is a string, it is                                       // 1846
   * treated as a redirect, and is interpolated according to the syntax of match                                      // 1847
   * (i.e. like `String.replace()` for `RegExp`, or like a `UrlMatcher` pattern otherwise).                           // 1848
   *                                                                                                                  // 1849
   * If the handler is a function, it is injectable. It gets invoked if `$location`                                   // 1850
   * matches. You have the option of inject the match object as `$match`.                                             // 1851
   *                                                                                                                  // 1852
   * The handler can return                                                                                           // 1853
   *                                                                                                                  // 1854
   * - **falsy** to indicate that the rule didn't match after all, then `$urlRouter`                                  // 1855
   *   will continue trying to find another one that matches.                                                         // 1856
   * - **string** which is treated as a redirect and passed to `$location.url()`                                      // 1857
   * - **void** or any **truthy** value tells `$urlRouter` that the url was handled.                                  // 1858
   *                                                                                                                  // 1859
   * @example                                                                                                         // 1860
   * <pre>                                                                                                            // 1861
   * var app = angular.module('app', ['ui.router.router']);                                                           // 1862
   *                                                                                                                  // 1863
   * app.config(function ($urlRouterProvider) {                                                                       // 1864
   *   $urlRouterProvider.when($state.url, function ($match, $stateParams) {                                          // 1865
   *     if ($state.$current.navigable !== state ||                                                                   // 1866
   *         !equalForKeys($match, $stateParams) {                                                                    // 1867
   *      $state.transitionTo(state, $match, false);                                                                  // 1868
   *     }                                                                                                            // 1869
   *   });                                                                                                            // 1870
   * });                                                                                                              // 1871
   * </pre>                                                                                                           // 1872
   *                                                                                                                  // 1873
   * @param {string|object} what The incoming path that you want to redirect.                                         // 1874
   * @param {string|object} handler The path you want to redirect your user to.                                       // 1875
   */                                                                                                                 // 1876
  this.when = function (what, handler) {                                                                              // 1877
    var redirect, handlerIsString = isString(handler);                                                                // 1878
    if (isString(what)) what = $urlMatcherFactory.compile(what);                                                      // 1879
                                                                                                                      // 1880
    if (!handlerIsString && !isFunction(handler) && !isArray(handler))                                                // 1881
      throw new Error("invalid 'handler' in when()");                                                                 // 1882
                                                                                                                      // 1883
    var strategies = {                                                                                                // 1884
      matcher: function (what, handler) {                                                                             // 1885
        if (handlerIsString) {                                                                                        // 1886
          redirect = $urlMatcherFactory.compile(handler);                                                             // 1887
          handler = ['$match', function ($match) { return redirect.format($match); }];                                // 1888
        }                                                                                                             // 1889
        return extend(function ($injector, $location) {                                                               // 1890
          return handleIfMatch($injector, handler, what.exec($location.path(), $location.search()));                  // 1891
        }, {                                                                                                          // 1892
          prefix: isString(what.prefix) ? what.prefix : ''                                                            // 1893
        });                                                                                                           // 1894
      },                                                                                                              // 1895
      regex: function (what, handler) {                                                                               // 1896
        if (what.global || what.sticky) throw new Error("when() RegExp must not be global or sticky");                // 1897
                                                                                                                      // 1898
        if (handlerIsString) {                                                                                        // 1899
          redirect = handler;                                                                                         // 1900
          handler = ['$match', function ($match) { return interpolate(redirect, $match); }];                          // 1901
        }                                                                                                             // 1902
        return extend(function ($injector, $location) {                                                               // 1903
          return handleIfMatch($injector, handler, what.exec($location.path()));                                      // 1904
        }, {                                                                                                          // 1905
          prefix: regExpPrefix(what)                                                                                  // 1906
        });                                                                                                           // 1907
      }                                                                                                               // 1908
    };                                                                                                                // 1909
                                                                                                                      // 1910
    var check = { matcher: $urlMatcherFactory.isMatcher(what), regex: what instanceof RegExp };                       // 1911
                                                                                                                      // 1912
    for (var n in check) {                                                                                            // 1913
      if (check[n]) return this.rule(strategies[n](what, handler));                                                   // 1914
    }                                                                                                                 // 1915
                                                                                                                      // 1916
    throw new Error("invalid 'what' in when()");                                                                      // 1917
  };                                                                                                                  // 1918
                                                                                                                      // 1919
  /**                                                                                                                 // 1920
   * @ngdoc function                                                                                                  // 1921
   * @name ui.router.router.$urlRouterProvider#deferIntercept                                                         // 1922
   * @methodOf ui.router.router.$urlRouterProvider                                                                    // 1923
   *                                                                                                                  // 1924
   * @description                                                                                                     // 1925
   * Disables (or enables) deferring location change interception.                                                    // 1926
   *                                                                                                                  // 1927
   * If you wish to customize the behavior of syncing the URL (for example, if you wish to                            // 1928
   * defer a transition but maintain the current URL), call this method at configuration time.                        // 1929
   * Then, at run time, call `$urlRouter.listen()` after you have configured your own                                 // 1930
   * `$locationChangeSuccess` event handler.                                                                          // 1931
   *                                                                                                                  // 1932
   * @example                                                                                                         // 1933
   * <pre>                                                                                                            // 1934
   * var app = angular.module('app', ['ui.router.router']);                                                           // 1935
   *                                                                                                                  // 1936
   * app.config(function ($urlRouterProvider) {                                                                       // 1937
   *                                                                                                                  // 1938
   *   // Prevent $urlRouter from automatically intercepting URL changes;                                             // 1939
   *   // this allows you to configure custom behavior in between                                                     // 1940
   *   // location changes and route synchronization:                                                                 // 1941
   *   $urlRouterProvider.deferIntercept();                                                                           // 1942
   *                                                                                                                  // 1943
   * }).run(function ($rootScope, $urlRouter, UserService) {                                                          // 1944
   *                                                                                                                  // 1945
   *   $rootScope.$on('$locationChangeSuccess', function(e) {                                                         // 1946
   *     // UserService is an example service for managing user state                                                 // 1947
   *     if (UserService.isLoggedIn()) return;                                                                        // 1948
   *                                                                                                                  // 1949
   *     // Prevent $urlRouter's default handler from firing                                                          // 1950
   *     e.preventDefault();                                                                                          // 1951
   *                                                                                                                  // 1952
   *     UserService.handleLogin().then(function() {                                                                  // 1953
   *       // Once the user has logged in, sync the current URL                                                       // 1954
   *       // to the router:                                                                                          // 1955
   *       $urlRouter.sync();                                                                                         // 1956
   *     });                                                                                                          // 1957
   *   });                                                                                                            // 1958
   *                                                                                                                  // 1959
   *   // Configures $urlRouter's listener *after* your custom listener                                               // 1960
   *   $urlRouter.listen();                                                                                           // 1961
   * });                                                                                                              // 1962
   * </pre>                                                                                                           // 1963
   *                                                                                                                  // 1964
   * @param {boolean} defer Indicates whether to defer location change interception. Passing                          // 1965
            no parameter is equivalent to `true`.                                                                     // 1966
   */                                                                                                                 // 1967
  this.deferIntercept = function (defer) {                                                                            // 1968
    if (defer === undefined) defer = true;                                                                            // 1969
    interceptDeferred = defer;                                                                                        // 1970
  };                                                                                                                  // 1971
                                                                                                                      // 1972
  /**                                                                                                                 // 1973
   * @ngdoc object                                                                                                    // 1974
   * @name ui.router.router.$urlRouter                                                                                // 1975
   *                                                                                                                  // 1976
   * @requires $location                                                                                              // 1977
   * @requires $rootScope                                                                                             // 1978
   * @requires $injector                                                                                              // 1979
   * @requires $browser                                                                                               // 1980
   *                                                                                                                  // 1981
   * @description                                                                                                     // 1982
   *                                                                                                                  // 1983
   */                                                                                                                 // 1984
  this.$get = $get;                                                                                                   // 1985
  $get.$inject = ['$location', '$rootScope', '$injector', '$browser'];                                                // 1986
  function $get(   $location,   $rootScope,   $injector,   $browser) {                                                // 1987
                                                                                                                      // 1988
    var baseHref = $browser.baseHref(), location = $location.url(), lastPushedUrl;                                    // 1989
                                                                                                                      // 1990
    function appendBasePath(url, isHtml5, absolute) {                                                                 // 1991
      if (baseHref === '/') return url;                                                                               // 1992
      if (isHtml5) return baseHref.slice(0, -1) + url;                                                                // 1993
      if (absolute) return baseHref.slice(1) + url;                                                                   // 1994
      return url;                                                                                                     // 1995
    }                                                                                                                 // 1996
                                                                                                                      // 1997
    // TODO: Optimize groups of rules with non-empty prefix into some sort of decision tree                           // 1998
    function update(evt) {                                                                                            // 1999
      if (evt && evt.defaultPrevented) return;                                                                        // 2000
      var ignoreUpdate = lastPushedUrl && $location.url() === lastPushedUrl;                                          // 2001
      lastPushedUrl = undefined;                                                                                      // 2002
      // TODO: Re-implement this in 1.0 for https://github.com/angular-ui/ui-router/issues/1573                       // 2003
      //if (ignoreUpdate) return true;                                                                                // 2004
                                                                                                                      // 2005
      function check(rule) {                                                                                          // 2006
        var handled = rule($injector, $location);                                                                     // 2007
                                                                                                                      // 2008
        if (!handled) return false;                                                                                   // 2009
        if (isString(handled)) $location.replace().url(handled);                                                      // 2010
        return true;                                                                                                  // 2011
      }                                                                                                               // 2012
      var n = rules.length, i;                                                                                        // 2013
                                                                                                                      // 2014
      for (i = 0; i < n; i++) {                                                                                       // 2015
        if (check(rules[i])) return;                                                                                  // 2016
      }                                                                                                               // 2017
      // always check otherwise last to allow dynamic updates to the set of rules                                     // 2018
      if (otherwise) check(otherwise);                                                                                // 2019
    }                                                                                                                 // 2020
                                                                                                                      // 2021
    function listen() {                                                                                               // 2022
      listener = listener || $rootScope.$on('$locationChangeSuccess', update);                                        // 2023
      return listener;                                                                                                // 2024
    }                                                                                                                 // 2025
                                                                                                                      // 2026
    if (!interceptDeferred) listen();                                                                                 // 2027
                                                                                                                      // 2028
    return {                                                                                                          // 2029
      /**                                                                                                             // 2030
       * @ngdoc function                                                                                              // 2031
       * @name ui.router.router.$urlRouter#sync                                                                       // 2032
       * @methodOf ui.router.router.$urlRouter                                                                        // 2033
       *                                                                                                              // 2034
       * @description                                                                                                 // 2035
       * Triggers an update; the same update that happens when the address bar url changes, aka `$locationChangeSuccess`.
       * This method is useful when you need to use `preventDefault()` on the `$locationChangeSuccess` event,         // 2037
       * perform some custom logic (route protection, auth, config, redirection, etc) and then finally proceed        // 2038
       * with the transition by calling `$urlRouter.sync()`.                                                          // 2039
       *                                                                                                              // 2040
       * @example                                                                                                     // 2041
       * <pre>                                                                                                        // 2042
       * angular.module('app', ['ui.router'])                                                                         // 2043
       *   .run(function($rootScope, $urlRouter) {                                                                    // 2044
       *     $rootScope.$on('$locationChangeSuccess', function(evt) {                                                 // 2045
       *       // Halt state change from even starting                                                                // 2046
       *       evt.preventDefault();                                                                                  // 2047
       *       // Perform custom logic                                                                                // 2048
       *       var meetsRequirement = ...                                                                             // 2049
       *       // Continue with the update and state transition if logic allows                                       // 2050
       *       if (meetsRequirement) $urlRouter.sync();                                                               // 2051
       *     });                                                                                                      // 2052
       * });                                                                                                          // 2053
       * </pre>                                                                                                       // 2054
       */                                                                                                             // 2055
      sync: function() {                                                                                              // 2056
        update();                                                                                                     // 2057
      },                                                                                                              // 2058
                                                                                                                      // 2059
      listen: function() {                                                                                            // 2060
        return listen();                                                                                              // 2061
      },                                                                                                              // 2062
                                                                                                                      // 2063
      update: function(read) {                                                                                        // 2064
        if (read) {                                                                                                   // 2065
          location = $location.url();                                                                                 // 2066
          return;                                                                                                     // 2067
        }                                                                                                             // 2068
        if ($location.url() === location) return;                                                                     // 2069
                                                                                                                      // 2070
        $location.url(location);                                                                                      // 2071
        $location.replace();                                                                                          // 2072
      },                                                                                                              // 2073
                                                                                                                      // 2074
      push: function(urlMatcher, params, options) {                                                                   // 2075
         var url = urlMatcher.format(params || {});                                                                   // 2076
                                                                                                                      // 2077
        // Handle the special hash param, if needed                                                                   // 2078
        if (url !== null && params && params['#']) {                                                                  // 2079
            url += '#' + params['#'];                                                                                 // 2080
        }                                                                                                             // 2081
                                                                                                                      // 2082
        $location.url(url);                                                                                           // 2083
        lastPushedUrl = options && options.$$avoidResync ? $location.url() : undefined;                               // 2084
        if (options && options.replace) $location.replace();                                                          // 2085
      },                                                                                                              // 2086
                                                                                                                      // 2087
      /**                                                                                                             // 2088
       * @ngdoc function                                                                                              // 2089
       * @name ui.router.router.$urlRouter#href                                                                       // 2090
       * @methodOf ui.router.router.$urlRouter                                                                        // 2091
       *                                                                                                              // 2092
       * @description                                                                                                 // 2093
       * A URL generation method that returns the compiled URL for a given                                            // 2094
       * {@link ui.router.util.type:UrlMatcher `UrlMatcher`}, populated with the provided parameters.                 // 2095
       *                                                                                                              // 2096
       * @example                                                                                                     // 2097
       * <pre>                                                                                                        // 2098
       * $bob = $urlRouter.href(new UrlMatcher("/about/:person"), {                                                   // 2099
       *   person: "bob"                                                                                              // 2100
       * });                                                                                                          // 2101
       * // $bob == "/about/bob";                                                                                     // 2102
       * </pre>                                                                                                       // 2103
       *                                                                                                              // 2104
       * @param {UrlMatcher} urlMatcher The `UrlMatcher` object which is used as the template of the URL to generate. // 2105
       * @param {object=} params An object of parameter values to fill the matcher's required parameters.             // 2106
       * @param {object=} options Options object. The options are:                                                    // 2107
       *                                                                                                              // 2108
       * - **`absolute`** - {boolean=false},  If true will generate an absolute url, e.g. "http://www.example.com/fullurl".
       *                                                                                                              // 2110
       * @returns {string} Returns the fully compiled URL, or `null` if `params` fail validation against `urlMatcher` // 2111
       */                                                                                                             // 2112
      href: function(urlMatcher, params, options) {                                                                   // 2113
        if (!urlMatcher.validates(params)) return null;                                                               // 2114
                                                                                                                      // 2115
        var isHtml5 = $locationProvider.html5Mode();                                                                  // 2116
        if (angular.isObject(isHtml5)) {                                                                              // 2117
          isHtml5 = isHtml5.enabled;                                                                                  // 2118
        }                                                                                                             // 2119
                                                                                                                      // 2120
        var url = urlMatcher.format(params);                                                                          // 2121
        options = options || {};                                                                                      // 2122
                                                                                                                      // 2123
        if (!isHtml5 && url !== null) {                                                                               // 2124
          url = "#" + $locationProvider.hashPrefix() + url;                                                           // 2125
        }                                                                                                             // 2126
                                                                                                                      // 2127
        // Handle special hash param, if needed                                                                       // 2128
        if (url !== null && params && params['#']) {                                                                  // 2129
          url += '#' + params['#'];                                                                                   // 2130
        }                                                                                                             // 2131
                                                                                                                      // 2132
        url = appendBasePath(url, isHtml5, options.absolute);                                                         // 2133
                                                                                                                      // 2134
        if (!options.absolute || !url) {                                                                              // 2135
          return url;                                                                                                 // 2136
        }                                                                                                             // 2137
                                                                                                                      // 2138
        var slash = (!isHtml5 && url ? '/' : ''), port = $location.port();                                            // 2139
        port = (port === 80 || port === 443 ? '' : ':' + port);                                                       // 2140
                                                                                                                      // 2141
        return [$location.protocol(), '://', $location.host(), port, slash, url].join('');                            // 2142
      }                                                                                                               // 2143
    };                                                                                                                // 2144
  }                                                                                                                   // 2145
}                                                                                                                     // 2146
                                                                                                                      // 2147
angular.module('ui.router.router').provider('$urlRouter', $UrlRouterProvider);                                        // 2148
                                                                                                                      // 2149
/**                                                                                                                   // 2150
 * @ngdoc object                                                                                                      // 2151
 * @name ui.router.state.$stateProvider                                                                               // 2152
 *                                                                                                                    // 2153
 * @requires ui.router.router.$urlRouterProvider                                                                      // 2154
 * @requires ui.router.util.$urlMatcherFactoryProvider                                                                // 2155
 *                                                                                                                    // 2156
 * @description                                                                                                       // 2157
 * The new `$stateProvider` works similar to Angular's v1 router, but it focuses purely                               // 2158
 * on state.                                                                                                          // 2159
 *                                                                                                                    // 2160
 * A state corresponds to a "place" in the application in terms of the overall UI and                                 // 2161
 * navigation. A state describes (via the controller / template / view properties) what                               // 2162
 * the UI looks like and does at that place.                                                                          // 2163
 *                                                                                                                    // 2164
 * States often have things in common, and the primary way of factoring out these                                     // 2165
 * commonalities in this model is via the state hierarchy, i.e. parent/child states aka                               // 2166
 * nested states.                                                                                                     // 2167
 *                                                                                                                    // 2168
 * The `$stateProvider` provides interfaces to declare these states for your app.                                     // 2169
 */                                                                                                                   // 2170
$StateProvider.$inject = ['$urlRouterProvider', '$urlMatcherFactoryProvider'];                                        // 2171
function $StateProvider(   $urlRouterProvider,   $urlMatcherFactory) {                                                // 2172
                                                                                                                      // 2173
  var root, states = {}, $state, queue = {}, abstractKey = 'abstract';                                                // 2174
                                                                                                                      // 2175
  // Builds state properties from definition passed to registerState()                                                // 2176
  var stateBuilder = {                                                                                                // 2177
                                                                                                                      // 2178
    // Derive parent state from a hierarchical name only if 'parent' is not explicitly defined.                       // 2179
    // state.children = [];                                                                                           // 2180
    // if (parent) parent.children.push(state);                                                                       // 2181
    parent: function(state) {                                                                                         // 2182
      if (isDefined(state.parent) && state.parent) return findState(state.parent);                                    // 2183
      // regex matches any valid composite state name                                                                 // 2184
      // would match "contact.list" but not "contacts"                                                                // 2185
      var compositeName = /^(.+)\.[^.]+$/.exec(state.name);                                                           // 2186
      return compositeName ? findState(compositeName[1]) : root;                                                      // 2187
    },                                                                                                                // 2188
                                                                                                                      // 2189
    // inherit 'data' from parent and override by own values (if any)                                                 // 2190
    data: function(state) {                                                                                           // 2191
      if (state.parent && state.parent.data) {                                                                        // 2192
        state.data = state.self.data = extend({}, state.parent.data, state.data);                                     // 2193
      }                                                                                                               // 2194
      return state.data;                                                                                              // 2195
    },                                                                                                                // 2196
                                                                                                                      // 2197
    // Build a URLMatcher if necessary, either via a relative or absolute URL                                         // 2198
    url: function(state) {                                                                                            // 2199
      var url = state.url, config = { params: state.params || {} };                                                   // 2200
                                                                                                                      // 2201
      if (isString(url)) {                                                                                            // 2202
        if (url.charAt(0) == '^') return $urlMatcherFactory.compile(url.substring(1), config);                        // 2203
        return (state.parent.navigable || root).url.concat(url, config);                                              // 2204
      }                                                                                                               // 2205
                                                                                                                      // 2206
      if (!url || $urlMatcherFactory.isMatcher(url)) return url;                                                      // 2207
      throw new Error("Invalid url '" + url + "' in state '" + state + "'");                                          // 2208
    },                                                                                                                // 2209
                                                                                                                      // 2210
    // Keep track of the closest ancestor state that has a URL (i.e. is navigable)                                    // 2211
    navigable: function(state) {                                                                                      // 2212
      return state.url ? state : (state.parent ? state.parent.navigable : null);                                      // 2213
    },                                                                                                                // 2214
                                                                                                                      // 2215
    // Own parameters for this state. state.url.params is already built at this point. Create and add non-url params  // 2216
    ownParams: function(state) {                                                                                      // 2217
      var params = state.url && state.url.params || new $$UMFP.ParamSet();                                            // 2218
      forEach(state.params || {}, function(config, id) {                                                              // 2219
        if (!params[id]) params[id] = new $$UMFP.Param(id, null, config, "config");                                   // 2220
      });                                                                                                             // 2221
      return params;                                                                                                  // 2222
    },                                                                                                                // 2223
                                                                                                                      // 2224
    // Derive parameters for this state and ensure they're a super-set of parent's parameters                         // 2225
    params: function(state) {                                                                                         // 2226
      return state.parent && state.parent.params ? extend(state.parent.params.$$new(), state.ownParams) : new $$UMFP.ParamSet();
    },                                                                                                                // 2228
                                                                                                                      // 2229
    // If there is no explicit multi-view configuration, make one up so we don't have                                 // 2230
    // to handle both cases in the view directive later. Note that having an explicit                                 // 2231
    // 'views' property will mean the default unnamed view properties are ignored. This                               // 2232
    // is also a good time to resolve view names to absolute names, so everything is a                                // 2233
    // straight lookup at link time.                                                                                  // 2234
    views: function(state) {                                                                                          // 2235
      var views = {};                                                                                                 // 2236
                                                                                                                      // 2237
      forEach(isDefined(state.views) ? state.views : { '': state }, function (view, name) {                           // 2238
        if (name.indexOf('@') < 0) name += '@' + state.parent.name;                                                   // 2239
        views[name] = view;                                                                                           // 2240
      });                                                                                                             // 2241
      return views;                                                                                                   // 2242
    },                                                                                                                // 2243
                                                                                                                      // 2244
    // Keep a full path from the root down to this state as this is needed for state activation.                      // 2245
    path: function(state) {                                                                                           // 2246
      return state.parent ? state.parent.path.concat(state) : []; // exclude root from path                           // 2247
    },                                                                                                                // 2248
                                                                                                                      // 2249
    // Speed up $state.contains() as it's used a lot                                                                  // 2250
    includes: function(state) {                                                                                       // 2251
      var includes = state.parent ? extend({}, state.parent.includes) : {};                                           // 2252
      includes[state.name] = true;                                                                                    // 2253
      return includes;                                                                                                // 2254
    },                                                                                                                // 2255
                                                                                                                      // 2256
    $delegates: {}                                                                                                    // 2257
  };                                                                                                                  // 2258
                                                                                                                      // 2259
  function isRelative(stateName) {                                                                                    // 2260
    return stateName.indexOf(".") === 0 || stateName.indexOf("^") === 0;                                              // 2261
  }                                                                                                                   // 2262
                                                                                                                      // 2263
  function findState(stateOrName, base) {                                                                             // 2264
    if (!stateOrName) return undefined;                                                                               // 2265
                                                                                                                      // 2266
    var isStr = isString(stateOrName),                                                                                // 2267
        name  = isStr ? stateOrName : stateOrName.name,                                                               // 2268
        path  = isRelative(name);                                                                                     // 2269
                                                                                                                      // 2270
    if (path) {                                                                                                       // 2271
      if (!base) throw new Error("No reference point given for path '"  + name + "'");                                // 2272
      base = findState(base);                                                                                         // 2273
                                                                                                                      // 2274
      var rel = name.split("."), i = 0, pathLength = rel.length, current = base;                                      // 2275
                                                                                                                      // 2276
      for (; i < pathLength; i++) {                                                                                   // 2277
        if (rel[i] === "" && i === 0) {                                                                               // 2278
          current = base;                                                                                             // 2279
          continue;                                                                                                   // 2280
        }                                                                                                             // 2281
        if (rel[i] === "^") {                                                                                         // 2282
          if (!current.parent) throw new Error("Path '" + name + "' not valid for state '" + base.name + "'");        // 2283
          current = current.parent;                                                                                   // 2284
          continue;                                                                                                   // 2285
        }                                                                                                             // 2286
        break;                                                                                                        // 2287
      }                                                                                                               // 2288
      rel = rel.slice(i).join(".");                                                                                   // 2289
      name = current.name + (current.name && rel ? "." : "") + rel;                                                   // 2290
    }                                                                                                                 // 2291
    var state = states[name];                                                                                         // 2292
                                                                                                                      // 2293
    if (state && (isStr || (!isStr && (state === stateOrName || state.self === stateOrName)))) {                      // 2294
      return state;                                                                                                   // 2295
    }                                                                                                                 // 2296
    return undefined;                                                                                                 // 2297
  }                                                                                                                   // 2298
                                                                                                                      // 2299
  function queueState(parentName, state) {                                                                            // 2300
    if (!queue[parentName]) {                                                                                         // 2301
      queue[parentName] = [];                                                                                         // 2302
    }                                                                                                                 // 2303
    queue[parentName].push(state);                                                                                    // 2304
  }                                                                                                                   // 2305
                                                                                                                      // 2306
  function flushQueuedChildren(parentName) {                                                                          // 2307
    var queued = queue[parentName] || [];                                                                             // 2308
    while(queued.length) {                                                                                            // 2309
      registerState(queued.shift());                                                                                  // 2310
    }                                                                                                                 // 2311
  }                                                                                                                   // 2312
                                                                                                                      // 2313
  function registerState(state) {                                                                                     // 2314
    // Wrap a new object around the state so we can store our private details easily.                                 // 2315
    state = inherit(state, {                                                                                          // 2316
      self: state,                                                                                                    // 2317
      resolve: state.resolve || {},                                                                                   // 2318
      toString: function() { return this.name; }                                                                      // 2319
    });                                                                                                               // 2320
                                                                                                                      // 2321
    var name = state.name;                                                                                            // 2322
    if (!isString(name) || name.indexOf('@') >= 0) throw new Error("State must have a valid name");                   // 2323
    if (states.hasOwnProperty(name)) throw new Error("State '" + name + "'' is already defined");                     // 2324
                                                                                                                      // 2325
    // Get parent name                                                                                                // 2326
    var parentName = (name.indexOf('.') !== -1) ? name.substring(0, name.lastIndexOf('.'))                            // 2327
        : (isString(state.parent)) ? state.parent                                                                     // 2328
        : (isObject(state.parent) && isString(state.parent.name)) ? state.parent.name                                 // 2329
        : '';                                                                                                         // 2330
                                                                                                                      // 2331
    // If parent is not registered yet, add state to queue and register later                                         // 2332
    if (parentName && !states[parentName]) {                                                                          // 2333
      return queueState(parentName, state.self);                                                                      // 2334
    }                                                                                                                 // 2335
                                                                                                                      // 2336
    for (var key in stateBuilder) {                                                                                   // 2337
      if (isFunction(stateBuilder[key])) state[key] = stateBuilder[key](state, stateBuilder.$delegates[key]);         // 2338
    }                                                                                                                 // 2339
    states[name] = state;                                                                                             // 2340
                                                                                                                      // 2341
    // Register the state in the global state list and with $urlRouter if necessary.                                  // 2342
    if (!state[abstractKey] && state.url) {                                                                           // 2343
      $urlRouterProvider.when(state.url, ['$match', '$stateParams', function ($match, $stateParams) {                 // 2344
        if ($state.$current.navigable != state || !equalForKeys($match, $stateParams)) {                              // 2345
          $state.transitionTo(state, $match, { inherit: true, location: false });                                     // 2346
        }                                                                                                             // 2347
      }]);                                                                                                            // 2348
    }                                                                                                                 // 2349
                                                                                                                      // 2350
    // Register any queued children                                                                                   // 2351
    flushQueuedChildren(name);                                                                                        // 2352
                                                                                                                      // 2353
    return state;                                                                                                     // 2354
  }                                                                                                                   // 2355
                                                                                                                      // 2356
  // Checks text to see if it looks like a glob.                                                                      // 2357
  function isGlob (text) {                                                                                            // 2358
    return text.indexOf('*') > -1;                                                                                    // 2359
  }                                                                                                                   // 2360
                                                                                                                      // 2361
  // Returns true if glob matches current $state name.                                                                // 2362
  function doesStateMatchGlob (glob) {                                                                                // 2363
    var globSegments = glob.split('.'),                                                                               // 2364
        segments = $state.$current.name.split('.');                                                                   // 2365
                                                                                                                      // 2366
    //match single stars                                                                                              // 2367
    for (var i = 0, l = globSegments.length; i < l; i++) {                                                            // 2368
      if (globSegments[i] === '*') {                                                                                  // 2369
        segments[i] = '*';                                                                                            // 2370
      }                                                                                                               // 2371
    }                                                                                                                 // 2372
                                                                                                                      // 2373
    //match greedy starts                                                                                             // 2374
    if (globSegments[0] === '**') {                                                                                   // 2375
       segments = segments.slice(indexOf(segments, globSegments[1]));                                                 // 2376
       segments.unshift('**');                                                                                        // 2377
    }                                                                                                                 // 2378
    //match greedy ends                                                                                               // 2379
    if (globSegments[globSegments.length - 1] === '**') {                                                             // 2380
       segments.splice(indexOf(segments, globSegments[globSegments.length - 2]) + 1, Number.MAX_VALUE);               // 2381
       segments.push('**');                                                                                           // 2382
    }                                                                                                                 // 2383
                                                                                                                      // 2384
    if (globSegments.length != segments.length) {                                                                     // 2385
      return false;                                                                                                   // 2386
    }                                                                                                                 // 2387
                                                                                                                      // 2388
    return segments.join('') === globSegments.join('');                                                               // 2389
  }                                                                                                                   // 2390
                                                                                                                      // 2391
                                                                                                                      // 2392
  // Implicit root state that is always active                                                                        // 2393
  root = registerState({                                                                                              // 2394
    name: '',                                                                                                         // 2395
    url: '^',                                                                                                         // 2396
    views: null,                                                                                                      // 2397
    'abstract': true                                                                                                  // 2398
  });                                                                                                                 // 2399
  root.navigable = null;                                                                                              // 2400
                                                                                                                      // 2401
                                                                                                                      // 2402
  /**                                                                                                                 // 2403
   * @ngdoc function                                                                                                  // 2404
   * @name ui.router.state.$stateProvider#decorator                                                                   // 2405
   * @methodOf ui.router.state.$stateProvider                                                                         // 2406
   *                                                                                                                  // 2407
   * @description                                                                                                     // 2408
   * Allows you to extend (carefully) or override (at your own peril) the                                             // 2409
   * `stateBuilder` object used internally by `$stateProvider`. This can be used                                      // 2410
   * to add custom functionality to ui-router, for example inferring templateUrl                                      // 2411
   * based on the state name.                                                                                         // 2412
   *                                                                                                                  // 2413
   * When passing only a name, it returns the current (original or decorated) builder                                 // 2414
   * function that matches `name`.                                                                                    // 2415
   *                                                                                                                  // 2416
   * The builder functions that can be decorated are listed below. Though not all                                     // 2417
   * necessarily have a good use case for decoration, that is up to you to decide.                                    // 2418
   *                                                                                                                  // 2419
   * In addition, users can attach custom decorators, which will generate new                                         // 2420
   * properties within the state's internal definition. There is currently no clear                                   // 2421
   * use-case for this beyond accessing internal states (i.e. $state.$current),                                       // 2422
   * however, expect this to become increasingly relevant as we introduce additional                                  // 2423
   * meta-programming features.                                                                                       // 2424
   *                                                                                                                  // 2425
   * **Warning**: Decorators should not be interdependent because the order of                                        // 2426
   * execution of the builder functions in non-deterministic. Builder functions                                       // 2427
   * should only be dependent on the state definition object and super function.                                      // 2428
   *                                                                                                                  // 2429
   *                                                                                                                  // 2430
   * Existing builder functions and current return values:                                                            // 2431
   *                                                                                                                  // 2432
   * - **parent** `{object}` - returns the parent state object.                                                       // 2433
   * - **data** `{object}` - returns state data, including any inherited data that is not                             // 2434
   *   overridden by own values (if any).                                                                             // 2435
   * - **url** `{object}` - returns a {@link ui.router.util.type:UrlMatcher UrlMatcher}                               // 2436
   *   or `null`.                                                                                                     // 2437
   * - **navigable** `{object}` - returns closest ancestor state that has a URL (aka is                               // 2438
   *   navigable).                                                                                                    // 2439
   * - **params** `{object}` - returns an array of state params that are ensured to                                   // 2440
   *   be a super-set of parent's params.                                                                             // 2441
   * - **views** `{object}` - returns a views object where each key is an absolute view                               // 2442
   *   name (i.e. "viewName@stateName") and each value is the config object                                           // 2443
   *   (template, controller) for the view. Even when you don't use the views object                                  // 2444
   *   explicitly on a state config, one is still created for you internally.                                         // 2445
   *   So by decorating this builder function you have access to decorating template                                  // 2446
   *   and controller properties.                                                                                     // 2447
   * - **ownParams** `{object}` - returns an array of params that belong to the state,                                // 2448
   *   not including any params defined by ancestor states.                                                           // 2449
   * - **path** `{string}` - returns the full path from the root down to this state.                                  // 2450
   *   Needed for state activation.                                                                                   // 2451
   * - **includes** `{object}` - returns an object that includes every state that                                     // 2452
   *   would pass a `$state.includes()` test.                                                                         // 2453
   *                                                                                                                  // 2454
   * @example                                                                                                         // 2455
   * <pre>                                                                                                            // 2456
   * // Override the internal 'views' builder with a function that takes the state                                    // 2457
   * // definition, and a reference to the internal function being overridden:                                        // 2458
   * $stateProvider.decorator('views', function (state, parent) {                                                     // 2459
   *   var result = {},                                                                                               // 2460
   *       views = parent(state);                                                                                     // 2461
   *                                                                                                                  // 2462
   *   angular.forEach(views, function (config, name) {                                                               // 2463
   *     var autoName = (state.name + '.' + name).replace('.', '/');                                                  // 2464
   *     config.templateUrl = config.templateUrl || '/partials/' + autoName + '.html';                                // 2465
   *     result[name] = config;                                                                                       // 2466
   *   });                                                                                                            // 2467
   *   return result;                                                                                                 // 2468
   * });                                                                                                              // 2469
   *                                                                                                                  // 2470
   * $stateProvider.state('home', {                                                                                   // 2471
   *   views: {                                                                                                       // 2472
   *     'contact.list': { controller: 'ListController' },                                                            // 2473
   *     'contact.item': { controller: 'ItemController' }                                                             // 2474
   *   }                                                                                                              // 2475
   * });                                                                                                              // 2476
   *                                                                                                                  // 2477
   * // ...                                                                                                           // 2478
   *                                                                                                                  // 2479
   * $state.go('home');                                                                                               // 2480
   * // Auto-populates list and item views with /partials/home/contact/list.html,                                     // 2481
   * // and /partials/home/contact/item.html, respectively.                                                           // 2482
   * </pre>                                                                                                           // 2483
   *                                                                                                                  // 2484
   * @param {string} name The name of the builder function to decorate.                                               // 2485
   * @param {object} func A function that is responsible for decorating the original                                  // 2486
   * builder function. The function receives two parameters:                                                          // 2487
   *                                                                                                                  // 2488
   *   - `{object}` - state - The state config object.                                                                // 2489
   *   - `{object}` - super - The original builder function.                                                          // 2490
   *                                                                                                                  // 2491
   * @return {object} $stateProvider - $stateProvider instance                                                        // 2492
   */                                                                                                                 // 2493
  this.decorator = decorator;                                                                                         // 2494
  function decorator(name, func) {                                                                                    // 2495
    /*jshint validthis: true */                                                                                       // 2496
    if (isString(name) && !isDefined(func)) {                                                                         // 2497
      return stateBuilder[name];                                                                                      // 2498
    }                                                                                                                 // 2499
    if (!isFunction(func) || !isString(name)) {                                                                       // 2500
      return this;                                                                                                    // 2501
    }                                                                                                                 // 2502
    if (stateBuilder[name] && !stateBuilder.$delegates[name]) {                                                       // 2503
      stateBuilder.$delegates[name] = stateBuilder[name];                                                             // 2504
    }                                                                                                                 // 2505
    stateBuilder[name] = func;                                                                                        // 2506
    return this;                                                                                                      // 2507
  }                                                                                                                   // 2508
                                                                                                                      // 2509
  /**                                                                                                                 // 2510
   * @ngdoc function                                                                                                  // 2511
   * @name ui.router.state.$stateProvider#state                                                                       // 2512
   * @methodOf ui.router.state.$stateProvider                                                                         // 2513
   *                                                                                                                  // 2514
   * @description                                                                                                     // 2515
   * Registers a state configuration under a given state name. The stateConfig object                                 // 2516
   * has the following acceptable properties.                                                                         // 2517
   *                                                                                                                  // 2518
   * @param {string} name A unique state name, e.g. "home", "about", "contacts".                                      // 2519
   * To create a parent/child state use a dot, e.g. "about.sales", "home.newest".                                     // 2520
   * @param {object} stateConfig State configuration object.                                                          // 2521
   * @param {string|function=} stateConfig.template                                                                   // 2522
   * <a id='template'></a>                                                                                            // 2523
   *   html template as a string or a function that returns                                                           // 2524
   *   an html template as a string which should be used by the uiView directives. This property                      // 2525
   *   takes precedence over templateUrl.                                                                             // 2526
   *                                                                                                                  // 2527
   *   If `template` is a function, it will be called with the following parameters:                                  // 2528
   *                                                                                                                  // 2529
   *   - {array.&lt;object&gt;} - state parameters extracted from the current $location.path() by                     // 2530
   *     applying the current state                                                                                   // 2531
   *                                                                                                                  // 2532
   * <pre>template:                                                                                                   // 2533
   *   "<h1>inline template definition</h1>" +                                                                        // 2534
   *   "<div ui-view></div>"</pre>                                                                                    // 2535
   * <pre>template: function(params) {                                                                                // 2536
   *       return "<h1>generated template</h1>"; }</pre>                                                              // 2537
   * </div>                                                                                                           // 2538
   *                                                                                                                  // 2539
   * @param {string|function=} stateConfig.templateUrl                                                                // 2540
   * <a id='templateUrl'></a>                                                                                         // 2541
   *                                                                                                                  // 2542
   *   path or function that returns a path to an html                                                                // 2543
   *   template that should be used by uiView.                                                                        // 2544
   *                                                                                                                  // 2545
   *   If `templateUrl` is a function, it will be called with the following parameters:                               // 2546
   *                                                                                                                  // 2547
   *   - {array.&lt;object&gt;} - state parameters extracted from the current $location.path() by                     // 2548
   *     applying the current state                                                                                   // 2549
   *                                                                                                                  // 2550
   * <pre>templateUrl: "home.html"</pre>                                                                              // 2551
   * <pre>templateUrl: function(params) {                                                                             // 2552
   *     return myTemplates[params.pageId]; }</pre>                                                                   // 2553
   *                                                                                                                  // 2554
   * @param {function=} stateConfig.templateProvider                                                                  // 2555
   * <a id='templateProvider'></a>                                                                                    // 2556
   *    Provider function that returns HTML content string.                                                           // 2557
   * <pre> templateProvider:                                                                                          // 2558
   *       function(MyTemplateService, params) {                                                                      // 2559
   *         return MyTemplateService.getTemplate(params.pageId);                                                     // 2560
   *       }</pre>                                                                                                    // 2561
   *                                                                                                                  // 2562
   * @param {string|function=} stateConfig.controller                                                                 // 2563
   * <a id='controller'></a>                                                                                          // 2564
   *                                                                                                                  // 2565
   *  Controller fn that should be associated with newly                                                              // 2566
   *   related scope or the name of a registered controller if passed as a string.                                    // 2567
   *   Optionally, the ControllerAs may be declared here.                                                             // 2568
   * <pre>controller: "MyRegisteredController"</pre>                                                                  // 2569
   * <pre>controller:                                                                                                 // 2570
   *     "MyRegisteredController as fooCtrl"}</pre>                                                                   // 2571
   * <pre>controller: function($scope, MyService) {                                                                   // 2572
   *     $scope.data = MyService.getData(); }</pre>                                                                   // 2573
   *                                                                                                                  // 2574
   * @param {function=} stateConfig.controllerProvider                                                                // 2575
   * <a id='controllerProvider'></a>                                                                                  // 2576
   *                                                                                                                  // 2577
   * Injectable provider function that returns the actual controller or string.                                       // 2578
   * <pre>controllerProvider:                                                                                         // 2579
   *   function(MyResolveData) {                                                                                      // 2580
   *     if (MyResolveData.foo)                                                                                       // 2581
   *       return "FooCtrl"                                                                                           // 2582
   *     else if (MyResolveData.bar)                                                                                  // 2583
   *       return "BarCtrl";                                                                                          // 2584
   *     else return function($scope) {                                                                               // 2585
   *       $scope.baz = "Qux";                                                                                        // 2586
   *     }                                                                                                            // 2587
   *   }</pre>                                                                                                        // 2588
   *                                                                                                                  // 2589
   * @param {string=} stateConfig.controllerAs                                                                        // 2590
   * <a id='controllerAs'></a>                                                                                        // 2591
   *                                                                                                                  // 2592
   * A controller alias name. If present the controller will be                                                       // 2593
   *   published to scope under the controllerAs name.                                                                // 2594
   * <pre>controllerAs: "myCtrl"</pre>                                                                                // 2595
   *                                                                                                                  // 2596
   * @param {string|object=} stateConfig.parent                                                                       // 2597
   * <a id='parent'></a>                                                                                              // 2598
   * Optionally specifies the parent state of this state.                                                             // 2599
   *                                                                                                                  // 2600
   * <pre>parent: 'parentState'</pre>                                                                                 // 2601
   * <pre>parent: parentState // JS variable</pre>                                                                    // 2602
   *                                                                                                                  // 2603
   * @param {object=} stateConfig.resolve                                                                             // 2604
   * <a id='resolve'></a>                                                                                             // 2605
   *                                                                                                                  // 2606
   * An optional map&lt;string, function&gt; of dependencies which                                                    // 2607
   *   should be injected into the controller. If any of these dependencies are promises,                             // 2608
   *   the router will wait for them all to be resolved before the controller is instantiated.                        // 2609
   *   If all the promises are resolved successfully, the $stateChangeSuccess event is fired                          // 2610
   *   and the values of the resolved promises are injected into any controllers that reference them.                 // 2611
   *   If any  of the promises are rejected the $stateChangeError event is fired.                                     // 2612
   *                                                                                                                  // 2613
   *   The map object is:                                                                                             // 2614
   *                                                                                                                  // 2615
   *   - key - {string}: name of dependency to be injected into controller                                            // 2616
   *   - factory - {string|function}: If string then it is alias for service. Otherwise if function,                  // 2617
   *     it is injected and return value it treated as dependency. If result is a promise, it is                      // 2618
   *     resolved before its value is injected into controller.                                                       // 2619
   *                                                                                                                  // 2620
   * <pre>resolve: {                                                                                                  // 2621
   *     myResolve1:                                                                                                  // 2622
   *       function($http, $stateParams) {                                                                            // 2623
   *         return $http.get("/api/foos/"+stateParams.fooID);                                                        // 2624
   *       }                                                                                                          // 2625
   *     }</pre>                                                                                                      // 2626
   *                                                                                                                  // 2627
   * @param {string=} stateConfig.url                                                                                 // 2628
   * <a id='url'></a>                                                                                                 // 2629
   *                                                                                                                  // 2630
   *   A url fragment with optional parameters. When a state is navigated or                                          // 2631
   *   transitioned to, the `$stateParams` service will be populated with any                                         // 2632
   *   parameters that were passed.                                                                                   // 2633
   *                                                                                                                  // 2634
   *   (See {@link ui.router.util.type:UrlMatcher UrlMatcher} `UrlMatcher`} for                                       // 2635
   *   more details on acceptable patterns )                                                                          // 2636
   *                                                                                                                  // 2637
   * examples:                                                                                                        // 2638
   * <pre>url: "/home"                                                                                                // 2639
   * url: "/users/:userid"                                                                                            // 2640
   * url: "/books/{bookid:[a-zA-Z_-]}"                                                                                // 2641
   * url: "/books/{categoryid:int}"                                                                                   // 2642
   * url: "/books/{publishername:string}/{categoryid:int}"                                                            // 2643
   * url: "/messages?before&after"                                                                                    // 2644
   * url: "/messages?{before:date}&{after:date}"                                                                      // 2645
   * url: "/messages/:mailboxid?{before:date}&{after:date}"                                                           // 2646
   * </pre>                                                                                                           // 2647
   *                                                                                                                  // 2648
   * @param {object=} stateConfig.views                                                                               // 2649
   * <a id='views'></a>                                                                                               // 2650
   * an optional map&lt;string, object&gt; which defined multiple views, or targets views                             // 2651
   * manually/explicitly.                                                                                             // 2652
   *                                                                                                                  // 2653
   * Examples:                                                                                                        // 2654
   *                                                                                                                  // 2655
   * Targets three named `ui-view`s in the parent state's template                                                    // 2656
   * <pre>views: {                                                                                                    // 2657
   *     header: {                                                                                                    // 2658
   *       controller: "headerCtrl",                                                                                  // 2659
   *       templateUrl: "header.html"                                                                                 // 2660
   *     }, body: {                                                                                                   // 2661
   *       controller: "bodyCtrl",                                                                                    // 2662
   *       templateUrl: "body.html"                                                                                   // 2663
   *     }, footer: {                                                                                                 // 2664
   *       controller: "footCtrl",                                                                                    // 2665
   *       templateUrl: "footer.html"                                                                                 // 2666
   *     }                                                                                                            // 2667
   *   }</pre>                                                                                                        // 2668
   *                                                                                                                  // 2669
   * Targets named `ui-view="header"` from grandparent state 'top''s template, and named `ui-view="body" from parent state's template.
   * <pre>views: {                                                                                                    // 2671
   *     'header@top': {                                                                                              // 2672
   *       controller: "msgHeaderCtrl",                                                                               // 2673
   *       templateUrl: "msgHeader.html"                                                                              // 2674
   *     }, 'body': {                                                                                                 // 2675
   *       controller: "messagesCtrl",                                                                                // 2676
   *       templateUrl: "messages.html"                                                                               // 2677
   *     }                                                                                                            // 2678
   *   }</pre>                                                                                                        // 2679
   *                                                                                                                  // 2680
   * @param {boolean=} [stateConfig.abstract=false]                                                                   // 2681
   * <a id='abstract'></a>                                                                                            // 2682
   * An abstract state will never be directly activated,                                                              // 2683
   *   but can provide inherited properties to its common children states.                                            // 2684
   * <pre>abstract: true</pre>                                                                                        // 2685
   *                                                                                                                  // 2686
   * @param {function=} stateConfig.onEnter                                                                           // 2687
   * <a id='onEnter'></a>                                                                                             // 2688
   *                                                                                                                  // 2689
   * Callback function for when a state is entered. Good way                                                          // 2690
   *   to trigger an action or dispatch an event, such as opening a dialog.                                           // 2691
   * If minifying your scripts, make sure to explictly annotate this function,                                        // 2692
   * because it won't be automatically annotated by your build tools.                                                 // 2693
   *                                                                                                                  // 2694
   * <pre>onEnter: function(MyService, $stateParams) {                                                                // 2695
   *     MyService.foo($stateParams.myParam);                                                                         // 2696
   * }</pre>                                                                                                          // 2697
   *                                                                                                                  // 2698
   * @param {function=} stateConfig.onExit                                                                            // 2699
   * <a id='onExit'></a>                                                                                              // 2700
   *                                                                                                                  // 2701
   * Callback function for when a state is exited. Good way to                                                        // 2702
   *   trigger an action or dispatch an event, such as opening a dialog.                                              // 2703
   * If minifying your scripts, make sure to explictly annotate this function,                                        // 2704
   * because it won't be automatically annotated by your build tools.                                                 // 2705
   *                                                                                                                  // 2706
   * <pre>onExit: function(MyService, $stateParams) {                                                                 // 2707
   *     MyService.cleanup($stateParams.myParam);                                                                     // 2708
   * }</pre>                                                                                                          // 2709
   *                                                                                                                  // 2710
   * @param {boolean=} [stateConfig.reloadOnSearch=true]                                                              // 2711
   * <a id='reloadOnSearch'></a>                                                                                      // 2712
   *                                                                                                                  // 2713
   * If `false`, will not retrigger the same state                                                                    // 2714
   *   just because a search/query parameter has changed (via $location.search() or $location.hash()).                // 2715
   *   Useful for when you'd like to modify $location.search() without triggering a reload.                           // 2716
   * <pre>reloadOnSearch: false</pre>                                                                                 // 2717
   *                                                                                                                  // 2718
   * @param {object=} stateConfig.data                                                                                // 2719
   * <a id='data'></a>                                                                                                // 2720
   *                                                                                                                  // 2721
   * Arbitrary data object, useful for custom configuration.  The parent state's `data` is                            // 2722
   *   prototypally inherited.  In other words, adding a data property to a state adds it to                          // 2723
   *   the entire subtree via prototypal inheritance.                                                                 // 2724
   *                                                                                                                  // 2725
   * <pre>data: {                                                                                                     // 2726
   *     requiredRole: 'foo'                                                                                          // 2727
   * } </pre>                                                                                                         // 2728
   *                                                                                                                  // 2729
   * @param {object=} stateConfig.params                                                                              // 2730
   * <a id='params'></a>                                                                                              // 2731
   *                                                                                                                  // 2732
   * A map which optionally configures parameters declared in the `url`, or                                           // 2733
   *   defines additional non-url parameters.  For each parameter being                                               // 2734
   *   configured, add a configuration object keyed to the name of the parameter.                                     // 2735
   *                                                                                                                  // 2736
   *   Each parameter configuration object may contain the following properties:                                      // 2737
   *                                                                                                                  // 2738
   *   - ** value ** - {object|function=}: specifies the default value for this                                       // 2739
   *     parameter.  This implicitly sets this parameter as optional.                                                 // 2740
   *                                                                                                                  // 2741
   *     When UI-Router routes to a state and no value is                                                             // 2742
   *     specified for this parameter in the URL or transition, the                                                   // 2743
   *     default value will be used instead.  If `value` is a function,                                               // 2744
   *     it will be injected and invoked, and the return value used.                                                  // 2745
   *                                                                                                                  // 2746
   *     *Note*: `undefined` is treated as "no default value" while `null`                                            // 2747
   *     is treated as "the default value is `null`".                                                                 // 2748
   *                                                                                                                  // 2749
   *     *Shorthand*: If you only need to configure the default value of the                                          // 2750
   *     parameter, you may use a shorthand syntax.   In the **`params`**                                             // 2751
   *     map, instead mapping the param name to a full parameter configuration                                        // 2752
   *     object, simply set map it to the default parameter value, e.g.:                                              // 2753
   *                                                                                                                  // 2754
   * <pre>// define a parameter's default value                                                                       // 2755
   * params: {                                                                                                        // 2756
   *     param1: { value: "defaultValue" }                                                                            // 2757
   * }                                                                                                                // 2758
   * // shorthand default values                                                                                      // 2759
   * params: {                                                                                                        // 2760
   *     param1: "defaultValue",                                                                                      // 2761
   *     param2: "param2Default"                                                                                      // 2762
   * }</pre>                                                                                                          // 2763
   *                                                                                                                  // 2764
   *   - ** array ** - {boolean=}: *(default: false)* If true, the param value will be                                // 2765
   *     treated as an array of values.  If you specified a Type, the value will be                                   // 2766
   *     treated as an array of the specified Type.  Note: query parameter values                                     // 2767
   *     default to a special `"auto"` mode.                                                                          // 2768
   *                                                                                                                  // 2769
   *     For query parameters in `"auto"` mode, if multiple  values for a single parameter                            // 2770
   *     are present in the URL (e.g.: `/foo?bar=1&bar=2&bar=3`) then the values                                      // 2771
   *     are mapped to an array (e.g.: `{ foo: [ '1', '2', '3' ] }`).  However, if                                    // 2772
   *     only one value is present (e.g.: `/foo?bar=1`) then the value is treated as single                           // 2773
   *     value (e.g.: `{ foo: '1' }`).                                                                                // 2774
   *                                                                                                                  // 2775
   * <pre>params: {                                                                                                   // 2776
   *     param1: { array: true }                                                                                      // 2777
   * }</pre>                                                                                                          // 2778
   *                                                                                                                  // 2779
   *   - ** squash ** - {bool|string=}: `squash` configures how a default parameter value is represented in the URL when
   *     the current parameter value is the same as the default value. If `squash` is not set, it uses the            // 2781
   *     configured default squash policy.                                                                            // 2782
   *     (See {@link ui.router.util.$urlMatcherFactory#methods_defaultSquashPolicy `defaultSquashPolicy()`})          // 2783
   *                                                                                                                  // 2784
   *   There are three squash settings:                                                                               // 2785
   *                                                                                                                  // 2786
   *     - false: The parameter's default value is not squashed.  It is encoded and included in the URL               // 2787
   *     - true: The parameter's default value is omitted from the URL.  If the parameter is preceeded and followed   // 2788
   *       by slashes in the state's `url` declaration, then one of those slashes are omitted.                        // 2789
   *       This can allow for cleaner looking URLs.                                                                   // 2790
   *     - `"<arbitrary string>"`: The parameter's default value is replaced with an arbitrary placeholder of  your choice.
   *                                                                                                                  // 2792
   * <pre>params: {                                                                                                   // 2793
   *     param1: {                                                                                                    // 2794
   *       value: "defaultId",                                                                                        // 2795
   *       squash: true                                                                                               // 2796
   * } }                                                                                                              // 2797
   * // squash "defaultValue" to "~"                                                                                  // 2798
   * params: {                                                                                                        // 2799
   *     param1: {                                                                                                    // 2800
   *       value: "defaultValue",                                                                                     // 2801
   *       squash: "~"                                                                                                // 2802
   * } }                                                                                                              // 2803
   * </pre>                                                                                                           // 2804
   *                                                                                                                  // 2805
   *                                                                                                                  // 2806
   * @example                                                                                                         // 2807
   * <pre>                                                                                                            // 2808
   * // Some state name examples                                                                                      // 2809
   *                                                                                                                  // 2810
   * // stateName can be a single top-level name (must be unique).                                                    // 2811
   * $stateProvider.state("home", {});                                                                                // 2812
   *                                                                                                                  // 2813
   * // Or it can be a nested state name. This state is a child of the                                                // 2814
   * // above "home" state.                                                                                           // 2815
   * $stateProvider.state("home.newest", {});                                                                         // 2816
   *                                                                                                                  // 2817
   * // Nest states as deeply as needed.                                                                              // 2818
   * $stateProvider.state("home.newest.abc.xyz.inception", {});                                                       // 2819
   *                                                                                                                  // 2820
   * // state() returns $stateProvider, so you can chain state declarations.                                          // 2821
   * $stateProvider                                                                                                   // 2822
   *   .state("home", {})                                                                                             // 2823
   *   .state("about", {})                                                                                            // 2824
   *   .state("contacts", {});                                                                                        // 2825
   * </pre>                                                                                                           // 2826
   *                                                                                                                  // 2827
   */                                                                                                                 // 2828
  this.state = state;                                                                                                 // 2829
  function state(name, definition) {                                                                                  // 2830
    /*jshint validthis: true */                                                                                       // 2831
    if (isObject(name)) definition = name;                                                                            // 2832
    else definition.name = name;                                                                                      // 2833
    registerState(definition);                                                                                        // 2834
    return this;                                                                                                      // 2835
  }                                                                                                                   // 2836
                                                                                                                      // 2837
  /**                                                                                                                 // 2838
   * @ngdoc object                                                                                                    // 2839
   * @name ui.router.state.$state                                                                                     // 2840
   *                                                                                                                  // 2841
   * @requires $rootScope                                                                                             // 2842
   * @requires $q                                                                                                     // 2843
   * @requires ui.router.state.$view                                                                                  // 2844
   * @requires $injector                                                                                              // 2845
   * @requires ui.router.util.$resolve                                                                                // 2846
   * @requires ui.router.state.$stateParams                                                                           // 2847
   * @requires ui.router.router.$urlRouter                                                                            // 2848
   *                                                                                                                  // 2849
   * @property {object} params A param object, e.g. {sectionId: section.id)}, that                                    // 2850
   * you'd like to test against the current active state.                                                             // 2851
   * @property {object} current A reference to the state's config object. However                                     // 2852
   * you passed it in. Useful for accessing custom data.                                                              // 2853
   * @property {object} transition Currently pending transition. A promise that'll                                    // 2854
   * resolve or reject.                                                                                               // 2855
   *                                                                                                                  // 2856
   * @description                                                                                                     // 2857
   * `$state` service is responsible for representing states as well as transitioning                                 // 2858
   * between them. It also provides interfaces to ask for current state or even states                                // 2859
   * you're coming from.                                                                                              // 2860
   */                                                                                                                 // 2861
  this.$get = $get;                                                                                                   // 2862
  $get.$inject = ['$rootScope', '$q', '$view', '$injector', '$resolve', '$stateParams', '$urlRouter', '$location', '$urlMatcherFactory'];
  function $get(   $rootScope,   $q,   $view,   $injector,   $resolve,   $stateParams,   $urlRouter,   $location,   $urlMatcherFactory) {
                                                                                                                      // 2865
    var TransitionSuperseded = $q.reject(new Error('transition superseded'));                                         // 2866
    var TransitionPrevented = $q.reject(new Error('transition prevented'));                                           // 2867
    var TransitionAborted = $q.reject(new Error('transition aborted'));                                               // 2868
    var TransitionFailed = $q.reject(new Error('transition failed'));                                                 // 2869
                                                                                                                      // 2870
    // Handles the case where a state which is the target of a transition is not found, and the user                  // 2871
    // can optionally retry or defer the transition                                                                   // 2872
    function handleRedirect(redirect, state, params, options) {                                                       // 2873
      /**                                                                                                             // 2874
       * @ngdoc event                                                                                                 // 2875
       * @name ui.router.state.$state#$stateNotFound                                                                  // 2876
       * @eventOf ui.router.state.$state                                                                              // 2877
       * @eventType broadcast on root scope                                                                           // 2878
       * @description                                                                                                 // 2879
       * Fired when a requested state **cannot be found** using the provided state name during transition.            // 2880
       * The event is broadcast allowing any handlers a single chance to deal with the error (usually by              // 2881
       * lazy-loading the unfound state). A special `unfoundState` object is passed to the listener handler,          // 2882
       * you can see its three properties in the example. You can use `event.preventDefault()` to abort the           // 2883
       * transition and the promise returned from `go` will be rejected with a `'transition aborted'` value.          // 2884
       *                                                                                                              // 2885
       * @param {Object} event Event object.                                                                          // 2886
       * @param {Object} unfoundState Unfound State information. Contains: `to, toParams, options` properties.        // 2887
       * @param {State} fromState Current state object.                                                               // 2888
       * @param {Object} fromParams Current state params.                                                             // 2889
       *                                                                                                              // 2890
       * @example                                                                                                     // 2891
       *                                                                                                              // 2892
       * <pre>                                                                                                        // 2893
       * // somewhere, assume lazy.state has not been defined                                                         // 2894
       * $state.go("lazy.state", {a:1, b:2}, {inherit:false});                                                        // 2895
       *                                                                                                              // 2896
       * // somewhere else                                                                                            // 2897
       * $scope.$on('$stateNotFound',                                                                                 // 2898
       * function(event, unfoundState, fromState, fromParams){                                                        // 2899
       *     console.log(unfoundState.to); // "lazy.state"                                                            // 2900
       *     console.log(unfoundState.toParams); // {a:1, b:2}                                                        // 2901
       *     console.log(unfoundState.options); // {inherit:false} + default options                                  // 2902
       * })                                                                                                           // 2903
       * </pre>                                                                                                       // 2904
       */                                                                                                             // 2905
      var evt = $rootScope.$broadcast('$stateNotFound', redirect, state, params);                                     // 2906
                                                                                                                      // 2907
      if (evt.defaultPrevented) {                                                                                     // 2908
        $urlRouter.update();                                                                                          // 2909
        return TransitionAborted;                                                                                     // 2910
      }                                                                                                               // 2911
                                                                                                                      // 2912
      if (!evt.retry) {                                                                                               // 2913
        return null;                                                                                                  // 2914
      }                                                                                                               // 2915
                                                                                                                      // 2916
      // Allow the handler to return a promise to defer state lookup retry                                            // 2917
      if (options.$retry) {                                                                                           // 2918
        $urlRouter.update();                                                                                          // 2919
        return TransitionFailed;                                                                                      // 2920
      }                                                                                                               // 2921
      var retryTransition = $state.transition = $q.when(evt.retry);                                                   // 2922
                                                                                                                      // 2923
      retryTransition.then(function() {                                                                               // 2924
        if (retryTransition !== $state.transition) return TransitionSuperseded;                                       // 2925
        redirect.options.$retry = true;                                                                               // 2926
        return $state.transitionTo(redirect.to, redirect.toParams, redirect.options);                                 // 2927
      }, function() {                                                                                                 // 2928
        return TransitionAborted;                                                                                     // 2929
      });                                                                                                             // 2930
      $urlRouter.update();                                                                                            // 2931
                                                                                                                      // 2932
      return retryTransition;                                                                                         // 2933
    }                                                                                                                 // 2934
                                                                                                                      // 2935
    root.locals = { resolve: null, globals: { $stateParams: {} } };                                                   // 2936
                                                                                                                      // 2937
    $state = {                                                                                                        // 2938
      params: {},                                                                                                     // 2939
      current: root.self,                                                                                             // 2940
      $current: root,                                                                                                 // 2941
      transition: null                                                                                                // 2942
    };                                                                                                                // 2943
                                                                                                                      // 2944
    /**                                                                                                               // 2945
     * @ngdoc function                                                                                                // 2946
     * @name ui.router.state.$state#reload                                                                            // 2947
     * @methodOf ui.router.state.$state                                                                               // 2948
     *                                                                                                                // 2949
     * @description                                                                                                   // 2950
     * A method that force reloads the current state. All resolves are re-resolved,                                   // 2951
     * controllers reinstantiated, and events re-fired.                                                               // 2952
     *                                                                                                                // 2953
     * @example                                                                                                       // 2954
     * <pre>                                                                                                          // 2955
     * var app angular.module('app', ['ui.router']);                                                                  // 2956
     *                                                                                                                // 2957
     * app.controller('ctrl', function ($scope, $state) {                                                             // 2958
     *   $scope.reload = function(){                                                                                  // 2959
     *     $state.reload();                                                                                           // 2960
     *   }                                                                                                            // 2961
     * });                                                                                                            // 2962
     * </pre>                                                                                                         // 2963
     *                                                                                                                // 2964
     * `reload()` is just an alias for:                                                                               // 2965
     * <pre>                                                                                                          // 2966
     * $state.transitionTo($state.current, $stateParams, {                                                            // 2967
     *   reload: true, inherit: false, notify: true                                                                   // 2968
     * });                                                                                                            // 2969
     * </pre>                                                                                                         // 2970
     *                                                                                                                // 2971
     * @param {string=|object=} state - A state name or a state object, which is the root of the resolves to be re-resolved.
     * @example                                                                                                       // 2973
     * <pre>                                                                                                          // 2974
     * //assuming app application consists of 3 states: 'contacts', 'contacts.detail', 'contacts.detail.item'         // 2975
     * //and current state is 'contacts.detail.item'                                                                  // 2976
     * var app angular.module('app', ['ui.router']);                                                                  // 2977
     *                                                                                                                // 2978
     * app.controller('ctrl', function ($scope, $state) {                                                             // 2979
     *   $scope.reload = function(){                                                                                  // 2980
     *     //will reload 'contact.detail' and 'contact.detail.item' states                                            // 2981
     *     $state.reload('contact.detail');                                                                           // 2982
     *   }                                                                                                            // 2983
     * });                                                                                                            // 2984
     * </pre>                                                                                                         // 2985
     *                                                                                                                // 2986
     * `reload()` is just an alias for:                                                                               // 2987
     * <pre>                                                                                                          // 2988
     * $state.transitionTo($state.current, $stateParams, {                                                            // 2989
     *   reload: true, inherit: false, notify: true                                                                   // 2990
     * });                                                                                                            // 2991
     * </pre>                                                                                                         // 2992
                                                                                                                      // 2993
     * @returns {promise} A promise representing the state of the new transition. See                                 // 2994
     * {@link ui.router.state.$state#methods_go $state.go}.                                                           // 2995
     */                                                                                                               // 2996
    $state.reload = function reload(state) {                                                                          // 2997
      return $state.transitionTo($state.current, $stateParams, { reload: state || true, inherit: false, notify: true});
    };                                                                                                                // 2999
                                                                                                                      // 3000
    /**                                                                                                               // 3001
     * @ngdoc function                                                                                                // 3002
     * @name ui.router.state.$state#go                                                                                // 3003
     * @methodOf ui.router.state.$state                                                                               // 3004
     *                                                                                                                // 3005
     * @description                                                                                                   // 3006
     * Convenience method for transitioning to a new state. `$state.go` calls                                         // 3007
     * `$state.transitionTo` internally but automatically sets options to                                             // 3008
     * `{ location: true, inherit: true, relative: $state.$current, notify: true }`.                                  // 3009
     * This allows you to easily use an absolute or relative to path and specify                                      // 3010
     * only the parameters you'd like to update (while letting unspecified parameters                                 // 3011
     * inherit from the currently active ancestor states).                                                            // 3012
     *                                                                                                                // 3013
     * @example                                                                                                       // 3014
     * <pre>                                                                                                          // 3015
     * var app = angular.module('app', ['ui.router']);                                                                // 3016
     *                                                                                                                // 3017
     * app.controller('ctrl', function ($scope, $state) {                                                             // 3018
     *   $scope.changeState = function () {                                                                           // 3019
     *     $state.go('contact.detail');                                                                               // 3020
     *   };                                                                                                           // 3021
     * });                                                                                                            // 3022
     * </pre>                                                                                                         // 3023
     * <img src='../ngdoc_assets/StateGoExamples.png'/>                                                               // 3024
     *                                                                                                                // 3025
     * @param {string} to Absolute state name or relative state path. Some examples:                                  // 3026
     *                                                                                                                // 3027
     * - `$state.go('contact.detail')` - will go to the `contact.detail` state                                        // 3028
     * - `$state.go('^')` - will go to a parent state                                                                 // 3029
     * - `$state.go('^.sibling')` - will go to a sibling state                                                        // 3030
     * - `$state.go('.child.grandchild')` - will go to grandchild state                                               // 3031
     *                                                                                                                // 3032
     * @param {object=} params A map of the parameters that will be sent to the state,                                // 3033
     * will populate $stateParams. Any parameters that are not specified will be inherited from currently             // 3034
     * defined parameters. This allows, for example, going to a sibling state that shares parameters                  // 3035
     * specified in a parent state. Parameter inheritance only works between common ancestor states, I.e.             // 3036
     * transitioning to a sibling will get you the parameters for all parents, transitioning to a child               // 3037
     * will get you all current parameters, etc.                                                                      // 3038
     * @param {object=} options Options object. The options are:                                                      // 3039
     *                                                                                                                // 3040
     * - **`location`** - {boolean=true|string=} - If `true` will update the url in the location bar, if `false`      // 3041
     *    will not. If string, must be `"replace"`, which will update url and also replace last history record.       // 3042
     * - **`inherit`** - {boolean=true}, If `true` will inherit url parameters from current url.                      // 3043
     * - **`relative`** - {object=$state.$current}, When transitioning with relative path (e.g '^'),                  // 3044
     *    defines which state to be relative from.                                                                    // 3045
     * - **`notify`** - {boolean=true}, If `true` will broadcast $stateChangeStart and $stateChangeSuccess events.    // 3046
     * - **`reload`** (v0.2.5) - {boolean=false}, If `true` will force transition even if the state or params         // 3047
     *    have not changed, aka a reload of the same state. It differs from reloadOnSearch because you'd              // 3048
     *    use this when you want to force a reload when *everything* is the same, including search params.            // 3049
     *                                                                                                                // 3050
     * @returns {promise} A promise representing the state of the new transition.                                     // 3051
     *                                                                                                                // 3052
     * Possible success values:                                                                                       // 3053
     *                                                                                                                // 3054
     * - $state.current                                                                                               // 3055
     *                                                                                                                // 3056
     * <br/>Possible rejection values:                                                                                // 3057
     *                                                                                                                // 3058
     * - 'transition superseded' - when a newer transition has been started after this one                            // 3059
     * - 'transition prevented' - when `event.preventDefault()` has been called in a `$stateChangeStart` listener     // 3060
     * - 'transition aborted' - when `event.preventDefault()` has been called in a `$stateNotFound` listener or       // 3061
     *   when a `$stateNotFound` `event.retry` promise errors.                                                        // 3062
     * - 'transition failed' - when a state has been unsuccessfully found after 2 tries.                              // 3063
     * - *resolve error* - when an error has occurred with a `resolve`                                                // 3064
     *                                                                                                                // 3065
     */                                                                                                               // 3066
    $state.go = function go(to, params, options) {                                                                    // 3067
      return $state.transitionTo(to, params, extend({ inherit: true, relative: $state.$current }, options));          // 3068
    };                                                                                                                // 3069
                                                                                                                      // 3070
    /**                                                                                                               // 3071
     * @ngdoc function                                                                                                // 3072
     * @name ui.router.state.$state#transitionTo                                                                      // 3073
     * @methodOf ui.router.state.$state                                                                               // 3074
     *                                                                                                                // 3075
     * @description                                                                                                   // 3076
     * Low-level method for transitioning to a new state. {@link ui.router.state.$state#methods_go $state.go}         // 3077
     * uses `transitionTo` internally. `$state.go` is recommended in most situations.                                 // 3078
     *                                                                                                                // 3079
     * @example                                                                                                       // 3080
     * <pre>                                                                                                          // 3081
     * var app = angular.module('app', ['ui.router']);                                                                // 3082
     *                                                                                                                // 3083
     * app.controller('ctrl', function ($scope, $state) {                                                             // 3084
     *   $scope.changeState = function () {                                                                           // 3085
     *     $state.transitionTo('contact.detail');                                                                     // 3086
     *   };                                                                                                           // 3087
     * });                                                                                                            // 3088
     * </pre>                                                                                                         // 3089
     *                                                                                                                // 3090
     * @param {string} to State name.                                                                                 // 3091
     * @param {object=} toParams A map of the parameters that will be sent to the state,                              // 3092
     * will populate $stateParams.                                                                                    // 3093
     * @param {object=} options Options object. The options are:                                                      // 3094
     *                                                                                                                // 3095
     * - **`location`** - {boolean=true|string=} - If `true` will update the url in the location bar, if `false`      // 3096
     *    will not. If string, must be `"replace"`, which will update url and also replace last history record.       // 3097
     * - **`inherit`** - {boolean=false}, If `true` will inherit url parameters from current url.                     // 3098
     * - **`relative`** - {object=}, When transitioning with relative path (e.g '^'),                                 // 3099
     *    defines which state to be relative from.                                                                    // 3100
     * - **`notify`** - {boolean=true}, If `true` will broadcast $stateChangeStart and $stateChangeSuccess events.    // 3101
     * - **`reload`** (v0.2.5) - {boolean=false|string=|object=}, If `true` will force transition even if the state or params 
     *    have not changed, aka a reload of the same state. It differs from reloadOnSearch because you'd              // 3103
     *    use this when you want to force a reload when *everything* is the same, including search params.            // 3104
     *    if String, then will reload the state with the name given in reload, and any children.                      // 3105
     *    if Object, then a stateObj is expected, will reload the state found in stateObj, and any children.          // 3106
     *                                                                                                                // 3107
     * @returns {promise} A promise representing the state of the new transition. See                                 // 3108
     * {@link ui.router.state.$state#methods_go $state.go}.                                                           // 3109
     */                                                                                                               // 3110
    $state.transitionTo = function transitionTo(to, toParams, options) {                                              // 3111
      toParams = toParams || {};                                                                                      // 3112
      options = extend({                                                                                              // 3113
        location: true, inherit: false, relative: null, notify: true, reload: false, $retry: false                    // 3114
      }, options || {});                                                                                              // 3115
                                                                                                                      // 3116
      var from = $state.$current, fromParams = $state.params, fromPath = from.path;                                   // 3117
      var evt, toState = findState(to, options.relative);                                                             // 3118
                                                                                                                      // 3119
      // Store the hash param for later (since it will be stripped out by various methods)                            // 3120
      var hash = toParams['#'];                                                                                       // 3121
                                                                                                                      // 3122
      if (!isDefined(toState)) {                                                                                      // 3123
        var redirect = { to: to, toParams: toParams, options: options };                                              // 3124
        var redirectResult = handleRedirect(redirect, from.self, fromParams, options);                                // 3125
                                                                                                                      // 3126
        if (redirectResult) {                                                                                         // 3127
          return redirectResult;                                                                                      // 3128
        }                                                                                                             // 3129
                                                                                                                      // 3130
        // Always retry once if the $stateNotFound was not prevented                                                  // 3131
        // (handles either redirect changed or state lazy-definition)                                                 // 3132
        to = redirect.to;                                                                                             // 3133
        toParams = redirect.toParams;                                                                                 // 3134
        options = redirect.options;                                                                                   // 3135
        toState = findState(to, options.relative);                                                                    // 3136
                                                                                                                      // 3137
        if (!isDefined(toState)) {                                                                                    // 3138
          if (!options.relative) throw new Error("No such state '" + to + "'");                                       // 3139
          throw new Error("Could not resolve '" + to + "' from state '" + options.relative + "'");                    // 3140
        }                                                                                                             // 3141
      }                                                                                                               // 3142
      if (toState[abstractKey]) throw new Error("Cannot transition to abstract state '" + to + "'");                  // 3143
      if (options.inherit) toParams = inheritParams($stateParams, toParams || {}, $state.$current, toState);          // 3144
      if (!toState.params.$$validates(toParams)) return TransitionFailed;                                             // 3145
                                                                                                                      // 3146
      toParams = toState.params.$$values(toParams);                                                                   // 3147
      to = toState;                                                                                                   // 3148
                                                                                                                      // 3149
      var toPath = to.path;                                                                                           // 3150
                                                                                                                      // 3151
      // Starting from the root of the path, keep all levels that haven't changed                                     // 3152
      var keep = 0, state = toPath[keep], locals = root.locals, toLocals = [];                                        // 3153
                                                                                                                      // 3154
      if (!options.reload) {                                                                                          // 3155
        while (state && state === fromPath[keep] && state.ownParams.$$equals(toParams, fromParams)) {                 // 3156
          locals = toLocals[keep] = state.locals;                                                                     // 3157
          keep++;                                                                                                     // 3158
          state = toPath[keep];                                                                                       // 3159
        }                                                                                                             // 3160
      } else if (isString(options.reload) || isObject(options.reload)) {                                              // 3161
        if (isObject(options.reload) && !options.reload.name) {                                                       // 3162
          throw new Error('Invalid reload state object');                                                             // 3163
        }                                                                                                             // 3164
                                                                                                                      // 3165
        var reloadState = options.reload === true ? fromPath[0] : findState(options.reload);                          // 3166
        if (options.reload && !reloadState) {                                                                         // 3167
          throw new Error("No such reload state '" + (isString(options.reload) ? options.reload : options.reload.name) + "'");
        }                                                                                                             // 3169
                                                                                                                      // 3170
        while (state && state === fromPath[keep] && state !== reloadState) {                                          // 3171
          locals = toLocals[keep] = state.locals;                                                                     // 3172
          keep++;                                                                                                     // 3173
          state = toPath[keep];                                                                                       // 3174
        }                                                                                                             // 3175
      }                                                                                                               // 3176
                                                                                                                      // 3177
      // If we're going to the same state and all locals are kept, we've got nothing to do.                           // 3178
      // But clear 'transition', as we still want to cancel any other pending transitions.                            // 3179
      // TODO: We may not want to bump 'transition' if we're called from a location change                            // 3180
      // that we've initiated ourselves, because we might accidentally abort a legitimate                             // 3181
      // transition initiated from code?                                                                              // 3182
      if (shouldSkipReload(to, toParams, from, fromParams, locals, options)) {                                        // 3183
        if (hash) toParams['#'] = hash;                                                                               // 3184
        $state.params = toParams;                                                                                     // 3185
        copy($state.params, $stateParams);                                                                            // 3186
        if (options.location && to.navigable && to.navigable.url) {                                                   // 3187
          $urlRouter.push(to.navigable.url, toParams, {                                                               // 3188
            $$avoidResync: true, replace: options.location === 'replace'                                              // 3189
          });                                                                                                         // 3190
          $urlRouter.update(true);                                                                                    // 3191
        }                                                                                                             // 3192
        $state.transition = null;                                                                                     // 3193
        return $q.when($state.current);                                                                               // 3194
      }                                                                                                               // 3195
                                                                                                                      // 3196
      // Filter parameters before we pass them to event handlers etc.                                                 // 3197
      toParams = filterByKeys(to.params.$$keys(), toParams || {});                                                    // 3198
                                                                                                                      // 3199
      // Broadcast start event and cancel the transition if requested                                                 // 3200
      if (options.notify) {                                                                                           // 3201
        /**                                                                                                           // 3202
         * @ngdoc event                                                                                               // 3203
         * @name ui.router.state.$state#$stateChangeStart                                                             // 3204
         * @eventOf ui.router.state.$state                                                                            // 3205
         * @eventType broadcast on root scope                                                                         // 3206
         * @description                                                                                               // 3207
         * Fired when the state transition **begins**. You can use `event.preventDefault()`                           // 3208
         * to prevent the transition from happening and then the transition promise will be                           // 3209
         * rejected with a `'transition prevented'` value.                                                            // 3210
         *                                                                                                            // 3211
         * @param {Object} event Event object.                                                                        // 3212
         * @param {State} toState The state being transitioned to.                                                    // 3213
         * @param {Object} toParams The params supplied to the `toState`.                                             // 3214
         * @param {State} fromState The current state, pre-transition.                                                // 3215
         * @param {Object} fromParams The params supplied to the `fromState`.                                         // 3216
         *                                                                                                            // 3217
         * @example                                                                                                   // 3218
         *                                                                                                            // 3219
         * <pre>                                                                                                      // 3220
         * $rootScope.$on('$stateChangeStart',                                                                        // 3221
         * function(event, toState, toParams, fromState, fromParams){                                                 // 3222
         *     event.preventDefault();                                                                                // 3223
         *     // transitionTo() promise will be rejected with                                                        // 3224
         *     // a 'transition prevented' error                                                                      // 3225
         * })                                                                                                         // 3226
         * </pre>                                                                                                     // 3227
         */                                                                                                           // 3228
        if ($rootScope.$broadcast('$stateChangeStart', to.self, toParams, from.self, fromParams).defaultPrevented) {  // 3229
          $rootScope.$broadcast('$stateChangeCancel', to.self, toParams, from.self, fromParams);                      // 3230
          $urlRouter.update();                                                                                        // 3231
          return TransitionPrevented;                                                                                 // 3232
        }                                                                                                             // 3233
      }                                                                                                               // 3234
                                                                                                                      // 3235
      // Resolve locals for the remaining states, but don't update any global state just                              // 3236
      // yet -- if anything fails to resolve the current state needs to remain untouched.                             // 3237
      // We also set up an inheritance chain for the locals here. This allows the view directive                      // 3238
      // to quickly look up the correct definition for each view in the current state. Even                           // 3239
      // though we create the locals object itself outside resolveState(), it is initially                            // 3240
      // empty and gets filled asynchronously. We need to keep track of the promise for the                           // 3241
      // (fully resolved) current locals, and pass this down the chain.                                               // 3242
      var resolved = $q.when(locals);                                                                                 // 3243
                                                                                                                      // 3244
      for (var l = keep; l < toPath.length; l++, state = toPath[l]) {                                                 // 3245
        locals = toLocals[l] = inherit(locals);                                                                       // 3246
        resolved = resolveState(state, toParams, state === to, resolved, locals, options);                            // 3247
      }                                                                                                               // 3248
                                                                                                                      // 3249
      // Once everything is resolved, we are ready to perform the actual transition                                   // 3250
      // and return a promise for the new state. We also keep track of what the                                       // 3251
      // current promise is, so that we can detect overlapping transitions and                                        // 3252
      // keep only the outcome of the last transition.                                                                // 3253
      var transition = $state.transition = resolved.then(function () {                                                // 3254
        var l, entering, exiting;                                                                                     // 3255
                                                                                                                      // 3256
        if ($state.transition !== transition) return TransitionSuperseded;                                            // 3257
                                                                                                                      // 3258
        // Exit 'from' states not kept                                                                                // 3259
        for (l = fromPath.length - 1; l >= keep; l--) {                                                               // 3260
          exiting = fromPath[l];                                                                                      // 3261
          if (exiting.self.onExit) {                                                                                  // 3262
            $injector.invoke(exiting.self.onExit, exiting.self, exiting.locals.globals);                              // 3263
          }                                                                                                           // 3264
          exiting.locals = null;                                                                                      // 3265
        }                                                                                                             // 3266
                                                                                                                      // 3267
        // Enter 'to' states not kept                                                                                 // 3268
        for (l = keep; l < toPath.length; l++) {                                                                      // 3269
          entering = toPath[l];                                                                                       // 3270
          entering.locals = toLocals[l];                                                                              // 3271
          if (entering.self.onEnter) {                                                                                // 3272
            $injector.invoke(entering.self.onEnter, entering.self, entering.locals.globals);                          // 3273
          }                                                                                                           // 3274
        }                                                                                                             // 3275
                                                                                                                      // 3276
        // Re-add the saved hash before we start returning things                                                     // 3277
        if (hash) toParams['#'] = hash;                                                                               // 3278
                                                                                                                      // 3279
        // Run it again, to catch any transitions in callbacks                                                        // 3280
        if ($state.transition !== transition) return TransitionSuperseded;                                            // 3281
                                                                                                                      // 3282
        // Update globals in $state                                                                                   // 3283
        $state.$current = to;                                                                                         // 3284
        $state.current = to.self;                                                                                     // 3285
        $state.params = toParams;                                                                                     // 3286
        copy($state.params, $stateParams);                                                                            // 3287
        $state.transition = null;                                                                                     // 3288
                                                                                                                      // 3289
        if (options.location && to.navigable) {                                                                       // 3290
          $urlRouter.push(to.navigable.url, to.navigable.locals.globals.$stateParams, {                               // 3291
            $$avoidResync: true, replace: options.location === 'replace'                                              // 3292
          });                                                                                                         // 3293
        }                                                                                                             // 3294
                                                                                                                      // 3295
        if (options.notify) {                                                                                         // 3296
        /**                                                                                                           // 3297
         * @ngdoc event                                                                                               // 3298
         * @name ui.router.state.$state#$stateChangeSuccess                                                           // 3299
         * @eventOf ui.router.state.$state                                                                            // 3300
         * @eventType broadcast on root scope                                                                         // 3301
         * @description                                                                                               // 3302
         * Fired once the state transition is **complete**.                                                           // 3303
         *                                                                                                            // 3304
         * @param {Object} event Event object.                                                                        // 3305
         * @param {State} toState The state being transitioned to.                                                    // 3306
         * @param {Object} toParams The params supplied to the `toState`.                                             // 3307
         * @param {State} fromState The current state, pre-transition.                                                // 3308
         * @param {Object} fromParams The params supplied to the `fromState`.                                         // 3309
         */                                                                                                           // 3310
          $rootScope.$broadcast('$stateChangeSuccess', to.self, toParams, from.self, fromParams);                     // 3311
        }                                                                                                             // 3312
        $urlRouter.update(true);                                                                                      // 3313
                                                                                                                      // 3314
        return $state.current;                                                                                        // 3315
      }, function (error) {                                                                                           // 3316
        if ($state.transition !== transition) return TransitionSuperseded;                                            // 3317
                                                                                                                      // 3318
        $state.transition = null;                                                                                     // 3319
        /**                                                                                                           // 3320
         * @ngdoc event                                                                                               // 3321
         * @name ui.router.state.$state#$stateChangeError                                                             // 3322
         * @eventOf ui.router.state.$state                                                                            // 3323
         * @eventType broadcast on root scope                                                                         // 3324
         * @description                                                                                               // 3325
         * Fired when an **error occurs** during transition. It's important to note that if you                       // 3326
         * have any errors in your resolve functions (javascript errors, non-existent services, etc)                  // 3327
         * they will not throw traditionally. You must listen for this $stateChangeError event to                     // 3328
         * catch **ALL** errors.                                                                                      // 3329
         *                                                                                                            // 3330
         * @param {Object} event Event object.                                                                        // 3331
         * @param {State} toState The state being transitioned to.                                                    // 3332
         * @param {Object} toParams The params supplied to the `toState`.                                             // 3333
         * @param {State} fromState The current state, pre-transition.                                                // 3334
         * @param {Object} fromParams The params supplied to the `fromState`.                                         // 3335
         * @param {Error} error The resolve error object.                                                             // 3336
         */                                                                                                           // 3337
        evt = $rootScope.$broadcast('$stateChangeError', to.self, toParams, from.self, fromParams, error);            // 3338
                                                                                                                      // 3339
        if (!evt.defaultPrevented) {                                                                                  // 3340
            $urlRouter.update();                                                                                      // 3341
        }                                                                                                             // 3342
                                                                                                                      // 3343
        return $q.reject(error);                                                                                      // 3344
      });                                                                                                             // 3345
                                                                                                                      // 3346
      return transition;                                                                                              // 3347
    };                                                                                                                // 3348
                                                                                                                      // 3349
    /**                                                                                                               // 3350
     * @ngdoc function                                                                                                // 3351
     * @name ui.router.state.$state#is                                                                                // 3352
     * @methodOf ui.router.state.$state                                                                               // 3353
     *                                                                                                                // 3354
     * @description                                                                                                   // 3355
     * Similar to {@link ui.router.state.$state#methods_includes $state.includes},                                    // 3356
     * but only checks for the full state name. If params is supplied then it will be                                 // 3357
     * tested for strict equality against the current active params object, so all params                             // 3358
     * must match with none missing and no extras.                                                                    // 3359
     *                                                                                                                // 3360
     * @example                                                                                                       // 3361
     * <pre>                                                                                                          // 3362
     * $state.$current.name = 'contacts.details.item';                                                                // 3363
     *                                                                                                                // 3364
     * // absolute name                                                                                               // 3365
     * $state.is('contact.details.item'); // returns true                                                             // 3366
     * $state.is(contactDetailItemStateObject); // returns true                                                       // 3367
     *                                                                                                                // 3368
     * // relative name (. and ^), typically from a template                                                          // 3369
     * // E.g. from the 'contacts.details' template                                                                   // 3370
     * <div ng-class="{highlighted: $state.is('.item')}">Item</div>                                                   // 3371
     * </pre>                                                                                                         // 3372
     *                                                                                                                // 3373
     * @param {string|object} stateOrName The state name (absolute or relative) or state object you'd like to check.  // 3374
     * @param {object=} params A param object, e.g. `{sectionId: section.id}`, that you'd like                        // 3375
     * to test against the current active state.                                                                      // 3376
     * @param {object=} options An options object.  The options are:                                                  // 3377
     *                                                                                                                // 3378
     * - **`relative`** - {string|object} -  If `stateOrName` is a relative state name and `options.relative` is set, .is will
     * test relative to `options.relative` state (or name).                                                           // 3380
     *                                                                                                                // 3381
     * @returns {boolean} Returns true if it is the state.                                                            // 3382
     */                                                                                                               // 3383
    $state.is = function is(stateOrName, params, options) {                                                           // 3384
      options = extend({ relative: $state.$current }, options || {});                                                 // 3385
      var state = findState(stateOrName, options.relative);                                                           // 3386
                                                                                                                      // 3387
      if (!isDefined(state)) { return undefined; }                                                                    // 3388
      if ($state.$current !== state) { return false; }                                                                // 3389
      return params ? equalForKeys(state.params.$$values(params), $stateParams) : true;                               // 3390
    };                                                                                                                // 3391
                                                                                                                      // 3392
    /**                                                                                                               // 3393
     * @ngdoc function                                                                                                // 3394
     * @name ui.router.state.$state#includes                                                                          // 3395
     * @methodOf ui.router.state.$state                                                                               // 3396
     *                                                                                                                // 3397
     * @description                                                                                                   // 3398
     * A method to determine if the current active state is equal to or is the child of the                           // 3399
     * state stateName. If any params are passed then they will be tested for a match as well.                        // 3400
     * Not all the parameters need to be passed, just the ones you'd like to test for equality.                       // 3401
     *                                                                                                                // 3402
     * @example                                                                                                       // 3403
     * Partial and relative names                                                                                     // 3404
     * <pre>                                                                                                          // 3405
     * $state.$current.name = 'contacts.details.item';                                                                // 3406
     *                                                                                                                // 3407
     * // Using partial names                                                                                         // 3408
     * $state.includes("contacts"); // returns true                                                                   // 3409
     * $state.includes("contacts.details"); // returns true                                                           // 3410
     * $state.includes("contacts.details.item"); // returns true                                                      // 3411
     * $state.includes("contacts.list"); // returns false                                                             // 3412
     * $state.includes("about"); // returns false                                                                     // 3413
     *                                                                                                                // 3414
     * // Using relative names (. and ^), typically from a template                                                   // 3415
     * // E.g. from the 'contacts.details' template                                                                   // 3416
     * <div ng-class="{highlighted: $state.includes('.item')}">Item</div>                                             // 3417
     * </pre>                                                                                                         // 3418
     *                                                                                                                // 3419
     * Basic globbing patterns                                                                                        // 3420
     * <pre>                                                                                                          // 3421
     * $state.$current.name = 'contacts.details.item.url';                                                            // 3422
     *                                                                                                                // 3423
     * $state.includes("*.details.*.*"); // returns true                                                              // 3424
     * $state.includes("*.details.**"); // returns true                                                               // 3425
     * $state.includes("**.item.**"); // returns true                                                                 // 3426
     * $state.includes("*.details.item.url"); // returns true                                                         // 3427
     * $state.includes("*.details.*.url"); // returns true                                                            // 3428
     * $state.includes("*.details.*"); // returns false                                                               // 3429
     * $state.includes("item.**"); // returns false                                                                   // 3430
     * </pre>                                                                                                         // 3431
     *                                                                                                                // 3432
     * @param {string} stateOrName A partial name, relative name, or glob pattern                                     // 3433
     * to be searched for within the current state name.                                                              // 3434
     * @param {object=} params A param object, e.g. `{sectionId: section.id}`,                                        // 3435
     * that you'd like to test against the current active state.                                                      // 3436
     * @param {object=} options An options object.  The options are:                                                  // 3437
     *                                                                                                                // 3438
     * - **`relative`** - {string|object=} -  If `stateOrName` is a relative state reference and `options.relative` is set,
     * .includes will test relative to `options.relative` state (or name).                                            // 3440
     *                                                                                                                // 3441
     * @returns {boolean} Returns true if it does include the state                                                   // 3442
     */                                                                                                               // 3443
    $state.includes = function includes(stateOrName, params, options) {                                               // 3444
      options = extend({ relative: $state.$current }, options || {});                                                 // 3445
      if (isString(stateOrName) && isGlob(stateOrName)) {                                                             // 3446
        if (!doesStateMatchGlob(stateOrName)) {                                                                       // 3447
          return false;                                                                                               // 3448
        }                                                                                                             // 3449
        stateOrName = $state.$current.name;                                                                           // 3450
      }                                                                                                               // 3451
                                                                                                                      // 3452
      var state = findState(stateOrName, options.relative);                                                           // 3453
      if (!isDefined(state)) { return undefined; }                                                                    // 3454
      if (!isDefined($state.$current.includes[state.name])) { return false; }                                         // 3455
      return params ? equalForKeys(state.params.$$values(params), $stateParams, objectKeys(params)) : true;           // 3456
    };                                                                                                                // 3457
                                                                                                                      // 3458
                                                                                                                      // 3459
    /**                                                                                                               // 3460
     * @ngdoc function                                                                                                // 3461
     * @name ui.router.state.$state#href                                                                              // 3462
     * @methodOf ui.router.state.$state                                                                               // 3463
     *                                                                                                                // 3464
     * @description                                                                                                   // 3465
     * A url generation method that returns the compiled url for the given state populated with the given params.     // 3466
     *                                                                                                                // 3467
     * @example                                                                                                       // 3468
     * <pre>                                                                                                          // 3469
     * expect($state.href("about.person", { person: "bob" })).toEqual("/about/bob");                                  // 3470
     * </pre>                                                                                                         // 3471
     *                                                                                                                // 3472
     * @param {string|object} stateOrName The state name or state object you'd like to generate a url from.           // 3473
     * @param {object=} params An object of parameter values to fill the state's required parameters.                 // 3474
     * @param {object=} options Options object. The options are:                                                      // 3475
     *                                                                                                                // 3476
     * - **`lossy`** - {boolean=true} -  If true, and if there is no url associated with the state provided in the    // 3477
     *    first parameter, then the constructed href url will be built from the first navigable ancestor (aka         // 3478
     *    ancestor with a valid url).                                                                                 // 3479
     * - **`inherit`** - {boolean=true}, If `true` will inherit url parameters from current url.                      // 3480
     * - **`relative`** - {object=$state.$current}, When transitioning with relative path (e.g '^'),                  // 3481
     *    defines which state to be relative from.                                                                    // 3482
     * - **`absolute`** - {boolean=false},  If true will generate an absolute url, e.g. "http://www.example.com/fullurl".
     *                                                                                                                // 3484
     * @returns {string} compiled state url                                                                           // 3485
     */                                                                                                               // 3486
    $state.href = function href(stateOrName, params, options) {                                                       // 3487
      options = extend({                                                                                              // 3488
        lossy:    true,                                                                                               // 3489
        inherit:  true,                                                                                               // 3490
        absolute: false,                                                                                              // 3491
        relative: $state.$current                                                                                     // 3492
      }, options || {});                                                                                              // 3493
                                                                                                                      // 3494
      var state = findState(stateOrName, options.relative);                                                           // 3495
                                                                                                                      // 3496
      if (!isDefined(state)) return null;                                                                             // 3497
      if (options.inherit) params = inheritParams($stateParams, params || {}, $state.$current, state);                // 3498
                                                                                                                      // 3499
      var nav = (state && options.lossy) ? state.navigable : state;                                                   // 3500
                                                                                                                      // 3501
      if (!nav || nav.url === undefined || nav.url === null) {                                                        // 3502
        return null;                                                                                                  // 3503
      }                                                                                                               // 3504
      return $urlRouter.href(nav.url, filterByKeys(state.params.$$keys().concat('#'), params || {}), {                // 3505
        absolute: options.absolute                                                                                    // 3506
      });                                                                                                             // 3507
    };                                                                                                                // 3508
                                                                                                                      // 3509
    /**                                                                                                               // 3510
     * @ngdoc function                                                                                                // 3511
     * @name ui.router.state.$state#get                                                                               // 3512
     * @methodOf ui.router.state.$state                                                                               // 3513
     *                                                                                                                // 3514
     * @description                                                                                                   // 3515
     * Returns the state configuration object for any specific state or all states.                                   // 3516
     *                                                                                                                // 3517
     * @param {string|object=} stateOrName (absolute or relative) If provided, will only get the config for           // 3518
     * the requested state. If not provided, returns an array of ALL state configs.                                   // 3519
     * @param {string|object=} context When stateOrName is a relative state reference, the state will be retrieved relative to context.
     * @returns {Object|Array} State configuration object or array of all objects.                                    // 3521
     */                                                                                                               // 3522
    $state.get = function (stateOrName, context) {                                                                    // 3523
      if (arguments.length === 0) return map(objectKeys(states), function(name) { return states[name].self; });       // 3524
      var state = findState(stateOrName, context || $state.$current);                                                 // 3525
      return (state && state.self) ? state.self : null;                                                               // 3526
    };                                                                                                                // 3527
                                                                                                                      // 3528
    function resolveState(state, params, paramsAreFiltered, inherited, dst, options) {                                // 3529
      // Make a restricted $stateParams with only the parameters that apply to this state if                          // 3530
      // necessary. In addition to being available to the controller and onEnter/onExit callbacks,                    // 3531
      // we also need $stateParams to be available for any $injector calls we make during the                         // 3532
      // dependency resolution process.                                                                               // 3533
      var $stateParams = (paramsAreFiltered) ? params : filterByKeys(state.params.$$keys(), params);                  // 3534
      var locals = { $stateParams: $stateParams };                                                                    // 3535
                                                                                                                      // 3536
      // Resolve 'global' dependencies for the state, i.e. those not specific to a view.                              // 3537
      // We're also including $stateParams in this; that way the parameters are restricted                            // 3538
      // to the set that should be visible to the state, and are independent of when we update                        // 3539
      // the global $state and $stateParams values.                                                                   // 3540
      dst.resolve = $resolve.resolve(state.resolve, locals, dst.resolve, state);                                      // 3541
      var promises = [dst.resolve.then(function (globals) {                                                           // 3542
        dst.globals = globals;                                                                                        // 3543
      })];                                                                                                            // 3544
      if (inherited) promises.push(inherited);                                                                        // 3545
                                                                                                                      // 3546
      function resolveViews() {                                                                                       // 3547
        var viewsPromises = [];                                                                                       // 3548
                                                                                                                      // 3549
        // Resolve template and dependencies for all views.                                                           // 3550
        forEach(state.views, function (view, name) {                                                                  // 3551
          var injectables = (view.resolve && view.resolve !== state.resolve ? view.resolve : {});                     // 3552
          injectables.$template = [ function () {                                                                     // 3553
            return $view.load(name, { view: view, locals: dst.globals, params: $stateParams, notify: options.notify }) || '';
          }];                                                                                                         // 3555
                                                                                                                      // 3556
          viewsPromises.push($resolve.resolve(injectables, dst.globals, dst.resolve, state).then(function (result) {  // 3557
            // References to the controller (only instantiated at link time)                                          // 3558
            if (isFunction(view.controllerProvider) || isArray(view.controllerProvider)) {                            // 3559
              var injectLocals = angular.extend({}, injectables, dst.globals);                                        // 3560
              result.$$controller = $injector.invoke(view.controllerProvider, null, injectLocals);                    // 3561
            } else {                                                                                                  // 3562
              result.$$controller = view.controller;                                                                  // 3563
            }                                                                                                         // 3564
            // Provide access to the state itself for internal use                                                    // 3565
            result.$$state = state;                                                                                   // 3566
            result.$$controllerAs = view.controllerAs;                                                                // 3567
            dst[name] = result;                                                                                       // 3568
          }));                                                                                                        // 3569
        });                                                                                                           // 3570
                                                                                                                      // 3571
        return $q.all(viewsPromises).then(function(){                                                                 // 3572
          return dst.globals;                                                                                         // 3573
        });                                                                                                           // 3574
      }                                                                                                               // 3575
                                                                                                                      // 3576
      // Wait for all the promises and then return the activation object                                              // 3577
      return $q.all(promises).then(resolveViews).then(function (values) {                                             // 3578
        return dst;                                                                                                   // 3579
      });                                                                                                             // 3580
    }                                                                                                                 // 3581
                                                                                                                      // 3582
    return $state;                                                                                                    // 3583
  }                                                                                                                   // 3584
                                                                                                                      // 3585
  function shouldSkipReload(to, toParams, from, fromParams, locals, options) {                                        // 3586
    // Return true if there are no differences in non-search (path/object) params, false if there are differences     // 3587
    function nonSearchParamsEqual(fromAndToState, fromParams, toParams) {                                             // 3588
      // Identify whether all the parameters that differ between `fromParams` and `toParams` were search params.      // 3589
      function notSearchParam(key) {                                                                                  // 3590
        return fromAndToState.params[key].location != "search";                                                       // 3591
      }                                                                                                               // 3592
      var nonQueryParamKeys = fromAndToState.params.$$keys().filter(notSearchParam);                                  // 3593
      var nonQueryParams = pick.apply({}, [fromAndToState.params].concat(nonQueryParamKeys));                         // 3594
      var nonQueryParamSet = new $$UMFP.ParamSet(nonQueryParams);                                                     // 3595
      return nonQueryParamSet.$$equals(fromParams, toParams);                                                         // 3596
    }                                                                                                                 // 3597
                                                                                                                      // 3598
    // If reload was not explicitly requested                                                                         // 3599
    // and we're transitioning to the same state we're already in                                                     // 3600
    // and    the locals didn't change                                                                                // 3601
    //     or they changed in a way that doesn't merit reloading                                                      // 3602
    //        (reloadOnParams:false, or reloadOnSearch.false and only search params changed)                          // 3603
    // Then return true.                                                                                              // 3604
    if (!options.reload && to === from &&                                                                             // 3605
      (locals === from.locals || (to.self.reloadOnSearch === false && nonSearchParamsEqual(from, fromParams, toParams)))) {
      return true;                                                                                                    // 3607
    }                                                                                                                 // 3608
  }                                                                                                                   // 3609
}                                                                                                                     // 3610
                                                                                                                      // 3611
angular.module('ui.router.state')                                                                                     // 3612
  .value('$stateParams', {})                                                                                          // 3613
  .provider('$state', $StateProvider);                                                                                // 3614
                                                                                                                      // 3615
                                                                                                                      // 3616
$ViewProvider.$inject = [];                                                                                           // 3617
function $ViewProvider() {                                                                                            // 3618
                                                                                                                      // 3619
  this.$get = $get;                                                                                                   // 3620
  /**                                                                                                                 // 3621
   * @ngdoc object                                                                                                    // 3622
   * @name ui.router.state.$view                                                                                      // 3623
   *                                                                                                                  // 3624
   * @requires ui.router.util.$templateFactory                                                                        // 3625
   * @requires $rootScope                                                                                             // 3626
   *                                                                                                                  // 3627
   * @description                                                                                                     // 3628
   *                                                                                                                  // 3629
   */                                                                                                                 // 3630
  $get.$inject = ['$rootScope', '$templateFactory'];                                                                  // 3631
  function $get(   $rootScope,   $templateFactory) {                                                                  // 3632
    return {                                                                                                          // 3633
      // $view.load('full.viewName', { template: ..., controller: ..., resolve: ..., async: false, params: ... })     // 3634
      /**                                                                                                             // 3635
       * @ngdoc function                                                                                              // 3636
       * @name ui.router.state.$view#load                                                                             // 3637
       * @methodOf ui.router.state.$view                                                                              // 3638
       *                                                                                                              // 3639
       * @description                                                                                                 // 3640
       *                                                                                                              // 3641
       * @param {string} name name                                                                                    // 3642
       * @param {object} options option object.                                                                       // 3643
       */                                                                                                             // 3644
      load: function load(name, options) {                                                                            // 3645
        var result, defaults = {                                                                                      // 3646
          template: null, controller: null, view: null, locals: null, notify: true, async: true, params: {}           // 3647
        };                                                                                                            // 3648
        options = extend(defaults, options);                                                                          // 3649
                                                                                                                      // 3650
        if (options.view) {                                                                                           // 3651
          result = $templateFactory.fromConfig(options.view, options.params, options.locals);                         // 3652
        }                                                                                                             // 3653
        if (result && options.notify) {                                                                               // 3654
        /**                                                                                                           // 3655
         * @ngdoc event                                                                                               // 3656
         * @name ui.router.state.$state#$viewContentLoading                                                           // 3657
         * @eventOf ui.router.state.$view                                                                             // 3658
         * @eventType broadcast on root scope                                                                         // 3659
         * @description                                                                                               // 3660
         *                                                                                                            // 3661
         * Fired once the view **begins loading**, *before* the DOM is rendered.                                      // 3662
         *                                                                                                            // 3663
         * @param {Object} event Event object.                                                                        // 3664
         * @param {Object} viewConfig The view config properties (template, controller, etc).                         // 3665
         *                                                                                                            // 3666
         * @example                                                                                                   // 3667
         *                                                                                                            // 3668
         * <pre>                                                                                                      // 3669
         * $scope.$on('$viewContentLoading',                                                                          // 3670
         * function(event, viewConfig){                                                                               // 3671
         *     // Access to all the view config properties.                                                           // 3672
         *     // and one special property 'targetView'                                                               // 3673
         *     // viewConfig.targetView                                                                               // 3674
         * });                                                                                                        // 3675
         * </pre>                                                                                                     // 3676
         */                                                                                                           // 3677
          $rootScope.$broadcast('$viewContentLoading', options);                                                      // 3678
        }                                                                                                             // 3679
        return result;                                                                                                // 3680
      }                                                                                                               // 3681
    };                                                                                                                // 3682
  }                                                                                                                   // 3683
}                                                                                                                     // 3684
                                                                                                                      // 3685
angular.module('ui.router.state').provider('$view', $ViewProvider);                                                   // 3686
                                                                                                                      // 3687
/**                                                                                                                   // 3688
 * @ngdoc object                                                                                                      // 3689
 * @name ui.router.state.$uiViewScrollProvider                                                                        // 3690
 *                                                                                                                    // 3691
 * @description                                                                                                       // 3692
 * Provider that returns the {@link ui.router.state.$uiViewScroll} service function.                                  // 3693
 */                                                                                                                   // 3694
function $ViewScrollProvider() {                                                                                      // 3695
                                                                                                                      // 3696
  var useAnchorScroll = false;                                                                                        // 3697
                                                                                                                      // 3698
  /**                                                                                                                 // 3699
   * @ngdoc function                                                                                                  // 3700
   * @name ui.router.state.$uiViewScrollProvider#useAnchorScroll                                                      // 3701
   * @methodOf ui.router.state.$uiViewScrollProvider                                                                  // 3702
   *                                                                                                                  // 3703
   * @description                                                                                                     // 3704
   * Reverts back to using the core [`$anchorScroll`](http://docs.angularjs.org/api/ng.$anchorScroll) service for     // 3705
   * scrolling based on the url anchor.                                                                               // 3706
   */                                                                                                                 // 3707
  this.useAnchorScroll = function () {                                                                                // 3708
    useAnchorScroll = true;                                                                                           // 3709
  };                                                                                                                  // 3710
                                                                                                                      // 3711
  /**                                                                                                                 // 3712
   * @ngdoc object                                                                                                    // 3713
   * @name ui.router.state.$uiViewScroll                                                                              // 3714
   *                                                                                                                  // 3715
   * @requires $anchorScroll                                                                                          // 3716
   * @requires $timeout                                                                                               // 3717
   *                                                                                                                  // 3718
   * @description                                                                                                     // 3719
   * When called with a jqLite element, it scrolls the element into view (after a                                     // 3720
   * `$timeout` so the DOM has time to refresh).                                                                      // 3721
   *                                                                                                                  // 3722
   * If you prefer to rely on `$anchorScroll` to scroll the view to the anchor,                                       // 3723
   * this can be enabled by calling {@link ui.router.state.$uiViewScrollProvider#methods_useAnchorScroll `$uiViewScrollProvider.useAnchorScroll()`}.
   */                                                                                                                 // 3725
  this.$get = ['$anchorScroll', '$timeout', function ($anchorScroll, $timeout) {                                      // 3726
    if (useAnchorScroll) {                                                                                            // 3727
      return $anchorScroll;                                                                                           // 3728
    }                                                                                                                 // 3729
                                                                                                                      // 3730
    return function ($element) {                                                                                      // 3731
      return $timeout(function () {                                                                                   // 3732
        $element[0].scrollIntoView();                                                                                 // 3733
      }, 0, false);                                                                                                   // 3734
    };                                                                                                                // 3735
  }];                                                                                                                 // 3736
}                                                                                                                     // 3737
                                                                                                                      // 3738
angular.module('ui.router.state').provider('$uiViewScroll', $ViewScrollProvider);                                     // 3739
                                                                                                                      // 3740
/**                                                                                                                   // 3741
 * @ngdoc directive                                                                                                   // 3742
 * @name ui.router.state.directive:ui-view                                                                            // 3743
 *                                                                                                                    // 3744
 * @requires ui.router.state.$state                                                                                   // 3745
 * @requires $compile                                                                                                 // 3746
 * @requires $controller                                                                                              // 3747
 * @requires $injector                                                                                                // 3748
 * @requires ui.router.state.$uiViewScroll                                                                            // 3749
 * @requires $document                                                                                                // 3750
 *                                                                                                                    // 3751
 * @restrict ECA                                                                                                      // 3752
 *                                                                                                                    // 3753
 * @description                                                                                                       // 3754
 * The ui-view directive tells $state where to place your templates.                                                  // 3755
 *                                                                                                                    // 3756
 * @param {string=} name A view name. The name should be unique amongst the other views in the                        // 3757
 * same state. You can have views of the same name that live in different states.                                     // 3758
 *                                                                                                                    // 3759
 * @param {string=} autoscroll It allows you to set the scroll behavior of the browser window                         // 3760
 * when a view is populated. By default, $anchorScroll is overridden by ui-router's custom scroll                     // 3761
 * service, {@link ui.router.state.$uiViewScroll}. This custom service let's you                                      // 3762
 * scroll ui-view elements into view when they are populated during a state activation.                               // 3763
 *                                                                                                                    // 3764
 * *Note: To revert back to old [`$anchorScroll`](http://docs.angularjs.org/api/ng.$anchorScroll)                     // 3765
 * functionality, call `$uiViewScrollProvider.useAnchorScroll()`.*                                                    // 3766
 *                                                                                                                    // 3767
 * @param {string=} onload Expression to evaluate whenever the view updates.                                          // 3768
 *                                                                                                                    // 3769
 * @example                                                                                                           // 3770
 * A view can be unnamed or named.                                                                                    // 3771
 * <pre>                                                                                                              // 3772
 * <!-- Unnamed -->                                                                                                   // 3773
 * <div ui-view></div>                                                                                                // 3774
 *                                                                                                                    // 3775
 * <!-- Named -->                                                                                                     // 3776
 * <div ui-view="viewName"></div>                                                                                     // 3777
 * </pre>                                                                                                             // 3778
 *                                                                                                                    // 3779
 * You can only have one unnamed view within any template (or root html). If you are only using a                     // 3780
 * single view and it is unnamed then you can populate it like so:                                                    // 3781
 * <pre>                                                                                                              // 3782
 * <div ui-view></div>                                                                                                // 3783
 * $stateProvider.state("home", {                                                                                     // 3784
 *   template: "<h1>HELLO!</h1>"                                                                                      // 3785
 * })                                                                                                                 // 3786
 * </pre>                                                                                                             // 3787
 *                                                                                                                    // 3788
 * The above is a convenient shortcut equivalent to specifying your view explicitly with the {@link ui.router.state.$stateProvider#views `views`}
 * config property, by name, in this case an empty name:                                                              // 3790
 * <pre>                                                                                                              // 3791
 * $stateProvider.state("home", {                                                                                     // 3792
 *   views: {                                                                                                         // 3793
 *     "": {                                                                                                          // 3794
 *       template: "<h1>HELLO!</h1>"                                                                                  // 3795
 *     }                                                                                                              // 3796
 *   }                                                                                                                // 3797
 * })                                                                                                                 // 3798
 * </pre>                                                                                                             // 3799
 *                                                                                                                    // 3800
 * But typically you'll only use the views property if you name your view or have more than one view                  // 3801
 * in the same template. There's not really a compelling reason to name a view if its the only one,                   // 3802
 * but you could if you wanted, like so:                                                                              // 3803
 * <pre>                                                                                                              // 3804
 * <div ui-view="main"></div>                                                                                         // 3805
 * </pre>                                                                                                             // 3806
 * <pre>                                                                                                              // 3807
 * $stateProvider.state("home", {                                                                                     // 3808
 *   views: {                                                                                                         // 3809
 *     "main": {                                                                                                      // 3810
 *       template: "<h1>HELLO!</h1>"                                                                                  // 3811
 *     }                                                                                                              // 3812
 *   }                                                                                                                // 3813
 * })                                                                                                                 // 3814
 * </pre>                                                                                                             // 3815
 *                                                                                                                    // 3816
 * Really though, you'll use views to set up multiple views:                                                          // 3817
 * <pre>                                                                                                              // 3818
 * <div ui-view></div>                                                                                                // 3819
 * <div ui-view="chart"></div>                                                                                        // 3820
 * <div ui-view="data"></div>                                                                                         // 3821
 * </pre>                                                                                                             // 3822
 *                                                                                                                    // 3823
 * <pre>                                                                                                              // 3824
 * $stateProvider.state("home", {                                                                                     // 3825
 *   views: {                                                                                                         // 3826
 *     "": {                                                                                                          // 3827
 *       template: "<h1>HELLO!</h1>"                                                                                  // 3828
 *     },                                                                                                             // 3829
 *     "chart": {                                                                                                     // 3830
 *       template: "<chart_thing/>"                                                                                   // 3831
 *     },                                                                                                             // 3832
 *     "data": {                                                                                                      // 3833
 *       template: "<data_thing/>"                                                                                    // 3834
 *     }                                                                                                              // 3835
 *   }                                                                                                                // 3836
 * })                                                                                                                 // 3837
 * </pre>                                                                                                             // 3838
 *                                                                                                                    // 3839
 * Examples for `autoscroll`:                                                                                         // 3840
 *                                                                                                                    // 3841
 * <pre>                                                                                                              // 3842
 * <!-- If autoscroll present with no expression,                                                                     // 3843
 *      then scroll ui-view into view -->                                                                             // 3844
 * <ui-view autoscroll/>                                                                                              // 3845
 *                                                                                                                    // 3846
 * <!-- If autoscroll present with valid expression,                                                                  // 3847
 *      then scroll ui-view into view if expression evaluates to true -->                                             // 3848
 * <ui-view autoscroll='true'/>                                                                                       // 3849
 * <ui-view autoscroll='false'/>                                                                                      // 3850
 * <ui-view autoscroll='scopeVariable'/>                                                                              // 3851
 * </pre>                                                                                                             // 3852
 */                                                                                                                   // 3853
$ViewDirective.$inject = ['$state', '$injector', '$uiViewScroll', '$interpolate'];                                    // 3854
function $ViewDirective(   $state,   $injector,   $uiViewScroll,   $interpolate) {                                    // 3855
                                                                                                                      // 3856
  function getService() {                                                                                             // 3857
    return ($injector.has) ? function(service) {                                                                      // 3858
      return $injector.has(service) ? $injector.get(service) : null;                                                  // 3859
    } : function(service) {                                                                                           // 3860
      try {                                                                                                           // 3861
        return $injector.get(service);                                                                                // 3862
      } catch (e) {                                                                                                   // 3863
        return null;                                                                                                  // 3864
      }                                                                                                               // 3865
    };                                                                                                                // 3866
  }                                                                                                                   // 3867
                                                                                                                      // 3868
  var service = getService(),                                                                                         // 3869
      $animator = service('$animator'),                                                                               // 3870
      $animate = service('$animate');                                                                                 // 3871
                                                                                                                      // 3872
  // Returns a set of DOM manipulation functions based on which Angular version                                       // 3873
  // it should use                                                                                                    // 3874
  function getRenderer(attrs, scope) {                                                                                // 3875
    var statics = function() {                                                                                        // 3876
      return {                                                                                                        // 3877
        enter: function (element, target, cb) { target.after(element); cb(); },                                       // 3878
        leave: function (element, cb) { element.remove(); cb(); }                                                     // 3879
      };                                                                                                              // 3880
    };                                                                                                                // 3881
                                                                                                                      // 3882
    if ($animate) {                                                                                                   // 3883
      return {                                                                                                        // 3884
        enter: function(element, target, cb) {                                                                        // 3885
          var promise = $animate.enter(element, null, target, cb);                                                    // 3886
          if (promise && promise.then) promise.then(cb);                                                              // 3887
        },                                                                                                            // 3888
        leave: function(element, cb) {                                                                                // 3889
          var promise = $animate.leave(element, cb);                                                                  // 3890
          if (promise && promise.then) promise.then(cb);                                                              // 3891
        }                                                                                                             // 3892
      };                                                                                                              // 3893
    }                                                                                                                 // 3894
                                                                                                                      // 3895
    if ($animator) {                                                                                                  // 3896
      var animate = $animator && $animator(scope, attrs);                                                             // 3897
                                                                                                                      // 3898
      return {                                                                                                        // 3899
        enter: function(element, target, cb) {animate.enter(element, null, target); cb(); },                          // 3900
        leave: function(element, cb) { animate.leave(element); cb(); }                                                // 3901
      };                                                                                                              // 3902
    }                                                                                                                 // 3903
                                                                                                                      // 3904
    return statics();                                                                                                 // 3905
  }                                                                                                                   // 3906
                                                                                                                      // 3907
  var directive = {                                                                                                   // 3908
    restrict: 'ECA',                                                                                                  // 3909
    terminal: true,                                                                                                   // 3910
    priority: 400,                                                                                                    // 3911
    transclude: 'element',                                                                                            // 3912
    compile: function (tElement, tAttrs, $transclude) {                                                               // 3913
      return function (scope, $element, attrs) {                                                                      // 3914
        var previousEl, currentEl, currentScope, latestLocals,                                                        // 3915
            onloadExp     = attrs.onload || '',                                                                       // 3916
            autoScrollExp = attrs.autoscroll,                                                                         // 3917
            renderer      = getRenderer(attrs, scope);                                                                // 3918
                                                                                                                      // 3919
        scope.$on('$stateChangeSuccess', function() {                                                                 // 3920
          updateView(false);                                                                                          // 3921
        });                                                                                                           // 3922
        scope.$on('$viewContentLoading', function() {                                                                 // 3923
          updateView(false);                                                                                          // 3924
        });                                                                                                           // 3925
                                                                                                                      // 3926
        updateView(true);                                                                                             // 3927
                                                                                                                      // 3928
        function cleanupLastView() {                                                                                  // 3929
          if (previousEl) {                                                                                           // 3930
            previousEl.remove();                                                                                      // 3931
            previousEl = null;                                                                                        // 3932
          }                                                                                                           // 3933
                                                                                                                      // 3934
          if (currentScope) {                                                                                         // 3935
            currentScope.$destroy();                                                                                  // 3936
            currentScope = null;                                                                                      // 3937
          }                                                                                                           // 3938
                                                                                                                      // 3939
          if (currentEl) {                                                                                            // 3940
            renderer.leave(currentEl, function() {                                                                    // 3941
              previousEl = null;                                                                                      // 3942
            });                                                                                                       // 3943
                                                                                                                      // 3944
            previousEl = currentEl;                                                                                   // 3945
            currentEl = null;                                                                                         // 3946
          }                                                                                                           // 3947
        }                                                                                                             // 3948
                                                                                                                      // 3949
        function updateView(firstTime) {                                                                              // 3950
          var newScope,                                                                                               // 3951
              name            = getUiViewName(scope, attrs, $element, $interpolate),                                  // 3952
              previousLocals  = name && $state.$current && $state.$current.locals[name];                              // 3953
                                                                                                                      // 3954
          if (!firstTime && previousLocals === latestLocals) return; // nothing to do                                 // 3955
          newScope = scope.$new();                                                                                    // 3956
          latestLocals = $state.$current.locals[name];                                                                // 3957
                                                                                                                      // 3958
          var clone = $transclude(newScope, function(clone) {                                                         // 3959
            renderer.enter(clone, $element, function onUiViewEnter() {                                                // 3960
              if(currentScope) {                                                                                      // 3961
                currentScope.$emit('$viewContentAnimationEnded');                                                     // 3962
              }                                                                                                       // 3963
                                                                                                                      // 3964
              if (angular.isDefined(autoScrollExp) && !autoScrollExp || scope.$eval(autoScrollExp)) {                 // 3965
                $uiViewScroll(clone);                                                                                 // 3966
              }                                                                                                       // 3967
            });                                                                                                       // 3968
            cleanupLastView();                                                                                        // 3969
          });                                                                                                         // 3970
                                                                                                                      // 3971
          currentEl = clone;                                                                                          // 3972
          currentScope = newScope;                                                                                    // 3973
          /**                                                                                                         // 3974
           * @ngdoc event                                                                                             // 3975
           * @name ui.router.state.directive:ui-view#$viewContentLoaded                                               // 3976
           * @eventOf ui.router.state.directive:ui-view                                                               // 3977
           * @eventType emits on ui-view directive scope                                                              // 3978
           * @description           *                                                                                 // 3979
           * Fired once the view is **loaded**, *after* the DOM is rendered.                                          // 3980
           *                                                                                                          // 3981
           * @param {Object} event Event object.                                                                      // 3982
           */                                                                                                         // 3983
          currentScope.$emit('$viewContentLoaded');                                                                   // 3984
          currentScope.$eval(onloadExp);                                                                              // 3985
        }                                                                                                             // 3986
      };                                                                                                              // 3987
    }                                                                                                                 // 3988
  };                                                                                                                  // 3989
                                                                                                                      // 3990
  return directive;                                                                                                   // 3991
}                                                                                                                     // 3992
                                                                                                                      // 3993
$ViewDirectiveFill.$inject = ['$compile', '$controller', '$state', '$interpolate'];                                   // 3994
function $ViewDirectiveFill (  $compile,   $controller,   $state,   $interpolate) {                                   // 3995
  return {                                                                                                            // 3996
    restrict: 'ECA',                                                                                                  // 3997
    priority: -400,                                                                                                   // 3998
    compile: function (tElement) {                                                                                    // 3999
      var initial = tElement.html();                                                                                  // 4000
      return function (scope, $element, attrs) {                                                                      // 4001
        var current = $state.$current,                                                                                // 4002
            name = getUiViewName(scope, attrs, $element, $interpolate),                                               // 4003
            locals  = current && current.locals[name];                                                                // 4004
                                                                                                                      // 4005
        if (! locals) {                                                                                               // 4006
          return;                                                                                                     // 4007
        }                                                                                                             // 4008
                                                                                                                      // 4009
        $element.data('$uiView', { name: name, state: locals.$$state });                                              // 4010
        $element.html(locals.$template ? locals.$template : initial);                                                 // 4011
                                                                                                                      // 4012
        var link = $compile($element.contents());                                                                     // 4013
                                                                                                                      // 4014
        if (locals.$$controller) {                                                                                    // 4015
          locals.$scope = scope;                                                                                      // 4016
          locals.$element = $element;                                                                                 // 4017
          var controller = $controller(locals.$$controller, locals);                                                  // 4018
          if (locals.$$controllerAs) {                                                                                // 4019
            scope[locals.$$controllerAs] = controller;                                                                // 4020
          }                                                                                                           // 4021
          $element.data('$ngControllerController', controller);                                                       // 4022
          $element.children().data('$ngControllerController', controller);                                            // 4023
        }                                                                                                             // 4024
                                                                                                                      // 4025
        link(scope);                                                                                                  // 4026
      };                                                                                                              // 4027
    }                                                                                                                 // 4028
  };                                                                                                                  // 4029
}                                                                                                                     // 4030
                                                                                                                      // 4031
/**                                                                                                                   // 4032
 * Shared ui-view code for both directives:                                                                           // 4033
 * Given scope, element, and its attributes, return the view's name                                                   // 4034
 */                                                                                                                   // 4035
function getUiViewName(scope, attrs, element, $interpolate) {                                                         // 4036
  var name = $interpolate(attrs.uiView || attrs.name || '')(scope);                                                   // 4037
  var inherited = element.inheritedData('$uiView');                                                                   // 4038
  return name.indexOf('@') >= 0 ?  name :  (name + '@' + (inherited ? inherited.state.name : ''));                    // 4039
}                                                                                                                     // 4040
                                                                                                                      // 4041
angular.module('ui.router.state').directive('uiView', $ViewDirective);                                                // 4042
angular.module('ui.router.state').directive('uiView', $ViewDirectiveFill);                                            // 4043
                                                                                                                      // 4044
function parseStateRef(ref, current) {                                                                                // 4045
  var preparsed = ref.match(/^\s*({[^}]*})\s*$/), parsed;                                                             // 4046
  if (preparsed) ref = current + '(' + preparsed[1] + ')';                                                            // 4047
  parsed = ref.replace(/\n/g, " ").match(/^([^(]+?)\s*(\((.*)\))?$/);                                                 // 4048
  if (!parsed || parsed.length !== 4) throw new Error("Invalid state ref '" + ref + "'");                             // 4049
  return { state: parsed[1], paramExpr: parsed[3] || null };                                                          // 4050
}                                                                                                                     // 4051
                                                                                                                      // 4052
function stateContext(el) {                                                                                           // 4053
  var stateData = el.parent().inheritedData('$uiView');                                                               // 4054
                                                                                                                      // 4055
  if (stateData && stateData.state && stateData.state.name) {                                                         // 4056
    return stateData.state;                                                                                           // 4057
  }                                                                                                                   // 4058
}                                                                                                                     // 4059
                                                                                                                      // 4060
/**                                                                                                                   // 4061
 * @ngdoc directive                                                                                                   // 4062
 * @name ui.router.state.directive:ui-sref                                                                            // 4063
 *                                                                                                                    // 4064
 * @requires ui.router.state.$state                                                                                   // 4065
 * @requires $timeout                                                                                                 // 4066
 *                                                                                                                    // 4067
 * @restrict A                                                                                                        // 4068
 *                                                                                                                    // 4069
 * @description                                                                                                       // 4070
 * A directive that binds a link (`<a>` tag) to a state. If the state has an associated                               // 4071
 * URL, the directive will automatically generate & update the `href` attribute via                                   // 4072
 * the {@link ui.router.state.$state#methods_href $state.href()} method. Clicking                                     // 4073
 * the link will trigger a state transition with optional parameters.                                                 // 4074
 *                                                                                                                    // 4075
 * Also middle-clicking, right-clicking, and ctrl-clicking on the link will be                                        // 4076
 * handled natively by the browser.                                                                                   // 4077
 *                                                                                                                    // 4078
 * You can also use relative state paths within ui-sref, just like the relative                                       // 4079
 * paths passed to `$state.go()`. You just need to be aware that the path is relative                                 // 4080
 * to the state that the link lives in, in other words the state that loaded the                                      // 4081
 * template containing the link.                                                                                      // 4082
 *                                                                                                                    // 4083
 * You can specify options to pass to {@link ui.router.state.$state#go $state.go()}                                   // 4084
 * using the `ui-sref-opts` attribute. Options are restricted to `location`, `inherit`,                               // 4085
 * and `reload`.                                                                                                      // 4086
 *                                                                                                                    // 4087
 * @example                                                                                                           // 4088
 * Here's an example of how you'd use ui-sref and how it would compile. If you have the                               // 4089
 * following template:                                                                                                // 4090
 * <pre>                                                                                                              // 4091
 * <a ui-sref="home">Home</a> | <a ui-sref="about">About</a> | <a ui-sref="{page: 2}">Next page</a>                   // 4092
 *                                                                                                                    // 4093
 * <ul>                                                                                                               // 4094
 *     <li ng-repeat="contact in contacts">                                                                           // 4095
 *         <a ui-sref="contacts.detail({ id: contact.id })">{{ contact.name }}</a>                                    // 4096
 *     </li>                                                                                                          // 4097
 * </ul>                                                                                                              // 4098
 * </pre>                                                                                                             // 4099
 *                                                                                                                    // 4100
 * Then the compiled html would be (assuming Html5Mode is off and current state is contacts):                         // 4101
 * <pre>                                                                                                              // 4102
 * <a href="#/home" ui-sref="home">Home</a> | <a href="#/about" ui-sref="about">About</a> | <a href="#/contacts?page=2" ui-sref="{page: 2}">Next page</a>
 *                                                                                                                    // 4104
 * <ul>                                                                                                               // 4105
 *     <li ng-repeat="contact in contacts">                                                                           // 4106
 *         <a href="#/contacts/1" ui-sref="contacts.detail({ id: contact.id })">Joe</a>                               // 4107
 *     </li>                                                                                                          // 4108
 *     <li ng-repeat="contact in contacts">                                                                           // 4109
 *         <a href="#/contacts/2" ui-sref="contacts.detail({ id: contact.id })">Alice</a>                             // 4110
 *     </li>                                                                                                          // 4111
 *     <li ng-repeat="contact in contacts">                                                                           // 4112
 *         <a href="#/contacts/3" ui-sref="contacts.detail({ id: contact.id })">Bob</a>                               // 4113
 *     </li>                                                                                                          // 4114
 * </ul>                                                                                                              // 4115
 *                                                                                                                    // 4116
 * <a ui-sref="home" ui-sref-opts="{reload: true}">Home</a>                                                           // 4117
 * </pre>                                                                                                             // 4118
 *                                                                                                                    // 4119
 * @param {string} ui-sref 'stateName' can be any valid absolute or relative state                                    // 4120
 * @param {Object} ui-sref-opts options to pass to {@link ui.router.state.$state#go $state.go()}                      // 4121
 */                                                                                                                   // 4122
$StateRefDirective.$inject = ['$state', '$timeout'];                                                                  // 4123
function $StateRefDirective($state, $timeout) {                                                                       // 4124
  var allowedOptions = ['location', 'inherit', 'reload', 'absolute'];                                                 // 4125
                                                                                                                      // 4126
  return {                                                                                                            // 4127
    restrict: 'A',                                                                                                    // 4128
    require: ['?^uiSrefActive', '?^uiSrefActiveEq'],                                                                  // 4129
    link: function(scope, element, attrs, uiSrefActive) {                                                             // 4130
      var ref = parseStateRef(attrs.uiSref, $state.current.name);                                                     // 4131
      var params = null, url = null, base = stateContext(element) || $state.$current;                                 // 4132
      // SVGAElement does not use the href attribute, but rather the 'xlinkHref' attribute.                           // 4133
      var hrefKind = Object.prototype.toString.call(element.prop('href')) === '[object SVGAnimatedString]' ?          // 4134
                 'xlink:href' : 'href';                                                                               // 4135
      var newHref = null, isAnchor = element.prop("tagName").toUpperCase() === "A";                                   // 4136
      var isForm = element[0].nodeName === "FORM";                                                                    // 4137
      var attr = isForm ? "action" : hrefKind, nav = true;                                                            // 4138
                                                                                                                      // 4139
      var options = { relative: base, inherit: true };                                                                // 4140
      var optionsOverride = scope.$eval(attrs.uiSrefOpts) || {};                                                      // 4141
                                                                                                                      // 4142
      angular.forEach(allowedOptions, function(option) {                                                              // 4143
        if (option in optionsOverride) {                                                                              // 4144
          options[option] = optionsOverride[option];                                                                  // 4145
        }                                                                                                             // 4146
      });                                                                                                             // 4147
                                                                                                                      // 4148
      var update = function(newVal) {                                                                                 // 4149
        if (newVal) params = angular.copy(newVal);                                                                    // 4150
        if (!nav) return;                                                                                             // 4151
                                                                                                                      // 4152
        newHref = $state.href(ref.state, params, options);                                                            // 4153
                                                                                                                      // 4154
        var activeDirective = uiSrefActive[1] || uiSrefActive[0];                                                     // 4155
        if (activeDirective) {                                                                                        // 4156
          activeDirective.$$addStateInfo(ref.state, params);                                                          // 4157
        }                                                                                                             // 4158
        if (newHref === null) {                                                                                       // 4159
          nav = false;                                                                                                // 4160
          return false;                                                                                               // 4161
        }                                                                                                             // 4162
        attrs.$set(attr, newHref);                                                                                    // 4163
      };                                                                                                              // 4164
                                                                                                                      // 4165
      if (ref.paramExpr) {                                                                                            // 4166
        scope.$watch(ref.paramExpr, function(newVal, oldVal) {                                                        // 4167
          if (newVal !== params) update(newVal);                                                                      // 4168
        }, true);                                                                                                     // 4169
        params = angular.copy(scope.$eval(ref.paramExpr));                                                            // 4170
      }                                                                                                               // 4171
      update();                                                                                                       // 4172
                                                                                                                      // 4173
      if (isForm) return;                                                                                             // 4174
                                                                                                                      // 4175
      element.bind("click", function(e) {                                                                             // 4176
        var button = e.which || e.button;                                                                             // 4177
        if ( !(button > 1 || e.ctrlKey || e.metaKey || e.shiftKey || element.attr('target')) ) {                      // 4178
          // HACK: This is to allow ng-clicks to be processed before the transition is initiated:                     // 4179
          var transition = $timeout(function() {                                                                      // 4180
            $state.go(ref.state, params, options);                                                                    // 4181
          });                                                                                                         // 4182
          e.preventDefault();                                                                                         // 4183
                                                                                                                      // 4184
          // if the state has no URL, ignore one preventDefault from the <a> directive.                               // 4185
          var ignorePreventDefaultCount = isAnchor && !newHref ? 1: 0;                                                // 4186
          e.preventDefault = function() {                                                                             // 4187
            if (ignorePreventDefaultCount-- <= 0)                                                                     // 4188
              $timeout.cancel(transition);                                                                            // 4189
          };                                                                                                          // 4190
        }                                                                                                             // 4191
      });                                                                                                             // 4192
    }                                                                                                                 // 4193
  };                                                                                                                  // 4194
}                                                                                                                     // 4195
                                                                                                                      // 4196
/**                                                                                                                   // 4197
 * @ngdoc directive                                                                                                   // 4198
 * @name ui.router.state.directive:ui-sref-active                                                                     // 4199
 *                                                                                                                    // 4200
 * @requires ui.router.state.$state                                                                                   // 4201
 * @requires ui.router.state.$stateParams                                                                             // 4202
 * @requires $interpolate                                                                                             // 4203
 *                                                                                                                    // 4204
 * @restrict A                                                                                                        // 4205
 *                                                                                                                    // 4206
 * @description                                                                                                       // 4207
 * A directive working alongside ui-sref to add classes to an element when the                                        // 4208
 * related ui-sref directive's state is active, and removing them when it is inactive.                                // 4209
 * The primary use-case is to simplify the special appearance of navigation menus                                     // 4210
 * relying on `ui-sref`, by having the "active" state's menu button appear different,                                 // 4211
 * distinguishing it from the inactive menu items.                                                                    // 4212
 *                                                                                                                    // 4213
 * ui-sref-active can live on the same element as ui-sref or on a parent element. The first                           // 4214
 * ui-sref-active found at the same level or above the ui-sref will be used.                                          // 4215
 *                                                                                                                    // 4216
 * Will activate when the ui-sref's target state or any child state is active. If you                                 // 4217
 * need to activate only when the ui-sref target state is active and *not* any of                                     // 4218
 * it's children, then you will use                                                                                   // 4219
 * {@link ui.router.state.directive:ui-sref-active-eq ui-sref-active-eq}                                              // 4220
 *                                                                                                                    // 4221
 * @example                                                                                                           // 4222
 * Given the following template:                                                                                      // 4223
 * <pre>                                                                                                              // 4224
 * <ul>                                                                                                               // 4225
 *   <li ui-sref-active="active" class="item">                                                                        // 4226
 *     <a href ui-sref="app.user({user: 'bilbobaggins'})">@bilbobaggins</a>                                           // 4227
 *   </li>                                                                                                            // 4228
 * </ul>                                                                                                              // 4229
 * </pre>                                                                                                             // 4230
 *                                                                                                                    // 4231
 *                                                                                                                    // 4232
 * When the app state is "app.user" (or any children states), and contains the state parameter "user" with value "bilbobaggins",
 * the resulting HTML will appear as (note the 'active' class):                                                       // 4234
 * <pre>                                                                                                              // 4235
 * <ul>                                                                                                               // 4236
 *   <li ui-sref-active="active" class="item active">                                                                 // 4237
 *     <a ui-sref="app.user({user: 'bilbobaggins'})" href="/users/bilbobaggins">@bilbobaggins</a>                     // 4238
 *   </li>                                                                                                            // 4239
 * </ul>                                                                                                              // 4240
 * </pre>                                                                                                             // 4241
 *                                                                                                                    // 4242
 * The class name is interpolated **once** during the directives link time (any further changes to the                // 4243
 * interpolated value are ignored).                                                                                   // 4244
 *                                                                                                                    // 4245
 * Multiple classes may be specified in a space-separated format:                                                     // 4246
 * <pre>                                                                                                              // 4247
 * <ul>                                                                                                               // 4248
 *   <li ui-sref-active='class1 class2 class3'>                                                                       // 4249
 *     <a ui-sref="app.user">link</a>                                                                                 // 4250
 *   </li>                                                                                                            // 4251
 * </ul>                                                                                                              // 4252
 * </pre>                                                                                                             // 4253
 */                                                                                                                   // 4254
                                                                                                                      // 4255
/**                                                                                                                   // 4256
 * @ngdoc directive                                                                                                   // 4257
 * @name ui.router.state.directive:ui-sref-active-eq                                                                  // 4258
 *                                                                                                                    // 4259
 * @requires ui.router.state.$state                                                                                   // 4260
 * @requires ui.router.state.$stateParams                                                                             // 4261
 * @requires $interpolate                                                                                             // 4262
 *                                                                                                                    // 4263
 * @restrict A                                                                                                        // 4264
 *                                                                                                                    // 4265
 * @description                                                                                                       // 4266
 * The same as {@link ui.router.state.directive:ui-sref-active ui-sref-active} but will only activate                 // 4267
 * when the exact target state used in the `ui-sref` is active; no child states.                                      // 4268
 *                                                                                                                    // 4269
 */                                                                                                                   // 4270
$StateRefActiveDirective.$inject = ['$state', '$stateParams', '$interpolate'];                                        // 4271
function $StateRefActiveDirective($state, $stateParams, $interpolate) {                                               // 4272
  return  {                                                                                                           // 4273
    restrict: "A",                                                                                                    // 4274
    controller: ['$scope', '$element', '$attrs', function ($scope, $element, $attrs) {                                // 4275
      var states = [], activeClass;                                                                                   // 4276
                                                                                                                      // 4277
      // There probably isn't much point in $observing this                                                           // 4278
      // uiSrefActive and uiSrefActiveEq share the same directive object with some                                    // 4279
      // slight difference in logic routing                                                                           // 4280
      activeClass = $interpolate($attrs.uiSrefActiveEq || $attrs.uiSrefActive || '', false)($scope);                  // 4281
                                                                                                                      // 4282
      // Allow uiSref to communicate with uiSrefActive[Equals]                                                        // 4283
      this.$$addStateInfo = function (newState, newParams) {                                                          // 4284
        var state = $state.get(newState, stateContext($element));                                                     // 4285
                                                                                                                      // 4286
        states.push({                                                                                                 // 4287
          state: state || { name: newState },                                                                         // 4288
          params: newParams                                                                                           // 4289
        });                                                                                                           // 4290
                                                                                                                      // 4291
        update();                                                                                                     // 4292
      };                                                                                                              // 4293
                                                                                                                      // 4294
      $scope.$on('$stateChangeSuccess', update);                                                                      // 4295
                                                                                                                      // 4296
      // Update route state                                                                                           // 4297
      function update() {                                                                                             // 4298
        if (anyMatch()) {                                                                                             // 4299
          $element.addClass(activeClass);                                                                             // 4300
        } else {                                                                                                      // 4301
          $element.removeClass(activeClass);                                                                          // 4302
        }                                                                                                             // 4303
      }                                                                                                               // 4304
                                                                                                                      // 4305
      function anyMatch() {                                                                                           // 4306
        for (var i = 0; i < states.length; i++) {                                                                     // 4307
          if (isMatch(states[i].state, states[i].params)) {                                                           // 4308
            return true;                                                                                              // 4309
          }                                                                                                           // 4310
        }                                                                                                             // 4311
        return false;                                                                                                 // 4312
      }                                                                                                               // 4313
                                                                                                                      // 4314
      function isMatch(state, params) {                                                                               // 4315
        if (typeof $attrs.uiSrefActiveEq !== 'undefined') {                                                           // 4316
          return $state.is(state.name, params);                                                                       // 4317
        } else {                                                                                                      // 4318
          return $state.includes(state.name, params);                                                                 // 4319
        }                                                                                                             // 4320
      }                                                                                                               // 4321
    }]                                                                                                                // 4322
  };                                                                                                                  // 4323
}                                                                                                                     // 4324
                                                                                                                      // 4325
angular.module('ui.router.state')                                                                                     // 4326
  .directive('uiSref', $StateRefDirective)                                                                            // 4327
  .directive('uiSrefActive', $StateRefActiveDirective)                                                                // 4328
  .directive('uiSrefActiveEq', $StateRefActiveDirective);                                                             // 4329
                                                                                                                      // 4330
/**                                                                                                                   // 4331
 * @ngdoc filter                                                                                                      // 4332
 * @name ui.router.state.filter:isState                                                                               // 4333
 *                                                                                                                    // 4334
 * @requires ui.router.state.$state                                                                                   // 4335
 *                                                                                                                    // 4336
 * @description                                                                                                       // 4337
 * Translates to {@link ui.router.state.$state#methods_is $state.is("stateName")}.                                    // 4338
 */                                                                                                                   // 4339
$IsStateFilter.$inject = ['$state'];                                                                                  // 4340
function $IsStateFilter($state) {                                                                                     // 4341
  var isFilter = function (state) {                                                                                   // 4342
    return $state.is(state);                                                                                          // 4343
  };                                                                                                                  // 4344
  isFilter.$stateful = true;                                                                                          // 4345
  return isFilter;                                                                                                    // 4346
}                                                                                                                     // 4347
                                                                                                                      // 4348
/**                                                                                                                   // 4349
 * @ngdoc filter                                                                                                      // 4350
 * @name ui.router.state.filter:includedByState                                                                       // 4351
 *                                                                                                                    // 4352
 * @requires ui.router.state.$state                                                                                   // 4353
 *                                                                                                                    // 4354
 * @description                                                                                                       // 4355
 * Translates to {@link ui.router.state.$state#methods_includes $state.includes('fullOrPartialStateName')}.           // 4356
 */                                                                                                                   // 4357
$IncludedByStateFilter.$inject = ['$state'];                                                                          // 4358
function $IncludedByStateFilter($state) {                                                                             // 4359
  var includesFilter = function (state) {                                                                             // 4360
    return $state.includes(state);                                                                                    // 4361
  };                                                                                                                  // 4362
  includesFilter.$stateful = true;                                                                                    // 4363
  return  includesFilter;                                                                                             // 4364
}                                                                                                                     // 4365
                                                                                                                      // 4366
angular.module('ui.router.state')                                                                                     // 4367
  .filter('isState', $IsStateFilter)                                                                                  // 4368
  .filter('includedByState', $IncludedByStateFilter);                                                                 // 4369
})(window, window.angular);                                                                                           // 4370
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                     // 4380
}).call(this);                                                       // 4381
                                                                     // 4382
///////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['angularui:angular-ui-router'] = {};

})();

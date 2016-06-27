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

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/angular_angular-animate/angular-animate.js                                                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
/**                                                                                                                    // 1
 * @license AngularJS v1.4.8                                                                                           // 2
 * (c) 2010-2015 Google, Inc. http://angularjs.org                                                                     // 3
 * License: MIT                                                                                                        // 4
 */                                                                                                                    // 5
(function(window, angular, undefined) {'use strict';                                                                   // 6
                                                                                                                       // 7
/* jshint ignore:start */                                                                                              // 8
var noop        = angular.noop;                                                                                        // 9
var extend      = angular.extend;                                                                                      // 10
var jqLite      = angular.element;                                                                                     // 11
var forEach     = angular.forEach;                                                                                     // 12
var isArray     = angular.isArray;                                                                                     // 13
var isString    = angular.isString;                                                                                    // 14
var isObject    = angular.isObject;                                                                                    // 15
var isUndefined = angular.isUndefined;                                                                                 // 16
var isDefined   = angular.isDefined;                                                                                   // 17
var isFunction  = angular.isFunction;                                                                                  // 18
var isElement   = angular.isElement;                                                                                   // 19
                                                                                                                       // 20
var ELEMENT_NODE = 1;                                                                                                  // 21
var COMMENT_NODE = 8;                                                                                                  // 22
                                                                                                                       // 23
var ADD_CLASS_SUFFIX = '-add';                                                                                         // 24
var REMOVE_CLASS_SUFFIX = '-remove';                                                                                   // 25
var EVENT_CLASS_PREFIX = 'ng-';                                                                                        // 26
var ACTIVE_CLASS_SUFFIX = '-active';                                                                                   // 27
                                                                                                                       // 28
var NG_ANIMATE_CLASSNAME = 'ng-animate';                                                                               // 29
var NG_ANIMATE_CHILDREN_DATA = '$$ngAnimateChildren';                                                                  // 30
                                                                                                                       // 31
// Detect proper transitionend/animationend event names.                                                               // 32
var CSS_PREFIX = '', TRANSITION_PROP, TRANSITIONEND_EVENT, ANIMATION_PROP, ANIMATIONEND_EVENT;                         // 33
                                                                                                                       // 34
// If unprefixed events are not supported but webkit-prefixed are, use the latter.                                     // 35
// Otherwise, just use W3C names, browsers not supporting them at all will just ignore them.                           // 36
// Note: Chrome implements `window.onwebkitanimationend` and doesn't implement `window.onanimationend`                 // 37
// but at the same time dispatches the `animationend` event and not `webkitAnimationEnd`.                              // 38
// Register both events in case `window.onanimationend` is not supported because of that,                              // 39
// do the same for `transitionend` as Safari is likely to exhibit similar behavior.                                    // 40
// Also, the only modern browser that uses vendor prefixes for transitions/keyframes is webkit                         // 41
// therefore there is no reason to test anymore for other vendor prefixes:                                             // 42
// http://caniuse.com/#search=transition                                                                               // 43
if (isUndefined(window.ontransitionend) && isDefined(window.onwebkittransitionend)) {                                  // 44
  CSS_PREFIX = '-webkit-';                                                                                             // 45
  TRANSITION_PROP = 'WebkitTransition';                                                                                // 46
  TRANSITIONEND_EVENT = 'webkitTransitionEnd transitionend';                                                           // 47
} else {                                                                                                               // 48
  TRANSITION_PROP = 'transition';                                                                                      // 49
  TRANSITIONEND_EVENT = 'transitionend';                                                                               // 50
}                                                                                                                      // 51
                                                                                                                       // 52
if (isUndefined(window.onanimationend) && isDefined(window.onwebkitanimationend)) {                                    // 53
  CSS_PREFIX = '-webkit-';                                                                                             // 54
  ANIMATION_PROP = 'WebkitAnimation';                                                                                  // 55
  ANIMATIONEND_EVENT = 'webkitAnimationEnd animationend';                                                              // 56
} else {                                                                                                               // 57
  ANIMATION_PROP = 'animation';                                                                                        // 58
  ANIMATIONEND_EVENT = 'animationend';                                                                                 // 59
}                                                                                                                      // 60
                                                                                                                       // 61
var DURATION_KEY = 'Duration';                                                                                         // 62
var PROPERTY_KEY = 'Property';                                                                                         // 63
var DELAY_KEY = 'Delay';                                                                                               // 64
var TIMING_KEY = 'TimingFunction';                                                                                     // 65
var ANIMATION_ITERATION_COUNT_KEY = 'IterationCount';                                                                  // 66
var ANIMATION_PLAYSTATE_KEY = 'PlayState';                                                                             // 67
var SAFE_FAST_FORWARD_DURATION_VALUE = 9999;                                                                           // 68
                                                                                                                       // 69
var ANIMATION_DELAY_PROP = ANIMATION_PROP + DELAY_KEY;                                                                 // 70
var ANIMATION_DURATION_PROP = ANIMATION_PROP + DURATION_KEY;                                                           // 71
var TRANSITION_DELAY_PROP = TRANSITION_PROP + DELAY_KEY;                                                               // 72
var TRANSITION_DURATION_PROP = TRANSITION_PROP + DURATION_KEY;                                                         // 73
                                                                                                                       // 74
var isPromiseLike = function(p) {                                                                                      // 75
  return p && p.then ? true : false;                                                                                   // 76
};                                                                                                                     // 77
                                                                                                                       // 78
function assertArg(arg, name, reason) {                                                                                // 79
  if (!arg) {                                                                                                          // 80
    throw ngMinErr('areq', "Argument '{0}' is {1}", (name || '?'), (reason || "required"));                            // 81
  }                                                                                                                    // 82
  return arg;                                                                                                          // 83
}                                                                                                                      // 84
                                                                                                                       // 85
function mergeClasses(a,b) {                                                                                           // 86
  if (!a && !b) return '';                                                                                             // 87
  if (!a) return b;                                                                                                    // 88
  if (!b) return a;                                                                                                    // 89
  if (isArray(a)) a = a.join(' ');                                                                                     // 90
  if (isArray(b)) b = b.join(' ');                                                                                     // 91
  return a + ' ' + b;                                                                                                  // 92
}                                                                                                                      // 93
                                                                                                                       // 94
function packageStyles(options) {                                                                                      // 95
  var styles = {};                                                                                                     // 96
  if (options && (options.to || options.from)) {                                                                       // 97
    styles.to = options.to;                                                                                            // 98
    styles.from = options.from;                                                                                        // 99
  }                                                                                                                    // 100
  return styles;                                                                                                       // 101
}                                                                                                                      // 102
                                                                                                                       // 103
function pendClasses(classes, fix, isPrefix) {                                                                         // 104
  var className = '';                                                                                                  // 105
  classes = isArray(classes)                                                                                           // 106
      ? classes                                                                                                        // 107
      : classes && isString(classes) && classes.length                                                                 // 108
          ? classes.split(/\s+/)                                                                                       // 109
          : [];                                                                                                        // 110
  forEach(classes, function(klass, i) {                                                                                // 111
    if (klass && klass.length > 0) {                                                                                   // 112
      className += (i > 0) ? ' ' : '';                                                                                 // 113
      className += isPrefix ? fix + klass                                                                              // 114
                            : klass + fix;                                                                             // 115
    }                                                                                                                  // 116
  });                                                                                                                  // 117
  return className;                                                                                                    // 118
}                                                                                                                      // 119
                                                                                                                       // 120
function removeFromArray(arr, val) {                                                                                   // 121
  var index = arr.indexOf(val);                                                                                        // 122
  if (val >= 0) {                                                                                                      // 123
    arr.splice(index, 1);                                                                                              // 124
  }                                                                                                                    // 125
}                                                                                                                      // 126
                                                                                                                       // 127
function stripCommentsFromElement(element) {                                                                           // 128
  if (element instanceof jqLite) {                                                                                     // 129
    switch (element.length) {                                                                                          // 130
      case 0:                                                                                                          // 131
        return [];                                                                                                     // 132
        break;                                                                                                         // 133
                                                                                                                       // 134
      case 1:                                                                                                          // 135
        // there is no point of stripping anything if the element                                                      // 136
        // is the only element within the jqLite wrapper.                                                              // 137
        // (it's important that we retain the element instance.)                                                       // 138
        if (element[0].nodeType === ELEMENT_NODE) {                                                                    // 139
          return element;                                                                                              // 140
        }                                                                                                              // 141
        break;                                                                                                         // 142
                                                                                                                       // 143
      default:                                                                                                         // 144
        return jqLite(extractElementNode(element));                                                                    // 145
        break;                                                                                                         // 146
    }                                                                                                                  // 147
  }                                                                                                                    // 148
                                                                                                                       // 149
  if (element.nodeType === ELEMENT_NODE) {                                                                             // 150
    return jqLite(element);                                                                                            // 151
  }                                                                                                                    // 152
}                                                                                                                      // 153
                                                                                                                       // 154
function extractElementNode(element) {                                                                                 // 155
  if (!element[0]) return element;                                                                                     // 156
  for (var i = 0; i < element.length; i++) {                                                                           // 157
    var elm = element[i];                                                                                              // 158
    if (elm.nodeType == ELEMENT_NODE) {                                                                                // 159
      return elm;                                                                                                      // 160
    }                                                                                                                  // 161
  }                                                                                                                    // 162
}                                                                                                                      // 163
                                                                                                                       // 164
function $$addClass($$jqLite, element, className) {                                                                    // 165
  forEach(element, function(elm) {                                                                                     // 166
    $$jqLite.addClass(elm, className);                                                                                 // 167
  });                                                                                                                  // 168
}                                                                                                                      // 169
                                                                                                                       // 170
function $$removeClass($$jqLite, element, className) {                                                                 // 171
  forEach(element, function(elm) {                                                                                     // 172
    $$jqLite.removeClass(elm, className);                                                                              // 173
  });                                                                                                                  // 174
}                                                                                                                      // 175
                                                                                                                       // 176
function applyAnimationClassesFactory($$jqLite) {                                                                      // 177
  return function(element, options) {                                                                                  // 178
    if (options.addClass) {                                                                                            // 179
      $$addClass($$jqLite, element, options.addClass);                                                                 // 180
      options.addClass = null;                                                                                         // 181
    }                                                                                                                  // 182
    if (options.removeClass) {                                                                                         // 183
      $$removeClass($$jqLite, element, options.removeClass);                                                           // 184
      options.removeClass = null;                                                                                      // 185
    }                                                                                                                  // 186
  }                                                                                                                    // 187
}                                                                                                                      // 188
                                                                                                                       // 189
function prepareAnimationOptions(options) {                                                                            // 190
  options = options || {};                                                                                             // 191
  if (!options.$$prepared) {                                                                                           // 192
    var domOperation = options.domOperation || noop;                                                                   // 193
    options.domOperation = function() {                                                                                // 194
      options.$$domOperationFired = true;                                                                              // 195
      domOperation();                                                                                                  // 196
      domOperation = noop;                                                                                             // 197
    };                                                                                                                 // 198
    options.$$prepared = true;                                                                                         // 199
  }                                                                                                                    // 200
  return options;                                                                                                      // 201
}                                                                                                                      // 202
                                                                                                                       // 203
function applyAnimationStyles(element, options) {                                                                      // 204
  applyAnimationFromStyles(element, options);                                                                          // 205
  applyAnimationToStyles(element, options);                                                                            // 206
}                                                                                                                      // 207
                                                                                                                       // 208
function applyAnimationFromStyles(element, options) {                                                                  // 209
  if (options.from) {                                                                                                  // 210
    element.css(options.from);                                                                                         // 211
    options.from = null;                                                                                               // 212
  }                                                                                                                    // 213
}                                                                                                                      // 214
                                                                                                                       // 215
function applyAnimationToStyles(element, options) {                                                                    // 216
  if (options.to) {                                                                                                    // 217
    element.css(options.to);                                                                                           // 218
    options.to = null;                                                                                                 // 219
  }                                                                                                                    // 220
}                                                                                                                      // 221
                                                                                                                       // 222
function mergeAnimationOptions(element, target, newOptions) {                                                          // 223
  var toAdd = (target.addClass || '') + ' ' + (newOptions.addClass || '');                                             // 224
  var toRemove = (target.removeClass || '') + ' ' + (newOptions.removeClass || '');                                    // 225
  var classes = resolveElementClasses(element.attr('class'), toAdd, toRemove);                                         // 226
                                                                                                                       // 227
  if (newOptions.preparationClasses) {                                                                                 // 228
    target.preparationClasses = concatWithSpace(newOptions.preparationClasses, target.preparationClasses);             // 229
    delete newOptions.preparationClasses;                                                                              // 230
  }                                                                                                                    // 231
                                                                                                                       // 232
  // noop is basically when there is no callback; otherwise something has been set                                     // 233
  var realDomOperation = target.domOperation !== noop ? target.domOperation : null;                                    // 234
                                                                                                                       // 235
  extend(target, newOptions);                                                                                          // 236
                                                                                                                       // 237
  // TODO(matsko or sreeramu): proper fix is to maintain all animation callback in array and call at last,but now only leave has the callback so no issue with this.
  if (realDomOperation) {                                                                                              // 239
    target.domOperation = realDomOperation;                                                                            // 240
  }                                                                                                                    // 241
                                                                                                                       // 242
  if (classes.addClass) {                                                                                              // 243
    target.addClass = classes.addClass;                                                                                // 244
  } else {                                                                                                             // 245
    target.addClass = null;                                                                                            // 246
  }                                                                                                                    // 247
                                                                                                                       // 248
  if (classes.removeClass) {                                                                                           // 249
    target.removeClass = classes.removeClass;                                                                          // 250
  } else {                                                                                                             // 251
    target.removeClass = null;                                                                                         // 252
  }                                                                                                                    // 253
                                                                                                                       // 254
  return target;                                                                                                       // 255
}                                                                                                                      // 256
                                                                                                                       // 257
function resolveElementClasses(existing, toAdd, toRemove) {                                                            // 258
  var ADD_CLASS = 1;                                                                                                   // 259
  var REMOVE_CLASS = -1;                                                                                               // 260
                                                                                                                       // 261
  var flags = {};                                                                                                      // 262
  existing = splitClassesToLookup(existing);                                                                           // 263
                                                                                                                       // 264
  toAdd = splitClassesToLookup(toAdd);                                                                                 // 265
  forEach(toAdd, function(value, key) {                                                                                // 266
    flags[key] = ADD_CLASS;                                                                                            // 267
  });                                                                                                                  // 268
                                                                                                                       // 269
  toRemove = splitClassesToLookup(toRemove);                                                                           // 270
  forEach(toRemove, function(value, key) {                                                                             // 271
    flags[key] = flags[key] === ADD_CLASS ? null : REMOVE_CLASS;                                                       // 272
  });                                                                                                                  // 273
                                                                                                                       // 274
  var classes = {                                                                                                      // 275
    addClass: '',                                                                                                      // 276
    removeClass: ''                                                                                                    // 277
  };                                                                                                                   // 278
                                                                                                                       // 279
  forEach(flags, function(val, klass) {                                                                                // 280
    var prop, allow;                                                                                                   // 281
    if (val === ADD_CLASS) {                                                                                           // 282
      prop = 'addClass';                                                                                               // 283
      allow = !existing[klass];                                                                                        // 284
    } else if (val === REMOVE_CLASS) {                                                                                 // 285
      prop = 'removeClass';                                                                                            // 286
      allow = existing[klass];                                                                                         // 287
    }                                                                                                                  // 288
    if (allow) {                                                                                                       // 289
      if (classes[prop].length) {                                                                                      // 290
        classes[prop] += ' ';                                                                                          // 291
      }                                                                                                                // 292
      classes[prop] += klass;                                                                                          // 293
    }                                                                                                                  // 294
  });                                                                                                                  // 295
                                                                                                                       // 296
  function splitClassesToLookup(classes) {                                                                             // 297
    if (isString(classes)) {                                                                                           // 298
      classes = classes.split(' ');                                                                                    // 299
    }                                                                                                                  // 300
                                                                                                                       // 301
    var obj = {};                                                                                                      // 302
    forEach(classes, function(klass) {                                                                                 // 303
      // sometimes the split leaves empty string values                                                                // 304
      // incase extra spaces were applied to the options                                                               // 305
      if (klass.length) {                                                                                              // 306
        obj[klass] = true;                                                                                             // 307
      }                                                                                                                // 308
    });                                                                                                                // 309
    return obj;                                                                                                        // 310
  }                                                                                                                    // 311
                                                                                                                       // 312
  return classes;                                                                                                      // 313
}                                                                                                                      // 314
                                                                                                                       // 315
function getDomNode(element) {                                                                                         // 316
  return (element instanceof angular.element) ? element[0] : element;                                                  // 317
}                                                                                                                      // 318
                                                                                                                       // 319
function applyGeneratedPreparationClasses(element, event, options) {                                                   // 320
  var classes = '';                                                                                                    // 321
  if (event) {                                                                                                         // 322
    classes = pendClasses(event, EVENT_CLASS_PREFIX, true);                                                            // 323
  }                                                                                                                    // 324
  if (options.addClass) {                                                                                              // 325
    classes = concatWithSpace(classes, pendClasses(options.addClass, ADD_CLASS_SUFFIX));                               // 326
  }                                                                                                                    // 327
  if (options.removeClass) {                                                                                           // 328
    classes = concatWithSpace(classes, pendClasses(options.removeClass, REMOVE_CLASS_SUFFIX));                         // 329
  }                                                                                                                    // 330
  if (classes.length) {                                                                                                // 331
    options.preparationClasses = classes;                                                                              // 332
    element.addClass(classes);                                                                                         // 333
  }                                                                                                                    // 334
}                                                                                                                      // 335
                                                                                                                       // 336
function clearGeneratedClasses(element, options) {                                                                     // 337
  if (options.preparationClasses) {                                                                                    // 338
    element.removeClass(options.preparationClasses);                                                                   // 339
    options.preparationClasses = null;                                                                                 // 340
  }                                                                                                                    // 341
  if (options.activeClasses) {                                                                                         // 342
    element.removeClass(options.activeClasses);                                                                        // 343
    options.activeClasses = null;                                                                                      // 344
  }                                                                                                                    // 345
}                                                                                                                      // 346
                                                                                                                       // 347
function blockTransitions(node, duration) {                                                                            // 348
  // we use a negative delay value since it performs blocking                                                          // 349
  // yet it doesn't kill any existing transitions running on the                                                       // 350
  // same element which makes this safe for class-based animations                                                     // 351
  var value = duration ? '-' + duration + 's' : '';                                                                    // 352
  applyInlineStyle(node, [TRANSITION_DELAY_PROP, value]);                                                              // 353
  return [TRANSITION_DELAY_PROP, value];                                                                               // 354
}                                                                                                                      // 355
                                                                                                                       // 356
function blockKeyframeAnimations(node, applyBlock) {                                                                   // 357
  var value = applyBlock ? 'paused' : '';                                                                              // 358
  var key = ANIMATION_PROP + ANIMATION_PLAYSTATE_KEY;                                                                  // 359
  applyInlineStyle(node, [key, value]);                                                                                // 360
  return [key, value];                                                                                                 // 361
}                                                                                                                      // 362
                                                                                                                       // 363
function applyInlineStyle(node, styleTuple) {                                                                          // 364
  var prop = styleTuple[0];                                                                                            // 365
  var value = styleTuple[1];                                                                                           // 366
  node.style[prop] = value;                                                                                            // 367
}                                                                                                                      // 368
                                                                                                                       // 369
function concatWithSpace(a,b) {                                                                                        // 370
  if (!a) return b;                                                                                                    // 371
  if (!b) return a;                                                                                                    // 372
  return a + ' ' + b;                                                                                                  // 373
}                                                                                                                      // 374
                                                                                                                       // 375
var $$rAFSchedulerFactory = ['$$rAF', function($$rAF) {                                                                // 376
  var queue, cancelFn;                                                                                                 // 377
                                                                                                                       // 378
  function scheduler(tasks) {                                                                                          // 379
    // we make a copy since RAFScheduler mutates the state                                                             // 380
    // of the passed in array variable and this would be difficult                                                     // 381
    // to track down on the outside code                                                                               // 382
    queue = queue.concat(tasks);                                                                                       // 383
    nextTick();                                                                                                        // 384
  }                                                                                                                    // 385
                                                                                                                       // 386
  queue = scheduler.queue = [];                                                                                        // 387
                                                                                                                       // 388
  /* waitUntilQuiet does two things:                                                                                   // 389
   * 1. It will run the FINAL `fn` value only when an uncancelled RAF has passed through                               // 390
   * 2. It will delay the next wave of tasks from running until the quiet `fn` has run.                                // 391
   *                                                                                                                   // 392
   * The motivation here is that animation code can request more time from the scheduler                               // 393
   * before the next wave runs. This allows for certain DOM properties such as classes to                              // 394
   * be resolved in time for the next animation to run.                                                                // 395
   */                                                                                                                  // 396
  scheduler.waitUntilQuiet = function(fn) {                                                                            // 397
    if (cancelFn) cancelFn();                                                                                          // 398
                                                                                                                       // 399
    cancelFn = $$rAF(function() {                                                                                      // 400
      cancelFn = null;                                                                                                 // 401
      fn();                                                                                                            // 402
      nextTick();                                                                                                      // 403
    });                                                                                                                // 404
  };                                                                                                                   // 405
                                                                                                                       // 406
  return scheduler;                                                                                                    // 407
                                                                                                                       // 408
  function nextTick() {                                                                                                // 409
    if (!queue.length) return;                                                                                         // 410
                                                                                                                       // 411
    var items = queue.shift();                                                                                         // 412
    for (var i = 0; i < items.length; i++) {                                                                           // 413
      items[i]();                                                                                                      // 414
    }                                                                                                                  // 415
                                                                                                                       // 416
    if (!cancelFn) {                                                                                                   // 417
      $$rAF(function() {                                                                                               // 418
        if (!cancelFn) nextTick();                                                                                     // 419
      });                                                                                                              // 420
    }                                                                                                                  // 421
  }                                                                                                                    // 422
}];                                                                                                                    // 423
                                                                                                                       // 424
var $$AnimateChildrenDirective = [function() {                                                                         // 425
  return function(scope, element, attrs) {                                                                             // 426
    var val = attrs.ngAnimateChildren;                                                                                 // 427
    if (angular.isString(val) && val.length === 0) { //empty attribute                                                 // 428
      element.data(NG_ANIMATE_CHILDREN_DATA, true);                                                                    // 429
    } else {                                                                                                           // 430
      attrs.$observe('ngAnimateChildren', function(value) {                                                            // 431
        value = value === 'on' || value === 'true';                                                                    // 432
        element.data(NG_ANIMATE_CHILDREN_DATA, value);                                                                 // 433
      });                                                                                                              // 434
    }                                                                                                                  // 435
  };                                                                                                                   // 436
}];                                                                                                                    // 437
                                                                                                                       // 438
var ANIMATE_TIMER_KEY = '$$animateCss';                                                                                // 439
                                                                                                                       // 440
/**                                                                                                                    // 441
 * @ngdoc service                                                                                                      // 442
 * @name $animateCss                                                                                                   // 443
 * @kind object                                                                                                        // 444
 *                                                                                                                     // 445
 * @description                                                                                                        // 446
 * The `$animateCss` service is a useful utility to trigger customized CSS-based transitions/keyframes                 // 447
 * from a JavaScript-based animation or directly from a directive. The purpose of `$animateCss` is NOT                 // 448
 * to side-step how `$animate` and ngAnimate work, but the goal is to allow pre-existing animations or                 // 449
 * directives to create more complex animations that can be purely driven using CSS code.                              // 450
 *                                                                                                                     // 451
 * Note that only browsers that support CSS transitions and/or keyframe animations are capable of                      // 452
 * rendering animations triggered via `$animateCss` (bad news for IE9 and lower).                                      // 453
 *                                                                                                                     // 454
 * ## Usage                                                                                                            // 455
 * Once again, `$animateCss` is designed to be used inside of a registered JavaScript animation that                   // 456
 * is powered by ngAnimate. It is possible to use `$animateCss` directly inside of a directive, however,               // 457
 * any automatic control over cancelling animations and/or preventing animations from being run on                     // 458
 * child elements will not be handled by Angular. For this to work as expected, please use `$animate` to               // 459
 * trigger the animation and then setup a JavaScript animation that injects `$animateCss` to trigger                   // 460
 * the CSS animation.                                                                                                  // 461
 *                                                                                                                     // 462
 * The example below shows how we can create a folding animation on an element using `ng-if`:                          // 463
 *                                                                                                                     // 464
 * ```html                                                                                                             // 465
 * <!-- notice the `fold-animation` CSS class -->                                                                      // 466
 * <div ng-if="onOff" class="fold-animation">                                                                          // 467
 *   This element will go BOOM                                                                                         // 468
 * </div>                                                                                                              // 469
 * <button ng-click="onOff=true">Fold In</button>                                                                      // 470
 * ```                                                                                                                 // 471
 *                                                                                                                     // 472
 * Now we create the **JavaScript animation** that will trigger the CSS transition:                                    // 473
 *                                                                                                                     // 474
 * ```js                                                                                                               // 475
 * ngModule.animation('.fold-animation', ['$animateCss', function($animateCss) {                                       // 476
 *   return {                                                                                                          // 477
 *     enter: function(element, doneFn) {                                                                              // 478
 *       var height = element[0].offsetHeight;                                                                         // 479
 *       return $animateCss(element, {                                                                                 // 480
 *         from: { height:'0px' },                                                                                     // 481
 *         to: { height:height + 'px' },                                                                               // 482
 *         duration: 1 // one second                                                                                   // 483
 *       });                                                                                                           // 484
 *     }                                                                                                               // 485
 *   }                                                                                                                 // 486
 * }]);                                                                                                                // 487
 * ```                                                                                                                 // 488
 *                                                                                                                     // 489
 * ## More Advanced Uses                                                                                               // 490
 *                                                                                                                     // 491
 * `$animateCss` is the underlying code that ngAnimate uses to power **CSS-based animations** behind the scenes. Therefore CSS hooks
 * like `.ng-EVENT`, `.ng-EVENT-active`, `.ng-EVENT-stagger` are all features that can be triggered using `$animateCss` via JavaScript code.
 *                                                                                                                     // 494
 * This also means that just about any combination of adding classes, removing classes, setting styles, dynamically setting a keyframe animation,
 * applying a hardcoded duration or delay value, changing the animation easing or applying a stagger animation are all options that work with
 * `$animateCss`. The service itself is smart enough to figure out the combination of options and examine the element styling properties in order
 * to provide a working animation that will run in CSS.                                                                // 498
 *                                                                                                                     // 499
 * The example below showcases a more advanced version of the `.fold-animation` from the example above:                // 500
 *                                                                                                                     // 501
 * ```js                                                                                                               // 502
 * ngModule.animation('.fold-animation', ['$animateCss', function($animateCss) {                                       // 503
 *   return {                                                                                                          // 504
 *     enter: function(element, doneFn) {                                                                              // 505
 *       var height = element[0].offsetHeight;                                                                         // 506
 *       return $animateCss(element, {                                                                                 // 507
 *         addClass: 'red large-text pulse-twice',                                                                     // 508
 *         easing: 'ease-out',                                                                                         // 509
 *         from: { height:'0px' },                                                                                     // 510
 *         to: { height:height + 'px' },                                                                               // 511
 *         duration: 1 // one second                                                                                   // 512
 *       });                                                                                                           // 513
 *     }                                                                                                               // 514
 *   }                                                                                                                 // 515
 * }]);                                                                                                                // 516
 * ```                                                                                                                 // 517
 *                                                                                                                     // 518
 * Since we're adding/removing CSS classes then the CSS transition will also pick those up:                            // 519
 *                                                                                                                     // 520
 * ```css                                                                                                              // 521
 * /&#42; since a hardcoded duration value of 1 was provided in the JavaScript animation code,                         // 522
 * the CSS classes below will be transitioned despite them being defined as regular CSS classes &#42;/                 // 523
 * .red { background:red; }                                                                                            // 524
 * .large-text { font-size:20px; }                                                                                     // 525
 *                                                                                                                     // 526
 * /&#42; we can also use a keyframe animation and $animateCss will make it work alongside the transition &#42;/       // 527
 * .pulse-twice {                                                                                                      // 528
 *   animation: 0.5s pulse linear 2;                                                                                   // 529
 *   -webkit-animation: 0.5s pulse linear 2;                                                                           // 530
 * }                                                                                                                   // 531
 *                                                                                                                     // 532
 * @keyframes pulse {                                                                                                  // 533
 *   from { transform: scale(0.5); }                                                                                   // 534
 *   to { transform: scale(1.5); }                                                                                     // 535
 * }                                                                                                                   // 536
 *                                                                                                                     // 537
 * @-webkit-keyframes pulse {                                                                                          // 538
 *   from { -webkit-transform: scale(0.5); }                                                                           // 539
 *   to { -webkit-transform: scale(1.5); }                                                                             // 540
 * }                                                                                                                   // 541
 * ```                                                                                                                 // 542
 *                                                                                                                     // 543
 * Given this complex combination of CSS classes, styles and options, `$animateCss` will figure everything out and make the animation happen.
 *                                                                                                                     // 545
 * ## How the Options are handled                                                                                      // 546
 *                                                                                                                     // 547
 * `$animateCss` is very versatile and intelligent when it comes to figuring out what configurations to apply to the element to ensure the animation
 * works with the options provided. Say for example we were adding a class that contained a keyframe value and we wanted to also animate some inline
 * styles using the `from` and `to` properties.                                                                        // 550
 *                                                                                                                     // 551
 * ```js                                                                                                               // 552
 * var animator = $animateCss(element, {                                                                               // 553
 *   from: { background:'red' },                                                                                       // 554
 *   to: { background:'blue' }                                                                                         // 555
 * });                                                                                                                 // 556
 * animator.start();                                                                                                   // 557
 * ```                                                                                                                 // 558
 *                                                                                                                     // 559
 * ```css                                                                                                              // 560
 * .rotating-animation {                                                                                               // 561
 *   animation:0.5s rotate linear;                                                                                     // 562
 *   -webkit-animation:0.5s rotate linear;                                                                             // 563
 * }                                                                                                                   // 564
 *                                                                                                                     // 565
 * @keyframes rotate {                                                                                                 // 566
 *   from { transform: rotate(0deg); }                                                                                 // 567
 *   to { transform: rotate(360deg); }                                                                                 // 568
 * }                                                                                                                   // 569
 *                                                                                                                     // 570
 * @-webkit-keyframes rotate {                                                                                         // 571
 *   from { -webkit-transform: rotate(0deg); }                                                                         // 572
 *   to { -webkit-transform: rotate(360deg); }                                                                         // 573
 * }                                                                                                                   // 574
 * ```                                                                                                                 // 575
 *                                                                                                                     // 576
 * The missing pieces here are that we do not have a transition set (within the CSS code nor within the `$animateCss` options) and the duration of the animation is
 * going to be detected from what the keyframe styles on the CSS class are. In this event, `$animateCss` will automatically create an inline transition
 * style matching the duration detected from the keyframe style (which is present in the CSS class that is being added) and then prepare both the transition
 * and keyframe animations to run in parallel on the element. Then when the animation is underway the provided `from` and `to` CSS styles will be applied
 * and spread across the transition and keyframe animation.                                                            // 581
 *                                                                                                                     // 582
 * ## What is returned                                                                                                 // 583
 *                                                                                                                     // 584
 * `$animateCss` works in two stages: a preparation phase and an animation phase. Therefore when `$animateCss` is first called it will NOT actually
 * start the animation. All that is going on here is that the element is being prepared for the animation (which means that the generated CSS classes are
 * added and removed on the element). Once `$animateCss` is called it will return an object with the following properties:
 *                                                                                                                     // 588
 * ```js                                                                                                               // 589
 * var animator = $animateCss(element, { ... });                                                                       // 590
 * ```                                                                                                                 // 591
 *                                                                                                                     // 592
 * Now what do the contents of our `animator` variable look like:                                                      // 593
 *                                                                                                                     // 594
 * ```js                                                                                                               // 595
 * {                                                                                                                   // 596
 *   // starts the animation                                                                                           // 597
 *   start: Function,                                                                                                  // 598
 *                                                                                                                     // 599
 *   // ends (aborts) the animation                                                                                    // 600
 *   end: Function                                                                                                     // 601
 * }                                                                                                                   // 602
 * ```                                                                                                                 // 603
 *                                                                                                                     // 604
 * To actually start the animation we need to run `animation.start()` which will then return a promise that we can hook into to detect when the animation ends.
 * If we choose not to run the animation then we MUST run `animation.end()` to perform a cleanup on the element (since some CSS classes and stlyes may have been
 * applied to the element during the preparation phase). Note that all other properties such as duration, delay, transitions and keyframes are just properties
 * and that changing them will not reconfigure the parameters of the animation.                                        // 608
 *                                                                                                                     // 609
 * ### runner.done() vs runner.then()                                                                                  // 610
 * It is documented that `animation.start()` will return a promise object and this is true, however, there is also an additional method available on the
 * runner called `.done(callbackFn)`. The done method works the same as `.finally(callbackFn)`, however, it does **not trigger a digest to occur**.
 * Therefore, for performance reasons, it's always best to use `runner.done(callback)` instead of `runner.then()`, `runner.catch()` or `runner.finally()`
 * unless you really need a digest to kick off afterwards.                                                             // 614
 *                                                                                                                     // 615
 * Keep in mind that, to make this easier, ngAnimate has tweaked the JS animations API to recognize when a runner instance is returned from $animateCss
 * (so there is no need to call `runner.done(doneFn)` inside of your JavaScript animation code).                       // 617
 * Check the {@link ngAnimate.$animateCss#usage animation code above} to see how this works.                           // 618
 *                                                                                                                     // 619
 * @param {DOMElement} element the element that will be animated                                                       // 620
 * @param {object} options the animation-related options that will be applied during the animation                     // 621
 *                                                                                                                     // 622
 * * `event` - The DOM event (e.g. enter, leave, move). When used, a generated CSS class of `ng-EVENT` and `ng-EVENT-active` will be applied
 * to the element during the animation. Multiple events can be provided when spaces are used as a separator. (Note that this will not perform any DOM operation.)
 * * `structural` - Indicates that the `ng-` prefix will be added to the event class. Setting to `false` or omitting will turn `ng-EVENT` and
 * `ng-EVENT-active` in `EVENT` and `EVENT-active`. Unused if `event` is omitted.                                      // 626
 * * `easing` - The CSS easing value that will be applied to the transition or keyframe animation (or both).           // 627
 * * `transitionStyle` - The raw CSS transition style that will be used (e.g. `1s linear all`).                        // 628
 * * `keyframeStyle` - The raw CSS keyframe animation style that will be used (e.g. `1s my_animation linear`).         // 629
 * * `from` - The starting CSS styles (a key/value object) that will be applied at the start of the animation.         // 630
 * * `to` - The ending CSS styles (a key/value object) that will be applied across the animation via a CSS transition.
 * * `addClass` - A space separated list of CSS classes that will be added to the element and spread across the animation.
 * * `removeClass` - A space separated list of CSS classes that will be removed from the element and spread across the animation.
 * * `duration` - A number value representing the total duration of the transition and/or keyframe (note that a value of 1 is 1000ms). If a value of `0`
 * is provided then the animation will be skipped entirely.                                                            // 635
 * * `delay` - A number value representing the total delay of the transition and/or keyframe (note that a value of 1 is 1000ms). If a value of `true` is
 * used then whatever delay value is detected from the CSS classes will be mirrored on the elements styles (e.g. by setting delay true then the style value
 * of the element will be `transition-delay: DETECTED_VALUE`). Using `true` is useful when you want the CSS classes and inline styles to all share the same
 * CSS delay value.                                                                                                    // 639
 * * `stagger` - A numeric time value representing the delay between successively animated elements                    // 640
 * ({@link ngAnimate#css-staggering-animations Click here to learn how CSS-based staggering works in ngAnimate.})      // 641
 * * `staggerIndex` - The numeric index representing the stagger item (e.g. a value of 5 is equal to the sixth item in the stagger; therefore when a
 * * `stagger` option value of `0.1` is used then there will be a stagger delay of `600ms`)                            // 643
 * * `applyClassesEarly` - Whether or not the classes being added or removed will be used when detecting the animation. This is set by `$animate` when enter/leave/move animations are fired to ensure that the CSS classes are resolved in time. (Note that this will prevent any transitions from occuring on the classes being added and removed.)
 * * `cleanupStyles` - Whether or not the provided `from` and `to` styles will be removed once                         // 645
 *    the animation is closed. This is useful for when the styles are used purely for the sake of                      // 646
 *    the animation and do not have a lasting visual effect on the element (e.g. a colapse and open animation).        // 647
 *    By default this value is set to `false`.                                                                         // 648
 *                                                                                                                     // 649
 * @return {object} an object with start and end methods and details about the animation.                              // 650
 *                                                                                                                     // 651
 * * `start` - The method to start the animation. This will return a `Promise` when called.                            // 652
 * * `end` - This method will cancel the animation and remove all applied CSS classes and styles.                      // 653
 */                                                                                                                    // 654
var ONE_SECOND = 1000;                                                                                                 // 655
var BASE_TEN = 10;                                                                                                     // 656
                                                                                                                       // 657
var ELAPSED_TIME_MAX_DECIMAL_PLACES = 3;                                                                               // 658
var CLOSING_TIME_BUFFER = 1.5;                                                                                         // 659
                                                                                                                       // 660
var DETECT_CSS_PROPERTIES = {                                                                                          // 661
  transitionDuration:      TRANSITION_DURATION_PROP,                                                                   // 662
  transitionDelay:         TRANSITION_DELAY_PROP,                                                                      // 663
  transitionProperty:      TRANSITION_PROP + PROPERTY_KEY,                                                             // 664
  animationDuration:       ANIMATION_DURATION_PROP,                                                                    // 665
  animationDelay:          ANIMATION_DELAY_PROP,                                                                       // 666
  animationIterationCount: ANIMATION_PROP + ANIMATION_ITERATION_COUNT_KEY                                              // 667
};                                                                                                                     // 668
                                                                                                                       // 669
var DETECT_STAGGER_CSS_PROPERTIES = {                                                                                  // 670
  transitionDuration:      TRANSITION_DURATION_PROP,                                                                   // 671
  transitionDelay:         TRANSITION_DELAY_PROP,                                                                      // 672
  animationDuration:       ANIMATION_DURATION_PROP,                                                                    // 673
  animationDelay:          ANIMATION_DELAY_PROP                                                                        // 674
};                                                                                                                     // 675
                                                                                                                       // 676
function getCssKeyframeDurationStyle(duration) {                                                                       // 677
  return [ANIMATION_DURATION_PROP, duration + 's'];                                                                    // 678
}                                                                                                                      // 679
                                                                                                                       // 680
function getCssDelayStyle(delay, isKeyframeAnimation) {                                                                // 681
  var prop = isKeyframeAnimation ? ANIMATION_DELAY_PROP : TRANSITION_DELAY_PROP;                                       // 682
  return [prop, delay + 's'];                                                                                          // 683
}                                                                                                                      // 684
                                                                                                                       // 685
function computeCssStyles($window, element, properties) {                                                              // 686
  var styles = Object.create(null);                                                                                    // 687
  var detectedStyles = $window.getComputedStyle(element) || {};                                                        // 688
  forEach(properties, function(formalStyleName, actualStyleName) {                                                     // 689
    var val = detectedStyles[formalStyleName];                                                                         // 690
    if (val) {                                                                                                         // 691
      var c = val.charAt(0);                                                                                           // 692
                                                                                                                       // 693
      // only numerical-based values have a negative sign or digit as the first value                                  // 694
      if (c === '-' || c === '+' || c >= 0) {                                                                          // 695
        val = parseMaxTime(val);                                                                                       // 696
      }                                                                                                                // 697
                                                                                                                       // 698
      // by setting this to null in the event that the delay is not set or is set directly as 0                        // 699
      // then we can still allow for zegative values to be used later on and not mistake this                          // 700
      // value for being greater than any other negative value.                                                        // 701
      if (val === 0) {                                                                                                 // 702
        val = null;                                                                                                    // 703
      }                                                                                                                // 704
      styles[actualStyleName] = val;                                                                                   // 705
    }                                                                                                                  // 706
  });                                                                                                                  // 707
                                                                                                                       // 708
  return styles;                                                                                                       // 709
}                                                                                                                      // 710
                                                                                                                       // 711
function parseMaxTime(str) {                                                                                           // 712
  var maxValue = 0;                                                                                                    // 713
  var values = str.split(/\s*,\s*/);                                                                                   // 714
  forEach(values, function(value) {                                                                                    // 715
    // it's always safe to consider only second values and omit `ms` values since                                      // 716
    // getComputedStyle will always handle the conversion for us                                                       // 717
    if (value.charAt(value.length - 1) == 's') {                                                                       // 718
      value = value.substring(0, value.length - 1);                                                                    // 719
    }                                                                                                                  // 720
    value = parseFloat(value) || 0;                                                                                    // 721
    maxValue = maxValue ? Math.max(value, maxValue) : value;                                                           // 722
  });                                                                                                                  // 723
  return maxValue;                                                                                                     // 724
}                                                                                                                      // 725
                                                                                                                       // 726
function truthyTimingValue(val) {                                                                                      // 727
  return val === 0 || val != null;                                                                                     // 728
}                                                                                                                      // 729
                                                                                                                       // 730
function getCssTransitionDurationStyle(duration, applyOnlyDuration) {                                                  // 731
  var style = TRANSITION_PROP;                                                                                         // 732
  var value = duration + 's';                                                                                          // 733
  if (applyOnlyDuration) {                                                                                             // 734
    style += DURATION_KEY;                                                                                             // 735
  } else {                                                                                                             // 736
    value += ' linear all';                                                                                            // 737
  }                                                                                                                    // 738
  return [style, value];                                                                                               // 739
}                                                                                                                      // 740
                                                                                                                       // 741
function createLocalCacheLookup() {                                                                                    // 742
  var cache = Object.create(null);                                                                                     // 743
  return {                                                                                                             // 744
    flush: function() {                                                                                                // 745
      cache = Object.create(null);                                                                                     // 746
    },                                                                                                                 // 747
                                                                                                                       // 748
    count: function(key) {                                                                                             // 749
      var entry = cache[key];                                                                                          // 750
      return entry ? entry.total : 0;                                                                                  // 751
    },                                                                                                                 // 752
                                                                                                                       // 753
    get: function(key) {                                                                                               // 754
      var entry = cache[key];                                                                                          // 755
      return entry && entry.value;                                                                                     // 756
    },                                                                                                                 // 757
                                                                                                                       // 758
    put: function(key, value) {                                                                                        // 759
      if (!cache[key]) {                                                                                               // 760
        cache[key] = { total: 1, value: value };                                                                       // 761
      } else {                                                                                                         // 762
        cache[key].total++;                                                                                            // 763
      }                                                                                                                // 764
    }                                                                                                                  // 765
  };                                                                                                                   // 766
}                                                                                                                      // 767
                                                                                                                       // 768
// we do not reassign an already present style value since                                                             // 769
// if we detect the style property value again we may be                                                               // 770
// detecting styles that were added via the `from` styles.                                                             // 771
// We make use of `isDefined` here since an empty string                                                               // 772
// or null value (which is what getPropertyValue will return                                                           // 773
// for a non-existing style) will still be marked as a valid                                                           // 774
// value for the style (a falsy value implies that the style                                                           // 775
// is to be removed at the end of the animation). If we had a simple                                                   // 776
// "OR" statement then it would not be enough to catch that.                                                           // 777
function registerRestorableStyles(backup, node, properties) {                                                          // 778
  forEach(properties, function(prop) {                                                                                 // 779
    backup[prop] = isDefined(backup[prop])                                                                             // 780
        ? backup[prop]                                                                                                 // 781
        : node.style.getPropertyValue(prop);                                                                           // 782
  });                                                                                                                  // 783
}                                                                                                                      // 784
                                                                                                                       // 785
var $AnimateCssProvider = ['$animateProvider', function($animateProvider) {                                            // 786
  var gcsLookup = createLocalCacheLookup();                                                                            // 787
  var gcsStaggerLookup = createLocalCacheLookup();                                                                     // 788
                                                                                                                       // 789
  this.$get = ['$window', '$$jqLite', '$$AnimateRunner', '$timeout',                                                   // 790
               '$$forceReflow', '$sniffer', '$$rAFScheduler', '$animate',                                              // 791
       function($window,   $$jqLite,   $$AnimateRunner,   $timeout,                                                    // 792
                $$forceReflow,   $sniffer,   $$rAFScheduler, $animate) {                                               // 793
                                                                                                                       // 794
    var applyAnimationClasses = applyAnimationClassesFactory($$jqLite);                                                // 795
                                                                                                                       // 796
    var parentCounter = 0;                                                                                             // 797
    function gcsHashFn(node, extraClasses) {                                                                           // 798
      var KEY = "$$ngAnimateParentKey";                                                                                // 799
      var parentNode = node.parentNode;                                                                                // 800
      var parentID = parentNode[KEY] || (parentNode[KEY] = ++parentCounter);                                           // 801
      return parentID + '-' + node.getAttribute('class') + '-' + extraClasses;                                         // 802
    }                                                                                                                  // 803
                                                                                                                       // 804
    function computeCachedCssStyles(node, className, cacheKey, properties) {                                           // 805
      var timings = gcsLookup.get(cacheKey);                                                                           // 806
                                                                                                                       // 807
      if (!timings) {                                                                                                  // 808
        timings = computeCssStyles($window, node, properties);                                                         // 809
        if (timings.animationIterationCount === 'infinite') {                                                          // 810
          timings.animationIterationCount = 1;                                                                         // 811
        }                                                                                                              // 812
      }                                                                                                                // 813
                                                                                                                       // 814
      // we keep putting this in multiple times even though the value and the cacheKey are the same                    // 815
      // because we're keeping an interal tally of how many duplicate animations are detected.                         // 816
      gcsLookup.put(cacheKey, timings);                                                                                // 817
      return timings;                                                                                                  // 818
    }                                                                                                                  // 819
                                                                                                                       // 820
    function computeCachedCssStaggerStyles(node, className, cacheKey, properties) {                                    // 821
      var stagger;                                                                                                     // 822
                                                                                                                       // 823
      // if we have one or more existing matches of matching elements                                                  // 824
      // containing the same parent + CSS styles (which is how cacheKey works)                                         // 825
      // then staggering is possible                                                                                   // 826
      if (gcsLookup.count(cacheKey) > 0) {                                                                             // 827
        stagger = gcsStaggerLookup.get(cacheKey);                                                                      // 828
                                                                                                                       // 829
        if (!stagger) {                                                                                                // 830
          var staggerClassName = pendClasses(className, '-stagger');                                                   // 831
                                                                                                                       // 832
          $$jqLite.addClass(node, staggerClassName);                                                                   // 833
                                                                                                                       // 834
          stagger = computeCssStyles($window, node, properties);                                                       // 835
                                                                                                                       // 836
          // force the conversion of a null value to zero incase not set                                               // 837
          stagger.animationDuration = Math.max(stagger.animationDuration, 0);                                          // 838
          stagger.transitionDuration = Math.max(stagger.transitionDuration, 0);                                        // 839
                                                                                                                       // 840
          $$jqLite.removeClass(node, staggerClassName);                                                                // 841
                                                                                                                       // 842
          gcsStaggerLookup.put(cacheKey, stagger);                                                                     // 843
        }                                                                                                              // 844
      }                                                                                                                // 845
                                                                                                                       // 846
      return stagger || {};                                                                                            // 847
    }                                                                                                                  // 848
                                                                                                                       // 849
    var cancelLastRAFRequest;                                                                                          // 850
    var rafWaitQueue = [];                                                                                             // 851
    function waitUntilQuiet(callback) {                                                                                // 852
      rafWaitQueue.push(callback);                                                                                     // 853
      $$rAFScheduler.waitUntilQuiet(function() {                                                                       // 854
        gcsLookup.flush();                                                                                             // 855
        gcsStaggerLookup.flush();                                                                                      // 856
                                                                                                                       // 857
        // DO NOT REMOVE THIS LINE OR REFACTOR OUT THE `pageWidth` variable.                                           // 858
        // PLEASE EXAMINE THE `$$forceReflow` service to understand why.                                               // 859
        var pageWidth = $$forceReflow();                                                                               // 860
                                                                                                                       // 861
        // we use a for loop to ensure that if the queue is changed                                                    // 862
        // during this looping then it will consider new requests                                                      // 863
        for (var i = 0; i < rafWaitQueue.length; i++) {                                                                // 864
          rafWaitQueue[i](pageWidth);                                                                                  // 865
        }                                                                                                              // 866
        rafWaitQueue.length = 0;                                                                                       // 867
      });                                                                                                              // 868
    }                                                                                                                  // 869
                                                                                                                       // 870
    function computeTimings(node, className, cacheKey) {                                                               // 871
      var timings = computeCachedCssStyles(node, className, cacheKey, DETECT_CSS_PROPERTIES);                          // 872
      var aD = timings.animationDelay;                                                                                 // 873
      var tD = timings.transitionDelay;                                                                                // 874
      timings.maxDelay = aD && tD                                                                                      // 875
          ? Math.max(aD, tD)                                                                                           // 876
          : (aD || tD);                                                                                                // 877
      timings.maxDuration = Math.max(                                                                                  // 878
          timings.animationDuration * timings.animationIterationCount,                                                 // 879
          timings.transitionDuration);                                                                                 // 880
                                                                                                                       // 881
      return timings;                                                                                                  // 882
    }                                                                                                                  // 883
                                                                                                                       // 884
    return function init(element, options) {                                                                           // 885
      var restoreStyles = {};                                                                                          // 886
      var node = getDomNode(element);                                                                                  // 887
      if (!node                                                                                                        // 888
          || !node.parentNode                                                                                          // 889
          || !$animate.enabled()) {                                                                                    // 890
        return closeAndReturnNoopAnimator();                                                                           // 891
      }                                                                                                                // 892
                                                                                                                       // 893
      options = prepareAnimationOptions(options);                                                                      // 894
                                                                                                                       // 895
      var temporaryStyles = [];                                                                                        // 896
      var classes = element.attr('class');                                                                             // 897
      var styles = packageStyles(options);                                                                             // 898
      var animationClosed;                                                                                             // 899
      var animationPaused;                                                                                             // 900
      var animationCompleted;                                                                                          // 901
      var runner;                                                                                                      // 902
      var runnerHost;                                                                                                  // 903
      var maxDelay;                                                                                                    // 904
      var maxDelayTime;                                                                                                // 905
      var maxDuration;                                                                                                 // 906
      var maxDurationTime;                                                                                             // 907
                                                                                                                       // 908
      if (options.duration === 0 || (!$sniffer.animations && !$sniffer.transitions)) {                                 // 909
        return closeAndReturnNoopAnimator();                                                                           // 910
      }                                                                                                                // 911
                                                                                                                       // 912
      var method = options.event && isArray(options.event)                                                             // 913
            ? options.event.join(' ')                                                                                  // 914
            : options.event;                                                                                           // 915
                                                                                                                       // 916
      var isStructural = method && options.structural;                                                                 // 917
      var structuralClassName = '';                                                                                    // 918
      var addRemoveClassName = '';                                                                                     // 919
                                                                                                                       // 920
      if (isStructural) {                                                                                              // 921
        structuralClassName = pendClasses(method, EVENT_CLASS_PREFIX, true);                                           // 922
      } else if (method) {                                                                                             // 923
        structuralClassName = method;                                                                                  // 924
      }                                                                                                                // 925
                                                                                                                       // 926
      if (options.addClass) {                                                                                          // 927
        addRemoveClassName += pendClasses(options.addClass, ADD_CLASS_SUFFIX);                                         // 928
      }                                                                                                                // 929
                                                                                                                       // 930
      if (options.removeClass) {                                                                                       // 931
        if (addRemoveClassName.length) {                                                                               // 932
          addRemoveClassName += ' ';                                                                                   // 933
        }                                                                                                              // 934
        addRemoveClassName += pendClasses(options.removeClass, REMOVE_CLASS_SUFFIX);                                   // 935
      }                                                                                                                // 936
                                                                                                                       // 937
      // there may be a situation where a structural animation is combined together                                    // 938
      // with CSS classes that need to resolve before the animation is computed.                                       // 939
      // However this means that there is no explicit CSS code to block the animation                                  // 940
      // from happening (by setting 0s none in the class name). If this is the case                                    // 941
      // we need to apply the classes before the first rAF so we know to continue if                                   // 942
      // there actually is a detected transition or keyframe animation                                                 // 943
      if (options.applyClassesEarly && addRemoveClassName.length) {                                                    // 944
        applyAnimationClasses(element, options);                                                                       // 945
      }                                                                                                                // 946
                                                                                                                       // 947
      var preparationClasses = [structuralClassName, addRemoveClassName].join(' ').trim();                             // 948
      var fullClassName = classes + ' ' + preparationClasses;                                                          // 949
      var activeClasses = pendClasses(preparationClasses, ACTIVE_CLASS_SUFFIX);                                        // 950
      var hasToStyles = styles.to && Object.keys(styles.to).length > 0;                                                // 951
      var containsKeyframeAnimation = (options.keyframeStyle || '').length > 0;                                        // 952
                                                                                                                       // 953
      // there is no way we can trigger an animation if no styles and                                                  // 954
      // no classes are being applied which would then trigger a transition,                                           // 955
      // unless there a is raw keyframe value that is applied to the element.                                          // 956
      if (!containsKeyframeAnimation                                                                                   // 957
           && !hasToStyles                                                                                             // 958
           && !preparationClasses) {                                                                                   // 959
        return closeAndReturnNoopAnimator();                                                                           // 960
      }                                                                                                                // 961
                                                                                                                       // 962
      var cacheKey, stagger;                                                                                           // 963
      if (options.stagger > 0) {                                                                                       // 964
        var staggerVal = parseFloat(options.stagger);                                                                  // 965
        stagger = {                                                                                                    // 966
          transitionDelay: staggerVal,                                                                                 // 967
          animationDelay: staggerVal,                                                                                  // 968
          transitionDuration: 0,                                                                                       // 969
          animationDuration: 0                                                                                         // 970
        };                                                                                                             // 971
      } else {                                                                                                         // 972
        cacheKey = gcsHashFn(node, fullClassName);                                                                     // 973
        stagger = computeCachedCssStaggerStyles(node, preparationClasses, cacheKey, DETECT_STAGGER_CSS_PROPERTIES);    // 974
      }                                                                                                                // 975
                                                                                                                       // 976
      if (!options.$$skipPreparationClasses) {                                                                         // 977
        $$jqLite.addClass(element, preparationClasses);                                                                // 978
      }                                                                                                                // 979
                                                                                                                       // 980
      var applyOnlyDuration;                                                                                           // 981
                                                                                                                       // 982
      if (options.transitionStyle) {                                                                                   // 983
        var transitionStyle = [TRANSITION_PROP, options.transitionStyle];                                              // 984
        applyInlineStyle(node, transitionStyle);                                                                       // 985
        temporaryStyles.push(transitionStyle);                                                                         // 986
      }                                                                                                                // 987
                                                                                                                       // 988
      if (options.duration >= 0) {                                                                                     // 989
        applyOnlyDuration = node.style[TRANSITION_PROP].length > 0;                                                    // 990
        var durationStyle = getCssTransitionDurationStyle(options.duration, applyOnlyDuration);                        // 991
                                                                                                                       // 992
        // we set the duration so that it will be picked up by getComputedStyle later                                  // 993
        applyInlineStyle(node, durationStyle);                                                                         // 994
        temporaryStyles.push(durationStyle);                                                                           // 995
      }                                                                                                                // 996
                                                                                                                       // 997
      if (options.keyframeStyle) {                                                                                     // 998
        var keyframeStyle = [ANIMATION_PROP, options.keyframeStyle];                                                   // 999
        applyInlineStyle(node, keyframeStyle);                                                                         // 1000
        temporaryStyles.push(keyframeStyle);                                                                           // 1001
      }                                                                                                                // 1002
                                                                                                                       // 1003
      var itemIndex = stagger                                                                                          // 1004
          ? options.staggerIndex >= 0                                                                                  // 1005
              ? options.staggerIndex                                                                                   // 1006
              : gcsLookup.count(cacheKey)                                                                              // 1007
          : 0;                                                                                                         // 1008
                                                                                                                       // 1009
      var isFirst = itemIndex === 0;                                                                                   // 1010
                                                                                                                       // 1011
      // this is a pre-emptive way of forcing the setup classes to be added and applied INSTANTLY                      // 1012
      // without causing any combination of transitions to kick in. By adding a negative delay value                   // 1013
      // it forces the setup class' transition to end immediately. We later then remove the negative                   // 1014
      // transition delay to allow for the transition to naturally do it's thing. The beauty here is                   // 1015
      // that if there is no transition defined then nothing will happen and this will also allow                      // 1016
      // other transitions to be stacked on top of each other without any chopping them out.                           // 1017
      if (isFirst && !options.skipBlocking) {                                                                          // 1018
        blockTransitions(node, SAFE_FAST_FORWARD_DURATION_VALUE);                                                      // 1019
      }                                                                                                                // 1020
                                                                                                                       // 1021
      var timings = computeTimings(node, fullClassName, cacheKey);                                                     // 1022
      var relativeDelay = timings.maxDelay;                                                                            // 1023
      maxDelay = Math.max(relativeDelay, 0);                                                                           // 1024
      maxDuration = timings.maxDuration;                                                                               // 1025
                                                                                                                       // 1026
      var flags = {};                                                                                                  // 1027
      flags.hasTransitions          = timings.transitionDuration > 0;                                                  // 1028
      flags.hasAnimations           = timings.animationDuration > 0;                                                   // 1029
      flags.hasTransitionAll        = flags.hasTransitions && timings.transitionProperty == 'all';                     // 1030
      flags.applyTransitionDuration = hasToStyles && (                                                                 // 1031
                                        (flags.hasTransitions && !flags.hasTransitionAll)                              // 1032
                                         || (flags.hasAnimations && !flags.hasTransitions));                           // 1033
      flags.applyAnimationDuration  = options.duration && flags.hasAnimations;                                         // 1034
      flags.applyTransitionDelay    = truthyTimingValue(options.delay) && (flags.applyTransitionDuration || flags.hasTransitions);
      flags.applyAnimationDelay     = truthyTimingValue(options.delay) && flags.hasAnimations;                         // 1036
      flags.recalculateTimingStyles = addRemoveClassName.length > 0;                                                   // 1037
                                                                                                                       // 1038
      if (flags.applyTransitionDuration || flags.applyAnimationDuration) {                                             // 1039
        maxDuration = options.duration ? parseFloat(options.duration) : maxDuration;                                   // 1040
                                                                                                                       // 1041
        if (flags.applyTransitionDuration) {                                                                           // 1042
          flags.hasTransitions = true;                                                                                 // 1043
          timings.transitionDuration = maxDuration;                                                                    // 1044
          applyOnlyDuration = node.style[TRANSITION_PROP + PROPERTY_KEY].length > 0;                                   // 1045
          temporaryStyles.push(getCssTransitionDurationStyle(maxDuration, applyOnlyDuration));                         // 1046
        }                                                                                                              // 1047
                                                                                                                       // 1048
        if (flags.applyAnimationDuration) {                                                                            // 1049
          flags.hasAnimations = true;                                                                                  // 1050
          timings.animationDuration = maxDuration;                                                                     // 1051
          temporaryStyles.push(getCssKeyframeDurationStyle(maxDuration));                                              // 1052
        }                                                                                                              // 1053
      }                                                                                                                // 1054
                                                                                                                       // 1055
      if (maxDuration === 0 && !flags.recalculateTimingStyles) {                                                       // 1056
        return closeAndReturnNoopAnimator();                                                                           // 1057
      }                                                                                                                // 1058
                                                                                                                       // 1059
      if (options.delay != null) {                                                                                     // 1060
        var delayStyle = parseFloat(options.delay);                                                                    // 1061
                                                                                                                       // 1062
        if (flags.applyTransitionDelay) {                                                                              // 1063
          temporaryStyles.push(getCssDelayStyle(delayStyle));                                                          // 1064
        }                                                                                                              // 1065
                                                                                                                       // 1066
        if (flags.applyAnimationDelay) {                                                                               // 1067
          temporaryStyles.push(getCssDelayStyle(delayStyle, true));                                                    // 1068
        }                                                                                                              // 1069
      }                                                                                                                // 1070
                                                                                                                       // 1071
      // we need to recalculate the delay value since we used a pre-emptive negative                                   // 1072
      // delay value and the delay value is required for the final event checking. This                                // 1073
      // property will ensure that this will happen after the RAF phase has passed.                                    // 1074
      if (options.duration == null && timings.transitionDuration > 0) {                                                // 1075
        flags.recalculateTimingStyles = flags.recalculateTimingStyles || isFirst;                                      // 1076
      }                                                                                                                // 1077
                                                                                                                       // 1078
      maxDelayTime = maxDelay * ONE_SECOND;                                                                            // 1079
      maxDurationTime = maxDuration * ONE_SECOND;                                                                      // 1080
      if (!options.skipBlocking) {                                                                                     // 1081
        flags.blockTransition = timings.transitionDuration > 0;                                                        // 1082
        flags.blockKeyframeAnimation = timings.animationDuration > 0 &&                                                // 1083
                                       stagger.animationDelay > 0 &&                                                   // 1084
                                       stagger.animationDuration === 0;                                                // 1085
      }                                                                                                                // 1086
                                                                                                                       // 1087
      if (options.from) {                                                                                              // 1088
        if (options.cleanupStyles) {                                                                                   // 1089
          registerRestorableStyles(restoreStyles, node, Object.keys(options.from));                                    // 1090
        }                                                                                                              // 1091
        applyAnimationFromStyles(element, options);                                                                    // 1092
      }                                                                                                                // 1093
                                                                                                                       // 1094
      if (flags.blockTransition || flags.blockKeyframeAnimation) {                                                     // 1095
        applyBlocking(maxDuration);                                                                                    // 1096
      } else if (!options.skipBlocking) {                                                                              // 1097
        blockTransitions(node, false);                                                                                 // 1098
      }                                                                                                                // 1099
                                                                                                                       // 1100
      // TODO(matsko): for 1.5 change this code to have an animator object for better debugging                        // 1101
      return {                                                                                                         // 1102
        $$willAnimate: true,                                                                                           // 1103
        end: endFn,                                                                                                    // 1104
        start: function() {                                                                                            // 1105
          if (animationClosed) return;                                                                                 // 1106
                                                                                                                       // 1107
          runnerHost = {                                                                                               // 1108
            end: endFn,                                                                                                // 1109
            cancel: cancelFn,                                                                                          // 1110
            resume: null, //this will be set during the start() phase                                                  // 1111
            pause: null                                                                                                // 1112
          };                                                                                                           // 1113
                                                                                                                       // 1114
          runner = new $$AnimateRunner(runnerHost);                                                                    // 1115
                                                                                                                       // 1116
          waitUntilQuiet(start);                                                                                       // 1117
                                                                                                                       // 1118
          // we don't have access to pause/resume the animation                                                        // 1119
          // since it hasn't run yet. AnimateRunner will therefore                                                     // 1120
          // set noop functions for resume and pause and they will                                                     // 1121
          // later be overridden once the animation is triggered                                                       // 1122
          return runner;                                                                                               // 1123
        }                                                                                                              // 1124
      };                                                                                                               // 1125
                                                                                                                       // 1126
      function endFn() {                                                                                               // 1127
        close();                                                                                                       // 1128
      }                                                                                                                // 1129
                                                                                                                       // 1130
      function cancelFn() {                                                                                            // 1131
        close(true);                                                                                                   // 1132
      }                                                                                                                // 1133
                                                                                                                       // 1134
      function close(rejected) { // jshint ignore:line                                                                 // 1135
        // if the promise has been called already then we shouldn't close                                              // 1136
        // the animation again                                                                                         // 1137
        if (animationClosed || (animationCompleted && animationPaused)) return;                                        // 1138
        animationClosed = true;                                                                                        // 1139
        animationPaused = false;                                                                                       // 1140
                                                                                                                       // 1141
        if (!options.$$skipPreparationClasses) {                                                                       // 1142
          $$jqLite.removeClass(element, preparationClasses);                                                           // 1143
        }                                                                                                              // 1144
        $$jqLite.removeClass(element, activeClasses);                                                                  // 1145
                                                                                                                       // 1146
        blockKeyframeAnimations(node, false);                                                                          // 1147
        blockTransitions(node, false);                                                                                 // 1148
                                                                                                                       // 1149
        forEach(temporaryStyles, function(entry) {                                                                     // 1150
          // There is only one way to remove inline style properties entirely from elements.                           // 1151
          // By using `removeProperty` this works, but we need to convert camel-cased CSS                              // 1152
          // styles down to hyphenated values.                                                                         // 1153
          node.style[entry[0]] = '';                                                                                   // 1154
        });                                                                                                            // 1155
                                                                                                                       // 1156
        applyAnimationClasses(element, options);                                                                       // 1157
        applyAnimationStyles(element, options);                                                                        // 1158
                                                                                                                       // 1159
        if (Object.keys(restoreStyles).length) {                                                                       // 1160
          forEach(restoreStyles, function(value, prop) {                                                               // 1161
            value ? node.style.setProperty(prop, value)                                                                // 1162
                  : node.style.removeProperty(prop);                                                                   // 1163
          });                                                                                                          // 1164
        }                                                                                                              // 1165
                                                                                                                       // 1166
        // the reason why we have this option is to allow a synchronous closing callback                               // 1167
        // that is fired as SOON as the animation ends (when the CSS is removed) or if                                 // 1168
        // the animation never takes off at all. A good example is a leave animation since                             // 1169
        // the element must be removed just after the animation is over or else the element                            // 1170
        // will appear on screen for one animation frame causing an overbearing flicker.                               // 1171
        if (options.onDone) {                                                                                          // 1172
          options.onDone();                                                                                            // 1173
        }                                                                                                              // 1174
                                                                                                                       // 1175
        // if the preparation function fails then the promise is not setup                                             // 1176
        if (runner) {                                                                                                  // 1177
          runner.complete(!rejected);                                                                                  // 1178
        }                                                                                                              // 1179
      }                                                                                                                // 1180
                                                                                                                       // 1181
      function applyBlocking(duration) {                                                                               // 1182
        if (flags.blockTransition) {                                                                                   // 1183
          blockTransitions(node, duration);                                                                            // 1184
        }                                                                                                              // 1185
                                                                                                                       // 1186
        if (flags.blockKeyframeAnimation) {                                                                            // 1187
          blockKeyframeAnimations(node, !!duration);                                                                   // 1188
        }                                                                                                              // 1189
      }                                                                                                                // 1190
                                                                                                                       // 1191
      function closeAndReturnNoopAnimator() {                                                                          // 1192
        runner = new $$AnimateRunner({                                                                                 // 1193
          end: endFn,                                                                                                  // 1194
          cancel: cancelFn                                                                                             // 1195
        });                                                                                                            // 1196
                                                                                                                       // 1197
        // should flush the cache animation                                                                            // 1198
        waitUntilQuiet(noop);                                                                                          // 1199
        close();                                                                                                       // 1200
                                                                                                                       // 1201
        return {                                                                                                       // 1202
          $$willAnimate: false,                                                                                        // 1203
          start: function() {                                                                                          // 1204
            return runner;                                                                                             // 1205
          },                                                                                                           // 1206
          end: endFn                                                                                                   // 1207
        };                                                                                                             // 1208
      }                                                                                                                // 1209
                                                                                                                       // 1210
      function start() {                                                                                               // 1211
        if (animationClosed) return;                                                                                   // 1212
        if (!node.parentNode) {                                                                                        // 1213
          close();                                                                                                     // 1214
          return;                                                                                                      // 1215
        }                                                                                                              // 1216
                                                                                                                       // 1217
        var startTime, events = [];                                                                                    // 1218
                                                                                                                       // 1219
        // even though we only pause keyframe animations here the pause flag                                           // 1220
        // will still happen when transitions are used. Only the transition will                                       // 1221
        // not be paused since that is not possible. If the animation ends when                                        // 1222
        // paused then it will not complete until unpaused or cancelled.                                               // 1223
        var playPause = function(playAnimation) {                                                                      // 1224
          if (!animationCompleted) {                                                                                   // 1225
            animationPaused = !playAnimation;                                                                          // 1226
            if (timings.animationDuration) {                                                                           // 1227
              var value = blockKeyframeAnimations(node, animationPaused);                                              // 1228
              animationPaused                                                                                          // 1229
                  ? temporaryStyles.push(value)                                                                        // 1230
                  : removeFromArray(temporaryStyles, value);                                                           // 1231
            }                                                                                                          // 1232
          } else if (animationPaused && playAnimation) {                                                               // 1233
            animationPaused = false;                                                                                   // 1234
            close();                                                                                                   // 1235
          }                                                                                                            // 1236
        };                                                                                                             // 1237
                                                                                                                       // 1238
        // checking the stagger duration prevents an accidently cascade of the CSS delay style                         // 1239
        // being inherited from the parent. If the transition duration is zero then we can safely                      // 1240
        // rely that the delay value is an intential stagger delay style.                                              // 1241
        var maxStagger = itemIndex > 0                                                                                 // 1242
                         && ((timings.transitionDuration && stagger.transitionDuration === 0) ||                       // 1243
                            (timings.animationDuration && stagger.animationDuration === 0))                            // 1244
                         && Math.max(stagger.animationDelay, stagger.transitionDelay);                                 // 1245
        if (maxStagger) {                                                                                              // 1246
          $timeout(triggerAnimationStart,                                                                              // 1247
                   Math.floor(maxStagger * itemIndex * ONE_SECOND),                                                    // 1248
                   false);                                                                                             // 1249
        } else {                                                                                                       // 1250
          triggerAnimationStart();                                                                                     // 1251
        }                                                                                                              // 1252
                                                                                                                       // 1253
        // this will decorate the existing promise runner with pause/resume methods                                    // 1254
        runnerHost.resume = function() {                                                                               // 1255
          playPause(true);                                                                                             // 1256
        };                                                                                                             // 1257
                                                                                                                       // 1258
        runnerHost.pause = function() {                                                                                // 1259
          playPause(false);                                                                                            // 1260
        };                                                                                                             // 1261
                                                                                                                       // 1262
        function triggerAnimationStart() {                                                                             // 1263
          // just incase a stagger animation kicks in when the animation                                               // 1264
          // itself was cancelled entirely                                                                             // 1265
          if (animationClosed) return;                                                                                 // 1266
                                                                                                                       // 1267
          applyBlocking(false);                                                                                        // 1268
                                                                                                                       // 1269
          forEach(temporaryStyles, function(entry) {                                                                   // 1270
            var key = entry[0];                                                                                        // 1271
            var value = entry[1];                                                                                      // 1272
            node.style[key] = value;                                                                                   // 1273
          });                                                                                                          // 1274
                                                                                                                       // 1275
          applyAnimationClasses(element, options);                                                                     // 1276
          $$jqLite.addClass(element, activeClasses);                                                                   // 1277
                                                                                                                       // 1278
          if (flags.recalculateTimingStyles) {                                                                         // 1279
            fullClassName = node.className + ' ' + preparationClasses;                                                 // 1280
            cacheKey = gcsHashFn(node, fullClassName);                                                                 // 1281
                                                                                                                       // 1282
            timings = computeTimings(node, fullClassName, cacheKey);                                                   // 1283
            relativeDelay = timings.maxDelay;                                                                          // 1284
            maxDelay = Math.max(relativeDelay, 0);                                                                     // 1285
            maxDuration = timings.maxDuration;                                                                         // 1286
                                                                                                                       // 1287
            if (maxDuration === 0) {                                                                                   // 1288
              close();                                                                                                 // 1289
              return;                                                                                                  // 1290
            }                                                                                                          // 1291
                                                                                                                       // 1292
            flags.hasTransitions = timings.transitionDuration > 0;                                                     // 1293
            flags.hasAnimations = timings.animationDuration > 0;                                                       // 1294
          }                                                                                                            // 1295
                                                                                                                       // 1296
          if (flags.applyAnimationDelay) {                                                                             // 1297
            relativeDelay = typeof options.delay !== "boolean" && truthyTimingValue(options.delay)                     // 1298
                  ? parseFloat(options.delay)                                                                          // 1299
                  : relativeDelay;                                                                                     // 1300
                                                                                                                       // 1301
            maxDelay = Math.max(relativeDelay, 0);                                                                     // 1302
            timings.animationDelay = relativeDelay;                                                                    // 1303
            delayStyle = getCssDelayStyle(relativeDelay, true);                                                        // 1304
            temporaryStyles.push(delayStyle);                                                                          // 1305
            node.style[delayStyle[0]] = delayStyle[1];                                                                 // 1306
          }                                                                                                            // 1307
                                                                                                                       // 1308
          maxDelayTime = maxDelay * ONE_SECOND;                                                                        // 1309
          maxDurationTime = maxDuration * ONE_SECOND;                                                                  // 1310
                                                                                                                       // 1311
          if (options.easing) {                                                                                        // 1312
            var easeProp, easeVal = options.easing;                                                                    // 1313
            if (flags.hasTransitions) {                                                                                // 1314
              easeProp = TRANSITION_PROP + TIMING_KEY;                                                                 // 1315
              temporaryStyles.push([easeProp, easeVal]);                                                               // 1316
              node.style[easeProp] = easeVal;                                                                          // 1317
            }                                                                                                          // 1318
            if (flags.hasAnimations) {                                                                                 // 1319
              easeProp = ANIMATION_PROP + TIMING_KEY;                                                                  // 1320
              temporaryStyles.push([easeProp, easeVal]);                                                               // 1321
              node.style[easeProp] = easeVal;                                                                          // 1322
            }                                                                                                          // 1323
          }                                                                                                            // 1324
                                                                                                                       // 1325
          if (timings.transitionDuration) {                                                                            // 1326
            events.push(TRANSITIONEND_EVENT);                                                                          // 1327
          }                                                                                                            // 1328
                                                                                                                       // 1329
          if (timings.animationDuration) {                                                                             // 1330
            events.push(ANIMATIONEND_EVENT);                                                                           // 1331
          }                                                                                                            // 1332
                                                                                                                       // 1333
          startTime = Date.now();                                                                                      // 1334
          var timerTime = maxDelayTime + CLOSING_TIME_BUFFER * maxDurationTime;                                        // 1335
          var endTime = startTime + timerTime;                                                                         // 1336
                                                                                                                       // 1337
          var animationsData = element.data(ANIMATE_TIMER_KEY) || [];                                                  // 1338
          var setupFallbackTimer = true;                                                                               // 1339
          if (animationsData.length) {                                                                                 // 1340
            var currentTimerData = animationsData[0];                                                                  // 1341
            setupFallbackTimer = endTime > currentTimerData.expectedEndTime;                                           // 1342
            if (setupFallbackTimer) {                                                                                  // 1343
              $timeout.cancel(currentTimerData.timer);                                                                 // 1344
            } else {                                                                                                   // 1345
              animationsData.push(close);                                                                              // 1346
            }                                                                                                          // 1347
          }                                                                                                            // 1348
                                                                                                                       // 1349
          if (setupFallbackTimer) {                                                                                    // 1350
            var timer = $timeout(onAnimationExpired, timerTime, false);                                                // 1351
            animationsData[0] = {                                                                                      // 1352
              timer: timer,                                                                                            // 1353
              expectedEndTime: endTime                                                                                 // 1354
            };                                                                                                         // 1355
            animationsData.push(close);                                                                                // 1356
            element.data(ANIMATE_TIMER_KEY, animationsData);                                                           // 1357
          }                                                                                                            // 1358
                                                                                                                       // 1359
          element.on(events.join(' '), onAnimationProgress);                                                           // 1360
          if (options.to) {                                                                                            // 1361
            if (options.cleanupStyles) {                                                                               // 1362
              registerRestorableStyles(restoreStyles, node, Object.keys(options.to));                                  // 1363
            }                                                                                                          // 1364
            applyAnimationToStyles(element, options);                                                                  // 1365
          }                                                                                                            // 1366
        }                                                                                                              // 1367
                                                                                                                       // 1368
        function onAnimationExpired() {                                                                                // 1369
          var animationsData = element.data(ANIMATE_TIMER_KEY);                                                        // 1370
                                                                                                                       // 1371
          // this will be false in the event that the element was                                                      // 1372
          // removed from the DOM (via a leave animation or something                                                  // 1373
          // similar)                                                                                                  // 1374
          if (animationsData) {                                                                                        // 1375
            for (var i = 1; i < animationsData.length; i++) {                                                          // 1376
              animationsData[i]();                                                                                     // 1377
            }                                                                                                          // 1378
            element.removeData(ANIMATE_TIMER_KEY);                                                                     // 1379
          }                                                                                                            // 1380
        }                                                                                                              // 1381
                                                                                                                       // 1382
        function onAnimationProgress(event) {                                                                          // 1383
          event.stopPropagation();                                                                                     // 1384
          var ev = event.originalEvent || event;                                                                       // 1385
          var timeStamp = ev.$manualTimeStamp || ev.timeStamp || Date.now();                                           // 1386
                                                                                                                       // 1387
          /* Firefox (or possibly just Gecko) likes to not round values up                                             // 1388
           * when a ms measurement is used for the animation */                                                        // 1389
          var elapsedTime = parseFloat(ev.elapsedTime.toFixed(ELAPSED_TIME_MAX_DECIMAL_PLACES));                       // 1390
                                                                                                                       // 1391
          /* $manualTimeStamp is a mocked timeStamp value which is set                                                 // 1392
           * within browserTrigger(). This is only here so that tests can                                              // 1393
           * mock animations properly. Real events fallback to event.timeStamp,                                        // 1394
           * or, if they don't, then a timeStamp is automatically created for them.                                    // 1395
           * We're checking to see if the timeStamp surpasses the expected delay,                                      // 1396
           * but we're using elapsedTime instead of the timeStamp on the 2nd                                           // 1397
           * pre-condition since animations sometimes close off early */                                               // 1398
          if (Math.max(timeStamp - startTime, 0) >= maxDelayTime && elapsedTime >= maxDuration) {                      // 1399
            // we set this flag to ensure that if the transition is paused then, when resumed,                         // 1400
            // the animation will automatically close itself since transitions cannot be paused.                       // 1401
            animationCompleted = true;                                                                                 // 1402
            close();                                                                                                   // 1403
          }                                                                                                            // 1404
        }                                                                                                              // 1405
      }                                                                                                                // 1406
    };                                                                                                                 // 1407
  }];                                                                                                                  // 1408
}];                                                                                                                    // 1409
                                                                                                                       // 1410
var $$AnimateCssDriverProvider = ['$$animationProvider', function($$animationProvider) {                               // 1411
  $$animationProvider.drivers.push('$$animateCssDriver');                                                              // 1412
                                                                                                                       // 1413
  var NG_ANIMATE_SHIM_CLASS_NAME = 'ng-animate-shim';                                                                  // 1414
  var NG_ANIMATE_ANCHOR_CLASS_NAME = 'ng-anchor';                                                                      // 1415
                                                                                                                       // 1416
  var NG_OUT_ANCHOR_CLASS_NAME = 'ng-anchor-out';                                                                      // 1417
  var NG_IN_ANCHOR_CLASS_NAME = 'ng-anchor-in';                                                                        // 1418
                                                                                                                       // 1419
  function isDocumentFragment(node) {                                                                                  // 1420
    return node.parentNode && node.parentNode.nodeType === 11;                                                         // 1421
  }                                                                                                                    // 1422
                                                                                                                       // 1423
  this.$get = ['$animateCss', '$rootScope', '$$AnimateRunner', '$rootElement', '$sniffer', '$$jqLite', '$document',    // 1424
       function($animateCss,   $rootScope,   $$AnimateRunner,   $rootElement,   $sniffer,   $$jqLite,   $document) {   // 1425
                                                                                                                       // 1426
    // only browsers that support these properties can render animations                                               // 1427
    if (!$sniffer.animations && !$sniffer.transitions) return noop;                                                    // 1428
                                                                                                                       // 1429
    var bodyNode = $document[0].body;                                                                                  // 1430
    var rootNode = getDomNode($rootElement);                                                                           // 1431
                                                                                                                       // 1432
    var rootBodyElement = jqLite(                                                                                      // 1433
      // this is to avoid using something that exists outside of the body                                              // 1434
      // we also special case the doc fragement case because our unit test code                                        // 1435
      // appends the $rootElement to the body after the app has been bootstrapped                                      // 1436
      isDocumentFragment(rootNode) || bodyNode.contains(rootNode) ? rootNode : bodyNode                                // 1437
    );                                                                                                                 // 1438
                                                                                                                       // 1439
    var applyAnimationClasses = applyAnimationClassesFactory($$jqLite);                                                // 1440
                                                                                                                       // 1441
    return function initDriverFn(animationDetails) {                                                                   // 1442
      return animationDetails.from && animationDetails.to                                                              // 1443
          ? prepareFromToAnchorAnimation(animationDetails.from,                                                        // 1444
                                         animationDetails.to,                                                          // 1445
                                         animationDetails.classes,                                                     // 1446
                                         animationDetails.anchors)                                                     // 1447
          : prepareRegularAnimation(animationDetails);                                                                 // 1448
    };                                                                                                                 // 1449
                                                                                                                       // 1450
    function filterCssClasses(classes) {                                                                               // 1451
      //remove all the `ng-` stuff                                                                                     // 1452
      return classes.replace(/\bng-\S+\b/g, '');                                                                       // 1453
    }                                                                                                                  // 1454
                                                                                                                       // 1455
    function getUniqueValues(a, b) {                                                                                   // 1456
      if (isString(a)) a = a.split(' ');                                                                               // 1457
      if (isString(b)) b = b.split(' ');                                                                               // 1458
      return a.filter(function(val) {                                                                                  // 1459
        return b.indexOf(val) === -1;                                                                                  // 1460
      }).join(' ');                                                                                                    // 1461
    }                                                                                                                  // 1462
                                                                                                                       // 1463
    function prepareAnchoredAnimation(classes, outAnchor, inAnchor) {                                                  // 1464
      var clone = jqLite(getDomNode(outAnchor).cloneNode(true));                                                       // 1465
      var startingClasses = filterCssClasses(getClassVal(clone));                                                      // 1466
                                                                                                                       // 1467
      outAnchor.addClass(NG_ANIMATE_SHIM_CLASS_NAME);                                                                  // 1468
      inAnchor.addClass(NG_ANIMATE_SHIM_CLASS_NAME);                                                                   // 1469
                                                                                                                       // 1470
      clone.addClass(NG_ANIMATE_ANCHOR_CLASS_NAME);                                                                    // 1471
                                                                                                                       // 1472
      rootBodyElement.append(clone);                                                                                   // 1473
                                                                                                                       // 1474
      var animatorIn, animatorOut = prepareOutAnimation();                                                             // 1475
                                                                                                                       // 1476
      // the user may not end up using the `out` animation and                                                         // 1477
      // only making use of the `in` animation or vice-versa.                                                          // 1478
      // In either case we should allow this and not assume the                                                        // 1479
      // animation is over unless both animations are not used.                                                        // 1480
      if (!animatorOut) {                                                                                              // 1481
        animatorIn = prepareInAnimation();                                                                             // 1482
        if (!animatorIn) {                                                                                             // 1483
          return end();                                                                                                // 1484
        }                                                                                                              // 1485
      }                                                                                                                // 1486
                                                                                                                       // 1487
      var startingAnimator = animatorOut || animatorIn;                                                                // 1488
                                                                                                                       // 1489
      return {                                                                                                         // 1490
        start: function() {                                                                                            // 1491
          var runner;                                                                                                  // 1492
                                                                                                                       // 1493
          var currentAnimation = startingAnimator.start();                                                             // 1494
          currentAnimation.done(function() {                                                                           // 1495
            currentAnimation = null;                                                                                   // 1496
            if (!animatorIn) {                                                                                         // 1497
              animatorIn = prepareInAnimation();                                                                       // 1498
              if (animatorIn) {                                                                                        // 1499
                currentAnimation = animatorIn.start();                                                                 // 1500
                currentAnimation.done(function() {                                                                     // 1501
                  currentAnimation = null;                                                                             // 1502
                  end();                                                                                               // 1503
                  runner.complete();                                                                                   // 1504
                });                                                                                                    // 1505
                return currentAnimation;                                                                               // 1506
              }                                                                                                        // 1507
            }                                                                                                          // 1508
            // in the event that there is no `in` animation                                                            // 1509
            end();                                                                                                     // 1510
            runner.complete();                                                                                         // 1511
          });                                                                                                          // 1512
                                                                                                                       // 1513
          runner = new $$AnimateRunner({                                                                               // 1514
            end: endFn,                                                                                                // 1515
            cancel: endFn                                                                                              // 1516
          });                                                                                                          // 1517
                                                                                                                       // 1518
          return runner;                                                                                               // 1519
                                                                                                                       // 1520
          function endFn() {                                                                                           // 1521
            if (currentAnimation) {                                                                                    // 1522
              currentAnimation.end();                                                                                  // 1523
            }                                                                                                          // 1524
          }                                                                                                            // 1525
        }                                                                                                              // 1526
      };                                                                                                               // 1527
                                                                                                                       // 1528
      function calculateAnchorStyles(anchor) {                                                                         // 1529
        var styles = {};                                                                                               // 1530
                                                                                                                       // 1531
        var coords = getDomNode(anchor).getBoundingClientRect();                                                       // 1532
                                                                                                                       // 1533
        // we iterate directly since safari messes up and doesn't return                                               // 1534
        // all the keys for the coods object when iterated                                                             // 1535
        forEach(['width','height','top','left'], function(key) {                                                       // 1536
          var value = coords[key];                                                                                     // 1537
          switch (key) {                                                                                               // 1538
            case 'top':                                                                                                // 1539
              value += bodyNode.scrollTop;                                                                             // 1540
              break;                                                                                                   // 1541
            case 'left':                                                                                               // 1542
              value += bodyNode.scrollLeft;                                                                            // 1543
              break;                                                                                                   // 1544
          }                                                                                                            // 1545
          styles[key] = Math.floor(value) + 'px';                                                                      // 1546
        });                                                                                                            // 1547
        return styles;                                                                                                 // 1548
      }                                                                                                                // 1549
                                                                                                                       // 1550
      function prepareOutAnimation() {                                                                                 // 1551
        var animator = $animateCss(clone, {                                                                            // 1552
          addClass: NG_OUT_ANCHOR_CLASS_NAME,                                                                          // 1553
          delay: true,                                                                                                 // 1554
          from: calculateAnchorStyles(outAnchor)                                                                       // 1555
        });                                                                                                            // 1556
                                                                                                                       // 1557
        // read the comment within `prepareRegularAnimation` to understand                                             // 1558
        // why this check is necessary                                                                                 // 1559
        return animator.$$willAnimate ? animator : null;                                                               // 1560
      }                                                                                                                // 1561
                                                                                                                       // 1562
      function getClassVal(element) {                                                                                  // 1563
        return element.attr('class') || '';                                                                            // 1564
      }                                                                                                                // 1565
                                                                                                                       // 1566
      function prepareInAnimation() {                                                                                  // 1567
        var endingClasses = filterCssClasses(getClassVal(inAnchor));                                                   // 1568
        var toAdd = getUniqueValues(endingClasses, startingClasses);                                                   // 1569
        var toRemove = getUniqueValues(startingClasses, endingClasses);                                                // 1570
                                                                                                                       // 1571
        var animator = $animateCss(clone, {                                                                            // 1572
          to: calculateAnchorStyles(inAnchor),                                                                         // 1573
          addClass: NG_IN_ANCHOR_CLASS_NAME + ' ' + toAdd,                                                             // 1574
          removeClass: NG_OUT_ANCHOR_CLASS_NAME + ' ' + toRemove,                                                      // 1575
          delay: true                                                                                                  // 1576
        });                                                                                                            // 1577
                                                                                                                       // 1578
        // read the comment within `prepareRegularAnimation` to understand                                             // 1579
        // why this check is necessary                                                                                 // 1580
        return animator.$$willAnimate ? animator : null;                                                               // 1581
      }                                                                                                                // 1582
                                                                                                                       // 1583
      function end() {                                                                                                 // 1584
        clone.remove();                                                                                                // 1585
        outAnchor.removeClass(NG_ANIMATE_SHIM_CLASS_NAME);                                                             // 1586
        inAnchor.removeClass(NG_ANIMATE_SHIM_CLASS_NAME);                                                              // 1587
      }                                                                                                                // 1588
    }                                                                                                                  // 1589
                                                                                                                       // 1590
    function prepareFromToAnchorAnimation(from, to, classes, anchors) {                                                // 1591
      var fromAnimation = prepareRegularAnimation(from, noop);                                                         // 1592
      var toAnimation = prepareRegularAnimation(to, noop);                                                             // 1593
                                                                                                                       // 1594
      var anchorAnimations = [];                                                                                       // 1595
      forEach(anchors, function(anchor) {                                                                              // 1596
        var outElement = anchor['out'];                                                                                // 1597
        var inElement = anchor['in'];                                                                                  // 1598
        var animator = prepareAnchoredAnimation(classes, outElement, inElement);                                       // 1599
        if (animator) {                                                                                                // 1600
          anchorAnimations.push(animator);                                                                             // 1601
        }                                                                                                              // 1602
      });                                                                                                              // 1603
                                                                                                                       // 1604
      // no point in doing anything when there are no elements to animate                                              // 1605
      if (!fromAnimation && !toAnimation && anchorAnimations.length === 0) return;                                     // 1606
                                                                                                                       // 1607
      return {                                                                                                         // 1608
        start: function() {                                                                                            // 1609
          var animationRunners = [];                                                                                   // 1610
                                                                                                                       // 1611
          if (fromAnimation) {                                                                                         // 1612
            animationRunners.push(fromAnimation.start());                                                              // 1613
          }                                                                                                            // 1614
                                                                                                                       // 1615
          if (toAnimation) {                                                                                           // 1616
            animationRunners.push(toAnimation.start());                                                                // 1617
          }                                                                                                            // 1618
                                                                                                                       // 1619
          forEach(anchorAnimations, function(animation) {                                                              // 1620
            animationRunners.push(animation.start());                                                                  // 1621
          });                                                                                                          // 1622
                                                                                                                       // 1623
          var runner = new $$AnimateRunner({                                                                           // 1624
            end: endFn,                                                                                                // 1625
            cancel: endFn // CSS-driven animations cannot be cancelled, only ended                                     // 1626
          });                                                                                                          // 1627
                                                                                                                       // 1628
          $$AnimateRunner.all(animationRunners, function(status) {                                                     // 1629
            runner.complete(status);                                                                                   // 1630
          });                                                                                                          // 1631
                                                                                                                       // 1632
          return runner;                                                                                               // 1633
                                                                                                                       // 1634
          function endFn() {                                                                                           // 1635
            forEach(animationRunners, function(runner) {                                                               // 1636
              runner.end();                                                                                            // 1637
            });                                                                                                        // 1638
          }                                                                                                            // 1639
        }                                                                                                              // 1640
      };                                                                                                               // 1641
    }                                                                                                                  // 1642
                                                                                                                       // 1643
    function prepareRegularAnimation(animationDetails) {                                                               // 1644
      var element = animationDetails.element;                                                                          // 1645
      var options = animationDetails.options || {};                                                                    // 1646
                                                                                                                       // 1647
      if (animationDetails.structural) {                                                                               // 1648
        options.event = animationDetails.event;                                                                        // 1649
        options.structural = true;                                                                                     // 1650
        options.applyClassesEarly = true;                                                                              // 1651
                                                                                                                       // 1652
        // we special case the leave animation since we want to ensure that                                            // 1653
        // the element is removed as soon as the animation is over. Otherwise                                          // 1654
        // a flicker might appear or the element may not be removed at all                                             // 1655
        if (animationDetails.event === 'leave') {                                                                      // 1656
          options.onDone = options.domOperation;                                                                       // 1657
        }                                                                                                              // 1658
      }                                                                                                                // 1659
                                                                                                                       // 1660
      // We assign the preparationClasses as the actual animation event since                                          // 1661
      // the internals of $animateCss will just suffix the event token values                                          // 1662
      // with `-active` to trigger the animation.                                                                      // 1663
      if (options.preparationClasses) {                                                                                // 1664
        options.event = concatWithSpace(options.event, options.preparationClasses);                                    // 1665
      }                                                                                                                // 1666
                                                                                                                       // 1667
      var animator = $animateCss(element, options);                                                                    // 1668
                                                                                                                       // 1669
      // the driver lookup code inside of $$animation attempts to spawn a                                              // 1670
      // driver one by one until a driver returns a.$$willAnimate animator object.                                     // 1671
      // $animateCss will always return an object, however, it will pass in                                            // 1672
      // a flag as a hint as to whether an animation was detected or not                                               // 1673
      return animator.$$willAnimate ? animator : null;                                                                 // 1674
    }                                                                                                                  // 1675
  }];                                                                                                                  // 1676
}];                                                                                                                    // 1677
                                                                                                                       // 1678
// TODO(matsko): use caching here to speed things up for detection                                                     // 1679
// TODO(matsko): add documentation                                                                                     // 1680
//  by the time...                                                                                                     // 1681
                                                                                                                       // 1682
var $$AnimateJsProvider = ['$animateProvider', function($animateProvider) {                                            // 1683
  this.$get = ['$injector', '$$AnimateRunner', '$$jqLite',                                                             // 1684
       function($injector,   $$AnimateRunner,   $$jqLite) {                                                            // 1685
                                                                                                                       // 1686
    var applyAnimationClasses = applyAnimationClassesFactory($$jqLite);                                                // 1687
         // $animateJs(element, 'enter');                                                                              // 1688
    return function(element, event, classes, options) {                                                                // 1689
      // the `classes` argument is optional and if it is not used                                                      // 1690
      // then the classes will be resolved from the element's className                                                // 1691
      // property as well as options.addClass/options.removeClass.                                                     // 1692
      if (arguments.length === 3 && isObject(classes)) {                                                               // 1693
        options = classes;                                                                                             // 1694
        classes = null;                                                                                                // 1695
      }                                                                                                                // 1696
                                                                                                                       // 1697
      options = prepareAnimationOptions(options);                                                                      // 1698
      if (!classes) {                                                                                                  // 1699
        classes = element.attr('class') || '';                                                                         // 1700
        if (options.addClass) {                                                                                        // 1701
          classes += ' ' + options.addClass;                                                                           // 1702
        }                                                                                                              // 1703
        if (options.removeClass) {                                                                                     // 1704
          classes += ' ' + options.removeClass;                                                                        // 1705
        }                                                                                                              // 1706
      }                                                                                                                // 1707
                                                                                                                       // 1708
      var classesToAdd = options.addClass;                                                                             // 1709
      var classesToRemove = options.removeClass;                                                                       // 1710
                                                                                                                       // 1711
      // the lookupAnimations function returns a series of animation objects that are                                  // 1712
      // matched up with one or more of the CSS classes. These animation objects are                                   // 1713
      // defined via the module.animation factory function. If nothing is detected then                                // 1714
      // we don't return anything which then makes $animation query the next driver.                                   // 1715
      var animations = lookupAnimations(classes);                                                                      // 1716
      var before, after;                                                                                               // 1717
      if (animations.length) {                                                                                         // 1718
        var afterFn, beforeFn;                                                                                         // 1719
        if (event == 'leave') {                                                                                        // 1720
          beforeFn = 'leave';                                                                                          // 1721
          afterFn = 'afterLeave'; // TODO(matsko): get rid of this                                                     // 1722
        } else {                                                                                                       // 1723
          beforeFn = 'before' + event.charAt(0).toUpperCase() + event.substr(1);                                       // 1724
          afterFn = event;                                                                                             // 1725
        }                                                                                                              // 1726
                                                                                                                       // 1727
        if (event !== 'enter' && event !== 'move') {                                                                   // 1728
          before = packageAnimations(element, event, options, animations, beforeFn);                                   // 1729
        }                                                                                                              // 1730
        after  = packageAnimations(element, event, options, animations, afterFn);                                      // 1731
      }                                                                                                                // 1732
                                                                                                                       // 1733
      // no matching animations                                                                                        // 1734
      if (!before && !after) return;                                                                                   // 1735
                                                                                                                       // 1736
      function applyOptions() {                                                                                        // 1737
        options.domOperation();                                                                                        // 1738
        applyAnimationClasses(element, options);                                                                       // 1739
      }                                                                                                                // 1740
                                                                                                                       // 1741
      return {                                                                                                         // 1742
        start: function() {                                                                                            // 1743
          var closeActiveAnimations;                                                                                   // 1744
          var chain = [];                                                                                              // 1745
                                                                                                                       // 1746
          if (before) {                                                                                                // 1747
            chain.push(function(fn) {                                                                                  // 1748
              closeActiveAnimations = before(fn);                                                                      // 1749
            });                                                                                                        // 1750
          }                                                                                                            // 1751
                                                                                                                       // 1752
          if (chain.length) {                                                                                          // 1753
            chain.push(function(fn) {                                                                                  // 1754
              applyOptions();                                                                                          // 1755
              fn(true);                                                                                                // 1756
            });                                                                                                        // 1757
          } else {                                                                                                     // 1758
            applyOptions();                                                                                            // 1759
          }                                                                                                            // 1760
                                                                                                                       // 1761
          if (after) {                                                                                                 // 1762
            chain.push(function(fn) {                                                                                  // 1763
              closeActiveAnimations = after(fn);                                                                       // 1764
            });                                                                                                        // 1765
          }                                                                                                            // 1766
                                                                                                                       // 1767
          var animationClosed = false;                                                                                 // 1768
          var runner = new $$AnimateRunner({                                                                           // 1769
            end: function() {                                                                                          // 1770
              endAnimations();                                                                                         // 1771
            },                                                                                                         // 1772
            cancel: function() {                                                                                       // 1773
              endAnimations(true);                                                                                     // 1774
            }                                                                                                          // 1775
          });                                                                                                          // 1776
                                                                                                                       // 1777
          $$AnimateRunner.chain(chain, onComplete);                                                                    // 1778
          return runner;                                                                                               // 1779
                                                                                                                       // 1780
          function onComplete(success) {                                                                               // 1781
            animationClosed = true;                                                                                    // 1782
            applyOptions();                                                                                            // 1783
            applyAnimationStyles(element, options);                                                                    // 1784
            runner.complete(success);                                                                                  // 1785
          }                                                                                                            // 1786
                                                                                                                       // 1787
          function endAnimations(cancelled) {                                                                          // 1788
            if (!animationClosed) {                                                                                    // 1789
              (closeActiveAnimations || noop)(cancelled);                                                              // 1790
              onComplete(cancelled);                                                                                   // 1791
            }                                                                                                          // 1792
          }                                                                                                            // 1793
        }                                                                                                              // 1794
      };                                                                                                               // 1795
                                                                                                                       // 1796
      function executeAnimationFn(fn, element, event, options, onDone) {                                               // 1797
        var args;                                                                                                      // 1798
        switch (event) {                                                                                               // 1799
          case 'animate':                                                                                              // 1800
            args = [element, options.from, options.to, onDone];                                                        // 1801
            break;                                                                                                     // 1802
                                                                                                                       // 1803
          case 'setClass':                                                                                             // 1804
            args = [element, classesToAdd, classesToRemove, onDone];                                                   // 1805
            break;                                                                                                     // 1806
                                                                                                                       // 1807
          case 'addClass':                                                                                             // 1808
            args = [element, classesToAdd, onDone];                                                                    // 1809
            break;                                                                                                     // 1810
                                                                                                                       // 1811
          case 'removeClass':                                                                                          // 1812
            args = [element, classesToRemove, onDone];                                                                 // 1813
            break;                                                                                                     // 1814
                                                                                                                       // 1815
          default:                                                                                                     // 1816
            args = [element, onDone];                                                                                  // 1817
            break;                                                                                                     // 1818
        }                                                                                                              // 1819
                                                                                                                       // 1820
        args.push(options);                                                                                            // 1821
                                                                                                                       // 1822
        var value = fn.apply(fn, args);                                                                                // 1823
        if (value) {                                                                                                   // 1824
          if (isFunction(value.start)) {                                                                               // 1825
            value = value.start();                                                                                     // 1826
          }                                                                                                            // 1827
                                                                                                                       // 1828
          if (value instanceof $$AnimateRunner) {                                                                      // 1829
            value.done(onDone);                                                                                        // 1830
          } else if (isFunction(value)) {                                                                              // 1831
            // optional onEnd / onCancel callback                                                                      // 1832
            return value;                                                                                              // 1833
          }                                                                                                            // 1834
        }                                                                                                              // 1835
                                                                                                                       // 1836
        return noop;                                                                                                   // 1837
      }                                                                                                                // 1838
                                                                                                                       // 1839
      function groupEventedAnimations(element, event, options, animations, fnName) {                                   // 1840
        var operations = [];                                                                                           // 1841
        forEach(animations, function(ani) {                                                                            // 1842
          var animation = ani[fnName];                                                                                 // 1843
          if (!animation) return;                                                                                      // 1844
                                                                                                                       // 1845
          // note that all of these animations will run in parallel                                                    // 1846
          operations.push(function() {                                                                                 // 1847
            var runner;                                                                                                // 1848
            var endProgressCb;                                                                                         // 1849
                                                                                                                       // 1850
            var resolved = false;                                                                                      // 1851
            var onAnimationComplete = function(rejected) {                                                             // 1852
              if (!resolved) {                                                                                         // 1853
                resolved = true;                                                                                       // 1854
                (endProgressCb || noop)(rejected);                                                                     // 1855
                runner.complete(!rejected);                                                                            // 1856
              }                                                                                                        // 1857
            };                                                                                                         // 1858
                                                                                                                       // 1859
            runner = new $$AnimateRunner({                                                                             // 1860
              end: function() {                                                                                        // 1861
                onAnimationComplete();                                                                                 // 1862
              },                                                                                                       // 1863
              cancel: function() {                                                                                     // 1864
                onAnimationComplete(true);                                                                             // 1865
              }                                                                                                        // 1866
            });                                                                                                        // 1867
                                                                                                                       // 1868
            endProgressCb = executeAnimationFn(animation, element, event, options, function(result) {                  // 1869
              var cancelled = result === false;                                                                        // 1870
              onAnimationComplete(cancelled);                                                                          // 1871
            });                                                                                                        // 1872
                                                                                                                       // 1873
            return runner;                                                                                             // 1874
          });                                                                                                          // 1875
        });                                                                                                            // 1876
                                                                                                                       // 1877
        return operations;                                                                                             // 1878
      }                                                                                                                // 1879
                                                                                                                       // 1880
      function packageAnimations(element, event, options, animations, fnName) {                                        // 1881
        var operations = groupEventedAnimations(element, event, options, animations, fnName);                          // 1882
        if (operations.length === 0) {                                                                                 // 1883
          var a,b;                                                                                                     // 1884
          if (fnName === 'beforeSetClass') {                                                                           // 1885
            a = groupEventedAnimations(element, 'removeClass', options, animations, 'beforeRemoveClass');              // 1886
            b = groupEventedAnimations(element, 'addClass', options, animations, 'beforeAddClass');                    // 1887
          } else if (fnName === 'setClass') {                                                                          // 1888
            a = groupEventedAnimations(element, 'removeClass', options, animations, 'removeClass');                    // 1889
            b = groupEventedAnimations(element, 'addClass', options, animations, 'addClass');                          // 1890
          }                                                                                                            // 1891
                                                                                                                       // 1892
          if (a) {                                                                                                     // 1893
            operations = operations.concat(a);                                                                         // 1894
          }                                                                                                            // 1895
          if (b) {                                                                                                     // 1896
            operations = operations.concat(b);                                                                         // 1897
          }                                                                                                            // 1898
        }                                                                                                              // 1899
                                                                                                                       // 1900
        if (operations.length === 0) return;                                                                           // 1901
                                                                                                                       // 1902
        // TODO(matsko): add documentation                                                                             // 1903
        return function startAnimation(callback) {                                                                     // 1904
          var runners = [];                                                                                            // 1905
          if (operations.length) {                                                                                     // 1906
            forEach(operations, function(animateFn) {                                                                  // 1907
              runners.push(animateFn());                                                                               // 1908
            });                                                                                                        // 1909
          }                                                                                                            // 1910
                                                                                                                       // 1911
          runners.length ? $$AnimateRunner.all(runners, callback) : callback();                                        // 1912
                                                                                                                       // 1913
          return function endFn(reject) {                                                                              // 1914
            forEach(runners, function(runner) {                                                                        // 1915
              reject ? runner.cancel() : runner.end();                                                                 // 1916
            });                                                                                                        // 1917
          };                                                                                                           // 1918
        };                                                                                                             // 1919
      }                                                                                                                // 1920
    };                                                                                                                 // 1921
                                                                                                                       // 1922
    function lookupAnimations(classes) {                                                                               // 1923
      classes = isArray(classes) ? classes : classes.split(' ');                                                       // 1924
      var matches = [], flagMap = {};                                                                                  // 1925
      for (var i=0; i < classes.length; i++) {                                                                         // 1926
        var klass = classes[i],                                                                                        // 1927
            animationFactory = $animateProvider.$$registeredAnimations[klass];                                         // 1928
        if (animationFactory && !flagMap[klass]) {                                                                     // 1929
          matches.push($injector.get(animationFactory));                                                               // 1930
          flagMap[klass] = true;                                                                                       // 1931
        }                                                                                                              // 1932
      }                                                                                                                // 1933
      return matches;                                                                                                  // 1934
    }                                                                                                                  // 1935
  }];                                                                                                                  // 1936
}];                                                                                                                    // 1937
                                                                                                                       // 1938
var $$AnimateJsDriverProvider = ['$$animationProvider', function($$animationProvider) {                                // 1939
  $$animationProvider.drivers.push('$$animateJsDriver');                                                               // 1940
  this.$get = ['$$animateJs', '$$AnimateRunner', function($$animateJs, $$AnimateRunner) {                              // 1941
    return function initDriverFn(animationDetails) {                                                                   // 1942
      if (animationDetails.from && animationDetails.to) {                                                              // 1943
        var fromAnimation = prepareAnimation(animationDetails.from);                                                   // 1944
        var toAnimation = prepareAnimation(animationDetails.to);                                                       // 1945
        if (!fromAnimation && !toAnimation) return;                                                                    // 1946
                                                                                                                       // 1947
        return {                                                                                                       // 1948
          start: function() {                                                                                          // 1949
            var animationRunners = [];                                                                                 // 1950
                                                                                                                       // 1951
            if (fromAnimation) {                                                                                       // 1952
              animationRunners.push(fromAnimation.start());                                                            // 1953
            }                                                                                                          // 1954
                                                                                                                       // 1955
            if (toAnimation) {                                                                                         // 1956
              animationRunners.push(toAnimation.start());                                                              // 1957
            }                                                                                                          // 1958
                                                                                                                       // 1959
            $$AnimateRunner.all(animationRunners, done);                                                               // 1960
                                                                                                                       // 1961
            var runner = new $$AnimateRunner({                                                                         // 1962
              end: endFnFactory(),                                                                                     // 1963
              cancel: endFnFactory()                                                                                   // 1964
            });                                                                                                        // 1965
                                                                                                                       // 1966
            return runner;                                                                                             // 1967
                                                                                                                       // 1968
            function endFnFactory() {                                                                                  // 1969
              return function() {                                                                                      // 1970
                forEach(animationRunners, function(runner) {                                                           // 1971
                  // at this point we cannot cancel animations for groups just yet. 1.5+                               // 1972
                  runner.end();                                                                                        // 1973
                });                                                                                                    // 1974
              };                                                                                                       // 1975
            }                                                                                                          // 1976
                                                                                                                       // 1977
            function done(status) {                                                                                    // 1978
              runner.complete(status);                                                                                 // 1979
            }                                                                                                          // 1980
          }                                                                                                            // 1981
        };                                                                                                             // 1982
      } else {                                                                                                         // 1983
        return prepareAnimation(animationDetails);                                                                     // 1984
      }                                                                                                                // 1985
    };                                                                                                                 // 1986
                                                                                                                       // 1987
    function prepareAnimation(animationDetails) {                                                                      // 1988
      // TODO(matsko): make sure to check for grouped animations and delegate down to normal animations                // 1989
      var element = animationDetails.element;                                                                          // 1990
      var event = animationDetails.event;                                                                              // 1991
      var options = animationDetails.options;                                                                          // 1992
      var classes = animationDetails.classes;                                                                          // 1993
      return $$animateJs(element, event, classes, options);                                                            // 1994
    }                                                                                                                  // 1995
  }];                                                                                                                  // 1996
}];                                                                                                                    // 1997
                                                                                                                       // 1998
var NG_ANIMATE_ATTR_NAME = 'data-ng-animate';                                                                          // 1999
var NG_ANIMATE_PIN_DATA = '$ngAnimatePin';                                                                             // 2000
var $$AnimateQueueProvider = ['$animateProvider', function($animateProvider) {                                         // 2001
  var PRE_DIGEST_STATE = 1;                                                                                            // 2002
  var RUNNING_STATE = 2;                                                                                               // 2003
                                                                                                                       // 2004
  var rules = this.rules = {                                                                                           // 2005
    skip: [],                                                                                                          // 2006
    cancel: [],                                                                                                        // 2007
    join: []                                                                                                           // 2008
  };                                                                                                                   // 2009
                                                                                                                       // 2010
  function isAllowed(ruleType, element, currentAnimation, previousAnimation) {                                         // 2011
    return rules[ruleType].some(function(fn) {                                                                         // 2012
      return fn(element, currentAnimation, previousAnimation);                                                         // 2013
    });                                                                                                                // 2014
  }                                                                                                                    // 2015
                                                                                                                       // 2016
  function hasAnimationClasses(options, and) {                                                                         // 2017
    options = options || {};                                                                                           // 2018
    var a = (options.addClass || '').length > 0;                                                                       // 2019
    var b = (options.removeClass || '').length > 0;                                                                    // 2020
    return and ? a && b : a || b;                                                                                      // 2021
  }                                                                                                                    // 2022
                                                                                                                       // 2023
  rules.join.push(function(element, newAnimation, currentAnimation) {                                                  // 2024
    // if the new animation is class-based then we can just tack that on                                               // 2025
    return !newAnimation.structural && hasAnimationClasses(newAnimation.options);                                      // 2026
  });                                                                                                                  // 2027
                                                                                                                       // 2028
  rules.skip.push(function(element, newAnimation, currentAnimation) {                                                  // 2029
    // there is no need to animate anything if no classes are being added and                                          // 2030
    // there is no structural animation that will be triggered                                                         // 2031
    return !newAnimation.structural && !hasAnimationClasses(newAnimation.options);                                     // 2032
  });                                                                                                                  // 2033
                                                                                                                       // 2034
  rules.skip.push(function(element, newAnimation, currentAnimation) {                                                  // 2035
    // why should we trigger a new structural animation if the element will                                            // 2036
    // be removed from the DOM anyway?                                                                                 // 2037
    return currentAnimation.event == 'leave' && newAnimation.structural;                                               // 2038
  });                                                                                                                  // 2039
                                                                                                                       // 2040
  rules.skip.push(function(element, newAnimation, currentAnimation) {                                                  // 2041
    // if there is an ongoing current animation then don't even bother running the class-based animation               // 2042
    return currentAnimation.structural && currentAnimation.state === RUNNING_STATE && !newAnimation.structural;        // 2043
  });                                                                                                                  // 2044
                                                                                                                       // 2045
  rules.cancel.push(function(element, newAnimation, currentAnimation) {                                                // 2046
    // there can never be two structural animations running at the same time                                           // 2047
    return currentAnimation.structural && newAnimation.structural;                                                     // 2048
  });                                                                                                                  // 2049
                                                                                                                       // 2050
  rules.cancel.push(function(element, newAnimation, currentAnimation) {                                                // 2051
    // if the previous animation is already running, but the new animation will                                        // 2052
    // be triggered, but the new animation is structural                                                               // 2053
    return currentAnimation.state === RUNNING_STATE && newAnimation.structural;                                        // 2054
  });                                                                                                                  // 2055
                                                                                                                       // 2056
  rules.cancel.push(function(element, newAnimation, currentAnimation) {                                                // 2057
    var nO = newAnimation.options;                                                                                     // 2058
    var cO = currentAnimation.options;                                                                                 // 2059
                                                                                                                       // 2060
    // if the exact same CSS class is added/removed then it's safe to cancel it                                        // 2061
    return (nO.addClass && nO.addClass === cO.removeClass) || (nO.removeClass && nO.removeClass === cO.addClass);      // 2062
  });                                                                                                                  // 2063
                                                                                                                       // 2064
  this.$get = ['$$rAF', '$rootScope', '$rootElement', '$document', '$$HashMap',                                        // 2065
               '$$animation', '$$AnimateRunner', '$templateRequest', '$$jqLite', '$$forceReflow',                      // 2066
       function($$rAF,   $rootScope,   $rootElement,   $document,   $$HashMap,                                         // 2067
                $$animation,   $$AnimateRunner,   $templateRequest,   $$jqLite,   $$forceReflow) {                     // 2068
                                                                                                                       // 2069
    var activeAnimationsLookup = new $$HashMap();                                                                      // 2070
    var disabledElementsLookup = new $$HashMap();                                                                      // 2071
    var animationsEnabled = null;                                                                                      // 2072
                                                                                                                       // 2073
    function postDigestTaskFactory() {                                                                                 // 2074
      var postDigestCalled = false;                                                                                    // 2075
      return function(fn) {                                                                                            // 2076
        // we only issue a call to postDigest before                                                                   // 2077
        // it has first passed. This prevents any callbacks                                                            // 2078
        // from not firing once the animation has completed                                                            // 2079
        // since it will be out of the digest cycle.                                                                   // 2080
        if (postDigestCalled) {                                                                                        // 2081
          fn();                                                                                                        // 2082
        } else {                                                                                                       // 2083
          $rootScope.$$postDigest(function() {                                                                         // 2084
            postDigestCalled = true;                                                                                   // 2085
            fn();                                                                                                      // 2086
          });                                                                                                          // 2087
        }                                                                                                              // 2088
      };                                                                                                               // 2089
    }                                                                                                                  // 2090
                                                                                                                       // 2091
    // Wait until all directive and route-related templates are downloaded and                                         // 2092
    // compiled. The $templateRequest.totalPendingRequests variable keeps track of                                     // 2093
    // all of the remote templates being currently downloaded. If there are no                                         // 2094
    // templates currently downloading then the watcher will still fire anyway.                                        // 2095
    var deregisterWatch = $rootScope.$watch(                                                                           // 2096
      function() { return $templateRequest.totalPendingRequests === 0; },                                              // 2097
      function(isEmpty) {                                                                                              // 2098
        if (!isEmpty) return;                                                                                          // 2099
        deregisterWatch();                                                                                             // 2100
                                                                                                                       // 2101
        // Now that all templates have been downloaded, $animate will wait until                                       // 2102
        // the post digest queue is empty before enabling animations. By having two                                    // 2103
        // calls to $postDigest calls we can ensure that the flag is enabled at the                                    // 2104
        // very end of the post digest queue. Since all of the animations in $animate                                  // 2105
        // use $postDigest, it's important that the code below executes at the end.                                    // 2106
        // This basically means that the page is fully downloaded and compiled before                                  // 2107
        // any animations are triggered.                                                                               // 2108
        $rootScope.$$postDigest(function() {                                                                           // 2109
          $rootScope.$$postDigest(function() {                                                                         // 2110
            // we check for null directly in the event that the application already called                             // 2111
            // .enabled() with whatever arguments that it provided it with                                             // 2112
            if (animationsEnabled === null) {                                                                          // 2113
              animationsEnabled = true;                                                                                // 2114
            }                                                                                                          // 2115
          });                                                                                                          // 2116
        });                                                                                                            // 2117
      }                                                                                                                // 2118
    );                                                                                                                 // 2119
                                                                                                                       // 2120
    var callbackRegistry = {};                                                                                         // 2121
                                                                                                                       // 2122
    // remember that the classNameFilter is set during the provider/config                                             // 2123
    // stage therefore we can optimize here and setup a helper function                                                // 2124
    var classNameFilter = $animateProvider.classNameFilter();                                                          // 2125
    var isAnimatableClassName = !classNameFilter                                                                       // 2126
              ? function() { return true; }                                                                            // 2127
              : function(className) {                                                                                  // 2128
                return classNameFilter.test(className);                                                                // 2129
              };                                                                                                       // 2130
                                                                                                                       // 2131
    var applyAnimationClasses = applyAnimationClassesFactory($$jqLite);                                                // 2132
                                                                                                                       // 2133
    function normalizeAnimationOptions(element, options) {                                                             // 2134
      return mergeAnimationOptions(element, options, {});                                                              // 2135
    }                                                                                                                  // 2136
                                                                                                                       // 2137
    function findCallbacks(parent, element, event) {                                                                   // 2138
      var targetNode = getDomNode(element);                                                                            // 2139
      var targetParentNode = getDomNode(parent);                                                                       // 2140
                                                                                                                       // 2141
      var matches = [];                                                                                                // 2142
      var entries = callbackRegistry[event];                                                                           // 2143
      if (entries) {                                                                                                   // 2144
        forEach(entries, function(entry) {                                                                             // 2145
          if (entry.node.contains(targetNode)) {                                                                       // 2146
            matches.push(entry.callback);                                                                              // 2147
          } else if (event === 'leave' && entry.node.contains(targetParentNode)) {                                     // 2148
            matches.push(entry.callback);                                                                              // 2149
          }                                                                                                            // 2150
        });                                                                                                            // 2151
      }                                                                                                                // 2152
                                                                                                                       // 2153
      return matches;                                                                                                  // 2154
    }                                                                                                                  // 2155
                                                                                                                       // 2156
    return {                                                                                                           // 2157
      on: function(event, container, callback) {                                                                       // 2158
        var node = extractElementNode(container);                                                                      // 2159
        callbackRegistry[event] = callbackRegistry[event] || [];                                                       // 2160
        callbackRegistry[event].push({                                                                                 // 2161
          node: node,                                                                                                  // 2162
          callback: callback                                                                                           // 2163
        });                                                                                                            // 2164
      },                                                                                                               // 2165
                                                                                                                       // 2166
      off: function(event, container, callback) {                                                                      // 2167
        var entries = callbackRegistry[event];                                                                         // 2168
        if (!entries) return;                                                                                          // 2169
                                                                                                                       // 2170
        callbackRegistry[event] = arguments.length === 1                                                               // 2171
            ? null                                                                                                     // 2172
            : filterFromRegistry(entries, container, callback);                                                        // 2173
                                                                                                                       // 2174
        function filterFromRegistry(list, matchContainer, matchCallback) {                                             // 2175
          var containerNode = extractElementNode(matchContainer);                                                      // 2176
          return list.filter(function(entry) {                                                                         // 2177
            var isMatch = entry.node === containerNode &&                                                              // 2178
                            (!matchCallback || entry.callback === matchCallback);                                      // 2179
            return !isMatch;                                                                                           // 2180
          });                                                                                                          // 2181
        }                                                                                                              // 2182
      },                                                                                                               // 2183
                                                                                                                       // 2184
      pin: function(element, parentElement) {                                                                          // 2185
        assertArg(isElement(element), 'element', 'not an element');                                                    // 2186
        assertArg(isElement(parentElement), 'parentElement', 'not an element');                                        // 2187
        element.data(NG_ANIMATE_PIN_DATA, parentElement);                                                              // 2188
      },                                                                                                               // 2189
                                                                                                                       // 2190
      push: function(element, event, options, domOperation) {                                                          // 2191
        options = options || {};                                                                                       // 2192
        options.domOperation = domOperation;                                                                           // 2193
        return queueAnimation(element, event, options);                                                                // 2194
      },                                                                                                               // 2195
                                                                                                                       // 2196
      // this method has four signatures:                                                                              // 2197
      //  () - global getter                                                                                           // 2198
      //  (bool) - global setter                                                                                       // 2199
      //  (element) - element getter                                                                                   // 2200
      //  (element, bool) - element setter<F37>                                                                        // 2201
      enabled: function(element, bool) {                                                                               // 2202
        var argCount = arguments.length;                                                                               // 2203
                                                                                                                       // 2204
        if (argCount === 0) {                                                                                          // 2205
          // () - Global getter                                                                                        // 2206
          bool = !!animationsEnabled;                                                                                  // 2207
        } else {                                                                                                       // 2208
          var hasElement = isElement(element);                                                                         // 2209
                                                                                                                       // 2210
          if (!hasElement) {                                                                                           // 2211
            // (bool) - Global setter                                                                                  // 2212
            bool = animationsEnabled = !!element;                                                                      // 2213
          } else {                                                                                                     // 2214
            var node = getDomNode(element);                                                                            // 2215
            var recordExists = disabledElementsLookup.get(node);                                                       // 2216
                                                                                                                       // 2217
            if (argCount === 1) {                                                                                      // 2218
              // (element) - Element getter                                                                            // 2219
              bool = !recordExists;                                                                                    // 2220
            } else {                                                                                                   // 2221
              // (element, bool) - Element setter                                                                      // 2222
              bool = !!bool;                                                                                           // 2223
              if (!bool) {                                                                                             // 2224
                disabledElementsLookup.put(node, true);                                                                // 2225
              } else if (recordExists) {                                                                               // 2226
                disabledElementsLookup.remove(node);                                                                   // 2227
              }                                                                                                        // 2228
            }                                                                                                          // 2229
          }                                                                                                            // 2230
        }                                                                                                              // 2231
                                                                                                                       // 2232
        return bool;                                                                                                   // 2233
      }                                                                                                                // 2234
    };                                                                                                                 // 2235
                                                                                                                       // 2236
    function queueAnimation(element, event, options) {                                                                 // 2237
      var node, parent;                                                                                                // 2238
      element = stripCommentsFromElement(element);                                                                     // 2239
      if (element) {                                                                                                   // 2240
        node = getDomNode(element);                                                                                    // 2241
        parent = element.parent();                                                                                     // 2242
      }                                                                                                                // 2243
                                                                                                                       // 2244
      options = prepareAnimationOptions(options);                                                                      // 2245
                                                                                                                       // 2246
      // we create a fake runner with a working promise.                                                               // 2247
      // These methods will become available after the digest has passed                                               // 2248
      var runner = new $$AnimateRunner();                                                                              // 2249
                                                                                                                       // 2250
      // this is used to trigger callbacks in postDigest mode                                                          // 2251
      var runInNextPostDigestOrNow = postDigestTaskFactory();                                                          // 2252
                                                                                                                       // 2253
      if (isArray(options.addClass)) {                                                                                 // 2254
        options.addClass = options.addClass.join(' ');                                                                 // 2255
      }                                                                                                                // 2256
                                                                                                                       // 2257
      if (options.addClass && !isString(options.addClass)) {                                                           // 2258
        options.addClass = null;                                                                                       // 2259
      }                                                                                                                // 2260
                                                                                                                       // 2261
      if (isArray(options.removeClass)) {                                                                              // 2262
        options.removeClass = options.removeClass.join(' ');                                                           // 2263
      }                                                                                                                // 2264
                                                                                                                       // 2265
      if (options.removeClass && !isString(options.removeClass)) {                                                     // 2266
        options.removeClass = null;                                                                                    // 2267
      }                                                                                                                // 2268
                                                                                                                       // 2269
      if (options.from && !isObject(options.from)) {                                                                   // 2270
        options.from = null;                                                                                           // 2271
      }                                                                                                                // 2272
                                                                                                                       // 2273
      if (options.to && !isObject(options.to)) {                                                                       // 2274
        options.to = null;                                                                                             // 2275
      }                                                                                                                // 2276
                                                                                                                       // 2277
      // there are situations where a directive issues an animation for                                                // 2278
      // a jqLite wrapper that contains only comment nodes... If this                                                  // 2279
      // happens then there is no way we can perform an animation                                                      // 2280
      if (!node) {                                                                                                     // 2281
        close();                                                                                                       // 2282
        return runner;                                                                                                 // 2283
      }                                                                                                                // 2284
                                                                                                                       // 2285
      var className = [node.className, options.addClass, options.removeClass].join(' ');                               // 2286
      if (!isAnimatableClassName(className)) {                                                                         // 2287
        close();                                                                                                       // 2288
        return runner;                                                                                                 // 2289
      }                                                                                                                // 2290
                                                                                                                       // 2291
      var isStructural = ['enter', 'move', 'leave'].indexOf(event) >= 0;                                               // 2292
                                                                                                                       // 2293
      // this is a hard disable of all animations for the application or on                                            // 2294
      // the element itself, therefore  there is no need to continue further                                           // 2295
      // past this point if not enabled                                                                                // 2296
      var skipAnimations = !animationsEnabled || disabledElementsLookup.get(node);                                     // 2297
      var existingAnimation = (!skipAnimations && activeAnimationsLookup.get(node)) || {};                             // 2298
      var hasExistingAnimation = !!existingAnimation.state;                                                            // 2299
                                                                                                                       // 2300
      // there is no point in traversing the same collection of parent ancestors if a followup                         // 2301
      // animation will be run on the same element that already did all that checking work                             // 2302
      if (!skipAnimations && (!hasExistingAnimation || existingAnimation.state != PRE_DIGEST_STATE)) {                 // 2303
        skipAnimations = !areAnimationsAllowed(element, parent, event);                                                // 2304
      }                                                                                                                // 2305
                                                                                                                       // 2306
      if (skipAnimations) {                                                                                            // 2307
        close();                                                                                                       // 2308
        return runner;                                                                                                 // 2309
      }                                                                                                                // 2310
                                                                                                                       // 2311
      if (isStructural) {                                                                                              // 2312
        closeChildAnimations(element);                                                                                 // 2313
      }                                                                                                                // 2314
                                                                                                                       // 2315
      var newAnimation = {                                                                                             // 2316
        structural: isStructural,                                                                                      // 2317
        element: element,                                                                                              // 2318
        event: event,                                                                                                  // 2319
        close: close,                                                                                                  // 2320
        options: options,                                                                                              // 2321
        runner: runner                                                                                                 // 2322
      };                                                                                                               // 2323
                                                                                                                       // 2324
      if (hasExistingAnimation) {                                                                                      // 2325
        var skipAnimationFlag = isAllowed('skip', element, newAnimation, existingAnimation);                           // 2326
        if (skipAnimationFlag) {                                                                                       // 2327
          if (existingAnimation.state === RUNNING_STATE) {                                                             // 2328
            close();                                                                                                   // 2329
            return runner;                                                                                             // 2330
          } else {                                                                                                     // 2331
            mergeAnimationOptions(element, existingAnimation.options, options);                                        // 2332
            return existingAnimation.runner;                                                                           // 2333
          }                                                                                                            // 2334
        }                                                                                                              // 2335
                                                                                                                       // 2336
        var cancelAnimationFlag = isAllowed('cancel', element, newAnimation, existingAnimation);                       // 2337
        if (cancelAnimationFlag) {                                                                                     // 2338
          if (existingAnimation.state === RUNNING_STATE) {                                                             // 2339
            // this will end the animation right away and it is safe                                                   // 2340
            // to do so since the animation is already running and the                                                 // 2341
            // runner callback code will run in async                                                                  // 2342
            existingAnimation.runner.end();                                                                            // 2343
          } else if (existingAnimation.structural) {                                                                   // 2344
            // this means that the animation is queued into a digest, but                                              // 2345
            // hasn't started yet. Therefore it is safe to run the close                                               // 2346
            // method which will call the runner methods in async.                                                     // 2347
            existingAnimation.close();                                                                                 // 2348
          } else {                                                                                                     // 2349
            // this will merge the new animation options into existing animation options                               // 2350
            mergeAnimationOptions(element, existingAnimation.options, newAnimation.options);                           // 2351
            return existingAnimation.runner;                                                                           // 2352
          }                                                                                                            // 2353
        } else {                                                                                                       // 2354
          // a joined animation means that this animation will take over the existing one                              // 2355
          // so an example would involve a leave animation taking over an enter. Then when                             // 2356
          // the postDigest kicks in the enter will be ignored.                                                        // 2357
          var joinAnimationFlag = isAllowed('join', element, newAnimation, existingAnimation);                         // 2358
          if (joinAnimationFlag) {                                                                                     // 2359
            if (existingAnimation.state === RUNNING_STATE) {                                                           // 2360
              normalizeAnimationOptions(element, options);                                                             // 2361
            } else {                                                                                                   // 2362
              applyGeneratedPreparationClasses(element, isStructural ? event : null, options);                         // 2363
                                                                                                                       // 2364
              event = newAnimation.event = existingAnimation.event;                                                    // 2365
              options = mergeAnimationOptions(element, existingAnimation.options, newAnimation.options);               // 2366
                                                                                                                       // 2367
              //we return the same runner since only the option values of this animation will                          // 2368
              //be fed into the `existingAnimation`.                                                                   // 2369
              return existingAnimation.runner;                                                                         // 2370
            }                                                                                                          // 2371
          }                                                                                                            // 2372
        }                                                                                                              // 2373
      } else {                                                                                                         // 2374
        // normalization in this case means that it removes redundant CSS classes that                                 // 2375
        // already exist (addClass) or do not exist (removeClass) on the element                                       // 2376
        normalizeAnimationOptions(element, options);                                                                   // 2377
      }                                                                                                                // 2378
                                                                                                                       // 2379
      // when the options are merged and cleaned up we may end up not having to do                                     // 2380
      // an animation at all, therefore we should check this before issuing a post                                     // 2381
      // digest callback. Structural animations will always run no matter what.                                        // 2382
      var isValidAnimation = newAnimation.structural;                                                                  // 2383
      if (!isValidAnimation) {                                                                                         // 2384
        // animate (from/to) can be quickly checked first, otherwise we check if any classes are present               // 2385
        isValidAnimation = (newAnimation.event === 'animate' && Object.keys(newAnimation.options.to || {}).length > 0)
                            || hasAnimationClasses(newAnimation.options);                                              // 2387
      }                                                                                                                // 2388
                                                                                                                       // 2389
      if (!isValidAnimation) {                                                                                         // 2390
        close();                                                                                                       // 2391
        clearElementAnimationState(element);                                                                           // 2392
        return runner;                                                                                                 // 2393
      }                                                                                                                // 2394
                                                                                                                       // 2395
      // the counter keeps track of cancelled animations                                                               // 2396
      var counter = (existingAnimation.counter || 0) + 1;                                                              // 2397
      newAnimation.counter = counter;                                                                                  // 2398
                                                                                                                       // 2399
      markElementAnimationState(element, PRE_DIGEST_STATE, newAnimation);                                              // 2400
                                                                                                                       // 2401
      $rootScope.$$postDigest(function() {                                                                             // 2402
        var animationDetails = activeAnimationsLookup.get(node);                                                       // 2403
        var animationCancelled = !animationDetails;                                                                    // 2404
        animationDetails = animationDetails || {};                                                                     // 2405
                                                                                                                       // 2406
        // if addClass/removeClass is called before something like enter then the                                      // 2407
        // registered parent element may not be present. The code below will ensure                                    // 2408
        // that a final value for parent element is obtained                                                           // 2409
        var parentElement = element.parent() || [];                                                                    // 2410
                                                                                                                       // 2411
        // animate/structural/class-based animations all have requirements. Otherwise there                            // 2412
        // is no point in performing an animation. The parent node must also be set.                                   // 2413
        var isValidAnimation = parentElement.length > 0                                                                // 2414
                                && (animationDetails.event === 'animate'                                               // 2415
                                    || animationDetails.structural                                                     // 2416
                                    || hasAnimationClasses(animationDetails.options));                                 // 2417
                                                                                                                       // 2418
        // this means that the previous animation was cancelled                                                        // 2419
        // even if the follow-up animation is the same event                                                           // 2420
        if (animationCancelled || animationDetails.counter !== counter || !isValidAnimation) {                         // 2421
          // if another animation did not take over then we need                                                       // 2422
          // to make sure that the domOperation and options are                                                        // 2423
          // handled accordingly                                                                                       // 2424
          if (animationCancelled) {                                                                                    // 2425
            applyAnimationClasses(element, options);                                                                   // 2426
            applyAnimationStyles(element, options);                                                                    // 2427
          }                                                                                                            // 2428
                                                                                                                       // 2429
          // if the event changed from something like enter to leave then we do                                        // 2430
          // it, otherwise if it's the same then the end result will be the same too                                   // 2431
          if (animationCancelled || (isStructural && animationDetails.event !== event)) {                              // 2432
            options.domOperation();                                                                                    // 2433
            runner.end();                                                                                              // 2434
          }                                                                                                            // 2435
                                                                                                                       // 2436
          // in the event that the element animation was not cancelled or a follow-up animation                        // 2437
          // isn't allowed to animate from here then we need to clear the state of the element                         // 2438
          // so that any future animations won't read the expired animation data.                                      // 2439
          if (!isValidAnimation) {                                                                                     // 2440
            clearElementAnimationState(element);                                                                       // 2441
          }                                                                                                            // 2442
                                                                                                                       // 2443
          return;                                                                                                      // 2444
        }                                                                                                              // 2445
                                                                                                                       // 2446
        // this combined multiple class to addClass / removeClass into a setClass event                                // 2447
        // so long as a structural event did not take over the animation                                               // 2448
        event = !animationDetails.structural && hasAnimationClasses(animationDetails.options, true)                    // 2449
            ? 'setClass'                                                                                               // 2450
            : animationDetails.event;                                                                                  // 2451
                                                                                                                       // 2452
        markElementAnimationState(element, RUNNING_STATE);                                                             // 2453
        var realRunner = $$animation(element, event, animationDetails.options);                                        // 2454
                                                                                                                       // 2455
        realRunner.done(function(status) {                                                                             // 2456
          close(!status);                                                                                              // 2457
          var animationDetails = activeAnimationsLookup.get(node);                                                     // 2458
          if (animationDetails && animationDetails.counter === counter) {                                              // 2459
            clearElementAnimationState(getDomNode(element));                                                           // 2460
          }                                                                                                            // 2461
          notifyProgress(runner, event, 'close', {});                                                                  // 2462
        });                                                                                                            // 2463
                                                                                                                       // 2464
        // this will update the runner's flow-control events based on                                                  // 2465
        // the `realRunner` object.                                                                                    // 2466
        runner.setHost(realRunner);                                                                                    // 2467
        notifyProgress(runner, event, 'start', {});                                                                    // 2468
      });                                                                                                              // 2469
                                                                                                                       // 2470
      return runner;                                                                                                   // 2471
                                                                                                                       // 2472
      function notifyProgress(runner, event, phase, data) {                                                            // 2473
        runInNextPostDigestOrNow(function() {                                                                          // 2474
          var callbacks = findCallbacks(parent, element, event);                                                       // 2475
          if (callbacks.length) {                                                                                      // 2476
            // do not optimize this call here to RAF because                                                           // 2477
            // we don't know how heavy the callback code here will                                                     // 2478
            // be and if this code is buffered then this can                                                           // 2479
            // lead to a performance regression.                                                                       // 2480
            $$rAF(function() {                                                                                         // 2481
              forEach(callbacks, function(callback) {                                                                  // 2482
                callback(element, phase, data);                                                                        // 2483
              });                                                                                                      // 2484
            });                                                                                                        // 2485
          }                                                                                                            // 2486
        });                                                                                                            // 2487
        runner.progress(event, phase, data);                                                                           // 2488
      }                                                                                                                // 2489
                                                                                                                       // 2490
      function close(reject) { // jshint ignore:line                                                                   // 2491
        clearGeneratedClasses(element, options);                                                                       // 2492
        applyAnimationClasses(element, options);                                                                       // 2493
        applyAnimationStyles(element, options);                                                                        // 2494
        options.domOperation();                                                                                        // 2495
        runner.complete(!reject);                                                                                      // 2496
      }                                                                                                                // 2497
    }                                                                                                                  // 2498
                                                                                                                       // 2499
    function closeChildAnimations(element) {                                                                           // 2500
      var node = getDomNode(element);                                                                                  // 2501
      var children = node.querySelectorAll('[' + NG_ANIMATE_ATTR_NAME + ']');                                          // 2502
      forEach(children, function(child) {                                                                              // 2503
        var state = parseInt(child.getAttribute(NG_ANIMATE_ATTR_NAME));                                                // 2504
        var animationDetails = activeAnimationsLookup.get(child);                                                      // 2505
        switch (state) {                                                                                               // 2506
          case RUNNING_STATE:                                                                                          // 2507
            animationDetails.runner.end();                                                                             // 2508
            /* falls through */                                                                                        // 2509
          case PRE_DIGEST_STATE:                                                                                       // 2510
            if (animationDetails) {                                                                                    // 2511
              activeAnimationsLookup.remove(child);                                                                    // 2512
            }                                                                                                          // 2513
            break;                                                                                                     // 2514
        }                                                                                                              // 2515
      });                                                                                                              // 2516
    }                                                                                                                  // 2517
                                                                                                                       // 2518
    function clearElementAnimationState(element) {                                                                     // 2519
      var node = getDomNode(element);                                                                                  // 2520
      node.removeAttribute(NG_ANIMATE_ATTR_NAME);                                                                      // 2521
      activeAnimationsLookup.remove(node);                                                                             // 2522
    }                                                                                                                  // 2523
                                                                                                                       // 2524
    function isMatchingElement(nodeOrElmA, nodeOrElmB) {                                                               // 2525
      return getDomNode(nodeOrElmA) === getDomNode(nodeOrElmB);                                                        // 2526
    }                                                                                                                  // 2527
                                                                                                                       // 2528
    function areAnimationsAllowed(element, parentElement, event) {                                                     // 2529
      var bodyElement = jqLite($document[0].body);                                                                     // 2530
      var bodyElementDetected = isMatchingElement(element, bodyElement) || element[0].nodeName === 'HTML';             // 2531
      var rootElementDetected = isMatchingElement(element, $rootElement);                                              // 2532
      var parentAnimationDetected = false;                                                                             // 2533
      var animateChildren;                                                                                             // 2534
                                                                                                                       // 2535
      var parentHost = element.data(NG_ANIMATE_PIN_DATA);                                                              // 2536
      if (parentHost) {                                                                                                // 2537
        parentElement = parentHost;                                                                                    // 2538
      }                                                                                                                // 2539
                                                                                                                       // 2540
      while (parentElement && parentElement.length) {                                                                  // 2541
        if (!rootElementDetected) {                                                                                    // 2542
          // angular doesn't want to attempt to animate elements outside of the application                            // 2543
          // therefore we need to ensure that the rootElement is an ancestor of the current element                    // 2544
          rootElementDetected = isMatchingElement(parentElement, $rootElement);                                        // 2545
        }                                                                                                              // 2546
                                                                                                                       // 2547
        var parentNode = parentElement[0];                                                                             // 2548
        if (parentNode.nodeType !== ELEMENT_NODE) {                                                                    // 2549
          // no point in inspecting the #document element                                                              // 2550
          break;                                                                                                       // 2551
        }                                                                                                              // 2552
                                                                                                                       // 2553
        var details = activeAnimationsLookup.get(parentNode) || {};                                                    // 2554
        // either an enter, leave or move animation will commence                                                      // 2555
        // therefore we can't allow any animations to take place                                                       // 2556
        // but if a parent animation is class-based then that's ok                                                     // 2557
        if (!parentAnimationDetected) {                                                                                // 2558
          parentAnimationDetected = details.structural || disabledElementsLookup.get(parentNode);                      // 2559
        }                                                                                                              // 2560
                                                                                                                       // 2561
        if (isUndefined(animateChildren) || animateChildren === true) {                                                // 2562
          var value = parentElement.data(NG_ANIMATE_CHILDREN_DATA);                                                    // 2563
          if (isDefined(value)) {                                                                                      // 2564
            animateChildren = value;                                                                                   // 2565
          }                                                                                                            // 2566
        }                                                                                                              // 2567
                                                                                                                       // 2568
        // there is no need to continue traversing at this point                                                       // 2569
        if (parentAnimationDetected && animateChildren === false) break;                                               // 2570
                                                                                                                       // 2571
        if (!rootElementDetected) {                                                                                    // 2572
          // angular doesn't want to attempt to animate elements outside of the application                            // 2573
          // therefore we need to ensure that the rootElement is an ancestor of the current element                    // 2574
          rootElementDetected = isMatchingElement(parentElement, $rootElement);                                        // 2575
          if (!rootElementDetected) {                                                                                  // 2576
            parentHost = parentElement.data(NG_ANIMATE_PIN_DATA);                                                      // 2577
            if (parentHost) {                                                                                          // 2578
              parentElement = parentHost;                                                                              // 2579
            }                                                                                                          // 2580
          }                                                                                                            // 2581
        }                                                                                                              // 2582
                                                                                                                       // 2583
        if (!bodyElementDetected) {                                                                                    // 2584
          // we also need to ensure that the element is or will be apart of the body element                           // 2585
          // otherwise it is pointless to even issue an animation to be rendered                                       // 2586
          bodyElementDetected = isMatchingElement(parentElement, bodyElement);                                         // 2587
        }                                                                                                              // 2588
                                                                                                                       // 2589
        parentElement = parentElement.parent();                                                                        // 2590
      }                                                                                                                // 2591
                                                                                                                       // 2592
      var allowAnimation = !parentAnimationDetected || animateChildren;                                                // 2593
      return allowAnimation && rootElementDetected && bodyElementDetected;                                             // 2594
    }                                                                                                                  // 2595
                                                                                                                       // 2596
    function markElementAnimationState(element, state, details) {                                                      // 2597
      details = details || {};                                                                                         // 2598
      details.state = state;                                                                                           // 2599
                                                                                                                       // 2600
      var node = getDomNode(element);                                                                                  // 2601
      node.setAttribute(NG_ANIMATE_ATTR_NAME, state);                                                                  // 2602
                                                                                                                       // 2603
      var oldValue = activeAnimationsLookup.get(node);                                                                 // 2604
      var newValue = oldValue                                                                                          // 2605
          ? extend(oldValue, details)                                                                                  // 2606
          : details;                                                                                                   // 2607
      activeAnimationsLookup.put(node, newValue);                                                                      // 2608
    }                                                                                                                  // 2609
  }];                                                                                                                  // 2610
}];                                                                                                                    // 2611
                                                                                                                       // 2612
var $$AnimateAsyncRunFactory = ['$$rAF', function($$rAF) {                                                             // 2613
  var waitQueue = [];                                                                                                  // 2614
                                                                                                                       // 2615
  function waitForTick(fn) {                                                                                           // 2616
    waitQueue.push(fn);                                                                                                // 2617
    if (waitQueue.length > 1) return;                                                                                  // 2618
    $$rAF(function() {                                                                                                 // 2619
      for (var i = 0; i < waitQueue.length; i++) {                                                                     // 2620
        waitQueue[i]();                                                                                                // 2621
      }                                                                                                                // 2622
      waitQueue = [];                                                                                                  // 2623
    });                                                                                                                // 2624
  }                                                                                                                    // 2625
                                                                                                                       // 2626
  return function() {                                                                                                  // 2627
    var passed = false;                                                                                                // 2628
    waitForTick(function() {                                                                                           // 2629
      passed = true;                                                                                                   // 2630
    });                                                                                                                // 2631
    return function(callback) {                                                                                        // 2632
      passed ? callback() : waitForTick(callback);                                                                     // 2633
    };                                                                                                                 // 2634
  };                                                                                                                   // 2635
}];                                                                                                                    // 2636
                                                                                                                       // 2637
var $$AnimateRunnerFactory = ['$q', '$sniffer', '$$animateAsyncRun',                                                   // 2638
                      function($q,   $sniffer,   $$animateAsyncRun) {                                                  // 2639
                                                                                                                       // 2640
  var INITIAL_STATE = 0;                                                                                               // 2641
  var DONE_PENDING_STATE = 1;                                                                                          // 2642
  var DONE_COMPLETE_STATE = 2;                                                                                         // 2643
                                                                                                                       // 2644
  AnimateRunner.chain = function(chain, callback) {                                                                    // 2645
    var index = 0;                                                                                                     // 2646
                                                                                                                       // 2647
    next();                                                                                                            // 2648
    function next() {                                                                                                  // 2649
      if (index === chain.length) {                                                                                    // 2650
        callback(true);                                                                                                // 2651
        return;                                                                                                        // 2652
      }                                                                                                                // 2653
                                                                                                                       // 2654
      chain[index](function(response) {                                                                                // 2655
        if (response === false) {                                                                                      // 2656
          callback(false);                                                                                             // 2657
          return;                                                                                                      // 2658
        }                                                                                                              // 2659
        index++;                                                                                                       // 2660
        next();                                                                                                        // 2661
      });                                                                                                              // 2662
    }                                                                                                                  // 2663
  };                                                                                                                   // 2664
                                                                                                                       // 2665
  AnimateRunner.all = function(runners, callback) {                                                                    // 2666
    var count = 0;                                                                                                     // 2667
    var status = true;                                                                                                 // 2668
    forEach(runners, function(runner) {                                                                                // 2669
      runner.done(onProgress);                                                                                         // 2670
    });                                                                                                                // 2671
                                                                                                                       // 2672
    function onProgress(response) {                                                                                    // 2673
      status = status && response;                                                                                     // 2674
      if (++count === runners.length) {                                                                                // 2675
        callback(status);                                                                                              // 2676
      }                                                                                                                // 2677
    }                                                                                                                  // 2678
  };                                                                                                                   // 2679
                                                                                                                       // 2680
  function AnimateRunner(host) {                                                                                       // 2681
    this.setHost(host);                                                                                                // 2682
                                                                                                                       // 2683
    this._doneCallbacks = [];                                                                                          // 2684
    this._runInAnimationFrame = $$animateAsyncRun();                                                                   // 2685
    this._state = 0;                                                                                                   // 2686
  }                                                                                                                    // 2687
                                                                                                                       // 2688
  AnimateRunner.prototype = {                                                                                          // 2689
    setHost: function(host) {                                                                                          // 2690
      this.host = host || {};                                                                                          // 2691
    },                                                                                                                 // 2692
                                                                                                                       // 2693
    done: function(fn) {                                                                                               // 2694
      if (this._state === DONE_COMPLETE_STATE) {                                                                       // 2695
        fn();                                                                                                          // 2696
      } else {                                                                                                         // 2697
        this._doneCallbacks.push(fn);                                                                                  // 2698
      }                                                                                                                // 2699
    },                                                                                                                 // 2700
                                                                                                                       // 2701
    progress: noop,                                                                                                    // 2702
                                                                                                                       // 2703
    getPromise: function() {                                                                                           // 2704
      if (!this.promise) {                                                                                             // 2705
        var self = this;                                                                                               // 2706
        this.promise = $q(function(resolve, reject) {                                                                  // 2707
          self.done(function(status) {                                                                                 // 2708
            status === false ? reject() : resolve();                                                                   // 2709
          });                                                                                                          // 2710
        });                                                                                                            // 2711
      }                                                                                                                // 2712
      return this.promise;                                                                                             // 2713
    },                                                                                                                 // 2714
                                                                                                                       // 2715
    then: function(resolveHandler, rejectHandler) {                                                                    // 2716
      return this.getPromise().then(resolveHandler, rejectHandler);                                                    // 2717
    },                                                                                                                 // 2718
                                                                                                                       // 2719
    'catch': function(handler) {                                                                                       // 2720
      return this.getPromise()['catch'](handler);                                                                      // 2721
    },                                                                                                                 // 2722
                                                                                                                       // 2723
    'finally': function(handler) {                                                                                     // 2724
      return this.getPromise()['finally'](handler);                                                                    // 2725
    },                                                                                                                 // 2726
                                                                                                                       // 2727
    pause: function() {                                                                                                // 2728
      if (this.host.pause) {                                                                                           // 2729
        this.host.pause();                                                                                             // 2730
      }                                                                                                                // 2731
    },                                                                                                                 // 2732
                                                                                                                       // 2733
    resume: function() {                                                                                               // 2734
      if (this.host.resume) {                                                                                          // 2735
        this.host.resume();                                                                                            // 2736
      }                                                                                                                // 2737
    },                                                                                                                 // 2738
                                                                                                                       // 2739
    end: function() {                                                                                                  // 2740
      if (this.host.end) {                                                                                             // 2741
        this.host.end();                                                                                               // 2742
      }                                                                                                                // 2743
      this._resolve(true);                                                                                             // 2744
    },                                                                                                                 // 2745
                                                                                                                       // 2746
    cancel: function() {                                                                                               // 2747
      if (this.host.cancel) {                                                                                          // 2748
        this.host.cancel();                                                                                            // 2749
      }                                                                                                                // 2750
      this._resolve(false);                                                                                            // 2751
    },                                                                                                                 // 2752
                                                                                                                       // 2753
    complete: function(response) {                                                                                     // 2754
      var self = this;                                                                                                 // 2755
      if (self._state === INITIAL_STATE) {                                                                             // 2756
        self._state = DONE_PENDING_STATE;                                                                              // 2757
        self._runInAnimationFrame(function() {                                                                         // 2758
          self._resolve(response);                                                                                     // 2759
        });                                                                                                            // 2760
      }                                                                                                                // 2761
    },                                                                                                                 // 2762
                                                                                                                       // 2763
    _resolve: function(response) {                                                                                     // 2764
      if (this._state !== DONE_COMPLETE_STATE) {                                                                       // 2765
        forEach(this._doneCallbacks, function(fn) {                                                                    // 2766
          fn(response);                                                                                                // 2767
        });                                                                                                            // 2768
        this._doneCallbacks.length = 0;                                                                                // 2769
        this._state = DONE_COMPLETE_STATE;                                                                             // 2770
      }                                                                                                                // 2771
    }                                                                                                                  // 2772
  };                                                                                                                   // 2773
                                                                                                                       // 2774
  return AnimateRunner;                                                                                                // 2775
}];                                                                                                                    // 2776
                                                                                                                       // 2777
var $$AnimationProvider = ['$animateProvider', function($animateProvider) {                                            // 2778
  var NG_ANIMATE_REF_ATTR = 'ng-animate-ref';                                                                          // 2779
                                                                                                                       // 2780
  var drivers = this.drivers = [];                                                                                     // 2781
                                                                                                                       // 2782
  var RUNNER_STORAGE_KEY = '$$animationRunner';                                                                        // 2783
                                                                                                                       // 2784
  function setRunner(element, runner) {                                                                                // 2785
    element.data(RUNNER_STORAGE_KEY, runner);                                                                          // 2786
  }                                                                                                                    // 2787
                                                                                                                       // 2788
  function removeRunner(element) {                                                                                     // 2789
    element.removeData(RUNNER_STORAGE_KEY);                                                                            // 2790
  }                                                                                                                    // 2791
                                                                                                                       // 2792
  function getRunner(element) {                                                                                        // 2793
    return element.data(RUNNER_STORAGE_KEY);                                                                           // 2794
  }                                                                                                                    // 2795
                                                                                                                       // 2796
  this.$get = ['$$jqLite', '$rootScope', '$injector', '$$AnimateRunner', '$$HashMap', '$$rAFScheduler',                // 2797
       function($$jqLite,   $rootScope,   $injector,   $$AnimateRunner,   $$HashMap,   $$rAFScheduler) {               // 2798
                                                                                                                       // 2799
    var animationQueue = [];                                                                                           // 2800
    var applyAnimationClasses = applyAnimationClassesFactory($$jqLite);                                                // 2801
                                                                                                                       // 2802
    function sortAnimations(animations) {                                                                              // 2803
      var tree = { children: [] };                                                                                     // 2804
      var i, lookup = new $$HashMap();                                                                                 // 2805
                                                                                                                       // 2806
      // this is done first beforehand so that the hashmap                                                             // 2807
      // is filled with a list of the elements that will be animated                                                   // 2808
      for (i = 0; i < animations.length; i++) {                                                                        // 2809
        var animation = animations[i];                                                                                 // 2810
        lookup.put(animation.domNode, animations[i] = {                                                                // 2811
          domNode: animation.domNode,                                                                                  // 2812
          fn: animation.fn,                                                                                            // 2813
          children: []                                                                                                 // 2814
        });                                                                                                            // 2815
      }                                                                                                                // 2816
                                                                                                                       // 2817
      for (i = 0; i < animations.length; i++) {                                                                        // 2818
        processNode(animations[i]);                                                                                    // 2819
      }                                                                                                                // 2820
                                                                                                                       // 2821
      return flatten(tree);                                                                                            // 2822
                                                                                                                       // 2823
      function processNode(entry) {                                                                                    // 2824
        if (entry.processed) return entry;                                                                             // 2825
        entry.processed = true;                                                                                        // 2826
                                                                                                                       // 2827
        var elementNode = entry.domNode;                                                                               // 2828
        var parentNode = elementNode.parentNode;                                                                       // 2829
        lookup.put(elementNode, entry);                                                                                // 2830
                                                                                                                       // 2831
        var parentEntry;                                                                                               // 2832
        while (parentNode) {                                                                                           // 2833
          parentEntry = lookup.get(parentNode);                                                                        // 2834
          if (parentEntry) {                                                                                           // 2835
            if (!parentEntry.processed) {                                                                              // 2836
              parentEntry = processNode(parentEntry);                                                                  // 2837
            }                                                                                                          // 2838
            break;                                                                                                     // 2839
          }                                                                                                            // 2840
          parentNode = parentNode.parentNode;                                                                          // 2841
        }                                                                                                              // 2842
                                                                                                                       // 2843
        (parentEntry || tree).children.push(entry);                                                                    // 2844
        return entry;                                                                                                  // 2845
      }                                                                                                                // 2846
                                                                                                                       // 2847
      function flatten(tree) {                                                                                         // 2848
        var result = [];                                                                                               // 2849
        var queue = [];                                                                                                // 2850
        var i;                                                                                                         // 2851
                                                                                                                       // 2852
        for (i = 0; i < tree.children.length; i++) {                                                                   // 2853
          queue.push(tree.children[i]);                                                                                // 2854
        }                                                                                                              // 2855
                                                                                                                       // 2856
        var remainingLevelEntries = queue.length;                                                                      // 2857
        var nextLevelEntries = 0;                                                                                      // 2858
        var row = [];                                                                                                  // 2859
                                                                                                                       // 2860
        for (i = 0; i < queue.length; i++) {                                                                           // 2861
          var entry = queue[i];                                                                                        // 2862
          if (remainingLevelEntries <= 0) {                                                                            // 2863
            remainingLevelEntries = nextLevelEntries;                                                                  // 2864
            nextLevelEntries = 0;                                                                                      // 2865
            result.push(row);                                                                                          // 2866
            row = [];                                                                                                  // 2867
          }                                                                                                            // 2868
          row.push(entry.fn);                                                                                          // 2869
          entry.children.forEach(function(childEntry) {                                                                // 2870
            nextLevelEntries++;                                                                                        // 2871
            queue.push(childEntry);                                                                                    // 2872
          });                                                                                                          // 2873
          remainingLevelEntries--;                                                                                     // 2874
        }                                                                                                              // 2875
                                                                                                                       // 2876
        if (row.length) {                                                                                              // 2877
          result.push(row);                                                                                            // 2878
        }                                                                                                              // 2879
                                                                                                                       // 2880
        return result;                                                                                                 // 2881
      }                                                                                                                // 2882
    }                                                                                                                  // 2883
                                                                                                                       // 2884
    // TODO(matsko): document the signature in a better way                                                            // 2885
    return function(element, event, options) {                                                                         // 2886
      options = prepareAnimationOptions(options);                                                                      // 2887
      var isStructural = ['enter', 'move', 'leave'].indexOf(event) >= 0;                                               // 2888
                                                                                                                       // 2889
      // there is no animation at the current moment, however                                                          // 2890
      // these runner methods will get later updated with the                                                          // 2891
      // methods leading into the driver's end/cancel methods                                                          // 2892
      // for now they just stop the animation from starting                                                            // 2893
      var runner = new $$AnimateRunner({                                                                               // 2894
        end: function() { close(); },                                                                                  // 2895
        cancel: function() { close(true); }                                                                            // 2896
      });                                                                                                              // 2897
                                                                                                                       // 2898
      if (!drivers.length) {                                                                                           // 2899
        close();                                                                                                       // 2900
        return runner;                                                                                                 // 2901
      }                                                                                                                // 2902
                                                                                                                       // 2903
      setRunner(element, runner);                                                                                      // 2904
                                                                                                                       // 2905
      var classes = mergeClasses(element.attr('class'), mergeClasses(options.addClass, options.removeClass));          // 2906
      var tempClasses = options.tempClasses;                                                                           // 2907
      if (tempClasses) {                                                                                               // 2908
        classes += ' ' + tempClasses;                                                                                  // 2909
        options.tempClasses = null;                                                                                    // 2910
      }                                                                                                                // 2911
                                                                                                                       // 2912
      animationQueue.push({                                                                                            // 2913
        // this data is used by the postDigest code and passed into                                                    // 2914
        // the driver step function                                                                                    // 2915
        element: element,                                                                                              // 2916
        classes: classes,                                                                                              // 2917
        event: event,                                                                                                  // 2918
        structural: isStructural,                                                                                      // 2919
        options: options,                                                                                              // 2920
        beforeStart: beforeStart,                                                                                      // 2921
        close: close                                                                                                   // 2922
      });                                                                                                              // 2923
                                                                                                                       // 2924
      element.on('$destroy', handleDestroyedElement);                                                                  // 2925
                                                                                                                       // 2926
      // we only want there to be one function called within the post digest                                           // 2927
      // block. This way we can group animations for all the animations that                                           // 2928
      // were apart of the same postDigest flush call.                                                                 // 2929
      if (animationQueue.length > 1) return runner;                                                                    // 2930
                                                                                                                       // 2931
      $rootScope.$$postDigest(function() {                                                                             // 2932
        var animations = [];                                                                                           // 2933
        forEach(animationQueue, function(entry) {                                                                      // 2934
          // the element was destroyed early on which removed the runner                                               // 2935
          // form its storage. This means we can't animate this element                                                // 2936
          // at all and it already has been closed due to destruction.                                                 // 2937
          if (getRunner(entry.element)) {                                                                              // 2938
            animations.push(entry);                                                                                    // 2939
          } else {                                                                                                     // 2940
            entry.close();                                                                                             // 2941
          }                                                                                                            // 2942
        });                                                                                                            // 2943
                                                                                                                       // 2944
        // now any future animations will be in another postDigest                                                     // 2945
        animationQueue.length = 0;                                                                                     // 2946
                                                                                                                       // 2947
        var groupedAnimations = groupAnimations(animations);                                                           // 2948
        var toBeSortedAnimations = [];                                                                                 // 2949
                                                                                                                       // 2950
        forEach(groupedAnimations, function(animationEntry) {                                                          // 2951
          toBeSortedAnimations.push({                                                                                  // 2952
            domNode: getDomNode(animationEntry.from ? animationEntry.from.element : animationEntry.element),           // 2953
            fn: function triggerAnimationStart() {                                                                     // 2954
              // it's important that we apply the `ng-animate` CSS class and the                                       // 2955
              // temporary classes before we do any driver invoking since these                                        // 2956
              // CSS classes may be required for proper CSS detection.                                                 // 2957
              animationEntry.beforeStart();                                                                            // 2958
                                                                                                                       // 2959
              var startAnimationFn, closeFn = animationEntry.close;                                                    // 2960
                                                                                                                       // 2961
              // in the event that the element was removed before the digest runs or                                   // 2962
              // during the RAF sequencing then we should not trigger the animation.                                   // 2963
              var targetElement = animationEntry.anchors                                                               // 2964
                  ? (animationEntry.from.element || animationEntry.to.element)                                         // 2965
                  : animationEntry.element;                                                                            // 2966
                                                                                                                       // 2967
              if (getRunner(targetElement)) {                                                                          // 2968
                var operation = invokeFirstDriver(animationEntry);                                                     // 2969
                if (operation) {                                                                                       // 2970
                  startAnimationFn = operation.start;                                                                  // 2971
                }                                                                                                      // 2972
              }                                                                                                        // 2973
                                                                                                                       // 2974
              if (!startAnimationFn) {                                                                                 // 2975
                closeFn();                                                                                             // 2976
              } else {                                                                                                 // 2977
                var animationRunner = startAnimationFn();                                                              // 2978
                animationRunner.done(function(status) {                                                                // 2979
                  closeFn(!status);                                                                                    // 2980
                });                                                                                                    // 2981
                updateAnimationRunners(animationEntry, animationRunner);                                               // 2982
              }                                                                                                        // 2983
            }                                                                                                          // 2984
          });                                                                                                          // 2985
        });                                                                                                            // 2986
                                                                                                                       // 2987
        // we need to sort each of the animations in order of parent to child                                          // 2988
        // relationships. This ensures that the child classes are applied at the                                       // 2989
        // right time.                                                                                                 // 2990
        $$rAFScheduler(sortAnimations(toBeSortedAnimations));                                                          // 2991
      });                                                                                                              // 2992
                                                                                                                       // 2993
      return runner;                                                                                                   // 2994
                                                                                                                       // 2995
      // TODO(matsko): change to reference nodes                                                                       // 2996
      function getAnchorNodes(node) {                                                                                  // 2997
        var SELECTOR = '[' + NG_ANIMATE_REF_ATTR + ']';                                                                // 2998
        var items = node.hasAttribute(NG_ANIMATE_REF_ATTR)                                                             // 2999
              ? [node]                                                                                                 // 3000
              : node.querySelectorAll(SELECTOR);                                                                       // 3001
        var anchors = [];                                                                                              // 3002
        forEach(items, function(node) {                                                                                // 3003
          var attr = node.getAttribute(NG_ANIMATE_REF_ATTR);                                                           // 3004
          if (attr && attr.length) {                                                                                   // 3005
            anchors.push(node);                                                                                        // 3006
          }                                                                                                            // 3007
        });                                                                                                            // 3008
        return anchors;                                                                                                // 3009
      }                                                                                                                // 3010
                                                                                                                       // 3011
      function groupAnimations(animations) {                                                                           // 3012
        var preparedAnimations = [];                                                                                   // 3013
        var refLookup = {};                                                                                            // 3014
        forEach(animations, function(animation, index) {                                                               // 3015
          var element = animation.element;                                                                             // 3016
          var node = getDomNode(element);                                                                              // 3017
          var event = animation.event;                                                                                 // 3018
          var enterOrMove = ['enter', 'move'].indexOf(event) >= 0;                                                     // 3019
          var anchorNodes = animation.structural ? getAnchorNodes(node) : [];                                          // 3020
                                                                                                                       // 3021
          if (anchorNodes.length) {                                                                                    // 3022
            var direction = enterOrMove ? 'to' : 'from';                                                               // 3023
                                                                                                                       // 3024
            forEach(anchorNodes, function(anchor) {                                                                    // 3025
              var key = anchor.getAttribute(NG_ANIMATE_REF_ATTR);                                                      // 3026
              refLookup[key] = refLookup[key] || {};                                                                   // 3027
              refLookup[key][direction] = {                                                                            // 3028
                animationID: index,                                                                                    // 3029
                element: jqLite(anchor)                                                                                // 3030
              };                                                                                                       // 3031
            });                                                                                                        // 3032
          } else {                                                                                                     // 3033
            preparedAnimations.push(animation);                                                                        // 3034
          }                                                                                                            // 3035
        });                                                                                                            // 3036
                                                                                                                       // 3037
        var usedIndicesLookup = {};                                                                                    // 3038
        var anchorGroups = {};                                                                                         // 3039
        forEach(refLookup, function(operations, key) {                                                                 // 3040
          var from = operations.from;                                                                                  // 3041
          var to = operations.to;                                                                                      // 3042
                                                                                                                       // 3043
          if (!from || !to) {                                                                                          // 3044
            // only one of these is set therefore we can't have an                                                     // 3045
            // anchor animation since all three pieces are required                                                    // 3046
            var index = from ? from.animationID : to.animationID;                                                      // 3047
            var indexKey = index.toString();                                                                           // 3048
            if (!usedIndicesLookup[indexKey]) {                                                                        // 3049
              usedIndicesLookup[indexKey] = true;                                                                      // 3050
              preparedAnimations.push(animations[index]);                                                              // 3051
            }                                                                                                          // 3052
            return;                                                                                                    // 3053
          }                                                                                                            // 3054
                                                                                                                       // 3055
          var fromAnimation = animations[from.animationID];                                                            // 3056
          var toAnimation = animations[to.animationID];                                                                // 3057
          var lookupKey = from.animationID.toString();                                                                 // 3058
          if (!anchorGroups[lookupKey]) {                                                                              // 3059
            var group = anchorGroups[lookupKey] = {                                                                    // 3060
              structural: true,                                                                                        // 3061
              beforeStart: function() {                                                                                // 3062
                fromAnimation.beforeStart();                                                                           // 3063
                toAnimation.beforeStart();                                                                             // 3064
              },                                                                                                       // 3065
              close: function() {                                                                                      // 3066
                fromAnimation.close();                                                                                 // 3067
                toAnimation.close();                                                                                   // 3068
              },                                                                                                       // 3069
              classes: cssClassesIntersection(fromAnimation.classes, toAnimation.classes),                             // 3070
              from: fromAnimation,                                                                                     // 3071
              to: toAnimation,                                                                                         // 3072
              anchors: [] // TODO(matsko): change to reference nodes                                                   // 3073
            };                                                                                                         // 3074
                                                                                                                       // 3075
            // the anchor animations require that the from and to elements both have at least                          // 3076
            // one shared CSS class which effictively marries the two elements together to use                         // 3077
            // the same animation driver and to properly sequence the anchor animation.                                // 3078
            if (group.classes.length) {                                                                                // 3079
              preparedAnimations.push(group);                                                                          // 3080
            } else {                                                                                                   // 3081
              preparedAnimations.push(fromAnimation);                                                                  // 3082
              preparedAnimations.push(toAnimation);                                                                    // 3083
            }                                                                                                          // 3084
          }                                                                                                            // 3085
                                                                                                                       // 3086
          anchorGroups[lookupKey].anchors.push({                                                                       // 3087
            'out': from.element, 'in': to.element                                                                      // 3088
          });                                                                                                          // 3089
        });                                                                                                            // 3090
                                                                                                                       // 3091
        return preparedAnimations;                                                                                     // 3092
      }                                                                                                                // 3093
                                                                                                                       // 3094
      function cssClassesIntersection(a,b) {                                                                           // 3095
        a = a.split(' ');                                                                                              // 3096
        b = b.split(' ');                                                                                              // 3097
        var matches = [];                                                                                              // 3098
                                                                                                                       // 3099
        for (var i = 0; i < a.length; i++) {                                                                           // 3100
          var aa = a[i];                                                                                               // 3101
          if (aa.substring(0,3) === 'ng-') continue;                                                                   // 3102
                                                                                                                       // 3103
          for (var j = 0; j < b.length; j++) {                                                                         // 3104
            if (aa === b[j]) {                                                                                         // 3105
              matches.push(aa);                                                                                        // 3106
              break;                                                                                                   // 3107
            }                                                                                                          // 3108
          }                                                                                                            // 3109
        }                                                                                                              // 3110
                                                                                                                       // 3111
        return matches.join(' ');                                                                                      // 3112
      }                                                                                                                // 3113
                                                                                                                       // 3114
      function invokeFirstDriver(animationDetails) {                                                                   // 3115
        // we loop in reverse order since the more general drivers (like CSS and JS)                                   // 3116
        // may attempt more elements, but custom drivers are more particular                                           // 3117
        for (var i = drivers.length - 1; i >= 0; i--) {                                                                // 3118
          var driverName = drivers[i];                                                                                 // 3119
          if (!$injector.has(driverName)) continue; // TODO(matsko): remove this check                                 // 3120
                                                                                                                       // 3121
          var factory = $injector.get(driverName);                                                                     // 3122
          var driver = factory(animationDetails);                                                                      // 3123
          if (driver) {                                                                                                // 3124
            return driver;                                                                                             // 3125
          }                                                                                                            // 3126
        }                                                                                                              // 3127
      }                                                                                                                // 3128
                                                                                                                       // 3129
      function beforeStart() {                                                                                         // 3130
        element.addClass(NG_ANIMATE_CLASSNAME);                                                                        // 3131
        if (tempClasses) {                                                                                             // 3132
          $$jqLite.addClass(element, tempClasses);                                                                     // 3133
        }                                                                                                              // 3134
      }                                                                                                                // 3135
                                                                                                                       // 3136
      function updateAnimationRunners(animation, newRunner) {                                                          // 3137
        if (animation.from && animation.to) {                                                                          // 3138
          update(animation.from.element);                                                                              // 3139
          update(animation.to.element);                                                                                // 3140
        } else {                                                                                                       // 3141
          update(animation.element);                                                                                   // 3142
        }                                                                                                              // 3143
                                                                                                                       // 3144
        function update(element) {                                                                                     // 3145
          getRunner(element).setHost(newRunner);                                                                       // 3146
        }                                                                                                              // 3147
      }                                                                                                                // 3148
                                                                                                                       // 3149
      function handleDestroyedElement() {                                                                              // 3150
        var runner = getRunner(element);                                                                               // 3151
        if (runner && (event !== 'leave' || !options.$$domOperationFired)) {                                           // 3152
          runner.end();                                                                                                // 3153
        }                                                                                                              // 3154
      }                                                                                                                // 3155
                                                                                                                       // 3156
      function close(rejected) { // jshint ignore:line                                                                 // 3157
        element.off('$destroy', handleDestroyedElement);                                                               // 3158
        removeRunner(element);                                                                                         // 3159
                                                                                                                       // 3160
        applyAnimationClasses(element, options);                                                                       // 3161
        applyAnimationStyles(element, options);                                                                        // 3162
        options.domOperation();                                                                                        // 3163
                                                                                                                       // 3164
        if (tempClasses) {                                                                                             // 3165
          $$jqLite.removeClass(element, tempClasses);                                                                  // 3166
        }                                                                                                              // 3167
                                                                                                                       // 3168
        element.removeClass(NG_ANIMATE_CLASSNAME);                                                                     // 3169
        runner.complete(!rejected);                                                                                    // 3170
      }                                                                                                                // 3171
    };                                                                                                                 // 3172
  }];                                                                                                                  // 3173
}];                                                                                                                    // 3174
                                                                                                                       // 3175
/* global angularAnimateModule: true,                                                                                  // 3176
                                                                                                                       // 3177
   $$AnimateAsyncRunFactory,                                                                                           // 3178
   $$rAFSchedulerFactory,                                                                                              // 3179
   $$AnimateChildrenDirective,                                                                                         // 3180
   $$AnimateRunnerFactory,                                                                                             // 3181
   $$AnimateQueueProvider,                                                                                             // 3182
   $$AnimationProvider,                                                                                                // 3183
   $AnimateCssProvider,                                                                                                // 3184
   $$AnimateCssDriverProvider,                                                                                         // 3185
   $$AnimateJsProvider,                                                                                                // 3186
   $$AnimateJsDriverProvider,                                                                                          // 3187
*/                                                                                                                     // 3188
                                                                                                                       // 3189
/**                                                                                                                    // 3190
 * @ngdoc module                                                                                                       // 3191
 * @name ngAnimate                                                                                                     // 3192
 * @description                                                                                                        // 3193
 *                                                                                                                     // 3194
 * The `ngAnimate` module provides support for CSS-based animations (keyframes and transitions) as well as JavaScript-based animations via
 * callback hooks. Animations are not enabled by default, however, by including `ngAnimate` the animation hooks are enabled for an Angular app.
 *                                                                                                                     // 3197
 * <div doc-module-components="ngAnimate"></div>                                                                       // 3198
 *                                                                                                                     // 3199
 * # Usage                                                                                                             // 3200
 * Simply put, there are two ways to make use of animations when ngAnimate is used: by using **CSS** and **JavaScript**. The former works purely based
 * using CSS (by using matching CSS selectors/styles) and the latter triggers animations that are registered via `module.animation()`. For
 * both CSS and JS animations the sole requirement is to have a matching `CSS class` that exists both in the registered animation and within
 * the HTML element that the animation will be triggered on.                                                           // 3204
 *                                                                                                                     // 3205
 * ## Directive Support                                                                                                // 3206
 * The following directives are "animation aware":                                                                     // 3207
 *                                                                                                                     // 3208
 * | Directive                                                                                                | Supported Animations                                                     |
 * |----------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------|
 * | {@link ng.directive:ngRepeat#animations ngRepeat}                                                        | enter, leave and move                                                    |
 * | {@link ngRoute.directive:ngView#animations ngView}                                                       | enter and leave                                                          |
 * | {@link ng.directive:ngInclude#animations ngInclude}                                                      | enter and leave                                                          |
 * | {@link ng.directive:ngSwitch#animations ngSwitch}                                                        | enter and leave                                                          |
 * | {@link ng.directive:ngIf#animations ngIf}                                                                | enter and leave                                                          |
 * | {@link ng.directive:ngClass#animations ngClass}                                                          | add and remove (the CSS class(es) present)                               |
 * | {@link ng.directive:ngShow#animations ngShow} & {@link ng.directive:ngHide#animations ngHide}            | add and remove (the ng-hide class value)                                 |
 * | {@link ng.directive:form#animation-hooks form} & {@link ng.directive:ngModel#animation-hooks ngModel}    | add and remove (dirty, pristine, valid, invalid & all other validations) |
 * | {@link module:ngMessages#animations ngMessages}                                                          | add and remove (ng-active & ng-inactive)                                 |
 * | {@link module:ngMessages#animations ngMessage}                                                           | enter and leave                                                          |
 *                                                                                                                     // 3221
 * (More information can be found by visiting each the documentation associated with each directive.)                  // 3222
 *                                                                                                                     // 3223
 * ## CSS-based Animations                                                                                             // 3224
 *                                                                                                                     // 3225
 * CSS-based animations with ngAnimate are unique since they require no JavaScript code at all. By using a CSS class that we reference between our HTML
 * and CSS code we can create an animation that will be picked up by Angular when an the underlying directive performs an operation.
 *                                                                                                                     // 3228
 * The example below shows how an `enter` animation can be made possible on an element using `ng-if`:                  // 3229
 *                                                                                                                     // 3230
 * ```html                                                                                                             // 3231
 * <div ng-if="bool" class="fade">                                                                                     // 3232
 *    Fade me in out                                                                                                   // 3233
 * </div>                                                                                                              // 3234
 * <button ng-click="bool=true">Fade In!</button>                                                                      // 3235
 * <button ng-click="bool=false">Fade Out!</button>                                                                    // 3236
 * ```                                                                                                                 // 3237
 *                                                                                                                     // 3238
 * Notice the CSS class **fade**? We can now create the CSS transition code that references this class:                // 3239
 *                                                                                                                     // 3240
 * ```css                                                                                                              // 3241
 * /&#42; The starting CSS styles for the enter animation &#42;/                                                       // 3242
 * .fade.ng-enter {                                                                                                    // 3243
 *   transition:0.5s linear all;                                                                                       // 3244
 *   opacity:0;                                                                                                        // 3245
 * }                                                                                                                   // 3246
 *                                                                                                                     // 3247
 * /&#42; The finishing CSS styles for the enter animation &#42;/                                                      // 3248
 * .fade.ng-enter.ng-enter-active {                                                                                    // 3249
 *   opacity:1;                                                                                                        // 3250
 * }                                                                                                                   // 3251
 * ```                                                                                                                 // 3252
 *                                                                                                                     // 3253
 * The key thing to remember here is that, depending on the animation event (which each of the directives above trigger depending on what's going on) two
 * generated CSS classes will be applied to the element; in the example above we have `.ng-enter` and `.ng-enter-active`. For CSS transitions, the transition
 * code **must** be defined within the starting CSS class (in this case `.ng-enter`). The destination class is what the transition will animate towards.
 *                                                                                                                     // 3257
 * If for example we wanted to create animations for `leave` and `move` (ngRepeat triggers move) then we can do so using the same CSS naming conventions:
 *                                                                                                                     // 3259
 * ```css                                                                                                              // 3260
 * /&#42; now the element will fade out before it is removed from the DOM &#42;/                                       // 3261
 * .fade.ng-leave {                                                                                                    // 3262
 *   transition:0.5s linear all;                                                                                       // 3263
 *   opacity:1;                                                                                                        // 3264
 * }                                                                                                                   // 3265
 * .fade.ng-leave.ng-leave-active {                                                                                    // 3266
 *   opacity:0;                                                                                                        // 3267
 * }                                                                                                                   // 3268
 * ```                                                                                                                 // 3269
 *                                                                                                                     // 3270
 * We can also make use of **CSS Keyframes** by referencing the keyframe animation within the starting CSS class:      // 3271
 *                                                                                                                     // 3272
 * ```css                                                                                                              // 3273
 * /&#42; there is no need to define anything inside of the destination                                                // 3274
 * CSS class since the keyframe will take charge of the animation &#42;/                                               // 3275
 * .fade.ng-leave {                                                                                                    // 3276
 *   animation: my_fade_animation 0.5s linear;                                                                         // 3277
 *   -webkit-animation: my_fade_animation 0.5s linear;                                                                 // 3278
 * }                                                                                                                   // 3279
 *                                                                                                                     // 3280
 * @keyframes my_fade_animation {                                                                                      // 3281
 *   from { opacity:1; }                                                                                               // 3282
 *   to { opacity:0; }                                                                                                 // 3283
 * }                                                                                                                   // 3284
 *                                                                                                                     // 3285
 * @-webkit-keyframes my_fade_animation {                                                                              // 3286
 *   from { opacity:1; }                                                                                               // 3287
 *   to { opacity:0; }                                                                                                 // 3288
 * }                                                                                                                   // 3289
 * ```                                                                                                                 // 3290
 *                                                                                                                     // 3291
 * Feel free also mix transitions and keyframes together as well as any other CSS classes on the same element.         // 3292
 *                                                                                                                     // 3293
 * ### CSS Class-based Animations                                                                                      // 3294
 *                                                                                                                     // 3295
 * Class-based animations (animations that are triggered via `ngClass`, `ngShow`, `ngHide` and some other directives) have a slightly different
 * naming convention. Class-based animations are basic enough that a standard transition or keyframe can be referenced on the class being added
 * and removed.                                                                                                        // 3298
 *                                                                                                                     // 3299
 * For example if we wanted to do a CSS animation for `ngHide` then we place an animation on the `.ng-hide` CSS class:
 *                                                                                                                     // 3301
 * ```html                                                                                                             // 3302
 * <div ng-show="bool" class="fade">                                                                                   // 3303
 *   Show and hide me                                                                                                  // 3304
 * </div>                                                                                                              // 3305
 * <button ng-click="bool=true">Toggle</button>                                                                        // 3306
 *                                                                                                                     // 3307
 * <style>                                                                                                             // 3308
 * .fade.ng-hide {                                                                                                     // 3309
 *   transition:0.5s linear all;                                                                                       // 3310
 *   opacity:0;                                                                                                        // 3311
 * }                                                                                                                   // 3312
 * </style>                                                                                                            // 3313
 * ```                                                                                                                 // 3314
 *                                                                                                                     // 3315
 * All that is going on here with ngShow/ngHide behind the scenes is the `.ng-hide` class is added/removed (when the hidden state is valid). Since
 * ngShow and ngHide are animation aware then we can match up a transition and ngAnimate handles the rest.             // 3317
 *                                                                                                                     // 3318
 * In addition the addition and removal of the CSS class, ngAnimate also provides two helper methods that we can use to further decorate the animation
 * with CSS styles.                                                                                                    // 3320
 *                                                                                                                     // 3321
 * ```html                                                                                                             // 3322
 * <div ng-class="{on:onOff}" class="highlight">                                                                       // 3323
 *   Highlight this box                                                                                                // 3324
 * </div>                                                                                                              // 3325
 * <button ng-click="onOff=!onOff">Toggle</button>                                                                     // 3326
 *                                                                                                                     // 3327
 * <style>                                                                                                             // 3328
 * .highlight {                                                                                                        // 3329
 *   transition:0.5s linear all;                                                                                       // 3330
 * }                                                                                                                   // 3331
 * .highlight.on-add {                                                                                                 // 3332
 *   background:white;                                                                                                 // 3333
 * }                                                                                                                   // 3334
 * .highlight.on {                                                                                                     // 3335
 *   background:yellow;                                                                                                // 3336
 * }                                                                                                                   // 3337
 * .highlight.on-remove {                                                                                              // 3338
 *   background:black;                                                                                                 // 3339
 * }                                                                                                                   // 3340
 * </style>                                                                                                            // 3341
 * ```                                                                                                                 // 3342
 *                                                                                                                     // 3343
 * We can also make use of CSS keyframes by placing them within the CSS classes.                                       // 3344
 *                                                                                                                     // 3345
 *                                                                                                                     // 3346
 * ### CSS Staggering Animations                                                                                       // 3347
 * A Staggering animation is a collection of animations that are issued with a slight delay in between each successive operation resulting in a
 * curtain-like effect. The ngAnimate module (versions >=1.2) supports staggering animations and the stagger effect can be
 * performed by creating a **ng-EVENT-stagger** CSS class and attaching that class to the base CSS class used for      // 3350
 * the animation. The style property expected within the stagger class can either be a **transition-delay** or an      // 3351
 * **animation-delay** property (or both if your animation contains both transitions and keyframe animations).         // 3352
 *                                                                                                                     // 3353
 * ```css                                                                                                              // 3354
 * .my-animation.ng-enter {                                                                                            // 3355
 *   /&#42; standard transition code &#42;/                                                                            // 3356
 *   transition: 1s linear all;                                                                                        // 3357
 *   opacity:0;                                                                                                        // 3358
 * }                                                                                                                   // 3359
 * .my-animation.ng-enter-stagger {                                                                                    // 3360
 *   /&#42; this will have a 100ms delay between each successive leave animation &#42;/                                // 3361
 *   transition-delay: 0.1s;                                                                                           // 3362
 *                                                                                                                     // 3363
 *   /&#42; As of 1.4.4, this must always be set: it signals ngAnimate                                                 // 3364
 *     to not accidentally inherit a delay property from another CSS class &#42;/                                      // 3365
 *   transition-duration: 0s;                                                                                          // 3366
 * }                                                                                                                   // 3367
 * .my-animation.ng-enter.ng-enter-active {                                                                            // 3368
 *   /&#42; standard transition styles &#42;/                                                                          // 3369
 *   opacity:1;                                                                                                        // 3370
 * }                                                                                                                   // 3371
 * ```                                                                                                                 // 3372
 *                                                                                                                     // 3373
 * Staggering animations work by default in ngRepeat (so long as the CSS class is defined). Outside of ngRepeat, to use staggering animations
 * on your own, they can be triggered by firing multiple calls to the same event on $animate. However, the restrictions surrounding this
 * are that each of the elements must have the same CSS className value as well as the same parent element. A stagger operation
 * will also be reset if one or more animation frames have passed since the multiple calls to `$animate` were fired.   // 3377
 *                                                                                                                     // 3378
 * The following code will issue the **ng-leave-stagger** event on the element provided:                               // 3379
 *                                                                                                                     // 3380
 * ```js                                                                                                               // 3381
 * var kids = parent.children();                                                                                       // 3382
 *                                                                                                                     // 3383
 * $animate.leave(kids[0]); //stagger index=0                                                                          // 3384
 * $animate.leave(kids[1]); //stagger index=1                                                                          // 3385
 * $animate.leave(kids[2]); //stagger index=2                                                                          // 3386
 * $animate.leave(kids[3]); //stagger index=3                                                                          // 3387
 * $animate.leave(kids[4]); //stagger index=4                                                                          // 3388
 *                                                                                                                     // 3389
 * window.requestAnimationFrame(function() {                                                                           // 3390
 *   //stagger has reset itself                                                                                        // 3391
 *   $animate.leave(kids[5]); //stagger index=0                                                                        // 3392
 *   $animate.leave(kids[6]); //stagger index=1                                                                        // 3393
 *                                                                                                                     // 3394
 *   $scope.$digest();                                                                                                 // 3395
 * });                                                                                                                 // 3396
 * ```                                                                                                                 // 3397
 *                                                                                                                     // 3398
 * Stagger animations are currently only supported within CSS-defined animations.                                      // 3399
 *                                                                                                                     // 3400
 * ### The `ng-animate` CSS class                                                                                      // 3401
 *                                                                                                                     // 3402
 * When ngAnimate is animating an element it will apply the `ng-animate` CSS class to the element for the duration of the animation.
 * This is a temporary CSS class and it will be removed once the animation is over (for both JavaScript and CSS-based animations).
 *                                                                                                                     // 3405
 * Therefore, animations can be applied to an element using this temporary class directly via CSS.                     // 3406
 *                                                                                                                     // 3407
 * ```css                                                                                                              // 3408
 * .zipper.ng-animate {                                                                                                // 3409
 *   transition:0.5s linear all;                                                                                       // 3410
 * }                                                                                                                   // 3411
 * .zipper.ng-enter {                                                                                                  // 3412
 *   opacity:0;                                                                                                        // 3413
 * }                                                                                                                   // 3414
 * .zipper.ng-enter.ng-enter-active {                                                                                  // 3415
 *   opacity:1;                                                                                                        // 3416
 * }                                                                                                                   // 3417
 * .zipper.ng-leave {                                                                                                  // 3418
 *   opacity:1;                                                                                                        // 3419
 * }                                                                                                                   // 3420
 * .zipper.ng-leave.ng-leave-active {                                                                                  // 3421
 *   opacity:0;                                                                                                        // 3422
 * }                                                                                                                   // 3423
 * ```                                                                                                                 // 3424
 *                                                                                                                     // 3425
 * (Note that the `ng-animate` CSS class is reserved and it cannot be applied on an element directly since ngAnimate will always remove
 * the CSS class once an animation has completed.)                                                                     // 3427
 *                                                                                                                     // 3428
 *                                                                                                                     // 3429
 * ## JavaScript-based Animations                                                                                      // 3430
 *                                                                                                                     // 3431
 * ngAnimate also allows for animations to be consumed by JavaScript code. The approach is similar to CSS-based animations (where there is a shared
 * CSS class that is referenced in our HTML code) but in addition we need to register the JavaScript animation on the module. By making use of the
 * `module.animation()` module function we can register the ainmation.                                                 // 3434
 *                                                                                                                     // 3435
 * Let's see an example of a enter/leave animation using `ngRepeat`:                                                   // 3436
 *                                                                                                                     // 3437
 * ```html                                                                                                             // 3438
 * <div ng-repeat="item in items" class="slide">                                                                       // 3439
 *   {{ item }}                                                                                                        // 3440
 * </div>                                                                                                              // 3441
 * ```                                                                                                                 // 3442
 *                                                                                                                     // 3443
 * See the **slide** CSS class? Let's use that class to define an animation that we'll structure in our module code by using `module.animation`:
 *                                                                                                                     // 3445
 * ```js                                                                                                               // 3446
 * myModule.animation('.slide', [function() {                                                                          // 3447
 *   return {                                                                                                          // 3448
 *     // make note that other events (like addClass/removeClass)                                                      // 3449
 *     // have different function input parameters                                                                     // 3450
 *     enter: function(element, doneFn) {                                                                              // 3451
 *       jQuery(element).fadeIn(1000, doneFn);                                                                         // 3452
 *                                                                                                                     // 3453
 *       // remember to call doneFn so that angular                                                                    // 3454
 *       // knows that the animation has concluded                                                                     // 3455
 *     },                                                                                                              // 3456
 *                                                                                                                     // 3457
 *     move: function(element, doneFn) {                                                                               // 3458
 *       jQuery(element).fadeIn(1000, doneFn);                                                                         // 3459
 *     },                                                                                                              // 3460
 *                                                                                                                     // 3461
 *     leave: function(element, doneFn) {                                                                              // 3462
 *       jQuery(element).fadeOut(1000, doneFn);                                                                        // 3463
 *     }                                                                                                               // 3464
 *   }                                                                                                                 // 3465
 * }]);                                                                                                                // 3466
 * ```                                                                                                                 // 3467
 *                                                                                                                     // 3468
 * The nice thing about JS-based animations is that we can inject other services and make use of advanced animation libraries such as
 * greensock.js and velocity.js.                                                                                       // 3470
 *                                                                                                                     // 3471
 * If our animation code class-based (meaning that something like `ngClass`, `ngHide` and `ngShow` triggers it) then we can still define
 * our animations inside of the same registered animation, however, the function input arguments are a bit different:  // 3473
 *                                                                                                                     // 3474
 * ```html                                                                                                             // 3475
 * <div ng-class="color" class="colorful">                                                                             // 3476
 *   this box is moody                                                                                                 // 3477
 * </div>                                                                                                              // 3478
 * <button ng-click="color='red'">Change to red</button>                                                               // 3479
 * <button ng-click="color='blue'">Change to blue</button>                                                             // 3480
 * <button ng-click="color='green'">Change to green</button>                                                           // 3481
 * ```                                                                                                                 // 3482
 *                                                                                                                     // 3483
 * ```js                                                                                                               // 3484
 * myModule.animation('.colorful', [function() {                                                                       // 3485
 *   return {                                                                                                          // 3486
 *     addClass: function(element, className, doneFn) {                                                                // 3487
 *       // do some cool animation and call the doneFn                                                                 // 3488
 *     },                                                                                                              // 3489
 *     removeClass: function(element, className, doneFn) {                                                             // 3490
 *       // do some cool animation and call the doneFn                                                                 // 3491
 *     },                                                                                                              // 3492
 *     setClass: function(element, addedClass, removedClass, doneFn) {                                                 // 3493
 *       // do some cool animation and call the doneFn                                                                 // 3494
 *     }                                                                                                               // 3495
 *   }                                                                                                                 // 3496
 * }]);                                                                                                                // 3497
 * ```                                                                                                                 // 3498
 *                                                                                                                     // 3499
 * ## CSS + JS Animations Together                                                                                     // 3500
 *                                                                                                                     // 3501
 * AngularJS 1.4 and higher has taken steps to make the amalgamation of CSS and JS animations more flexible. However, unlike earlier versions of Angular,
 * defining CSS and JS animations to work off of the same CSS class will not work anymore. Therefore the example below will only result in **JS animations taking
 * charge of the animation**:                                                                                          // 3504
 *                                                                                                                     // 3505
 * ```html                                                                                                             // 3506
 * <div ng-if="bool" class="slide">                                                                                    // 3507
 *   Slide in and out                                                                                                  // 3508
 * </div>                                                                                                              // 3509
 * ```                                                                                                                 // 3510
 *                                                                                                                     // 3511
 * ```js                                                                                                               // 3512
 * myModule.animation('.slide', [function() {                                                                          // 3513
 *   return {                                                                                                          // 3514
 *     enter: function(element, doneFn) {                                                                              // 3515
 *       jQuery(element).slideIn(1000, doneFn);                                                                        // 3516
 *     }                                                                                                               // 3517
 *   }                                                                                                                 // 3518
 * }]);                                                                                                                // 3519
 * ```                                                                                                                 // 3520
 *                                                                                                                     // 3521
 * ```css                                                                                                              // 3522
 * .slide.ng-enter {                                                                                                   // 3523
 *   transition:0.5s linear all;                                                                                       // 3524
 *   transform:translateY(-100px);                                                                                     // 3525
 * }                                                                                                                   // 3526
 * .slide.ng-enter.ng-enter-active {                                                                                   // 3527
 *   transform:translateY(0);                                                                                          // 3528
 * }                                                                                                                   // 3529
 * ```                                                                                                                 // 3530
 *                                                                                                                     // 3531
 * Does this mean that CSS and JS animations cannot be used together? Do JS-based animations always have higher priority? We can make up for the
 * lack of CSS animations by using the `$animateCss` service to trigger our own tweaked-out, CSS-based animations directly from
 * our own JS-based animation code:                                                                                    // 3534
 *                                                                                                                     // 3535
 * ```js                                                                                                               // 3536
 * myModule.animation('.slide', ['$animateCss', function($animateCss) {                                                // 3537
 *   return {                                                                                                          // 3538
 *     enter: function(element) {                                                                                      // 3539
*        // this will trigger `.slide.ng-enter` and `.slide.ng-enter-active`.                                          // 3540
 *       return $animateCss(element, {                                                                                 // 3541
 *         event: 'enter',                                                                                             // 3542
 *         structural: true                                                                                            // 3543
 *       });                                                                                                           // 3544
 *     }                                                                                                               // 3545
 *   }                                                                                                                 // 3546
 * }]);                                                                                                                // 3547
 * ```                                                                                                                 // 3548
 *                                                                                                                     // 3549
 * The nice thing here is that we can save bandwidth by sticking to our CSS-based animation code and we don't need to rely on a 3rd-party animation framework.
 *                                                                                                                     // 3551
 * The `$animateCss` service is very powerful since we can feed in all kinds of extra properties that will be evaluated and fed into a CSS transition or
 * keyframe animation. For example if we wanted to animate the height of an element while adding and removing classes then we can do so by providing that
 * data into `$animateCss` directly:                                                                                   // 3554
 *                                                                                                                     // 3555
 * ```js                                                                                                               // 3556
 * myModule.animation('.slide', ['$animateCss', function($animateCss) {                                                // 3557
 *   return {                                                                                                          // 3558
 *     enter: function(element) {                                                                                      // 3559
 *       return $animateCss(element, {                                                                                 // 3560
 *         event: 'enter',                                                                                             // 3561
 *         structural: true,                                                                                           // 3562
 *         addClass: 'maroon-setting',                                                                                 // 3563
 *         from: { height:0 },                                                                                         // 3564
 *         to: { height: 200 }                                                                                         // 3565
 *       });                                                                                                           // 3566
 *     }                                                                                                               // 3567
 *   }                                                                                                                 // 3568
 * }]);                                                                                                                // 3569
 * ```                                                                                                                 // 3570
 *                                                                                                                     // 3571
 * Now we can fill in the rest via our transition CSS code:                                                            // 3572
 *                                                                                                                     // 3573
 * ```css                                                                                                              // 3574
 * /&#42; the transition tells ngAnimate to make the animation happen &#42;/                                           // 3575
 * .slide.ng-enter { transition:0.5s linear all; }                                                                     // 3576
 *                                                                                                                     // 3577
 * /&#42; this extra CSS class will be absorbed into the transition                                                    // 3578
 * since the $animateCss code is adding the class &#42;/                                                               // 3579
 * .maroon-setting { background:red; }                                                                                 // 3580
 * ```                                                                                                                 // 3581
 *                                                                                                                     // 3582
 * And `$animateCss` will figure out the rest. Just make sure to have the `done()` callback fire the `doneFn` function to signal when the animation is over.
 *                                                                                                                     // 3584
 * To learn more about what's possible be sure to visit the {@link ngAnimate.$animateCss $animateCss service}.         // 3585
 *                                                                                                                     // 3586
 * ## Animation Anchoring (via `ng-animate-ref`)                                                                       // 3587
 *                                                                                                                     // 3588
 * ngAnimate in AngularJS 1.4 comes packed with the ability to cross-animate elements between                          // 3589
 * structural areas of an application (like views) by pairing up elements using an attribute                           // 3590
 * called `ng-animate-ref`.                                                                                            // 3591
 *                                                                                                                     // 3592
 * Let's say for example we have two views that are managed by `ng-view` and we want to show                           // 3593
 * that there is a relationship between two components situated in within these views. By using the                    // 3594
 * `ng-animate-ref` attribute we can identify that the two components are paired together and we                       // 3595
 * can then attach an animation, which is triggered when the view changes.                                             // 3596
 *                                                                                                                     // 3597
 * Say for example we have the following template code:                                                                // 3598
 *                                                                                                                     // 3599
 * ```html                                                                                                             // 3600
 * <!-- index.html -->                                                                                                 // 3601
 * <div ng-view class="view-animation">                                                                                // 3602
 * </div>                                                                                                              // 3603
 *                                                                                                                     // 3604
 * <!-- home.html -->                                                                                                  // 3605
 * <a href="#/banner-page">                                                                                            // 3606
 *   <img src="./banner.jpg" class="banner" ng-animate-ref="banner">                                                   // 3607
 * </a>                                                                                                                // 3608
 *                                                                                                                     // 3609
 * <!-- banner-page.html -->                                                                                           // 3610
 * <img src="./banner.jpg" class="banner" ng-animate-ref="banner">                                                     // 3611
 * ```                                                                                                                 // 3612
 *                                                                                                                     // 3613
 * Now, when the view changes (once the link is clicked), ngAnimate will examine the                                   // 3614
 * HTML contents to see if there is a match reference between any components in the view                               // 3615
 * that is leaving and the view that is entering. It will scan both the view which is being                            // 3616
 * removed (leave) and inserted (enter) to see if there are any paired DOM elements that                               // 3617
 * contain a matching ref value.                                                                                       // 3618
 *                                                                                                                     // 3619
 * The two images match since they share the same ref value. ngAnimate will now create a                               // 3620
 * transport element (which is a clone of the first image element) and it will then attempt                            // 3621
 * to animate to the position of the second image element in the next view. For the animation to                       // 3622
 * work a special CSS class called `ng-anchor` will be added to the transported element.                               // 3623
 *                                                                                                                     // 3624
 * We can now attach a transition onto the `.banner.ng-anchor` CSS class and then                                      // 3625
 * ngAnimate will handle the entire transition for us as well as the addition and removal of                           // 3626
 * any changes of CSS classes between the elements:                                                                    // 3627
 *                                                                                                                     // 3628
 * ```css                                                                                                              // 3629
 * .banner.ng-anchor {                                                                                                 // 3630
 *   /&#42; this animation will last for 1 second since there are                                                      // 3631
 *          two phases to the animation (an `in` and an `out` phase) &#42;/                                            // 3632
 *   transition:0.5s linear all;                                                                                       // 3633
 * }                                                                                                                   // 3634
 * ```                                                                                                                 // 3635
 *                                                                                                                     // 3636
 * We also **must** include animations for the views that are being entered and removed                                // 3637
 * (otherwise anchoring wouldn't be possible since the new view would be inserted right away).                         // 3638
 *                                                                                                                     // 3639
 * ```css                                                                                                              // 3640
 * .view-animation.ng-enter, .view-animation.ng-leave {                                                                // 3641
 *   transition:0.5s linear all;                                                                                       // 3642
 *   position:fixed;                                                                                                   // 3643
 *   left:0;                                                                                                           // 3644
 *   top:0;                                                                                                            // 3645
 *   width:100%;                                                                                                       // 3646
 * }                                                                                                                   // 3647
 * .view-animation.ng-enter {                                                                                          // 3648
 *   transform:translateX(100%);                                                                                       // 3649
 * }                                                                                                                   // 3650
 * .view-animation.ng-leave,                                                                                           // 3651
 * .view-animation.ng-enter.ng-enter-active {                                                                          // 3652
 *   transform:translateX(0%);                                                                                         // 3653
 * }                                                                                                                   // 3654
 * .view-animation.ng-leave.ng-leave-active {                                                                          // 3655
 *   transform:translateX(-100%);                                                                                      // 3656
 * }                                                                                                                   // 3657
 * ```                                                                                                                 // 3658
 *                                                                                                                     // 3659
 * Now we can jump back to the anchor animation. When the animation happens, there are two stages that occur:          // 3660
 * an `out` and an `in` stage. The `out` stage happens first and that is when the element is animated away             // 3661
 * from its origin. Once that animation is over then the `in` stage occurs which animates the                          // 3662
 * element to its destination. The reason why there are two animations is to give enough time                          // 3663
 * for the enter animation on the new element to be ready.                                                             // 3664
 *                                                                                                                     // 3665
 * The example above sets up a transition for both the in and out phases, but we can also target the out or            // 3666
 * in phases directly via `ng-anchor-out` and `ng-anchor-in`.                                                          // 3667
 *                                                                                                                     // 3668
 * ```css                                                                                                              // 3669
 * .banner.ng-anchor-out {                                                                                             // 3670
 *   transition: 0.5s linear all;                                                                                      // 3671
 *                                                                                                                     // 3672
 *   /&#42; the scale will be applied during the out animation,                                                        // 3673
 *          but will be animated away when the in animation runs &#42;/                                                // 3674
 *   transform: scale(1.2);                                                                                            // 3675
 * }                                                                                                                   // 3676
 *                                                                                                                     // 3677
 * .banner.ng-anchor-in {                                                                                              // 3678
 *   transition: 1s linear all;                                                                                        // 3679
 * }                                                                                                                   // 3680
 * ```                                                                                                                 // 3681
 *                                                                                                                     // 3682
 *                                                                                                                     // 3683
 *                                                                                                                     // 3684
 *                                                                                                                     // 3685
 * ### Anchoring Demo                                                                                                  // 3686
 *                                                                                                                     // 3687
  <example module="anchoringExample"                                                                                   // 3688
           name="anchoringExample"                                                                                     // 3689
           id="anchoringExample"                                                                                       // 3690
           deps="angular-animate.js;angular-route.js"                                                                  // 3691
           animations="true">                                                                                          // 3692
    <file name="index.html">                                                                                           // 3693
      <a href="#/">Home</a>                                                                                            // 3694
      <hr />                                                                                                           // 3695
      <div class="view-container">                                                                                     // 3696
        <div ng-view class="view"></div>                                                                               // 3697
      </div>                                                                                                           // 3698
    </file>                                                                                                            // 3699
    <file name="script.js">                                                                                            // 3700
      angular.module('anchoringExample', ['ngAnimate', 'ngRoute'])                                                     // 3701
        .config(['$routeProvider', function($routeProvider) {                                                          // 3702
          $routeProvider.when('/', {                                                                                   // 3703
            templateUrl: 'home.html',                                                                                  // 3704
            controller: 'HomeController as home'                                                                       // 3705
          });                                                                                                          // 3706
          $routeProvider.when('/profile/:id', {                                                                        // 3707
            templateUrl: 'profile.html',                                                                               // 3708
            controller: 'ProfileController as profile'                                                                 // 3709
          });                                                                                                          // 3710
        }])                                                                                                            // 3711
        .run(['$rootScope', function($rootScope) {                                                                     // 3712
          $rootScope.records = [                                                                                       // 3713
            { id:1, title: "Miss Beulah Roob" },                                                                       // 3714
            { id:2, title: "Trent Morissette" },                                                                       // 3715
            { id:3, title: "Miss Ava Pouros" },                                                                        // 3716
            { id:4, title: "Rod Pouros" },                                                                             // 3717
            { id:5, title: "Abdul Rice" },                                                                             // 3718
            { id:6, title: "Laurie Rutherford Sr." },                                                                  // 3719
            { id:7, title: "Nakia McLaughlin" },                                                                       // 3720
            { id:8, title: "Jordon Blanda DVM" },                                                                      // 3721
            { id:9, title: "Rhoda Hand" },                                                                             // 3722
            { id:10, title: "Alexandrea Sauer" }                                                                       // 3723
          ];                                                                                                           // 3724
        }])                                                                                                            // 3725
        .controller('HomeController', [function() {                                                                    // 3726
          //empty                                                                                                      // 3727
        }])                                                                                                            // 3728
        .controller('ProfileController', ['$rootScope', '$routeParams', function($rootScope, $routeParams) {           // 3729
          var index = parseInt($routeParams.id, 10);                                                                   // 3730
          var record = $rootScope.records[index - 1];                                                                  // 3731
                                                                                                                       // 3732
          this.title = record.title;                                                                                   // 3733
          this.id = record.id;                                                                                         // 3734
        }]);                                                                                                           // 3735
    </file>                                                                                                            // 3736
    <file name="home.html">                                                                                            // 3737
      <h2>Welcome to the home page</h1>                                                                                // 3738
      <p>Please click on an element</p>                                                                                // 3739
      <a class="record"                                                                                                // 3740
         ng-href="#/profile/{{ record.id }}"                                                                           // 3741
         ng-animate-ref="{{ record.id }}"                                                                              // 3742
         ng-repeat="record in records">                                                                                // 3743
        {{ record.title }}                                                                                             // 3744
      </a>                                                                                                             // 3745
    </file>                                                                                                            // 3746
    <file name="profile.html">                                                                                         // 3747
      <div class="profile record" ng-animate-ref="{{ profile.id }}">                                                   // 3748
        {{ profile.title }}                                                                                            // 3749
      </div>                                                                                                           // 3750
    </file>                                                                                                            // 3751
    <file name="animations.css">                                                                                       // 3752
      .record {                                                                                                        // 3753
        display:block;                                                                                                 // 3754
        font-size:20px;                                                                                                // 3755
      }                                                                                                                // 3756
      .profile {                                                                                                       // 3757
        background:black;                                                                                              // 3758
        color:white;                                                                                                   // 3759
        font-size:100px;                                                                                               // 3760
      }                                                                                                                // 3761
      .view-container {                                                                                                // 3762
        position:relative;                                                                                             // 3763
      }                                                                                                                // 3764
      .view-container > .view.ng-animate {                                                                             // 3765
        position:absolute;                                                                                             // 3766
        top:0;                                                                                                         // 3767
        left:0;                                                                                                        // 3768
        width:100%;                                                                                                    // 3769
        min-height:500px;                                                                                              // 3770
      }                                                                                                                // 3771
      .view.ng-enter, .view.ng-leave,                                                                                  // 3772
      .record.ng-anchor {                                                                                              // 3773
        transition:0.5s linear all;                                                                                    // 3774
      }                                                                                                                // 3775
      .view.ng-enter {                                                                                                 // 3776
        transform:translateX(100%);                                                                                    // 3777
      }                                                                                                                // 3778
      .view.ng-enter.ng-enter-active, .view.ng-leave {                                                                 // 3779
        transform:translateX(0%);                                                                                      // 3780
      }                                                                                                                // 3781
      .view.ng-leave.ng-leave-active {                                                                                 // 3782
        transform:translateX(-100%);                                                                                   // 3783
      }                                                                                                                // 3784
      .record.ng-anchor-out {                                                                                          // 3785
        background:red;                                                                                                // 3786
      }                                                                                                                // 3787
    </file>                                                                                                            // 3788
  </example>                                                                                                           // 3789
 *                                                                                                                     // 3790
 * ### How is the element transported?                                                                                 // 3791
 *                                                                                                                     // 3792
 * When an anchor animation occurs, ngAnimate will clone the starting element and position it exactly where the starting
 * element is located on screen via absolute positioning. The cloned element will be placed inside of the root element
 * of the application (where ng-app was defined) and all of the CSS classes of the starting element will be applied. The
 * element will then animate into the `out` and `in` animations and will eventually reach the coordinates and match    // 3796
 * the dimensions of the destination element. During the entire animation a CSS class of `.ng-animate-shim` will be applied
 * to both the starting and destination elements in order to hide them from being visible (the CSS styling for the class
 * is: `visibility:hidden`). Once the anchor reaches its destination then it will be removed and the destination element
 * will become visible since the shim class will be removed.                                                           // 3800
 *                                                                                                                     // 3801
 * ### How is the morphing handled?                                                                                    // 3802
 *                                                                                                                     // 3803
 * CSS Anchoring relies on transitions and keyframes and the internal code is intelligent enough to figure out         // 3804
 * what CSS classes differ between the starting element and the destination element. These different CSS classes       // 3805
 * will be added/removed on the anchor element and a transition will be applied (the transition that is provided       // 3806
 * in the anchor class). Long story short, ngAnimate will figure out what classes to add and remove which will         // 3807
 * make the transition of the element as smooth and automatic as possible. Be sure to use simple CSS classes that      // 3808
 * do not rely on DOM nesting structure so that the anchor element appears the same as the starting element (since     // 3809
 * the cloned element is placed inside of root element which is likely close to the body element).                     // 3810
 *                                                                                                                     // 3811
 * Note that if the root element is on the `<html>` element then the cloned node will be placed inside of body.        // 3812
 *                                                                                                                     // 3813
 *                                                                                                                     // 3814
 * ## Using $animate in your directive code                                                                            // 3815
 *                                                                                                                     // 3816
 * So far we've explored how to feed in animations into an Angular application, but how do we trigger animations within our own directives in our application?
 * By injecting the `$animate` service into our directive code, we can trigger structural and class-based hooks which can then be consumed by animations. Let's
 * imagine we have a greeting box that shows and hides itself when the data changes                                    // 3819
 *                                                                                                                     // 3820
 * ```html                                                                                                             // 3821
 * <greeting-box active="onOrOff">Hi there</greeting-box>                                                              // 3822
 * ```                                                                                                                 // 3823
 *                                                                                                                     // 3824
 * ```js                                                                                                               // 3825
 * ngModule.directive('greetingBox', ['$animate', function($animate) {                                                 // 3826
 *   return function(scope, element, attrs) {                                                                          // 3827
 *     attrs.$observe('active', function(value) {                                                                      // 3828
 *       value ? $animate.addClass(element, 'on') : $animate.removeClass(element, 'on');                               // 3829
 *     });                                                                                                             // 3830
 *   });                                                                                                               // 3831
 * }]);                                                                                                                // 3832
 * ```                                                                                                                 // 3833
 *                                                                                                                     // 3834
 * Now the `on` CSS class is added and removed on the greeting box component. Now if we add a CSS class on top of the greeting box element
 * in our HTML code then we can trigger a CSS or JS animation to happen.                                               // 3836
 *                                                                                                                     // 3837
 * ```css                                                                                                              // 3838
 * /&#42; normally we would create a CSS class to reference on the element &#42;/                                      // 3839
 * greeting-box.on { transition:0.5s linear all; background:green; color:white; }                                      // 3840
 * ```                                                                                                                 // 3841
 *                                                                                                                     // 3842
 * The `$animate` service contains a variety of other methods like `enter`, `leave`, `animate` and `setClass`. To learn more about what's
 * possible be sure to visit the {@link ng.$animate $animate service API page}.                                        // 3844
 *                                                                                                                     // 3845
 *                                                                                                                     // 3846
 * ### Preventing Collisions With Third Party Libraries                                                                // 3847
 *                                                                                                                     // 3848
 * Some third-party frameworks place animation duration defaults across many element or className                      // 3849
 * selectors in order to make their code small and reuseable. This can lead to issues with ngAnimate, which            // 3850
 * is expecting actual animations on these elements and has to wait for their completion.                              // 3851
 *                                                                                                                     // 3852
 * You can prevent this unwanted behavior by using a prefix on all your animation classes:                             // 3853
 *                                                                                                                     // 3854
 * ```css                                                                                                              // 3855
 * /&#42; prefixed with animate- &#42;/                                                                                // 3856
 * .animate-fade-add.animate-fade-add-active {                                                                         // 3857
 *   transition:1s linear all;                                                                                         // 3858
 *   opacity:0;                                                                                                        // 3859
 * }                                                                                                                   // 3860
 * ```                                                                                                                 // 3861
 *                                                                                                                     // 3862
 * You then configure `$animate` to enforce this prefix:                                                               // 3863
 *                                                                                                                     // 3864
 * ```js                                                                                                               // 3865
 * $animateProvider.classNameFilter(/animate-/);                                                                       // 3866
 * ```                                                                                                                 // 3867
 *                                                                                                                     // 3868
 * This also may provide your application with a speed boost since only specific elements containing CSS class prefix  // 3869
 * will be evaluated for animation when any DOM changes occur in the application.                                      // 3870
 *                                                                                                                     // 3871
 * ## Callbacks and Promises                                                                                           // 3872
 *                                                                                                                     // 3873
 * When `$animate` is called it returns a promise that can be used to capture when the animation has ended. Therefore if we were to trigger
 * an animation (within our directive code) then we can continue performing directive and scope related activities after the animation has
 * ended by chaining onto the returned promise that animation method returns.                                          // 3876
 *                                                                                                                     // 3877
 * ```js                                                                                                               // 3878
 * // somewhere within the depths of the directive                                                                     // 3879
 * $animate.enter(element, parent).then(function() {                                                                   // 3880
 *   //the animation has completed                                                                                     // 3881
 * });                                                                                                                 // 3882
 * ```                                                                                                                 // 3883
 *                                                                                                                     // 3884
 * (Note that earlier versions of Angular prior to v1.4 required the promise code to be wrapped using `$scope.$apply(...)`. This is not the case
 * anymore.)                                                                                                           // 3886
 *                                                                                                                     // 3887
 * In addition to the animation promise, we can also make use of animation-related callbacks within our directives and controller code by registering
 * an event listener using the `$animate` service. Let's say for example that an animation was triggered on our view   // 3889
 * routing controller to hook into that:                                                                               // 3890
 *                                                                                                                     // 3891
 * ```js                                                                                                               // 3892
 * ngModule.controller('HomePageController', ['$animate', function($animate) {                                         // 3893
 *   $animate.on('enter', ngViewElement, function(element) {                                                           // 3894
 *     // the animation for this route has completed                                                                   // 3895
 *   }]);                                                                                                              // 3896
 * }])                                                                                                                 // 3897
 * ```                                                                                                                 // 3898
 *                                                                                                                     // 3899
 * (Note that you will need to trigger a digest within the callback to get angular to notice any scope-related changes.)
 */                                                                                                                    // 3901
                                                                                                                       // 3902
/**                                                                                                                    // 3903
 * @ngdoc service                                                                                                      // 3904
 * @name $animate                                                                                                      // 3905
 * @kind object                                                                                                        // 3906
 *                                                                                                                     // 3907
 * @description                                                                                                        // 3908
 * The ngAnimate `$animate` service documentation is the same for the core `$animate` service.                         // 3909
 *                                                                                                                     // 3910
 * Click here {@link ng.$animate to learn more about animations with `$animate`}.                                      // 3911
 */                                                                                                                    // 3912
angular.module('ngAnimate', [])                                                                                        // 3913
  .directive('ngAnimateChildren', $$AnimateChildrenDirective)                                                          // 3914
  .factory('$$rAFScheduler', $$rAFSchedulerFactory)                                                                    // 3915
                                                                                                                       // 3916
  .factory('$$AnimateRunner', $$AnimateRunnerFactory)                                                                  // 3917
  .factory('$$animateAsyncRun', $$AnimateAsyncRunFactory)                                                              // 3918
                                                                                                                       // 3919
  .provider('$$animateQueue', $$AnimateQueueProvider)                                                                  // 3920
  .provider('$$animation', $$AnimationProvider)                                                                        // 3921
                                                                                                                       // 3922
  .provider('$animateCss', $AnimateCssProvider)                                                                        // 3923
  .provider('$$animateCssDriver', $$AnimateCssDriverProvider)                                                          // 3924
                                                                                                                       // 3925
  .provider('$$animateJs', $$AnimateJsProvider)                                                                        // 3926
  .provider('$$animateJsDriver', $$AnimateJsDriverProvider);                                                           // 3927
                                                                                                                       // 3928
                                                                                                                       // 3929
})(window, window.angular);                                                                                            // 3930
                                                                                                                       // 3931
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['angular:angular-animate'] = {};

})();

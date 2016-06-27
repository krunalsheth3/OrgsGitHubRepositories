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

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                         //
// packages/angular_angular-aria/angular-aria.js                                                           //
//                                                                                                         //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                           //
/**                                                                                                        // 1
 * @license AngularJS v1.4.8                                                                               // 2
 * (c) 2010-2015 Google, Inc. http://angularjs.org                                                         // 3
 * License: MIT                                                                                            // 4
 */                                                                                                        // 5
(function(window, angular, undefined) {'use strict';                                                       // 6
                                                                                                           // 7
/**                                                                                                        // 8
 * @ngdoc module                                                                                           // 9
 * @name ngAria                                                                                            // 10
 * @description                                                                                            // 11
 *                                                                                                         // 12
 * The `ngAria` module provides support for common                                                         // 13
 * [<abbr title="Accessible Rich Internet Applications">ARIA</abbr>](http://www.w3.org/TR/wai-aria/)       // 14
 * attributes that convey state or semantic information about the application for users                    // 15
 * of assistive technologies, such as screen readers.                                                      // 16
 *                                                                                                         // 17
 * <div doc-module-components="ngAria"></div>                                                              // 18
 *                                                                                                         // 19
 * ## Usage                                                                                                // 20
 *                                                                                                         // 21
 * For ngAria to do its magic, simply include the module `ngAria` as a dependency. The following           // 22
 * directives are supported:                                                                               // 23
 * `ngModel`, `ngDisabled`, `ngShow`, `ngHide`, `ngClick`, `ngDblClick`, and `ngMessages`.                 // 24
 *                                                                                                         // 25
 * Below is a more detailed breakdown of the attributes handled by ngAria:                                 // 26
 *                                                                                                         // 27
 * | Directive                                   | Supported Attributes                                                                   |
 * |---------------------------------------------|----------------------------------------------------------------------------------------|
 * | {@link ng.directive:ngDisabled ngDisabled}  | aria-disabled                                                                          |
 * | {@link ng.directive:ngShow ngShow}          | aria-hidden                                                                            |
 * | {@link ng.directive:ngHide ngHide}          | aria-hidden                                                                            |
 * | {@link ng.directive:ngDblclick ngDblclick}  | tabindex                                                                               |
 * | {@link module:ngMessages ngMessages}        | aria-live                                                                              |
 * | {@link ng.directive:ngModel ngModel}        | aria-checked, aria-valuemin, aria-valuemax, aria-valuenow, aria-invalid, aria-required, input roles |
 * | {@link ng.directive:ngClick ngClick}        | tabindex, keypress event, button role                                                               |
 *                                                                                                         // 37
 * Find out more information about each directive by reading the                                           // 38
 * {@link guide/accessibility ngAria Developer Guide}.                                                     // 39
 *                                                                                                         // 40
 * ##Example                                                                                               // 41
 * Using ngDisabled with ngAria:                                                                           // 42
 * ```html                                                                                                 // 43
 * <md-checkbox ng-disabled="disabled">                                                                    // 44
 * ```                                                                                                     // 45
 * Becomes:                                                                                                // 46
 * ```html                                                                                                 // 47
 * <md-checkbox ng-disabled="disabled" aria-disabled="true">                                               // 48
 * ```                                                                                                     // 49
 *                                                                                                         // 50
 * ##Disabling Attributes                                                                                  // 51
 * It's possible to disable individual attributes added by ngAria with the                                 // 52
 * {@link ngAria.$ariaProvider#config config} method. For more details, see the                            // 53
 * {@link guide/accessibility Developer Guide}.                                                            // 54
 */                                                                                                        // 55
 /* global -ngAriaModule */                                                                                // 56
var ngAriaModule = angular.module('ngAria', ['ng']).                                                       // 57
                        provider('$aria', $AriaProvider);                                                  // 58
                                                                                                           // 59
/**                                                                                                        // 60
* Internal Utilities                                                                                       // 61
*/                                                                                                         // 62
var nodeBlackList = ['BUTTON', 'A', 'INPUT', 'TEXTAREA', 'SELECT', 'DETAILS', 'SUMMARY'];                  // 63
                                                                                                           // 64
var isNodeOneOf = function(elem, nodeTypeArray) {                                                          // 65
  if (nodeTypeArray.indexOf(elem[0].nodeName) !== -1) {                                                    // 66
    return true;                                                                                           // 67
  }                                                                                                        // 68
};                                                                                                         // 69
/**                                                                                                        // 70
 * @ngdoc provider                                                                                         // 71
 * @name $ariaProvider                                                                                     // 72
 *                                                                                                         // 73
 * @description                                                                                            // 74
 *                                                                                                         // 75
 * Used for configuring the ARIA attributes injected and managed by ngAria.                                // 76
 *                                                                                                         // 77
 * ```js                                                                                                   // 78
 * angular.module('myApp', ['ngAria'], function config($ariaProvider) {                                    // 79
 *   $ariaProvider.config({                                                                                // 80
 *     ariaValue: true,                                                                                    // 81
 *     tabindex: false                                                                                     // 82
 *   });                                                                                                   // 83
 * });                                                                                                     // 84
 *```                                                                                                      // 85
 *                                                                                                         // 86
 * ## Dependencies                                                                                         // 87
 * Requires the {@link ngAria} module to be installed.                                                     // 88
 *                                                                                                         // 89
 */                                                                                                        // 90
function $AriaProvider() {                                                                                 // 91
  var config = {                                                                                           // 92
    ariaHidden: true,                                                                                      // 93
    ariaChecked: true,                                                                                     // 94
    ariaDisabled: true,                                                                                    // 95
    ariaRequired: true,                                                                                    // 96
    ariaInvalid: true,                                                                                     // 97
    ariaMultiline: true,                                                                                   // 98
    ariaValue: true,                                                                                       // 99
    tabindex: true,                                                                                        // 100
    bindKeypress: true,                                                                                    // 101
    bindRoleForClick: true                                                                                 // 102
  };                                                                                                       // 103
                                                                                                           // 104
  /**                                                                                                      // 105
   * @ngdoc method                                                                                         // 106
   * @name $ariaProvider#config                                                                            // 107
   *                                                                                                       // 108
   * @param {object} config object to enable/disable specific ARIA attributes                              // 109
   *                                                                                                       // 110
   *  - **ariaHidden** – `{boolean}` – Enables/disables aria-hidden tags                                   // 111
   *  - **ariaChecked** – `{boolean}` – Enables/disables aria-checked tags                                 // 112
   *  - **ariaDisabled** – `{boolean}` – Enables/disables aria-disabled tags                               // 113
   *  - **ariaRequired** – `{boolean}` – Enables/disables aria-required tags                               // 114
   *  - **ariaInvalid** – `{boolean}` – Enables/disables aria-invalid tags                                 // 115
   *  - **ariaMultiline** – `{boolean}` – Enables/disables aria-multiline tags                             // 116
   *  - **ariaValue** – `{boolean}` – Enables/disables aria-valuemin, aria-valuemax and aria-valuenow tags
   *  - **tabindex** – `{boolean}` – Enables/disables tabindex tags                                        // 118
   *  - **bindKeypress** – `{boolean}` – Enables/disables keypress event binding on `&lt;div&gt;` and      // 119
   *    `&lt;li&gt;` elements with ng-click                                                                // 120
   *  - **bindRoleForClick** – `{boolean}` – Adds role=button to non-interactive elements like `div`       // 121
   *    using ng-click, making them more accessible to users of assistive technologies                     // 122
   *                                                                                                       // 123
   * @description                                                                                          // 124
   * Enables/disables various ARIA attributes                                                              // 125
   */                                                                                                      // 126
  this.config = function(newConfig) {                                                                      // 127
    config = angular.extend(config, newConfig);                                                            // 128
  };                                                                                                       // 129
                                                                                                           // 130
  function watchExpr(attrName, ariaAttr, nodeBlackList, negate) {                                          // 131
    return function(scope, elem, attr) {                                                                   // 132
      var ariaCamelName = attr.$normalize(ariaAttr);                                                       // 133
      if (config[ariaCamelName] && !isNodeOneOf(elem, nodeBlackList) && !attr[ariaCamelName]) {            // 134
        scope.$watch(attr[attrName], function(boolVal) {                                                   // 135
          // ensure boolean value                                                                          // 136
          boolVal = negate ? !boolVal : !!boolVal;                                                         // 137
          elem.attr(ariaAttr, boolVal);                                                                    // 138
        });                                                                                                // 139
      }                                                                                                    // 140
    };                                                                                                     // 141
  }                                                                                                        // 142
  /**                                                                                                      // 143
   * @ngdoc service                                                                                        // 144
   * @name $aria                                                                                           // 145
   *                                                                                                       // 146
   * @description                                                                                          // 147
   * @priority 200                                                                                         // 148
   *                                                                                                       // 149
   * The $aria service contains helper methods for applying common                                         // 150
   * [ARIA](http://www.w3.org/TR/wai-aria/) attributes to HTML directives.                                 // 151
   *                                                                                                       // 152
   * ngAria injects common accessibility attributes that tell assistive technologies when HTML             // 153
   * elements are enabled, selected, hidden, and more. To see how this is performed with ngAria,           // 154
   * let's review a code snippet from ngAria itself:                                                       // 155
   *                                                                                                       // 156
   *```js                                                                                                  // 157
   * ngAriaModule.directive('ngDisabled', ['$aria', function($aria) {                                      // 158
   *   return $aria.$$watchExpr('ngDisabled', 'aria-disabled');                                            // 159
   * }])                                                                                                   // 160
   *```                                                                                                    // 161
   * Shown above, the ngAria module creates a directive with the same signature as the                     // 162
   * traditional `ng-disabled` directive. But this ngAria version is dedicated to                          // 163
   * solely managing accessibility attributes. The internal `$aria` service is used to watch the           // 164
   * boolean attribute `ngDisabled`. If it has not been explicitly set by the developer,                   // 165
   * `aria-disabled` is injected as an attribute with its value synchronized to the value in               // 166
   * `ngDisabled`.                                                                                         // 167
   *                                                                                                       // 168
   * Because ngAria hooks into the `ng-disabled` directive, developers do not have to do                   // 169
   * anything to enable this feature. The `aria-disabled` attribute is automatically managed               // 170
   * simply as a silent side-effect of using `ng-disabled` with the ngAria module.                         // 171
   *                                                                                                       // 172
   * The full list of directives that interface with ngAria:                                               // 173
   * * **ngModel**                                                                                         // 174
   * * **ngShow**                                                                                          // 175
   * * **ngHide**                                                                                          // 176
   * * **ngClick**                                                                                         // 177
   * * **ngDblclick**                                                                                      // 178
   * * **ngMessages**                                                                                      // 179
   * * **ngDisabled**                                                                                      // 180
   *                                                                                                       // 181
   * Read the {@link guide/accessibility ngAria Developer Guide} for a thorough explanation of each        // 182
   * directive.                                                                                            // 183
   *                                                                                                       // 184
   *                                                                                                       // 185
   * ## Dependencies                                                                                       // 186
   * Requires the {@link ngAria} module to be installed.                                                   // 187
   */                                                                                                      // 188
  this.$get = function() {                                                                                 // 189
    return {                                                                                               // 190
      config: function(key) {                                                                              // 191
        return config[key];                                                                                // 192
      },                                                                                                   // 193
      $$watchExpr: watchExpr                                                                               // 194
    };                                                                                                     // 195
  };                                                                                                       // 196
}                                                                                                          // 197
                                                                                                           // 198
                                                                                                           // 199
ngAriaModule.directive('ngShow', ['$aria', function($aria) {                                               // 200
  return $aria.$$watchExpr('ngShow', 'aria-hidden', [], true);                                             // 201
}])                                                                                                        // 202
.directive('ngHide', ['$aria', function($aria) {                                                           // 203
  return $aria.$$watchExpr('ngHide', 'aria-hidden', [], false);                                            // 204
}])                                                                                                        // 205
.directive('ngModel', ['$aria', function($aria) {                                                          // 206
                                                                                                           // 207
  function shouldAttachAttr(attr, normalizedAttr, elem) {                                                  // 208
    return $aria.config(normalizedAttr) && !elem.attr(attr);                                               // 209
  }                                                                                                        // 210
                                                                                                           // 211
  function shouldAttachRole(role, elem) {                                                                  // 212
    return !elem.attr('role') && (elem.attr('type') === role) && (elem[0].nodeName !== 'INPUT');           // 213
  }                                                                                                        // 214
                                                                                                           // 215
  function getShape(attr, elem) {                                                                          // 216
    var type = attr.type,                                                                                  // 217
        role = attr.role;                                                                                  // 218
                                                                                                           // 219
    return ((type || role) === 'checkbox' || role === 'menuitemcheckbox') ? 'checkbox' :                   // 220
           ((type || role) === 'radio'    || role === 'menuitemradio') ? 'radio' :                         // 221
           (type === 'range'              || role === 'progressbar' || role === 'slider') ? 'range' :      // 222
           (type || role) === 'textbox'   || elem[0].nodeName === 'TEXTAREA' ? 'multiline' : '';           // 223
  }                                                                                                        // 224
                                                                                                           // 225
  return {                                                                                                 // 226
    restrict: 'A',                                                                                         // 227
    require: '?ngModel',                                                                                   // 228
    priority: 200, //Make sure watches are fired after any other directives that affect the ngModel value  // 229
    compile: function(elem, attr) {                                                                        // 230
      var shape = getShape(attr, elem);                                                                    // 231
                                                                                                           // 232
      return {                                                                                             // 233
        pre: function(scope, elem, attr, ngModel) {                                                        // 234
          if (shape === 'checkbox' && attr.type !== 'checkbox') {                                          // 235
            //Use the input[checkbox] $isEmpty implementation for elements with checkbox roles             // 236
            ngModel.$isEmpty = function(value) {                                                           // 237
              return value === false;                                                                      // 238
            };                                                                                             // 239
          }                                                                                                // 240
        },                                                                                                 // 241
        post: function(scope, elem, attr, ngModel) {                                                       // 242
          var needsTabIndex = shouldAttachAttr('tabindex', 'tabindex', elem)                               // 243
                                && !isNodeOneOf(elem, nodeBlackList);                                      // 244
                                                                                                           // 245
          function ngAriaWatchModelValue() {                                                               // 246
            return ngModel.$modelValue;                                                                    // 247
          }                                                                                                // 248
                                                                                                           // 249
          function getRadioReaction() {                                                                    // 250
            if (needsTabIndex) {                                                                           // 251
              needsTabIndex = false;                                                                       // 252
              return function ngAriaRadioReaction(newVal) {                                                // 253
                var boolVal = (attr.value == ngModel.$viewValue);                                          // 254
                elem.attr('aria-checked', boolVal);                                                        // 255
                elem.attr('tabindex', 0 - !boolVal);                                                       // 256
              };                                                                                           // 257
            } else {                                                                                       // 258
              return function ngAriaRadioReaction(newVal) {                                                // 259
                elem.attr('aria-checked', (attr.value == ngModel.$viewValue));                             // 260
              };                                                                                           // 261
            }                                                                                              // 262
          }                                                                                                // 263
                                                                                                           // 264
          function ngAriaCheckboxReaction() {                                                              // 265
            elem.attr('aria-checked', !ngModel.$isEmpty(ngModel.$viewValue));                              // 266
          }                                                                                                // 267
                                                                                                           // 268
          switch (shape) {                                                                                 // 269
            case 'radio':                                                                                  // 270
            case 'checkbox':                                                                               // 271
              if (shouldAttachRole(shape, elem)) {                                                         // 272
                elem.attr('role', shape);                                                                  // 273
              }                                                                                            // 274
              if (shouldAttachAttr('aria-checked', 'ariaChecked', elem)) {                                 // 275
                scope.$watch(ngAriaWatchModelValue, shape === 'radio' ?                                    // 276
                    getRadioReaction() : ngAriaCheckboxReaction);                                          // 277
              }                                                                                            // 278
              if (needsTabIndex) {                                                                         // 279
                elem.attr('tabindex', 0);                                                                  // 280
              }                                                                                            // 281
              break;                                                                                       // 282
            case 'range':                                                                                  // 283
              if (shouldAttachRole(shape, elem)) {                                                         // 284
                elem.attr('role', 'slider');                                                               // 285
              }                                                                                            // 286
              if ($aria.config('ariaValue')) {                                                             // 287
                var needsAriaValuemin = !elem.attr('aria-valuemin') &&                                     // 288
                    (attr.hasOwnProperty('min') || attr.hasOwnProperty('ngMin'));                          // 289
                var needsAriaValuemax = !elem.attr('aria-valuemax') &&                                     // 290
                    (attr.hasOwnProperty('max') || attr.hasOwnProperty('ngMax'));                          // 291
                var needsAriaValuenow = !elem.attr('aria-valuenow');                                       // 292
                                                                                                           // 293
                if (needsAriaValuemin) {                                                                   // 294
                  attr.$observe('min', function ngAriaValueMinReaction(newVal) {                           // 295
                    elem.attr('aria-valuemin', newVal);                                                    // 296
                  });                                                                                      // 297
                }                                                                                          // 298
                if (needsAriaValuemax) {                                                                   // 299
                  attr.$observe('max', function ngAriaValueMinReaction(newVal) {                           // 300
                    elem.attr('aria-valuemax', newVal);                                                    // 301
                  });                                                                                      // 302
                }                                                                                          // 303
                if (needsAriaValuenow) {                                                                   // 304
                  scope.$watch(ngAriaWatchModelValue, function ngAriaValueNowReaction(newVal) {            // 305
                    elem.attr('aria-valuenow', newVal);                                                    // 306
                  });                                                                                      // 307
                }                                                                                          // 308
              }                                                                                            // 309
              if (needsTabIndex) {                                                                         // 310
                elem.attr('tabindex', 0);                                                                  // 311
              }                                                                                            // 312
              break;                                                                                       // 313
            case 'multiline':                                                                              // 314
              if (shouldAttachAttr('aria-multiline', 'ariaMultiline', elem)) {                             // 315
                elem.attr('aria-multiline', true);                                                         // 316
              }                                                                                            // 317
              break;                                                                                       // 318
          }                                                                                                // 319
                                                                                                           // 320
          if (ngModel.$validators.required && shouldAttachAttr('aria-required', 'ariaRequired', elem)) {   // 321
            scope.$watch(function ngAriaRequiredWatch() {                                                  // 322
              return ngModel.$error.required;                                                              // 323
            }, function ngAriaRequiredReaction(newVal) {                                                   // 324
              elem.attr('aria-required', !!newVal);                                                        // 325
            });                                                                                            // 326
          }                                                                                                // 327
                                                                                                           // 328
          if (shouldAttachAttr('aria-invalid', 'ariaInvalid', elem)) {                                     // 329
            scope.$watch(function ngAriaInvalidWatch() {                                                   // 330
              return ngModel.$invalid;                                                                     // 331
            }, function ngAriaInvalidReaction(newVal) {                                                    // 332
              elem.attr('aria-invalid', !!newVal);                                                         // 333
            });                                                                                            // 334
          }                                                                                                // 335
        }                                                                                                  // 336
      };                                                                                                   // 337
    }                                                                                                      // 338
  };                                                                                                       // 339
}])                                                                                                        // 340
.directive('ngDisabled', ['$aria', function($aria) {                                                       // 341
  return $aria.$$watchExpr('ngDisabled', 'aria-disabled', []);                                             // 342
}])                                                                                                        // 343
.directive('ngMessages', function() {                                                                      // 344
  return {                                                                                                 // 345
    restrict: 'A',                                                                                         // 346
    require: '?ngMessages',                                                                                // 347
    link: function(scope, elem, attr, ngMessages) {                                                        // 348
      if (!elem.attr('aria-live')) {                                                                       // 349
        elem.attr('aria-live', 'assertive');                                                               // 350
      }                                                                                                    // 351
    }                                                                                                      // 352
  };                                                                                                       // 353
})                                                                                                         // 354
.directive('ngClick',['$aria', '$parse', function($aria, $parse) {                                         // 355
  return {                                                                                                 // 356
    restrict: 'A',                                                                                         // 357
    compile: function(elem, attr) {                                                                        // 358
      var fn = $parse(attr.ngClick, /* interceptorFn */ null, /* expensiveChecks */ true);                 // 359
      return function(scope, elem, attr) {                                                                 // 360
                                                                                                           // 361
        if (!isNodeOneOf(elem, nodeBlackList)) {                                                           // 362
                                                                                                           // 363
          if ($aria.config('bindRoleForClick') && !elem.attr('role')) {                                    // 364
            elem.attr('role', 'button');                                                                   // 365
          }                                                                                                // 366
                                                                                                           // 367
          if ($aria.config('tabindex') && !elem.attr('tabindex')) {                                        // 368
            elem.attr('tabindex', 0);                                                                      // 369
          }                                                                                                // 370
                                                                                                           // 371
          if ($aria.config('bindKeypress') && !attr.ngKeypress) {                                          // 372
            elem.on('keypress', function(event) {                                                          // 373
              var keyCode = event.which || event.keyCode;                                                  // 374
              if (keyCode === 32 || keyCode === 13) {                                                      // 375
                scope.$apply(callback);                                                                    // 376
              }                                                                                            // 377
                                                                                                           // 378
              function callback() {                                                                        // 379
                fn(scope, { $event: event });                                                              // 380
              }                                                                                            // 381
            });                                                                                            // 382
          }                                                                                                // 383
        }                                                                                                  // 384
      };                                                                                                   // 385
    }                                                                                                      // 386
  };                                                                                                       // 387
}])                                                                                                        // 388
.directive('ngDblclick', ['$aria', function($aria) {                                                       // 389
  return function(scope, elem, attr) {                                                                     // 390
    if ($aria.config('tabindex') && !elem.attr('tabindex') && !isNodeOneOf(elem, nodeBlackList)) {         // 391
      elem.attr('tabindex', 0);                                                                            // 392
    }                                                                                                      // 393
  };                                                                                                       // 394
}]);                                                                                                       // 395
                                                                                                           // 396
                                                                                                           // 397
})(window, window.angular);                                                                                // 398
                                                                                                           // 399
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['angular:angular-aria'] = {};

})();

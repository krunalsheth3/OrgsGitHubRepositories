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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                //
// packages/pacozaa_angular-material-data-table/dist/md-data-table.js                                             //
//                                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                  //
(function (window, angular, undefined) {                                                                          // 1
'use strict';                                                                                                     // 2
                                                                                                                  // 3
angular.module('md.table.templates', ['md-table-pagination.html', 'md-table-progress.html', 'arrow-up.svg', 'navigate-before.svg', 'navigate-first.svg', 'navigate-last.svg', 'navigate-next.svg']);
                                                                                                                  // 5
angular.module('md-table-pagination.html', []).run(['$templateCache', function($templateCache) {                  // 6
  $templateCache.put('md-table-pagination.html',                                                                  // 7
    '<span class="label" ng-if="$pagination.showPageSelect()">{{$pagination.$label[\'page\']}}</span>\n' +        // 8
    '\n' +                                                                                                        // 9
    '<md-select class="md-table-select" ng-if="$pagination.showPageSelect()" ng-model="$pagination.page" md-container-class="md-pagination-select" ng-change="$pagination.onPaginationChange()" aria-label="Page">\n' +
    '  <md-option ng-repeat="num in $pagination.range($pagination.pages()) track by $index" ng-value="$index + 1">{{$index + 1}}</md-option>\n' +
    '</md-select>\n' +                                                                                            // 12
    '\n' +                                                                                                        // 13
    '<span class="label">{{$pagination.$label[\'rowsPerPage\']}}</span>\n' +                                      // 14
    '\n' +                                                                                                        // 15
    '<md-select class="md-table-select" ng-model="$pagination.limit" md-container-class="md-pagination-select" aria-label="Rows" placeholder="{{$pagination.options ? $pagination.options[0] : 5}}">\n' +
    '  <md-option ng-repeat="rows in $pagination.options ? $pagination.options : [5, 10, 15]" ng-value="rows">{{rows}}</md-option>\n' +
    '</md-select>\n' +                                                                                            // 18
    '\n' +                                                                                                        // 19
    '<span class="label">{{$pagination.min() + 1}} - {{$pagination.max()}} {{$pagination.$label[\'of\']}} {{$pagination.total}}</span>\n' +
    '\n' +                                                                                                        // 21
    '<md-button class="md-icon-button" type="button" ng-if="$pagination.showBoundaryLinks()" ng-click="$pagination.first()" ng-disabled="!$pagination.hasPrevious()" aria-label="First">\n' +
    '  <md-icon md-svg-icon="navigate-first.svg"></md-icon>\n' +                                                  // 23
    '</md-button>\n' +                                                                                            // 24
    '<md-button class="md-icon-button" type="button" ng-click="$pagination.previous()" ng-disabled="!$pagination.hasPrevious()" aria-label="Previous">\n' +
    '  <md-icon md-svg-icon="navigate-before.svg"></md-icon>\n' +                                                 // 26
    '</md-button>\n' +                                                                                            // 27
    '<md-button class="md-icon-button" type="button" ng-click="$pagination.next()" ng-disabled="$pagination.disableNext()" aria-label="Next">\n' +
    '  <md-icon md-svg-icon="navigate-next.svg"></md-icon>\n' +                                                   // 29
    '</md-button>\n' +                                                                                            // 30
    '<md-button class="md-icon-button" type="button" ng-if="$pagination.showBoundaryLinks()" ng-click="$pagination.last()" ng-disabled="$pagination.disableNext()" aria-label="Last">\n' +
    '  <md-icon md-svg-icon="navigate-last.svg"></md-icon>\n' +                                                   // 32
    '</md-button>');                                                                                              // 33
}]);                                                                                                              // 34
                                                                                                                  // 35
angular.module('md-table-progress.html', []).run(['$templateCache', function($templateCache) {                    // 36
  $templateCache.put('md-table-progress.html',                                                                    // 37
    '<tr>\n' +                                                                                                    // 38
    '  <th colspan="{{columnCount()}}">\n' +                                                                      // 39
    '    <md-progress-linear ng-show="deferred()" md-mode="indeterminate"></md-progress-linear>\n' +              // 40
    '  </th>\n' +                                                                                                 // 41
    '</tr>');                                                                                                     // 42
}]);                                                                                                              // 43
                                                                                                                  // 44
angular.module('arrow-up.svg', []).run(['$templateCache', function($templateCache) {                              // 45
  $templateCache.put('arrow-up.svg',                                                                              // 46
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"/></svg>');
}]);                                                                                                              // 48
                                                                                                                  // 49
angular.module('navigate-before.svg', []).run(['$templateCache', function($templateCache) {                       // 50
  $templateCache.put('navigate-before.svg',                                                                       // 51
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>');
}]);                                                                                                              // 53
                                                                                                                  // 54
angular.module('navigate-first.svg', []).run(['$templateCache', function($templateCache) {                        // 55
  $templateCache.put('navigate-first.svg',                                                                        // 56
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M7 6 v12 h2 v-12 h-2z M17.41 7.41L16 6l-6 6 6 6 1.41-1.41L12.83 12z"/></svg>');
}]);                                                                                                              // 58
                                                                                                                  // 59
angular.module('navigate-last.svg', []).run(['$templateCache', function($templateCache) {                         // 60
  $templateCache.put('navigate-last.svg',                                                                         // 61
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M15 6 v12 h2 v-12 h-2z M8 6L6.59 7.41 11.17 12l-4.58 4.59L8 18l6-6z"/></svg>');
}]);                                                                                                              // 63
                                                                                                                  // 64
angular.module('navigate-next.svg', []).run(['$templateCache', function($templateCache) {                         // 65
  $templateCache.put('navigate-next.svg',                                                                         // 66
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>');
}]);                                                                                                              // 68
                                                                                                                  // 69
                                                                                                                  // 70
angular.module('md.data.table', ['md.table.templates']);                                                          // 71
                                                                                                                  // 72
angular.module('md.data.table').directive('mdBody', mdBody);                                                      // 73
                                                                                                                  // 74
function mdBody() {                                                                                               // 75
                                                                                                                  // 76
  function compile(tElement) {                                                                                    // 77
    tElement.addClass('md-body');                                                                                 // 78
  }                                                                                                               // 79
                                                                                                                  // 80
  return {                                                                                                        // 81
    compile: compile,                                                                                             // 82
    restrict: 'A'                                                                                                 // 83
  };                                                                                                              // 84
}                                                                                                                 // 85
                                                                                                                  // 86
angular.module('md.data.table').directive('mdCell', mdCell);                                                      // 87
                                                                                                                  // 88
function mdCell() {                                                                                               // 89
                                                                                                                  // 90
  function compile(tElement) {                                                                                    // 91
    var select = tElement.find('md-select');                                                                      // 92
                                                                                                                  // 93
    if(select.length) {                                                                                           // 94
      select.addClass('md-table-select').attr('md-container-class', 'md-table-select');                           // 95
    }                                                                                                             // 96
                                                                                                                  // 97
    tElement.addClass('md-cell');                                                                                 // 98
                                                                                                                  // 99
    return postLink;                                                                                              // 100
  }                                                                                                               // 101
                                                                                                                  // 102
  // empty controller to be bind properties to in postLink function                                               // 103
  function Controller() {                                                                                         // 104
                                                                                                                  // 105
  }                                                                                                               // 106
                                                                                                                  // 107
  function postLink(scope, element, attrs, ctrls) {                                                               // 108
    var select = element.find('md-select');                                                                       // 109
    var cellCtrl = ctrls.shift();                                                                                 // 110
    var tableCtrl = ctrls.shift();                                                                                // 111
                                                                                                                  // 112
    if(attrs.ngClick) {                                                                                           // 113
      element.addClass('md-clickable');                                                                           // 114
    }                                                                                                             // 115
                                                                                                                  // 116
    if(select.length) {                                                                                           // 117
      select.on('click', function (event) {                                                                       // 118
        event.stopPropagation();                                                                                  // 119
      });                                                                                                         // 120
                                                                                                                  // 121
      element.addClass('md-clickable').on('click', function (event) {                                             // 122
        event.stopPropagation();                                                                                  // 123
        select[0].click();                                                                                        // 124
      });                                                                                                         // 125
    }                                                                                                             // 126
                                                                                                                  // 127
    cellCtrl.getTable = tableCtrl.getElement;                                                                     // 128
                                                                                                                  // 129
    function getColumn() {                                                                                        // 130
      return tableCtrl.$$columns[getIndex()];                                                                     // 131
    }                                                                                                             // 132
                                                                                                                  // 133
    function getIndex() {                                                                                         // 134
      return Array.prototype.indexOf.call(element.parent().children(), element[0]);                               // 135
    }                                                                                                             // 136
                                                                                                                  // 137
    scope.$watch(getColumn, function (column) {                                                                   // 138
      if(!column) {                                                                                               // 139
        return;                                                                                                   // 140
      }                                                                                                           // 141
                                                                                                                  // 142
      if(column.numeric) {                                                                                        // 143
        element.addClass('md-numeric');                                                                           // 144
      } else {                                                                                                    // 145
        element.removeClass('md-numeric');                                                                        // 146
      }                                                                                                           // 147
    });                                                                                                           // 148
  }                                                                                                               // 149
                                                                                                                  // 150
  return {                                                                                                        // 151
    controller: Controller,                                                                                       // 152
    compile: compile,                                                                                             // 153
    require: ['mdCell', '^^mdTable'],                                                                             // 154
    restrict: 'A'                                                                                                 // 155
  };                                                                                                              // 156
}                                                                                                                 // 157
                                                                                                                  // 158
angular.module('md.data.table').directive('mdColumn', mdColumn);                                                  // 159
                                                                                                                  // 160
function mdColumn($compile) {                                                                                     // 161
                                                                                                                  // 162
  function compile(tElement) {                                                                                    // 163
    tElement.addClass('md-column');                                                                               // 164
    return postLink;                                                                                              // 165
  }                                                                                                               // 166
                                                                                                                  // 167
  function postLink(scope, element, attrs, ctrls) {                                                               // 168
    var headCtrl = ctrls.shift();                                                                                 // 169
    var tableCtrl = ctrls.shift();                                                                                // 170
                                                                                                                  // 171
    function attachSortIcon() {                                                                                   // 172
      var sortIcon = angular.element('<md-icon md-svg-icon="arrow-up.svg">');                                     // 173
                                                                                                                  // 174
      $compile(sortIcon.addClass('md-sort-icon').attr('ng-class', 'getDirection()'))(scope);                      // 175
                                                                                                                  // 176
      if(element.hasClass('md-numeric')) {                                                                        // 177
        element.prepend(sortIcon);                                                                                // 178
      } else {                                                                                                    // 179
        element.append(sortIcon);                                                                                 // 180
      }                                                                                                           // 181
    }                                                                                                             // 182
                                                                                                                  // 183
    function detachSortIcon() {                                                                                   // 184
      Array.prototype.some.call(element.find('md-icon'), function (icon) {                                        // 185
        return icon.classList.contains('md-sort-icon') && element[0].removeChild(icon);                           // 186
      });                                                                                                         // 187
    }                                                                                                             // 188
                                                                                                                  // 189
    function disableSorting() {                                                                                   // 190
      detachSortIcon();                                                                                           // 191
      element.removeClass('md-sort').off('click', setOrder);                                                      // 192
    }                                                                                                             // 193
                                                                                                                  // 194
    function enableSorting() {                                                                                    // 195
      attachSortIcon();                                                                                           // 196
      element.addClass('md-sort').on('click', setOrder);                                                          // 197
    }                                                                                                             // 198
                                                                                                                  // 199
    function getIndex() {                                                                                         // 200
      return Array.prototype.indexOf.call(element.parent().children(), element[0]);                               // 201
    }                                                                                                             // 202
                                                                                                                  // 203
    function isActive() {                                                                                         // 204
      if(!scope.orderBy) {                                                                                        // 205
        return false;                                                                                             // 206
      }                                                                                                           // 207
                                                                                                                  // 208
      return headCtrl.order === scope.orderBy || headCtrl.order === '-' + scope.orderBy;                          // 209
    }                                                                                                             // 210
                                                                                                                  // 211
    function isNumeric() {                                                                                        // 212
      if(attrs.hasOwnProperty('mdNumeric') && attrs.mdNumeric === '') {                                           // 213
        return true;                                                                                              // 214
      }                                                                                                           // 215
                                                                                                                  // 216
      return scope.numeric;                                                                                       // 217
    }                                                                                                             // 218
                                                                                                                  // 219
    function setOrder() {                                                                                         // 220
      scope.$applyAsync(function () {                                                                             // 221
        if(!isActive()) {                                                                                         // 222
          headCtrl.order = scope.getDirection() === 'md-asc' ? scope.orderBy : '-' + scope.orderBy;               // 223
        } else {                                                                                                  // 224
          headCtrl.order = scope.getDirection() === 'md-asc' ? '-' + scope.orderBy : scope.orderBy;               // 225
        }                                                                                                         // 226
                                                                                                                  // 227
        if(angular.isFunction(headCtrl.onReorder)) {                                                              // 228
          headCtrl.onReorder(headCtrl.order);                                                                     // 229
        }                                                                                                         // 230
      });                                                                                                         // 231
    }                                                                                                             // 232
                                                                                                                  // 233
    function updateColumn(index, column) {                                                                        // 234
      tableCtrl.$$columns[index] = column;                                                                        // 235
                                                                                                                  // 236
      if(column.numeric) {                                                                                        // 237
        element.addClass('md-numeric');                                                                           // 238
      } else {                                                                                                    // 239
        element.removeClass('md-numeric');                                                                        // 240
      }                                                                                                           // 241
    }                                                                                                             // 242
                                                                                                                  // 243
    scope.getDirection = function () {                                                                            // 244
      if(!isActive()) {                                                                                           // 245
        return attrs.hasOwnProperty('mdDesc') ? 'md-desc' : 'md-asc';                                             // 246
      }                                                                                                           // 247
                                                                                                                  // 248
      return headCtrl.order === '-' + scope.orderBy ? 'md-desc' : 'md-asc';                                       // 249
    };                                                                                                            // 250
                                                                                                                  // 251
    scope.$watch(isActive, function (active) {                                                                    // 252
      if(active) {                                                                                                // 253
        element.addClass('md-active');                                                                            // 254
      } else {                                                                                                    // 255
        element.removeClass('md-active');                                                                         // 256
      }                                                                                                           // 257
    });                                                                                                           // 258
                                                                                                                  // 259
    scope.$watch(getIndex, function (index) {                                                                     // 260
      updateColumn(index, {'numeric': isNumeric()});                                                              // 261
    });                                                                                                           // 262
                                                                                                                  // 263
    scope.$watch(isNumeric, function (numeric) {                                                                  // 264
      updateColumn(getIndex(), {'numeric': numeric});                                                             // 265
    });                                                                                                           // 266
                                                                                                                  // 267
    scope.$watch('orderBy', function (orderBy) {                                                                  // 268
      if(orderBy) {                                                                                               // 269
        enableSorting();                                                                                          // 270
      } else {                                                                                                    // 271
        disableSorting();                                                                                         // 272
      }                                                                                                           // 273
    });                                                                                                           // 274
  }                                                                                                               // 275
                                                                                                                  // 276
  return {                                                                                                        // 277
    compile: compile,                                                                                             // 278
    require: ['^^mdHead', '^^mdTable'],                                                                           // 279
    restrict: 'A',                                                                                                // 280
    scope: {                                                                                                      // 281
      numeric: '=?mdNumeric',                                                                                     // 282
      orderBy: '@?mdOrderBy'                                                                                      // 283
    }                                                                                                             // 284
  };                                                                                                              // 285
}                                                                                                                 // 286
                                                                                                                  // 287
mdColumn.$inject = ['$compile'];                                                                                  // 288
                                                                                                                  // 289
angular.module('md.data.table')                                                                                   // 290
  .decorator('$controller', controllerDecorator)                                                                  // 291
  .factory('$mdEditDialog', mdEditDialog);                                                                        // 292
                                                                                                                  // 293
/*                                                                                                                // 294
 * A decorator for ng.$controller to optionally bind properties to the                                            // 295
 * controller before invoking the constructor. Stolen from the ngMock.                                            // 296
 *                                                                                                                // 297
 * https://docs.angularjs.org/api/ngMock/service/$controller                                                      // 298
 */                                                                                                               // 299
function controllerDecorator($delegate) {                                                                         // 300
  return function(expression, locals, later, ident) {                                                             // 301
    if (later && typeof later === 'object') {                                                                     // 302
      var create = $delegate(expression, locals, true, ident);                                                    // 303
      angular.extend(create.instance, later);                                                                     // 304
      return create();                                                                                            // 305
    }                                                                                                             // 306
    return $delegate(expression, locals, later, ident);                                                           // 307
  };                                                                                                              // 308
}                                                                                                                 // 309
                                                                                                                  // 310
controllerDecorator.$inject = ['$delegate'];                                                                      // 311
                                                                                                                  // 312
function mdEditDialog($compile, $controller, $document, $mdUtil, $q, $rootScope, $templateCache, $templateRequest, $window) {
  /* jshint validthis: true */                                                                                    // 314
                                                                                                                  // 315
  var ESCAPE = 27;                                                                                                // 316
                                                                                                                  // 317
  var busy = false;                                                                                               // 318
  var body = angular.element($document.prop('body'));                                                             // 319
                                                                                                                  // 320
  /*                                                                                                              // 321
   * bindToController                                                                                             // 322
   * controller                                                                                                   // 323
   * controllerAs                                                                                                 // 324
   * locals                                                                                                       // 325
   * resolve                                                                                                      // 326
   * scope                                                                                                        // 327
   * targetEvent                                                                                                  // 328
   * template                                                                                                     // 329
   * templateUrl                                                                                                  // 330
   */                                                                                                             // 331
  var defaultOptions = {                                                                                          // 332
    clickOutsideToClose: true,                                                                                    // 333
    disableScroll: true,                                                                                          // 334
    escToClose: true,                                                                                             // 335
    focusOnOpen: true                                                                                             // 336
  };                                                                                                              // 337
                                                                                                                  // 338
  function build(template, options) {                                                                             // 339
    var scope = $rootScope.$new();                                                                                // 340
    var element = $compile(template)(scope);                                                                      // 341
    var backdrop = $mdUtil.createBackdrop(scope, 'md-edit-dialog-backdrop');                                      // 342
    var controller;                                                                                               // 343
                                                                                                                  // 344
    if(options.controller) {                                                                                      // 345
      controller = getController(options, scope, {$element: element, $scope: scope});                             // 346
    } else {                                                                                                      // 347
      angular.extend(scope, options.scope);                                                                       // 348
    }                                                                                                             // 349
                                                                                                                  // 350
    if(options.disableScroll) {                                                                                   // 351
      disableScroll(element);                                                                                     // 352
    }                                                                                                             // 353
                                                                                                                  // 354
    body.prepend(backdrop).append(element.addClass('md-whiteframe-1dp'));                                         // 355
                                                                                                                  // 356
    positionDialog(element, options.targetEvent.currentTarget);                                                   // 357
                                                                                                                  // 358
    if(options.focusOnOpen) {                                                                                     // 359
      var autofocus = $mdUtil.findFocusTarget(element);                                                           // 360
                                                                                                                  // 361
      if(autofocus) {                                                                                             // 362
        autofocus.focus();                                                                                        // 363
      }                                                                                                           // 364
    }                                                                                                             // 365
                                                                                                                  // 366
    if(options.clickOutsideToClose) {                                                                             // 367
      backdrop.on('click', function () {                                                                          // 368
        element.remove();                                                                                         // 369
      });                                                                                                         // 370
    }                                                                                                             // 371
                                                                                                                  // 372
    if(options.escToClose) {                                                                                      // 373
      escToClose(element);                                                                                        // 374
    }                                                                                                             // 375
                                                                                                                  // 376
    element.on('$destroy', function () {                                                                          // 377
      busy = false;                                                                                               // 378
      backdrop.remove();                                                                                          // 379
    });                                                                                                           // 380
                                                                                                                  // 381
    return controller;                                                                                            // 382
  }                                                                                                               // 383
                                                                                                                  // 384
  function disableScroll(element) {                                                                               // 385
    var restoreScroll = $mdUtil.disableScrollAround(element, body);                                               // 386
                                                                                                                  // 387
    element.on('$destroy', function () {                                                                          // 388
      restoreScroll();                                                                                            // 389
    });                                                                                                           // 390
  }                                                                                                               // 391
                                                                                                                  // 392
  function getController(options, scope, inject) {                                                                // 393
    if(!options.controller) {                                                                                     // 394
      return;                                                                                                     // 395
    }                                                                                                             // 396
                                                                                                                  // 397
    if(options.resolve) {                                                                                         // 398
      angular.extend(inject, options.resolve);                                                                    // 399
    }                                                                                                             // 400
                                                                                                                  // 401
    if(options.locals) {                                                                                          // 402
      angular.extend(inject, options.locals);                                                                     // 403
    }                                                                                                             // 404
                                                                                                                  // 405
    if(options.controllerAs) {                                                                                    // 406
      scope[options.controllerAs] = {};                                                                           // 407
                                                                                                                  // 408
      if(options.bindToController) {                                                                              // 409
        angular.extend(scope[options.controllerAs], options.scope);                                               // 410
      } else {                                                                                                    // 411
        angular.extend(scope, options.scope);                                                                     // 412
      }                                                                                                           // 413
    } else {                                                                                                      // 414
      angular.extend(scope, options.scope);                                                                       // 415
    }                                                                                                             // 416
                                                                                                                  // 417
    if(options.bindToController) {                                                                                // 418
      return $controller(options.controller, inject, scope[options.controllerAs]);                                // 419
    } else {                                                                                                      // 420
      return $controller(options.controller, inject);                                                             // 421
    }                                                                                                             // 422
  }                                                                                                               // 423
                                                                                                                  // 424
  function getTemplate(options) {                                                                                 // 425
    return $q(function (resolve, reject) {                                                                        // 426
      var template = options.template;                                                                            // 427
                                                                                                                  // 428
      function illegalType(type) {                                                                                // 429
        reject('Unexpected template value. Expected a string; received a ' + type + '.');                         // 430
      }                                                                                                           // 431
                                                                                                                  // 432
      if(template) {                                                                                              // 433
        return angular.isString(template) ? resolve(template) : illegalType(typeof template);                     // 434
      }                                                                                                           // 435
                                                                                                                  // 436
      if(options.templateUrl) {                                                                                   // 437
        template = $templateCache.get(options.templateUrl);                                                       // 438
                                                                                                                  // 439
        if(template) {                                                                                            // 440
          return resolve(template);                                                                               // 441
        }                                                                                                         // 442
                                                                                                                  // 443
        var success = function (template) {                                                                       // 444
          return resolve(template);                                                                               // 445
        };                                                                                                        // 446
                                                                                                                  // 447
        var error = function () {                                                                                 // 448
          return reject('Error retrieving template from URL.');                                                   // 449
        };                                                                                                        // 450
                                                                                                                  // 451
        return $templateRequest(options.templateUrl).then(success, error);                                        // 452
      }                                                                                                           // 453
                                                                                                                  // 454
      reject('Template not provided.');                                                                           // 455
    });                                                                                                           // 456
  }                                                                                                               // 457
                                                                                                                  // 458
  function logError(error) {                                                                                      // 459
    busy = false;                                                                                                 // 460
    console.error(error);                                                                                         // 461
  }                                                                                                               // 462
                                                                                                                  // 463
  function escToClose(element) {                                                                                  // 464
    var keyup = function (event) {                                                                                // 465
      if(event.keyCode === ESCAPE) {                                                                              // 466
        element.remove();                                                                                         // 467
      }                                                                                                           // 468
    };                                                                                                            // 469
                                                                                                                  // 470
    body.on('keyup', keyup);                                                                                      // 471
                                                                                                                  // 472
    element.on('$destroy', function () {                                                                          // 473
      body.off('keyup', keyup);                                                                                   // 474
    });                                                                                                           // 475
  }                                                                                                               // 476
                                                                                                                  // 477
  function positionDialog(element, target) {                                                                      // 478
    var table = angular.element(target).controller('mdCell').getTable();                                          // 479
                                                                                                                  // 480
    var getHeight = function () {                                                                                 // 481
      return element.prop('clientHeight');                                                                        // 482
    };                                                                                                            // 483
                                                                                                                  // 484
    var getSize = function () {                                                                                   // 485
      return {                                                                                                    // 486
        width: getWidth(),                                                                                        // 487
        height: getHeight()                                                                                       // 488
      };                                                                                                          // 489
    };                                                                                                            // 490
                                                                                                                  // 491
    var getTableBounds = function () {                                                                            // 492
      var parent = table.parent();                                                                                // 493
                                                                                                                  // 494
      if(parent.prop('tagName') === 'MD-TABLE-CONTAINER') {                                                       // 495
        return parent[0].getBoundingClientRect();                                                                 // 496
      } else {                                                                                                    // 497
        return table[0].getBoundingClientRect();                                                                  // 498
      }                                                                                                           // 499
    };                                                                                                            // 500
                                                                                                                  // 501
    var getWidth = function () {                                                                                  // 502
      return element.prop('clientWidth');                                                                         // 503
    };                                                                                                            // 504
                                                                                                                  // 505
    var reposition = function () {                                                                                // 506
      var size = getSize();                                                                                       // 507
      var cellBounds = target.getBoundingClientRect();                                                            // 508
      var tableBounds = getTableBounds();                                                                         // 509
                                                                                                                  // 510
      if(size.width > tableBounds.right - cellBounds.left) {                                                      // 511
        element.css('left', tableBounds.right - size.width + 'px');                                               // 512
      } else {                                                                                                    // 513
        element.css('left', cellBounds.left + 'px');                                                              // 514
      }                                                                                                           // 515
                                                                                                                  // 516
      if(size.height > tableBounds.bottom - cellBounds.top) {                                                     // 517
        element.css('top', tableBounds.bottom - size.height + 'px');                                              // 518
      } else {                                                                                                    // 519
        element.css('top', cellBounds.top + 1 + 'px');                                                            // 520
      }                                                                                                           // 521
                                                                                                                  // 522
      element.css('minWidth', cellBounds.width + 'px');                                                           // 523
    };                                                                                                            // 524
                                                                                                                  // 525
    var watchWidth = $rootScope.$watch(getWidth, reposition);                                                     // 526
    var watchHeight = $rootScope.$watch(getHeight, reposition);                                                   // 527
                                                                                                                  // 528
    $window.addEventListener('resize', reposition);                                                               // 529
                                                                                                                  // 530
    element.on('$destroy', function () {                                                                          // 531
      watchWidth();                                                                                               // 532
      watchHeight();                                                                                              // 533
                                                                                                                  // 534
      $window.removeEventListener('resize', reposition);                                                          // 535
    });                                                                                                           // 536
  }                                                                                                               // 537
                                                                                                                  // 538
  function preset(size, options) {                                                                                // 539
                                                                                                                  // 540
    function getAttrs() {                                                                                         // 541
      var attrs = 'type="' + (options.type || 'text') + '"';                                                      // 542
                                                                                                                  // 543
      for(var attr in options.validators) {                                                                       // 544
        attrs += ' ' + attr + '="' + options.validators[attr] + '"';                                              // 545
      }                                                                                                           // 546
                                                                                                                  // 547
      return attrs;                                                                                               // 548
    }                                                                                                             // 549
                                                                                                                  // 550
    return {                                                                                                      // 551
      controller: ['$element', '$q', 'save', '$scope', function ($element, $q, save, $scope) {                    // 552
        function update() {                                                                                       // 553
          if($scope.editDialog.$invalid) {                                                                        // 554
            return $q.reject();                                                                                   // 555
          }                                                                                                       // 556
                                                                                                                  // 557
          if(angular.isFunction(save)) {                                                                          // 558
            return $q.when(save($scope.editDialog.input));                                                        // 559
          }                                                                                                       // 560
                                                                                                                  // 561
          return $q.resolve();                                                                                    // 562
        }                                                                                                         // 563
                                                                                                                  // 564
        this.dismiss = function () {                                                                              // 565
          $element.remove();                                                                                      // 566
        };                                                                                                        // 567
                                                                                                                  // 568
        this.getInput = function () {                                                                             // 569
          return $scope.editDialog.input;                                                                         // 570
        };                                                                                                        // 571
                                                                                                                  // 572
        $scope.dismiss = this.dismiss;                                                                            // 573
                                                                                                                  // 574
        $scope.submit = function () {                                                                             // 575
          update().then(function () {                                                                             // 576
            $scope.dismiss();                                                                                     // 577
          });                                                                                                     // 578
        };                                                                                                        // 579
      }],                                                                                                         // 580
      locals: {                                                                                                   // 581
        save: options.save                                                                                        // 582
      },                                                                                                          // 583
      scope: {                                                                                                    // 584
        cancel: options.cancel || 'Cancel',                                                                       // 585
        messages: options.messages,                                                                               // 586
        model: options.modelValue,                                                                                // 587
        ok: options.ok || 'Save',                                                                                 // 588
        placeholder: options.placeholder,                                                                         // 589
        title: options.title,                                                                                     // 590
        size: size                                                                                                // 591
      },                                                                                                          // 592
      template:                                                                                                   // 593
        '<md-edit-dialog>' +                                                                                      // 594
          '<div layout="column" class="md-content">' +                                                            // 595
            '<div ng-if="size === \'large\'" class="md-title">{{title || \'Edit\'}}</div>' +                      // 596
            '<form name="editDialog" layout="column" ng-submit="submit(model)">' +                                // 597
              '<md-input-container md-no-float>' +                                                                // 598
                '<input name="input" ng-model="model" md-autofocus placeholder="{{placeholder}} "' + getAttrs() + '>' +
                '<div ng-messages="editDialog.input.$error">' +                                                   // 600
                  '<div ng-repeat="(key, message) in messages" ng-message="{{key}}">{{message}}</div>' +          // 601
                '</div>' +                                                                                        // 602
              '</md-input-container>' +                                                                           // 603
            '</form>' +                                                                                           // 604
          '</div>' +                                                                                              // 605
          '<div ng-if="size === \'large\'" layout="row" layout-align="end" class="md-actions">' +                 // 606
            '<md-button class="md-primary" ng-click="dismiss()">{{cancel}}</md-button>' +                         // 607
            '<md-button class="md-primary" ng-click="submit()">{{ok}}</md-button>' +                              // 608
          '</div>' +                                                                                              // 609
        '</md-edit-dialog>'                                                                                       // 610
    };                                                                                                            // 611
  }                                                                                                               // 612
                                                                                                                  // 613
  this.show = function (options) {                                                                                // 614
    if(busy) {                                                                                                    // 615
      return $q.reject();                                                                                         // 616
    }                                                                                                             // 617
                                                                                                                  // 618
    busy = true;                                                                                                  // 619
    options = angular.extend({}, defaultOptions, options);                                                        // 620
                                                                                                                  // 621
    if(!options.targetEvent) {                                                                                    // 622
      return logError('options.targetEvent is required to align the dialog with the table cell.');                // 623
    }                                                                                                             // 624
                                                                                                                  // 625
    if(!options.targetEvent.currentTarget.classList.contains('md-cell')) {                                        // 626
      return logError('The event target must be a table cell.');                                                  // 627
    }                                                                                                             // 628
                                                                                                                  // 629
    if(options.bindToController && !options.controllerAs) {                                                       // 630
      return logError('You must define options.controllerAs when options.bindToController is true.');             // 631
    }                                                                                                             // 632
                                                                                                                  // 633
    var promise = getTemplate(options);                                                                           // 634
    var promises = [promise];                                                                                     // 635
                                                                                                                  // 636
    for(var prop in options.resolve) {                                                                            // 637
      promise = options.resolve[prop];                                                                            // 638
      promises.push($q.when(angular.isFunction(promise) ? promise() : promise));                                  // 639
    }                                                                                                             // 640
                                                                                                                  // 641
    promise = $q.all(promises);                                                                                   // 642
                                                                                                                  // 643
    promise['catch'](logError);                                                                                   // 644
                                                                                                                  // 645
    return promise.then(function (results) {                                                                      // 646
      var template = results.shift();                                                                             // 647
                                                                                                                  // 648
      for(var prop in options.resolve) {                                                                          // 649
        options.resolve[prop] = results.shift();                                                                  // 650
      }                                                                                                           // 651
                                                                                                                  // 652
      return build(template, options);                                                                            // 653
    });                                                                                                           // 654
  };                                                                                                              // 655
                                                                                                                  // 656
  this.small = function (options) {                                                                               // 657
    return this.show(angular.extend({}, options, preset('small', options)));                                      // 658
  }.bind(this);                                                                                                   // 659
                                                                                                                  // 660
  this.large = function (options) {                                                                               // 661
    return this.show(angular.extend({}, options, preset('large', options)));                                      // 662
  }.bind(this);                                                                                                   // 663
                                                                                                                  // 664
  return this;                                                                                                    // 665
}                                                                                                                 // 666
                                                                                                                  // 667
mdEditDialog.$inject = ['$compile', '$controller', '$document', '$mdUtil', '$q', '$rootScope', '$templateCache', '$templateRequest', '$window'];
                                                                                                                  // 669
                                                                                                                  // 670
angular.module('md.data.table').directive('mdFoot', mdFoot);                                                      // 671
                                                                                                                  // 672
function mdFoot() {                                                                                               // 673
                                                                                                                  // 674
  function compile(tElement) {                                                                                    // 675
    tElement.addClass('md-foot');                                                                                 // 676
  }                                                                                                               // 677
                                                                                                                  // 678
  return {                                                                                                        // 679
    compile: compile,                                                                                             // 680
    restrict: 'A'                                                                                                 // 681
  };                                                                                                              // 682
}                                                                                                                 // 683
                                                                                                                  // 684
angular.module('md.data.table').directive('mdHead', mdHead);                                                      // 685
                                                                                                                  // 686
function mdHead($compile) {                                                                                       // 687
                                                                                                                  // 688
  function compile(tElement) {                                                                                    // 689
    tElement.addClass('md-head');                                                                                 // 690
    return postLink;                                                                                              // 691
  }                                                                                                               // 692
                                                                                                                  // 693
  // empty controller to be bind scope properties to                                                              // 694
  function Controller() {                                                                                         // 695
                                                                                                                  // 696
  }                                                                                                               // 697
                                                                                                                  // 698
  function postLink(scope, element, attrs, tableCtrl) {                                                           // 699
                                                                                                                  // 700
    function attachCheckbox() {                                                                                   // 701
      var children = element.children();                                                                          // 702
                                                                                                                  // 703
      // append an empty cell to preceding rows                                                                   // 704
      for(var i = 0; i < children.length - 1; i++) {                                                              // 705
        children.eq(i).prepend('<th class="md-column">');                                                         // 706
      }                                                                                                           // 707
                                                                                                                  // 708
      children.eq(children.length - 1).prepend(createCheckBox());                                                 // 709
    }                                                                                                             // 710
                                                                                                                  // 711
    function createCheckBox() {                                                                                   // 712
      var checkbox = angular.element('<md-checkbox>');                                                            // 713
                                                                                                                  // 714
      checkbox.attr('aria-label', 'Select All');                                                                  // 715
      checkbox.attr('ng-click', 'toggleAll()');                                                                   // 716
      checkbox.attr('ng-checked', 'allSelected()');                                                               // 717
                                                                                                                  // 718
      return angular.element('<th class="md-column md-checkbox-column">').append($compile(checkbox)(scope));      // 719
    }                                                                                                             // 720
                                                                                                                  // 721
    function enableRowSelection() {                                                                               // 722
      return tableCtrl.$$rowSelect;                                                                               // 723
    }                                                                                                             // 724
                                                                                                                  // 725
    function mdSelectCtrl(row) {                                                                                  // 726
      return angular.element(row).controller('mdSelect');                                                         // 727
    }                                                                                                             // 728
                                                                                                                  // 729
    function removeCheckbox() {                                                                                   // 730
      var children = element.children();                                                                          // 731
      var child = children.eq(children.length - 1);                                                               // 732
                                                                                                                  // 733
      Array.prototype.some.call(child.prop('cells'), function (cell) {                                            // 734
        return cell.classList.contains('md-checkbox-column') && child[0].removeChild(cell);                       // 735
      });                                                                                                         // 736
    }                                                                                                             // 737
                                                                                                                  // 738
    scope.allSelected = function () {                                                                             // 739
      var rows = tableCtrl.getBodyRows();                                                                         // 740
                                                                                                                  // 741
      return rows.length && rows.map(mdSelectCtrl).every(function (ctrl) {                                        // 742
        return ctrl && ctrl.isSelected();                                                                         // 743
      });                                                                                                         // 744
    };                                                                                                            // 745
                                                                                                                  // 746
    scope.selectAll = function () {                                                                               // 747
      tableCtrl.getBodyRows().map(mdSelectCtrl).forEach(function (ctrl) {                                         // 748
        if(ctrl && !ctrl.isSelected()) {                                                                          // 749
          ctrl.select();                                                                                          // 750
        }                                                                                                         // 751
      });                                                                                                         // 752
    };                                                                                                            // 753
                                                                                                                  // 754
    scope.toggleAll = function () {                                                                               // 755
      return scope.allSelected() ? scope.unSelectAll() : scope.selectAll();                                       // 756
    };                                                                                                            // 757
                                                                                                                  // 758
    scope.unSelectAll = function () {                                                                             // 759
      tableCtrl.getBodyRows().map(mdSelectCtrl).forEach(function (ctrl) {                                         // 760
        if(ctrl && ctrl.isSelected()) {                                                                           // 761
          ctrl.deselect();                                                                                        // 762
        }                                                                                                         // 763
      });                                                                                                         // 764
    };                                                                                                            // 765
                                                                                                                  // 766
    scope.$watch(enableRowSelection, function (enable) {                                                          // 767
      if(enable) {                                                                                                // 768
        attachCheckbox();                                                                                         // 769
      } else {                                                                                                    // 770
        removeCheckbox();                                                                                         // 771
      }                                                                                                           // 772
    });                                                                                                           // 773
  }                                                                                                               // 774
                                                                                                                  // 775
  return {                                                                                                        // 776
    bindToController: true,                                                                                       // 777
    compile: compile,                                                                                             // 778
    controller: Controller,                                                                                       // 779
    controllerAs: '$mdHead',                                                                                      // 780
    require: '^^mdTable',                                                                                         // 781
    restrict: 'A',                                                                                                // 782
    scope: {                                                                                                      // 783
      order: '=?mdOrder',                                                                                         // 784
      onReorder: '=?mdOnReorder'                                                                                  // 785
    }                                                                                                             // 786
  };                                                                                                              // 787
}                                                                                                                 // 788
                                                                                                                  // 789
mdHead.$inject = ['$compile'];                                                                                    // 790
                                                                                                                  // 791
angular.module('md.data.table').directive('mdRow', mdRow);                                                        // 792
                                                                                                                  // 793
function mdRow() {                                                                                                // 794
                                                                                                                  // 795
  function compile(tElement) {                                                                                    // 796
    tElement.addClass('md-row');                                                                                  // 797
    return postLink;                                                                                              // 798
  }                                                                                                               // 799
                                                                                                                  // 800
  function postLink(scope, element, attrs, tableCtrl) {                                                           // 801
    function enableRowSelection() {                                                                               // 802
      return tableCtrl.$$rowSelect;                                                                               // 803
    }                                                                                                             // 804
                                                                                                                  // 805
    function isBodyRow() {                                                                                        // 806
      return tableCtrl.getBodyRows().indexOf(element[0]) !== -1;                                                  // 807
    }                                                                                                             // 808
                                                                                                                  // 809
    function isChild(node) {                                                                                      // 810
      return node.parent()[0] === element[0];                                                                     // 811
    }                                                                                                             // 812
                                                                                                                  // 813
    if(isBodyRow()) {                                                                                             // 814
      var cell = angular.element('<td class="md-cell">');                                                         // 815
                                                                                                                  // 816
      scope.$watch(enableRowSelection, function (enable) {                                                        // 817
        if(enable && !attrs.mdSelect) {                                                                           // 818
          if(!isChild(cell)) {                                                                                    // 819
            element.prepend(cell);                                                                                // 820
          }                                                                                                       // 821
          return;                                                                                                 // 822
        }                                                                                                         // 823
                                                                                                                  // 824
        if(isChild(cell)) {                                                                                       // 825
          cell.remove();                                                                                          // 826
        }                                                                                                         // 827
      });                                                                                                         // 828
    }                                                                                                             // 829
  }                                                                                                               // 830
                                                                                                                  // 831
  return {                                                                                                        // 832
    compile: compile,                                                                                             // 833
    require: '^^mdTable',                                                                                         // 834
    restrict: 'A'                                                                                                 // 835
  };                                                                                                              // 836
}                                                                                                                 // 837
                                                                                                                  // 838
angular.module('md.data.table').directive('mdSelect', mdSelect);                                                  // 839
                                                                                                                  // 840
function mdSelect($compile) {                                                                                     // 841
                                                                                                                  // 842
  // empty controller to bind scope properties to                                                                 // 843
  function Controller() {                                                                                         // 844
                                                                                                                  // 845
  }                                                                                                               // 846
                                                                                                                  // 847
  function postLink(scope, element, attrs, ctrls) {                                                               // 848
    var self = ctrls.shift();                                                                                     // 849
    var tableCtrl = ctrls.shift();                                                                                // 850
                                                                                                                  // 851
    if(tableCtrl.$$rowSelect && self.id && tableCtrl.$$hash.has(self.id)) {                                       // 852
      var index = tableCtrl.selected.indexOf(tableCtrl.$$hash.get(self.id));                                      // 853
                                                                                                                  // 854
      // if the item is no longer selected remove it                                                              // 855
      if(index === -1) {                                                                                          // 856
        tableCtrl.$$hash.purge(self.id);                                                                          // 857
      }                                                                                                           // 858
                                                                                                                  // 859
      // if the item is not a reference to the current model update the reference                                 // 860
      else if(!tableCtrl.$$hash.equals(self.id, self.model)) {                                                    // 861
        tableCtrl.$$hash.update(self.id, self.model);                                                             // 862
        tableCtrl.selected.splice(index, 1, self.model);                                                          // 863
      }                                                                                                           // 864
    }                                                                                                             // 865
                                                                                                                  // 866
    self.isSelected = function () {                                                                               // 867
      if(!tableCtrl.$$rowSelect) {                                                                                // 868
        return false;                                                                                             // 869
      }                                                                                                           // 870
                                                                                                                  // 871
      if(self.id) {                                                                                               // 872
        return tableCtrl.$$hash.has(self.id);                                                                     // 873
      }                                                                                                           // 874
                                                                                                                  // 875
      return tableCtrl.selected.indexOf(self.model) !== -1;                                                       // 876
    };                                                                                                            // 877
                                                                                                                  // 878
    self.select = function () {                                                                                   // 879
      if(self.disabled) {                                                                                         // 880
        return;                                                                                                   // 881
      }                                                                                                           // 882
                                                                                                                  // 883
      tableCtrl.selected.push(self.model);                                                                        // 884
                                                                                                                  // 885
      if(angular.isFunction(self.onSelect)) {                                                                     // 886
        self.onSelect(self.model);                                                                                // 887
      }                                                                                                           // 888
    };                                                                                                            // 889
                                                                                                                  // 890
    self.deselect = function () {                                                                                 // 891
      if(self.disabled) {                                                                                         // 892
        return;                                                                                                   // 893
      }                                                                                                           // 894
                                                                                                                  // 895
      tableCtrl.selected.splice(tableCtrl.selected.indexOf(self.model), 1);                                       // 896
                                                                                                                  // 897
      if(angular.isFunction(self.onDeselect)) {                                                                   // 898
        self.onDeselect(self.model);                                                                              // 899
      }                                                                                                           // 900
    };                                                                                                            // 901
                                                                                                                  // 902
    self.toggle = function (event) {                                                                              // 903
      if(event && event.stopPropagation) {                                                                        // 904
        event.stopPropagation();                                                                                  // 905
      }                                                                                                           // 906
                                                                                                                  // 907
      return self.isSelected() ? self.deselect() : self.select();                                                 // 908
    };                                                                                                            // 909
                                                                                                                  // 910
    function autoSelect() {                                                                                       // 911
      if(attrs.hasOwnProperty('mdAutoSelect') && attrs.mdAutoSelect === '') {                                     // 912
        return true;                                                                                              // 913
      }                                                                                                           // 914
                                                                                                                  // 915
      return self.autoSelect;                                                                                     // 916
    }                                                                                                             // 917
                                                                                                                  // 918
    function createCheckbox() {                                                                                   // 919
      var checkbox = angular.element('<md-checkbox>');                                                            // 920
                                                                                                                  // 921
      checkbox.attr('aria-label', 'Select Row');                                                                  // 922
      checkbox.attr('ng-click', '$mdSelect.toggle($event)');                                                      // 923
      checkbox.attr('ng-checked', '$mdSelect.isSelected()');                                                      // 924
      checkbox.attr('ng-disabled', '$mdSelect.disabled');                                                         // 925
                                                                                                                  // 926
      return angular.element('<td class="md-cell md-checkbox-cell">').append($compile(checkbox)(scope));          // 927
    }                                                                                                             // 928
                                                                                                                  // 929
    function disableSelection() {                                                                                 // 930
      Array.prototype.some.call(element.children(), function (child) {                                            // 931
        return child.classList.contains('md-checkbox-cell') && element[0].removeChild(child);                     // 932
      });                                                                                                         // 933
                                                                                                                  // 934
      if(autoSelect()) {                                                                                          // 935
        element.off('click', toggle);                                                                             // 936
      }                                                                                                           // 937
    }                                                                                                             // 938
                                                                                                                  // 939
    function enableSelection() {                                                                                  // 940
      element.prepend(createCheckbox());                                                                          // 941
                                                                                                                  // 942
      if(autoSelect()) {                                                                                          // 943
        element.on('click', toggle);                                                                              // 944
      }                                                                                                           // 945
    }                                                                                                             // 946
                                                                                                                  // 947
    function enableRowSelection() {                                                                               // 948
      return tableCtrl.$$rowSelect;                                                                               // 949
    }                                                                                                             // 950
                                                                                                                  // 951
    function onSelectChange(selected) {                                                                           // 952
      if(!self.id) {                                                                                              // 953
        return;                                                                                                   // 954
      }                                                                                                           // 955
                                                                                                                  // 956
      if(tableCtrl.$$hash.has(self.id)) {                                                                         // 957
        // check if the item has been deselected                                                                  // 958
        if(selected.indexOf(tableCtrl.$$hash.get(self.id)) === -1) {                                              // 959
          tableCtrl.$$hash.purge(self.id);                                                                        // 960
        }                                                                                                         // 961
                                                                                                                  // 962
        return;                                                                                                   // 963
      }                                                                                                           // 964
                                                                                                                  // 965
      // check if the item has been selected                                                                      // 966
      if(selected.indexOf(self.model) !== -1) {                                                                   // 967
        tableCtrl.$$hash.update(self.id, self.model);                                                             // 968
      }                                                                                                           // 969
    }                                                                                                             // 970
                                                                                                                  // 971
    function toggle(event) {                                                                                      // 972
      scope.$applyAsync(function () {                                                                             // 973
        self.toggle(event);                                                                                       // 974
      });                                                                                                         // 975
    }                                                                                                             // 976
                                                                                                                  // 977
    scope.$watch(enableRowSelection, function (enable) {                                                          // 978
      if(enable) {                                                                                                // 979
        enableSelection();                                                                                        // 980
      } else {                                                                                                    // 981
        disableSelection();                                                                                       // 982
      }                                                                                                           // 983
    });                                                                                                           // 984
                                                                                                                  // 985
    scope.$watch(autoSelect, function (newValue, oldValue) {                                                      // 986
      if(newValue === oldValue) {                                                                                 // 987
        return;                                                                                                   // 988
      }                                                                                                           // 989
                                                                                                                  // 990
      if(tableCtrl.$$rowSelect && newValue) {                                                                     // 991
        element.on('click', toggle);                                                                              // 992
      } else {                                                                                                    // 993
        element.off('click', toggle);                                                                             // 994
      }                                                                                                           // 995
    });                                                                                                           // 996
                                                                                                                  // 997
    scope.$watch(self.isSelected, function (isSelected) {                                                         // 998
      return isSelected ? element.addClass('md-selected') : element.removeClass('md-selected');                   // 999
    });                                                                                                           // 1000
                                                                                                                  // 1001
    tableCtrl.registerModelChangeListener(onSelectChange);                                                        // 1002
                                                                                                                  // 1003
    element.on('$destroy', function () {                                                                          // 1004
      tableCtrl.removeModelChangeListener(onSelectChange);                                                        // 1005
    });                                                                                                           // 1006
  }                                                                                                               // 1007
                                                                                                                  // 1008
  return {                                                                                                        // 1009
    bindToController: true,                                                                                       // 1010
    controller: Controller,                                                                                       // 1011
    controllerAs: '$mdSelect',                                                                                    // 1012
    link: postLink,                                                                                               // 1013
    require: ['mdSelect', '^^mdTable'],                                                                           // 1014
    restrict: 'A',                                                                                                // 1015
    scope: {                                                                                                      // 1016
      id: '@mdSelectId',                                                                                          // 1017
      model: '=mdSelect',                                                                                         // 1018
      disabled: '=ngDisabled',                                                                                    // 1019
      onSelect: '=?mdOnSelect',                                                                                   // 1020
      onDeselect: '=?mdOnDeselect',                                                                               // 1021
      autoSelect: '=mdAutoSelect'                                                                                 // 1022
    }                                                                                                             // 1023
  };                                                                                                              // 1024
}                                                                                                                 // 1025
                                                                                                                  // 1026
mdSelect.$inject = ['$compile'];                                                                                  // 1027
                                                                                                                  // 1028
angular.module('md.data.table').directive('mdTable', mdTable);                                                    // 1029
                                                                                                                  // 1030
function Hash() {                                                                                                 // 1031
  var keys = {};                                                                                                  // 1032
                                                                                                                  // 1033
  this.equals = function (key, item) {                                                                            // 1034
    return keys[key] === item;                                                                                    // 1035
  };                                                                                                              // 1036
                                                                                                                  // 1037
  this.get = function (key) {                                                                                     // 1038
    return keys[key];                                                                                             // 1039
  };                                                                                                              // 1040
                                                                                                                  // 1041
  this.has = function (key) {                                                                                     // 1042
    return keys.hasOwnProperty(key);                                                                              // 1043
  };                                                                                                              // 1044
                                                                                                                  // 1045
  this.purge = function (key) {                                                                                   // 1046
    delete keys[key];                                                                                             // 1047
  };                                                                                                              // 1048
                                                                                                                  // 1049
  this.update = function (key, item) {                                                                            // 1050
    keys[key] = item;                                                                                             // 1051
  };                                                                                                              // 1052
}                                                                                                                 // 1053
                                                                                                                  // 1054
function mdTable() {                                                                                              // 1055
                                                                                                                  // 1056
  function compile(tElement, tAttrs) {                                                                            // 1057
    tElement.addClass('md-table');                                                                                // 1058
                                                                                                                  // 1059
    if(tAttrs.hasOwnProperty('mdProgress')) {                                                                     // 1060
      var body = tElement.find('tbody')[0];                                                                       // 1061
      var progress = angular.element('<thead class="md-table-progress">');                                        // 1062
                                                                                                                  // 1063
      if(body) {                                                                                                  // 1064
        tElement[0].insertBefore(progress[0], body);                                                              // 1065
      }                                                                                                           // 1066
    }                                                                                                             // 1067
  }                                                                                                               // 1068
                                                                                                                  // 1069
  function Controller($attrs, $element, $q, $scope) {                                                             // 1070
    var self = this;                                                                                              // 1071
    var queue = [];                                                                                               // 1072
    var watchListener;                                                                                            // 1073
    var modelChangeListeners = [];                                                                                // 1074
                                                                                                                  // 1075
    self.$$hash = new Hash();                                                                                     // 1076
    self.$$columns = {};                                                                                          // 1077
                                                                                                                  // 1078
    function enableRowSelection() {                                                                               // 1079
      self.$$rowSelect = true;                                                                                    // 1080
                                                                                                                  // 1081
      watchListener = $scope.$watchCollection('$mdTable.selected', function (selected) {                          // 1082
        modelChangeListeners.forEach(function (listener) {                                                        // 1083
          listener(selected);                                                                                     // 1084
        });                                                                                                       // 1085
      });                                                                                                         // 1086
                                                                                                                  // 1087
      $element.addClass('md-row-select');                                                                         // 1088
    }                                                                                                             // 1089
                                                                                                                  // 1090
    function disableRowSelection() {                                                                              // 1091
      self.$$rowSelect = false;                                                                                   // 1092
                                                                                                                  // 1093
      if(angular.isFunction(watchListener)) {                                                                     // 1094
        watchListener();                                                                                          // 1095
      }                                                                                                           // 1096
                                                                                                                  // 1097
      $element.removeClass('md-row-select');                                                                      // 1098
    }                                                                                                             // 1099
                                                                                                                  // 1100
    function resolvePromises() {                                                                                  // 1101
      if(!queue.length) {                                                                                         // 1102
        return $scope.$applyAsync();                                                                              // 1103
      }                                                                                                           // 1104
                                                                                                                  // 1105
      queue[0].then(function () {                                                                                 // 1106
        queue.shift();                                                                                            // 1107
        resolvePromises();                                                                                        // 1108
      });                                                                                                         // 1109
    }                                                                                                             // 1110
                                                                                                                  // 1111
    function rowSelect() {                                                                                        // 1112
      if($attrs.hasOwnProperty('mdRowSelect') && $attrs.mdRowSelect === '') {                                     // 1113
        return true;                                                                                              // 1114
      }                                                                                                           // 1115
                                                                                                                  // 1116
      return self.rowSelect;                                                                                      // 1117
    }                                                                                                             // 1118
                                                                                                                  // 1119
    function validateModel() {                                                                                    // 1120
      if(!self.selected) {                                                                                        // 1121
        return console.error('Row selection: ngModel is not defined.');                                           // 1122
      }                                                                                                           // 1123
                                                                                                                  // 1124
      if(!angular.isArray(self.selected)) {                                                                       // 1125
        return console.error('Row selection: Expected an array. Recived ' + typeof self.selected + '.');          // 1126
      }                                                                                                           // 1127
                                                                                                                  // 1128
      return true;                                                                                                // 1129
    }                                                                                                             // 1130
                                                                                                                  // 1131
    self.columnCount = function () {                                                                              // 1132
      return self.getRows($element[0]).reduce(function (count, row) {                                             // 1133
        return row.cells.length > count ? row.cells.length : count;                                               // 1134
      }, 0);                                                                                                      // 1135
    };                                                                                                            // 1136
                                                                                                                  // 1137
    self.getRows = function (element) {                                                                           // 1138
      return Array.prototype.filter.call(element.rows, function (row) {                                           // 1139
        return !row.classList.contains('ng-leave');                                                               // 1140
      });                                                                                                         // 1141
    };                                                                                                            // 1142
                                                                                                                  // 1143
    self.getBodyRows = function () {                                                                              // 1144
      return Array.prototype.reduce.call($element.prop('tBodies'), function (result, tbody) {                     // 1145
        return result.concat(self.getRows(tbody));                                                                // 1146
      }, []);                                                                                                     // 1147
    };                                                                                                            // 1148
                                                                                                                  // 1149
    self.getElement = function () {                                                                               // 1150
      return $element;                                                                                            // 1151
    };                                                                                                            // 1152
                                                                                                                  // 1153
    self.getHeaderRows = function () {                                                                            // 1154
      return self.getRows($element.prop('tHead'));                                                                // 1155
    };                                                                                                            // 1156
                                                                                                                  // 1157
    self.waitingOnPromise = function () {                                                                         // 1158
      return !!queue.length;                                                                                      // 1159
    };                                                                                                            // 1160
                                                                                                                  // 1161
    self.queuePromise = function (promise) {                                                                      // 1162
      if(!promise) {                                                                                              // 1163
        return;                                                                                                   // 1164
      }                                                                                                           // 1165
                                                                                                                  // 1166
      if(queue.push(angular.isArray(promise) ? $q.all(promise) : $q.when(promise)) === 1) {                       // 1167
        resolvePromises();                                                                                        // 1168
      }                                                                                                           // 1169
    };                                                                                                            // 1170
                                                                                                                  // 1171
    self.registerModelChangeListener = function (listener) {                                                      // 1172
      modelChangeListeners.push(listener);                                                                        // 1173
    };                                                                                                            // 1174
                                                                                                                  // 1175
    self.removeModelChangeListener = function (listener) {                                                        // 1176
      var index = modelChangeListeners.indexOf(listener);                                                         // 1177
                                                                                                                  // 1178
      if(index !== -1) {                                                                                          // 1179
        modelChangeListeners.splice(index, 1);                                                                    // 1180
      }                                                                                                           // 1181
    };                                                                                                            // 1182
                                                                                                                  // 1183
    if($attrs.hasOwnProperty('mdProgress')) {                                                                     // 1184
      $scope.$watch('$mdTable.progress', self.queuePromise);                                                      // 1185
    }                                                                                                             // 1186
                                                                                                                  // 1187
    $scope.$watch(rowSelect, function (enable) {                                                                  // 1188
      if(enable && !!validateModel()) {                                                                           // 1189
        enableRowSelection();                                                                                     // 1190
      } else {                                                                                                    // 1191
        disableRowSelection();                                                                                    // 1192
      }                                                                                                           // 1193
    });                                                                                                           // 1194
  }                                                                                                               // 1195
                                                                                                                  // 1196
  Controller.$inject = ['$attrs', '$element', '$q', '$scope'];                                                    // 1197
                                                                                                                  // 1198
  return {                                                                                                        // 1199
    bindToController: true,                                                                                       // 1200
    compile: compile,                                                                                             // 1201
    controller: Controller,                                                                                       // 1202
    controllerAs: '$mdTable',                                                                                     // 1203
    restrict: 'A',                                                                                                // 1204
    scope: {                                                                                                      // 1205
      progress: '=?mdProgress',                                                                                   // 1206
      selected: '=ngModel',                                                                                       // 1207
      rowSelect: '=mdRowSelect'                                                                                   // 1208
    }                                                                                                             // 1209
  };                                                                                                              // 1210
}                                                                                                                 // 1211
                                                                                                                  // 1212
angular.module('md.data.table').directive('mdTablePagination', mdTablePagination);                                // 1213
                                                                                                                  // 1214
function mdTablePagination() {                                                                                    // 1215
                                                                                                                  // 1216
  function compile(tElement) {                                                                                    // 1217
    tElement.addClass('md-table-pagination');                                                                     // 1218
  }                                                                                                               // 1219
                                                                                                                  // 1220
  function Controller($attrs, $scope) {                                                                           // 1221
    var self = this;                                                                                              // 1222
                                                                                                                  // 1223
    self.$label = angular.extend({                                                                                // 1224
      page: 'Page:',                                                                                              // 1225
      rowsPerPage: 'Rows per page:',                                                                              // 1226
      of: 'of'                                                                                                    // 1227
    }, $scope.$eval(self.label) || {});                                                                           // 1228
                                                                                                                  // 1229
    function isPositive(number) {                                                                                 // 1230
      return number > 0;                                                                                          // 1231
    }                                                                                                             // 1232
                                                                                                                  // 1233
    function isZero(number) {                                                                                     // 1234
      return number === 0 || number === '0';                                                                      // 1235
    }                                                                                                             // 1236
                                                                                                                  // 1237
    self.disableNext = function () {                                                                              // 1238
      return isZero(self.limit) || !self.hasNext();                                                               // 1239
    };                                                                                                            // 1240
                                                                                                                  // 1241
    self.first = function () {                                                                                    // 1242
      self.page = 1;                                                                                              // 1243
      self.onPaginationChange();                                                                                  // 1244
    };                                                                                                            // 1245
                                                                                                                  // 1246
    self.hasNext = function () {                                                                                  // 1247
      return self.page * self.limit < self.total;                                                                 // 1248
    };                                                                                                            // 1249
                                                                                                                  // 1250
    self.hasPrevious = function () {                                                                              // 1251
      return self.page > 1;                                                                                       // 1252
    };                                                                                                            // 1253
                                                                                                                  // 1254
    self.last = function () {                                                                                     // 1255
      self.page = self.pages();                                                                                   // 1256
      self.onPaginationChange();                                                                                  // 1257
    };                                                                                                            // 1258
                                                                                                                  // 1259
    self.max = function () {                                                                                      // 1260
      return self.hasNext() ? self.page * self.limit : self.total;                                                // 1261
    };                                                                                                            // 1262
                                                                                                                  // 1263
    self.min = function () {                                                                                      // 1264
      return self.page * self.limit - self.limit;                                                                 // 1265
    };                                                                                                            // 1266
                                                                                                                  // 1267
    self.next = function () {                                                                                     // 1268
      self.page++;                                                                                                // 1269
      self.onPaginationChange();                                                                                  // 1270
    };                                                                                                            // 1271
                                                                                                                  // 1272
    self.onPaginationChange = function () {                                                                       // 1273
      if(angular.isFunction(self.onPaginate)) {                                                                   // 1274
        self.onPaginate(self.page, self.limit);                                                                   // 1275
      }                                                                                                           // 1276
    };                                                                                                            // 1277
                                                                                                                  // 1278
    self.pages = function () {                                                                                    // 1279
      return Math.ceil(self.total / (isZero(self.limit) ? 1 : self.limit));                                       // 1280
    };                                                                                                            // 1281
                                                                                                                  // 1282
    self.previous = function () {                                                                                 // 1283
      self.page--;                                                                                                // 1284
      self.onPaginationChange();                                                                                  // 1285
    };                                                                                                            // 1286
                                                                                                                  // 1287
    self.range = function (total) {                                                                               // 1288
      return new Array(isFinite(total) && isPositive(total) ? total : 1);                                         // 1289
    };                                                                                                            // 1290
                                                                                                                  // 1291
    self.showBoundaryLinks = function () {                                                                        // 1292
      if($attrs.hasOwnProperty('mdBoundaryLinks') && $attrs.mdBoundaryLinks === '') {                             // 1293
        return true;                                                                                              // 1294
      }                                                                                                           // 1295
                                                                                                                  // 1296
      return self.boundaryLinks;                                                                                  // 1297
    };                                                                                                            // 1298
                                                                                                                  // 1299
    self.showPageSelect = function () {                                                                           // 1300
      if($attrs.hasOwnProperty('mdPageSelect') && $attrs.mdPageSelect === '') {                                   // 1301
        return true;                                                                                              // 1302
      }                                                                                                           // 1303
                                                                                                                  // 1304
      return self.pageSelect;                                                                                     // 1305
    };                                                                                                            // 1306
                                                                                                                  // 1307
    $scope.$watch('$pagination.limit', function (newValue, oldValue) {                                            // 1308
      if(newValue === oldValue) {                                                                                 // 1309
        return;                                                                                                   // 1310
      }                                                                                                           // 1311
                                                                                                                  // 1312
      // find closest page from previous min                                                                      // 1313
      self.page = Math.floor(((self.page * oldValue - oldValue) + newValue) / (isZero(newValue) ? 1 : newValue));
      self.onPaginationChange();                                                                                  // 1315
    });                                                                                                           // 1316
  }                                                                                                               // 1317
                                                                                                                  // 1318
  Controller.$inject = ['$attrs', '$scope'];                                                                      // 1319
                                                                                                                  // 1320
  return {                                                                                                        // 1321
    bindToController: {                                                                                           // 1322
      boundaryLinks: '=?mdBoundaryLinks',                                                                         // 1323
      label: '@?mdLabel',                                                                                         // 1324
      limit: '=mdLimit',                                                                                          // 1325
      page: '=mdPage',                                                                                            // 1326
      pageSelect: '=?mdPageSelect',                                                                               // 1327
      onPaginate: '=?mdOnPaginate',                                                                               // 1328
      options: '=mdOptions',                                                                                      // 1329
      total: '@mdTotal'                                                                                           // 1330
    },                                                                                                            // 1331
    compile: compile,                                                                                             // 1332
    controller: Controller,                                                                                       // 1333
    controllerAs: '$pagination',                                                                                  // 1334
    restrict: 'E',                                                                                                // 1335
    scope: {},                                                                                                    // 1336
    templateUrl: 'md-table-pagination.html'                                                                       // 1337
  };                                                                                                              // 1338
}                                                                                                                 // 1339
                                                                                                                  // 1340
angular.module('md.data.table').directive('mdTableProgress', mdTableProgress);                                    // 1341
                                                                                                                  // 1342
function mdTableProgress() {                                                                                      // 1343
                                                                                                                  // 1344
  function postLink(scope, element, attrs, tableCtrl) {                                                           // 1345
    scope.columnCount = tableCtrl.columnCount;                                                                    // 1346
    scope.deferred = tableCtrl.waitingOnPromise;                                                                  // 1347
  }                                                                                                               // 1348
                                                                                                                  // 1349
  return {                                                                                                        // 1350
    link: postLink,                                                                                               // 1351
    require: '^^mdTable',                                                                                         // 1352
    restrict: 'C',                                                                                                // 1353
    scope: {},                                                                                                    // 1354
    templateUrl: 'md-table-progress.html'                                                                         // 1355
  };                                                                                                              // 1356
}                                                                                                                 // 1357
                                                                                                                  // 1358
})(window, angular);                                                                                              // 1359
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['pacozaa:angular-material-data-table'] = {};

})();

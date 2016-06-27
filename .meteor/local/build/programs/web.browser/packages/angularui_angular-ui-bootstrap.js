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
// packages/angularui_angular-ui-bootstrap/packages/angularui_angula //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
(function () {                                                       // 1
                                                                     // 2
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/angularui:angular-ui-bootstrap/ui-bootstrap-tpls.js                                                       //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
/*                                                                                                                    // 1
 * angular-ui-bootstrap                                                                                               // 2
 * http://angular-ui.github.io/bootstrap/                                                                             // 3
                                                                                                                      // 4
 * Version: 0.13.0 - 2015-05-02                                                                                       // 5
 * License: MIT                                                                                                       // 6
 */                                                                                                                   // 7
angular.module("ui.bootstrap", ["ui.bootstrap.tpls", "ui.bootstrap.collapse","ui.bootstrap.accordion","ui.bootstrap.alert","ui.bootstrap.bindHtml","ui.bootstrap.buttons","ui.bootstrap.carousel","ui.bootstrap.dateparser","ui.bootstrap.position","ui.bootstrap.datepicker","ui.bootstrap.dropdown","ui.bootstrap.modal","ui.bootstrap.pagination","ui.bootstrap.tooltip","ui.bootstrap.popover","ui.bootstrap.progressbar","ui.bootstrap.rating","ui.bootstrap.tabs","ui.bootstrap.timepicker","ui.bootstrap.transition","ui.bootstrap.typeahead"]);
angular.module("ui.bootstrap.tpls", ["template/accordion/accordion-group.html","template/accordion/accordion.html","template/alert/alert.html","template/carousel/carousel.html","template/carousel/slide.html","template/datepicker/datepicker.html","template/datepicker/day.html","template/datepicker/month.html","template/datepicker/popup.html","template/datepicker/year.html","template/modal/backdrop.html","template/modal/window.html","template/pagination/pager.html","template/pagination/pagination.html","template/tooltip/tooltip-html-popup.html","template/tooltip/tooltip-html-unsafe-popup.html","template/tooltip/tooltip-popup.html","template/tooltip/tooltip-template-popup.html","template/popover/popover-template.html","template/popover/popover.html","template/progressbar/bar.html","template/progressbar/progress.html","template/progressbar/progressbar.html","template/rating/rating.html","template/tabs/tab.html","template/tabs/tabset.html","template/timepicker/timepicker.html","template/typeahead/typeahead-match.html","template/typeahead/typeahead-popup.html"]);
angular.module('ui.bootstrap.collapse', [])                                                                           // 10
                                                                                                                      // 11
  .directive('collapse', ['$animate', function ($animate) {                                                           // 12
                                                                                                                      // 13
    return {                                                                                                          // 14
      link: function (scope, element, attrs) {                                                                        // 15
        function expand() {                                                                                           // 16
          element.removeClass('collapse').addClass('collapsing');                                                     // 17
          $animate.addClass(element, 'in', {                                                                          // 18
            to: { height: element[0].scrollHeight + 'px' }                                                            // 19
          }).then(expandDone);                                                                                        // 20
        }                                                                                                             // 21
                                                                                                                      // 22
        function expandDone() {                                                                                       // 23
          element.removeClass('collapsing');                                                                          // 24
          element.css({height: 'auto'});                                                                              // 25
        }                                                                                                             // 26
                                                                                                                      // 27
        function collapse() {                                                                                         // 28
          element                                                                                                     // 29
            // IMPORTANT: The height must be set before adding "collapsing" class.                                    // 30
            // Otherwise, the browser attempts to animate from height 0 (in                                           // 31
            // collapsing class) to the given height here.                                                            // 32
            .css({height: element[0].scrollHeight + 'px'})                                                            // 33
            // initially all panel collapse have the collapse class, this removal                                     // 34
            // prevents the animation from jumping to collapsed state                                                 // 35
            .removeClass('collapse')                                                                                  // 36
            .addClass('collapsing');                                                                                  // 37
                                                                                                                      // 38
          $animate.removeClass(element, 'in', {                                                                       // 39
            to: {height: '0'}                                                                                         // 40
          }).then(collapseDone);                                                                                      // 41
        }                                                                                                             // 42
                                                                                                                      // 43
        function collapseDone() {                                                                                     // 44
          element.css({height: '0'}); // Required so that collapse works when animation is disabled                   // 45
          element.removeClass('collapsing');                                                                          // 46
          element.addClass('collapse');                                                                               // 47
        }                                                                                                             // 48
                                                                                                                      // 49
        scope.$watch(attrs.collapse, function (shouldCollapse) {                                                      // 50
          if (shouldCollapse) {                                                                                       // 51
            collapse();                                                                                               // 52
          } else {                                                                                                    // 53
            expand();                                                                                                 // 54
          }                                                                                                           // 55
        });                                                                                                           // 56
      }                                                                                                               // 57
    };                                                                                                                // 58
  }]);                                                                                                                // 59
                                                                                                                      // 60
angular.module('ui.bootstrap.accordion', ['ui.bootstrap.collapse'])                                                   // 61
                                                                                                                      // 62
.constant('accordionConfig', {                                                                                        // 63
  closeOthers: true                                                                                                   // 64
})                                                                                                                    // 65
                                                                                                                      // 66
.controller('AccordionController', ['$scope', '$attrs', 'accordionConfig', function ($scope, $attrs, accordionConfig) {
                                                                                                                      // 68
  // This array keeps track of the accordion groups                                                                   // 69
  this.groups = [];                                                                                                   // 70
                                                                                                                      // 71
  // Ensure that all the groups in this accordion are closed, unless close-others explicitly says not to              // 72
  this.closeOthers = function(openGroup) {                                                                            // 73
    var closeOthers = angular.isDefined($attrs.closeOthers) ? $scope.$eval($attrs.closeOthers) : accordionConfig.closeOthers;
    if ( closeOthers ) {                                                                                              // 75
      angular.forEach(this.groups, function (group) {                                                                 // 76
        if ( group !== openGroup ) {                                                                                  // 77
          group.isOpen = false;                                                                                       // 78
        }                                                                                                             // 79
      });                                                                                                             // 80
    }                                                                                                                 // 81
  };                                                                                                                  // 82
                                                                                                                      // 83
  // This is called from the accordion-group directive to add itself to the accordion                                 // 84
  this.addGroup = function(groupScope) {                                                                              // 85
    var that = this;                                                                                                  // 86
    this.groups.push(groupScope);                                                                                     // 87
                                                                                                                      // 88
    groupScope.$on('$destroy', function (event) {                                                                     // 89
      that.removeGroup(groupScope);                                                                                   // 90
    });                                                                                                               // 91
  };                                                                                                                  // 92
                                                                                                                      // 93
  // This is called from the accordion-group directive when to remove itself                                          // 94
  this.removeGroup = function(group) {                                                                                // 95
    var index = this.groups.indexOf(group);                                                                           // 96
    if ( index !== -1 ) {                                                                                             // 97
      this.groups.splice(index, 1);                                                                                   // 98
    }                                                                                                                 // 99
  };                                                                                                                  // 100
                                                                                                                      // 101
}])                                                                                                                   // 102
                                                                                                                      // 103
// The accordion directive simply sets up the directive controller                                                    // 104
// and adds an accordion CSS class to itself element.                                                                 // 105
.directive('accordion', function () {                                                                                 // 106
  return {                                                                                                            // 107
    restrict:'EA',                                                                                                    // 108
    controller:'AccordionController',                                                                                 // 109
    transclude: true,                                                                                                 // 110
    replace: false,                                                                                                   // 111
    templateUrl: 'template/accordion/accordion.html'                                                                  // 112
  };                                                                                                                  // 113
})                                                                                                                    // 114
                                                                                                                      // 115
// The accordion-group directive indicates a block of html that will expand and collapse in an accordion              // 116
.directive('accordionGroup', function() {                                                                             // 117
  return {                                                                                                            // 118
    require:'^accordion',         // We need this directive to be inside an accordion                                 // 119
    restrict:'EA',                                                                                                    // 120
    transclude:true,              // It transcludes the contents of the directive into the template                   // 121
    replace: true,                // The element containing the directive will be replaced with the template          // 122
    templateUrl:'template/accordion/accordion-group.html',                                                            // 123
    scope: {                                                                                                          // 124
      heading: '@',               // Interpolate the heading attribute onto this scope                                // 125
      isOpen: '=?',                                                                                                   // 126
      isDisabled: '=?'                                                                                                // 127
    },                                                                                                                // 128
    controller: function() {                                                                                          // 129
      this.setHeading = function(element) {                                                                           // 130
        this.heading = element;                                                                                       // 131
      };                                                                                                              // 132
    },                                                                                                                // 133
    link: function(scope, element, attrs, accordionCtrl) {                                                            // 134
      accordionCtrl.addGroup(scope);                                                                                  // 135
                                                                                                                      // 136
      scope.$watch('isOpen', function(value) {                                                                        // 137
        if ( value ) {                                                                                                // 138
          accordionCtrl.closeOthers(scope);                                                                           // 139
        }                                                                                                             // 140
      });                                                                                                             // 141
                                                                                                                      // 142
      scope.toggleOpen = function() {                                                                                 // 143
        if ( !scope.isDisabled ) {                                                                                    // 144
          scope.isOpen = !scope.isOpen;                                                                               // 145
        }                                                                                                             // 146
      };                                                                                                              // 147
    }                                                                                                                 // 148
  };                                                                                                                  // 149
})                                                                                                                    // 150
                                                                                                                      // 151
// Use accordion-heading below an accordion-group to provide a heading containing HTML                                // 152
// <accordion-group>                                                                                                  // 153
//   <accordion-heading>Heading containing HTML - <img src="..."></accordion-heading>                                 // 154
// </accordion-group>                                                                                                 // 155
.directive('accordionHeading', function() {                                                                           // 156
  return {                                                                                                            // 157
    restrict: 'EA',                                                                                                   // 158
    transclude: true,   // Grab the contents to be used as the heading                                                // 159
    template: '',       // In effect remove this element!                                                             // 160
    replace: true,                                                                                                    // 161
    require: '^accordionGroup',                                                                                       // 162
    link: function(scope, element, attr, accordionGroupCtrl, transclude) {                                            // 163
      // Pass the heading to the accordion-group controller                                                           // 164
      // so that it can be transcluded into the right place in the template                                           // 165
      // [The second parameter to transclude causes the elements to be cloned so that they work in ng-repeat]         // 166
      accordionGroupCtrl.setHeading(transclude(scope, angular.noop));                                                 // 167
    }                                                                                                                 // 168
  };                                                                                                                  // 169
})                                                                                                                    // 170
                                                                                                                      // 171
// Use in the accordion-group template to indicate where you want the heading to be transcluded                       // 172
// You must provide the property on the accordion-group controller that will hold the transcluded element             // 173
// <div class="accordion-group">                                                                                      // 174
//   <div class="accordion-heading" ><a ... accordion-transclude="heading">...</a></div>                              // 175
//   ...                                                                                                              // 176
// </div>                                                                                                             // 177
.directive('accordionTransclude', function() {                                                                        // 178
  return {                                                                                                            // 179
    require: '^accordionGroup',                                                                                       // 180
    link: function(scope, element, attr, controller) {                                                                // 181
      scope.$watch(function() { return controller[attr.accordionTransclude]; }, function(heading) {                   // 182
        if ( heading ) {                                                                                              // 183
          element.html('');                                                                                           // 184
          element.append(heading);                                                                                    // 185
        }                                                                                                             // 186
      });                                                                                                             // 187
    }                                                                                                                 // 188
  };                                                                                                                  // 189
})                                                                                                                    // 190
                                                                                                                      // 191
;                                                                                                                     // 192
                                                                                                                      // 193
angular.module('ui.bootstrap.alert', [])                                                                              // 194
                                                                                                                      // 195
.controller('AlertController', ['$scope', '$attrs', function ($scope, $attrs) {                                       // 196
  $scope.closeable = 'close' in $attrs;                                                                               // 197
  this.close = $scope.close;                                                                                          // 198
}])                                                                                                                   // 199
                                                                                                                      // 200
.directive('alert', function () {                                                                                     // 201
  return {                                                                                                            // 202
    restrict:'EA',                                                                                                    // 203
    controller:'AlertController',                                                                                     // 204
    templateUrl:'template/alert/alert.html',                                                                          // 205
    transclude:true,                                                                                                  // 206
    replace:true,                                                                                                     // 207
    scope: {                                                                                                          // 208
      type: '@',                                                                                                      // 209
      close: '&'                                                                                                      // 210
    }                                                                                                                 // 211
  };                                                                                                                  // 212
})                                                                                                                    // 213
                                                                                                                      // 214
.directive('dismissOnTimeout', ['$timeout', function($timeout) {                                                      // 215
  return {                                                                                                            // 216
    require: 'alert',                                                                                                 // 217
    link: function(scope, element, attrs, alertCtrl) {                                                                // 218
      $timeout(function(){                                                                                            // 219
        alertCtrl.close();                                                                                            // 220
      }, parseInt(attrs.dismissOnTimeout, 10));                                                                       // 221
    }                                                                                                                 // 222
  };                                                                                                                  // 223
}]);                                                                                                                  // 224
                                                                                                                      // 225
angular.module('ui.bootstrap.bindHtml', [])                                                                           // 226
                                                                                                                      // 227
  .directive('bindHtmlUnsafe', function () {                                                                          // 228
    return function (scope, element, attr) {                                                                          // 229
      element.addClass('ng-binding').data('$binding', attr.bindHtmlUnsafe);                                           // 230
      scope.$watch(attr.bindHtmlUnsafe, function bindHtmlUnsafeWatchAction(value) {                                   // 231
        element.html(value || '');                                                                                    // 232
      });                                                                                                             // 233
    };                                                                                                                // 234
  });                                                                                                                 // 235
angular.module('ui.bootstrap.buttons', [])                                                                            // 236
                                                                                                                      // 237
.constant('buttonConfig', {                                                                                           // 238
  activeClass: 'active',                                                                                              // 239
  toggleEvent: 'click'                                                                                                // 240
})                                                                                                                    // 241
                                                                                                                      // 242
.controller('ButtonsController', ['buttonConfig', function(buttonConfig) {                                            // 243
  this.activeClass = buttonConfig.activeClass || 'active';                                                            // 244
  this.toggleEvent = buttonConfig.toggleEvent || 'click';                                                             // 245
}])                                                                                                                   // 246
                                                                                                                      // 247
.directive('btnRadio', function () {                                                                                  // 248
  return {                                                                                                            // 249
    require: ['btnRadio', 'ngModel'],                                                                                 // 250
    controller: 'ButtonsController',                                                                                  // 251
    link: function (scope, element, attrs, ctrls) {                                                                   // 252
      var buttonsCtrl = ctrls[0], ngModelCtrl = ctrls[1];                                                             // 253
                                                                                                                      // 254
      //model -> UI                                                                                                   // 255
      ngModelCtrl.$render = function () {                                                                             // 256
        element.toggleClass(buttonsCtrl.activeClass, angular.equals(ngModelCtrl.$modelValue, scope.$eval(attrs.btnRadio)));
      };                                                                                                              // 258
                                                                                                                      // 259
      //ui->model                                                                                                     // 260
      element.bind(buttonsCtrl.toggleEvent, function () {                                                             // 261
        var isActive = element.hasClass(buttonsCtrl.activeClass);                                                     // 262
                                                                                                                      // 263
        if (!isActive || angular.isDefined(attrs.uncheckable)) {                                                      // 264
          scope.$apply(function () {                                                                                  // 265
            ngModelCtrl.$setViewValue(isActive ? null : scope.$eval(attrs.btnRadio));                                 // 266
            ngModelCtrl.$render();                                                                                    // 267
          });                                                                                                         // 268
        }                                                                                                             // 269
      });                                                                                                             // 270
    }                                                                                                                 // 271
  };                                                                                                                  // 272
})                                                                                                                    // 273
                                                                                                                      // 274
.directive('btnCheckbox', function () {                                                                               // 275
  return {                                                                                                            // 276
    require: ['btnCheckbox', 'ngModel'],                                                                              // 277
    controller: 'ButtonsController',                                                                                  // 278
    link: function (scope, element, attrs, ctrls) {                                                                   // 279
      var buttonsCtrl = ctrls[0], ngModelCtrl = ctrls[1];                                                             // 280
                                                                                                                      // 281
      function getTrueValue() {                                                                                       // 282
        return getCheckboxValue(attrs.btnCheckboxTrue, true);                                                         // 283
      }                                                                                                               // 284
                                                                                                                      // 285
      function getFalseValue() {                                                                                      // 286
        return getCheckboxValue(attrs.btnCheckboxFalse, false);                                                       // 287
      }                                                                                                               // 288
                                                                                                                      // 289
      function getCheckboxValue(attributeValue, defaultValue) {                                                       // 290
        var val = scope.$eval(attributeValue);                                                                        // 291
        return angular.isDefined(val) ? val : defaultValue;                                                           // 292
      }                                                                                                               // 293
                                                                                                                      // 294
      //model -> UI                                                                                                   // 295
      ngModelCtrl.$render = function () {                                                                             // 296
        element.toggleClass(buttonsCtrl.activeClass, angular.equals(ngModelCtrl.$modelValue, getTrueValue()));        // 297
      };                                                                                                              // 298
                                                                                                                      // 299
      //ui->model                                                                                                     // 300
      element.bind(buttonsCtrl.toggleEvent, function () {                                                             // 301
        scope.$apply(function () {                                                                                    // 302
          ngModelCtrl.$setViewValue(element.hasClass(buttonsCtrl.activeClass) ? getFalseValue() : getTrueValue());    // 303
          ngModelCtrl.$render();                                                                                      // 304
        });                                                                                                           // 305
      });                                                                                                             // 306
    }                                                                                                                 // 307
  };                                                                                                                  // 308
});                                                                                                                   // 309
                                                                                                                      // 310
/**                                                                                                                   // 311
* @ngdoc overview                                                                                                     // 312
* @name ui.bootstrap.carousel                                                                                         // 313
*                                                                                                                     // 314
* @description                                                                                                        // 315
* AngularJS version of an image carousel.                                                                             // 316
*                                                                                                                     // 317
*/                                                                                                                    // 318
angular.module('ui.bootstrap.carousel', [])                                                                           // 319
.controller('CarouselController', ['$scope', '$interval', '$animate', function ($scope, $interval, $animate) {        // 320
  var self = this,                                                                                                    // 321
    slides = self.slides = $scope.slides = [],                                                                        // 322
    currentIndex = -1,                                                                                                // 323
    currentInterval, isPlaying;                                                                                       // 324
  self.currentSlide = null;                                                                                           // 325
                                                                                                                      // 326
  var destroyed = false;                                                                                              // 327
  /* direction: "prev" or "next" */                                                                                   // 328
  self.select = $scope.select = function(nextSlide, direction) {                                                      // 329
    var nextIndex = self.indexOfSlide(nextSlide);                                                                     // 330
    //Decide direction if it's not given                                                                              // 331
    if (direction === undefined) {                                                                                    // 332
      direction = nextIndex > self.getCurrentIndex() ? 'next' : 'prev';                                               // 333
    }                                                                                                                 // 334
    if (nextSlide && nextSlide !== self.currentSlide) {                                                               // 335
      goNext();                                                                                                       // 336
    }                                                                                                                 // 337
    function goNext() {                                                                                               // 338
      // Scope has been destroyed, stop here.                                                                         // 339
      if (destroyed) { return; }                                                                                      // 340
                                                                                                                      // 341
      angular.extend(nextSlide, {direction: direction, active: true});                                                // 342
      angular.extend(self.currentSlide || {}, {direction: direction, active: false});                                 // 343
      if ($animate.enabled() && !$scope.noTransition && nextSlide.$element) {                                         // 344
        $scope.$currentTransition = true;                                                                             // 345
        nextSlide.$element.one('$animate:close', function closeFn() {                                                 // 346
          $scope.$currentTransition = null;                                                                           // 347
        });                                                                                                           // 348
      }                                                                                                               // 349
                                                                                                                      // 350
      self.currentSlide = nextSlide;                                                                                  // 351
      currentIndex = nextIndex;                                                                                       // 352
      //every time you change slides, reset the timer                                                                 // 353
      restartTimer();                                                                                                 // 354
    }                                                                                                                 // 355
  };                                                                                                                  // 356
  $scope.$on('$destroy', function () {                                                                                // 357
    destroyed = true;                                                                                                 // 358
  });                                                                                                                 // 359
                                                                                                                      // 360
  function getSlideByIndex(index) {                                                                                   // 361
    if (angular.isUndefined(slides[index].index)) {                                                                   // 362
      return slides[index];                                                                                           // 363
    }                                                                                                                 // 364
    var i, len = slides.length;                                                                                       // 365
    for (i = 0; i < slides.length; ++i) {                                                                             // 366
      if (slides[i].index == index) {                                                                                 // 367
        return slides[i];                                                                                             // 368
      }                                                                                                               // 369
    }                                                                                                                 // 370
  }                                                                                                                   // 371
                                                                                                                      // 372
  self.getCurrentIndex = function() {                                                                                 // 373
    if (self.currentSlide && angular.isDefined(self.currentSlide.index)) {                                            // 374
      return +self.currentSlide.index;                                                                                // 375
    }                                                                                                                 // 376
    return currentIndex;                                                                                              // 377
  };                                                                                                                  // 378
                                                                                                                      // 379
  /* Allow outside people to call indexOf on slides array */                                                          // 380
  self.indexOfSlide = function(slide) {                                                                               // 381
    return angular.isDefined(slide.index) ? +slide.index : slides.indexOf(slide);                                     // 382
  };                                                                                                                  // 383
                                                                                                                      // 384
  $scope.next = function() {                                                                                          // 385
    var newIndex = (self.getCurrentIndex() + 1) % slides.length;                                                      // 386
                                                                                                                      // 387
    //Prevent this user-triggered transition from occurring if there is already one in progress                       // 388
    if (!$scope.$currentTransition) {                                                                                 // 389
      return self.select(getSlideByIndex(newIndex), 'next');                                                          // 390
    }                                                                                                                 // 391
  };                                                                                                                  // 392
                                                                                                                      // 393
  $scope.prev = function() {                                                                                          // 394
    var newIndex = self.getCurrentIndex() - 1 < 0 ? slides.length - 1 : self.getCurrentIndex() - 1;                   // 395
                                                                                                                      // 396
    //Prevent this user-triggered transition from occurring if there is already one in progress                       // 397
    if (!$scope.$currentTransition) {                                                                                 // 398
      return self.select(getSlideByIndex(newIndex), 'prev');                                                          // 399
    }                                                                                                                 // 400
  };                                                                                                                  // 401
                                                                                                                      // 402
  $scope.isActive = function(slide) {                                                                                 // 403
     return self.currentSlide === slide;                                                                              // 404
  };                                                                                                                  // 405
                                                                                                                      // 406
  $scope.$watch('interval', restartTimer);                                                                            // 407
  $scope.$on('$destroy', resetTimer);                                                                                 // 408
                                                                                                                      // 409
  function restartTimer() {                                                                                           // 410
    resetTimer();                                                                                                     // 411
    var interval = +$scope.interval;                                                                                  // 412
    if (!isNaN(interval) && interval > 0) {                                                                           // 413
      currentInterval = $interval(timerFn, interval);                                                                 // 414
    }                                                                                                                 // 415
  }                                                                                                                   // 416
                                                                                                                      // 417
  function resetTimer() {                                                                                             // 418
    if (currentInterval) {                                                                                            // 419
      $interval.cancel(currentInterval);                                                                              // 420
      currentInterval = null;                                                                                         // 421
    }                                                                                                                 // 422
  }                                                                                                                   // 423
                                                                                                                      // 424
  function timerFn() {                                                                                                // 425
    var interval = +$scope.interval;                                                                                  // 426
    if (isPlaying && !isNaN(interval) && interval > 0) {                                                              // 427
      $scope.next();                                                                                                  // 428
    } else {                                                                                                          // 429
      $scope.pause();                                                                                                 // 430
    }                                                                                                                 // 431
  }                                                                                                                   // 432
                                                                                                                      // 433
  $scope.play = function() {                                                                                          // 434
    if (!isPlaying) {                                                                                                 // 435
      isPlaying = true;                                                                                               // 436
      restartTimer();                                                                                                 // 437
    }                                                                                                                 // 438
  };                                                                                                                  // 439
  $scope.pause = function() {                                                                                         // 440
    if (!$scope.noPause) {                                                                                            // 441
      isPlaying = false;                                                                                              // 442
      resetTimer();                                                                                                   // 443
    }                                                                                                                 // 444
  };                                                                                                                  // 445
                                                                                                                      // 446
  self.addSlide = function(slide, element) {                                                                          // 447
    slide.$element = element;                                                                                         // 448
    slides.push(slide);                                                                                               // 449
    //if this is the first slide or the slide is set to active, select it                                             // 450
    if(slides.length === 1 || slide.active) {                                                                         // 451
      self.select(slides[slides.length-1]);                                                                           // 452
      if (slides.length == 1) {                                                                                       // 453
        $scope.play();                                                                                                // 454
      }                                                                                                               // 455
    } else {                                                                                                          // 456
      slide.active = false;                                                                                           // 457
    }                                                                                                                 // 458
  };                                                                                                                  // 459
                                                                                                                      // 460
  self.removeSlide = function(slide) {                                                                                // 461
    if (angular.isDefined(slide.index)) {                                                                             // 462
      slides.sort(function(a, b) {                                                                                    // 463
        return +a.index > +b.index;                                                                                   // 464
      });                                                                                                             // 465
    }                                                                                                                 // 466
    //get the index of the slide inside the carousel                                                                  // 467
    var index = slides.indexOf(slide);                                                                                // 468
    slides.splice(index, 1);                                                                                          // 469
    if (slides.length > 0 && slide.active) {                                                                          // 470
      if (index >= slides.length) {                                                                                   // 471
        self.select(slides[index-1]);                                                                                 // 472
      } else {                                                                                                        // 473
        self.select(slides[index]);                                                                                   // 474
      }                                                                                                               // 475
    } else if (currentIndex > index) {                                                                                // 476
      currentIndex--;                                                                                                 // 477
    }                                                                                                                 // 478
  };                                                                                                                  // 479
                                                                                                                      // 480
}])                                                                                                                   // 481
                                                                                                                      // 482
/**                                                                                                                   // 483
 * @ngdoc directive                                                                                                   // 484
 * @name ui.bootstrap.carousel.directive:carousel                                                                     // 485
 * @restrict EA                                                                                                       // 486
 *                                                                                                                    // 487
 * @description                                                                                                       // 488
 * Carousel is the outer container for a set of image 'slides' to showcase.                                           // 489
 *                                                                                                                    // 490
 * @param {number=} interval The time, in milliseconds, that it will take the carousel to go to the next slide.       // 491
 * @param {boolean=} noTransition Whether to disable transitions on the carousel.                                     // 492
 * @param {boolean=} noPause Whether to disable pausing on the carousel (by default, the carousel interval pauses on hover).
 *                                                                                                                    // 494
 * @example                                                                                                           // 495
<example module="ui.bootstrap">                                                                                       // 496
  <file name="index.html">                                                                                            // 497
    <carousel>                                                                                                        // 498
      <slide>                                                                                                         // 499
        <img src="http://placekitten.com/150/150" style="margin:auto;">                                               // 500
        <div class="carousel-caption">                                                                                // 501
          <p>Beautiful!</p>                                                                                           // 502
        </div>                                                                                                        // 503
      </slide>                                                                                                        // 504
      <slide>                                                                                                         // 505
        <img src="http://placekitten.com/100/150" style="margin:auto;">                                               // 506
        <div class="carousel-caption">                                                                                // 507
          <p>D'aww!</p>                                                                                               // 508
        </div>                                                                                                        // 509
      </slide>                                                                                                        // 510
    </carousel>                                                                                                       // 511
  </file>                                                                                                             // 512
  <file name="demo.css">                                                                                              // 513
    .carousel-indicators {                                                                                            // 514
      top: auto;                                                                                                      // 515
      bottom: 15px;                                                                                                   // 516
    }                                                                                                                 // 517
  </file>                                                                                                             // 518
</example>                                                                                                            // 519
 */                                                                                                                   // 520
.directive('carousel', [function() {                                                                                  // 521
  return {                                                                                                            // 522
    restrict: 'EA',                                                                                                   // 523
    transclude: true,                                                                                                 // 524
    replace: true,                                                                                                    // 525
    controller: 'CarouselController',                                                                                 // 526
    require: 'carousel',                                                                                              // 527
    templateUrl: 'template/carousel/carousel.html',                                                                   // 528
    scope: {                                                                                                          // 529
      interval: '=',                                                                                                  // 530
      noTransition: '=',                                                                                              // 531
      noPause: '='                                                                                                    // 532
    }                                                                                                                 // 533
  };                                                                                                                  // 534
}])                                                                                                                   // 535
                                                                                                                      // 536
/**                                                                                                                   // 537
 * @ngdoc directive                                                                                                   // 538
 * @name ui.bootstrap.carousel.directive:slide                                                                        // 539
 * @restrict EA                                                                                                       // 540
 *                                                                                                                    // 541
 * @description                                                                                                       // 542
 * Creates a slide inside a {@link ui.bootstrap.carousel.directive:carousel carousel}.  Must be placed as a child of a carousel element.
 *                                                                                                                    // 544
 * @param {boolean=} active Model binding, whether or not this slide is currently active.                             // 545
 * @param {number=} index The index of the slide. The slides will be sorted by this parameter.                        // 546
 *                                                                                                                    // 547
 * @example                                                                                                           // 548
<example module="ui.bootstrap">                                                                                       // 549
  <file name="index.html">                                                                                            // 550
<div ng-controller="CarouselDemoCtrl">                                                                                // 551
  <carousel>                                                                                                          // 552
    <slide ng-repeat="slide in slides" active="slide.active" index="$index">                                          // 553
      <img ng-src="{{slide.image}}" style="margin:auto;">                                                             // 554
      <div class="carousel-caption">                                                                                  // 555
        <h4>Slide {{$index}}</h4>                                                                                     // 556
        <p>{{slide.text}}</p>                                                                                         // 557
      </div>                                                                                                          // 558
    </slide>                                                                                                          // 559
  </carousel>                                                                                                         // 560
  Interval, in milliseconds: <input type="number" ng-model="myInterval">                                              // 561
  <br />Enter a negative number to stop the interval.                                                                 // 562
</div>                                                                                                                // 563
  </file>                                                                                                             // 564
  <file name="script.js">                                                                                             // 565
function CarouselDemoCtrl($scope) {                                                                                   // 566
  $scope.myInterval = 5000;                                                                                           // 567
}                                                                                                                     // 568
  </file>                                                                                                             // 569
  <file name="demo.css">                                                                                              // 570
    .carousel-indicators {                                                                                            // 571
      top: auto;                                                                                                      // 572
      bottom: 15px;                                                                                                   // 573
    }                                                                                                                 // 574
  </file>                                                                                                             // 575
</example>                                                                                                            // 576
*/                                                                                                                    // 577
                                                                                                                      // 578
.directive('slide', function() {                                                                                      // 579
  return {                                                                                                            // 580
    require: '^carousel',                                                                                             // 581
    restrict: 'EA',                                                                                                   // 582
    transclude: true,                                                                                                 // 583
    replace: true,                                                                                                    // 584
    templateUrl: 'template/carousel/slide.html',                                                                      // 585
    scope: {                                                                                                          // 586
      active: '=?',                                                                                                   // 587
      index: '=?'                                                                                                     // 588
    },                                                                                                                // 589
    link: function (scope, element, attrs, carouselCtrl) {                                                            // 590
      carouselCtrl.addSlide(scope, element);                                                                          // 591
      //when the scope is destroyed then remove the slide from the current slides array                               // 592
      scope.$on('$destroy', function() {                                                                              // 593
        carouselCtrl.removeSlide(scope);                                                                              // 594
      });                                                                                                             // 595
                                                                                                                      // 596
      scope.$watch('active', function(active) {                                                                       // 597
        if (active) {                                                                                                 // 598
          carouselCtrl.select(scope);                                                                                 // 599
        }                                                                                                             // 600
      });                                                                                                             // 601
    }                                                                                                                 // 602
  };                                                                                                                  // 603
})                                                                                                                    // 604
                                                                                                                      // 605
.animation('.item', [                                                                                                 // 606
         '$animate',                                                                                                  // 607
function ($animate) {                                                                                                 // 608
  return {                                                                                                            // 609
    beforeAddClass: function (element, className, done) {                                                             // 610
      // Due to transclusion, noTransition property is on parent's scope                                              // 611
      if (className == 'active' && element.parent() &&                                                                // 612
          !element.parent().scope().noTransition) {                                                                   // 613
        var stopped = false;                                                                                          // 614
        var direction = element.isolateScope().direction;                                                             // 615
        var directionClass = direction == 'next' ? 'left' : 'right';                                                  // 616
        element.addClass(direction);                                                                                  // 617
        $animate.addClass(element, directionClass).then(function () {                                                 // 618
          if (!stopped) {                                                                                             // 619
            element.removeClass(directionClass + ' ' + direction);                                                    // 620
          }                                                                                                           // 621
          done();                                                                                                     // 622
        });                                                                                                           // 623
                                                                                                                      // 624
        return function () {                                                                                          // 625
          stopped = true;                                                                                             // 626
        };                                                                                                            // 627
      }                                                                                                               // 628
      done();                                                                                                         // 629
    },                                                                                                                // 630
    beforeRemoveClass: function (element, className, done) {                                                          // 631
      // Due to transclusion, noTransition property is on parent's scope                                              // 632
      if (className == 'active' && element.parent() &&                                                                // 633
          !element.parent().scope().noTransition) {                                                                   // 634
        var stopped = false;                                                                                          // 635
        var direction = element.isolateScope().direction;                                                             // 636
        var directionClass = direction == 'next' ? 'left' : 'right';                                                  // 637
        $animate.addClass(element, directionClass).then(function () {                                                 // 638
          if (!stopped) {                                                                                             // 639
            element.removeClass(directionClass);                                                                      // 640
          }                                                                                                           // 641
          done();                                                                                                     // 642
        });                                                                                                           // 643
        return function () {                                                                                          // 644
          stopped = true;                                                                                             // 645
        };                                                                                                            // 646
      }                                                                                                               // 647
      done();                                                                                                         // 648
    }                                                                                                                 // 649
  };                                                                                                                  // 650
                                                                                                                      // 651
}])                                                                                                                   // 652
                                                                                                                      // 653
                                                                                                                      // 654
;                                                                                                                     // 655
                                                                                                                      // 656
angular.module('ui.bootstrap.dateparser', [])                                                                         // 657
                                                                                                                      // 658
.service('dateParser', ['$locale', 'orderByFilter', function($locale, orderByFilter) {                                // 659
  // Pulled from https://github.com/mbostock/d3/blob/master/src/format/requote.js                                     // 660
  var SPECIAL_CHARACTERS_REGEXP = /[\\\^\$\*\+\?\|\[\]\(\)\.\{\}]/g;                                                  // 661
                                                                                                                      // 662
  this.parsers = {};                                                                                                  // 663
                                                                                                                      // 664
  var formatCodeToRegex = {                                                                                           // 665
    'yyyy': {                                                                                                         // 666
      regex: '\\d{4}',                                                                                                // 667
      apply: function(value) { this.year = +value; }                                                                  // 668
    },                                                                                                                // 669
    'yy': {                                                                                                           // 670
      regex: '\\d{2}',                                                                                                // 671
      apply: function(value) { this.year = +value + 2000; }                                                           // 672
    },                                                                                                                // 673
    'y': {                                                                                                            // 674
      regex: '\\d{1,4}',                                                                                              // 675
      apply: function(value) { this.year = +value; }                                                                  // 676
    },                                                                                                                // 677
    'MMMM': {                                                                                                         // 678
      regex: $locale.DATETIME_FORMATS.MONTH.join('|'),                                                                // 679
      apply: function(value) { this.month = $locale.DATETIME_FORMATS.MONTH.indexOf(value); }                          // 680
    },                                                                                                                // 681
    'MMM': {                                                                                                          // 682
      regex: $locale.DATETIME_FORMATS.SHORTMONTH.join('|'),                                                           // 683
      apply: function(value) { this.month = $locale.DATETIME_FORMATS.SHORTMONTH.indexOf(value); }                     // 684
    },                                                                                                                // 685
    'MM': {                                                                                                           // 686
      regex: '0[1-9]|1[0-2]',                                                                                         // 687
      apply: function(value) { this.month = value - 1; }                                                              // 688
    },                                                                                                                // 689
    'M': {                                                                                                            // 690
      regex: '[1-9]|1[0-2]',                                                                                          // 691
      apply: function(value) { this.month = value - 1; }                                                              // 692
    },                                                                                                                // 693
    'dd': {                                                                                                           // 694
      regex: '[0-2][0-9]{1}|3[0-1]{1}',                                                                               // 695
      apply: function(value) { this.date = +value; }                                                                  // 696
    },                                                                                                                // 697
    'd': {                                                                                                            // 698
      regex: '[1-2]?[0-9]{1}|3[0-1]{1}',                                                                              // 699
      apply: function(value) { this.date = +value; }                                                                  // 700
    },                                                                                                                // 701
    'EEEE': {                                                                                                         // 702
      regex: $locale.DATETIME_FORMATS.DAY.join('|')                                                                   // 703
    },                                                                                                                // 704
    'EEE': {                                                                                                          // 705
      regex: $locale.DATETIME_FORMATS.SHORTDAY.join('|')                                                              // 706
    },                                                                                                                // 707
    'HH': {                                                                                                           // 708
      regex: '(?:0|1)[0-9]|2[0-3]',                                                                                   // 709
      apply: function(value) { this.hours = +value; }                                                                 // 710
    },                                                                                                                // 711
    'H': {                                                                                                            // 712
      regex: '1?[0-9]|2[0-3]',                                                                                        // 713
      apply: function(value) { this.hours = +value; }                                                                 // 714
    },                                                                                                                // 715
    'mm': {                                                                                                           // 716
      regex: '[0-5][0-9]',                                                                                            // 717
      apply: function(value) { this.minutes = +value; }                                                               // 718
    },                                                                                                                // 719
    'm': {                                                                                                            // 720
      regex: '[0-9]|[1-5][0-9]',                                                                                      // 721
      apply: function(value) { this.minutes = +value; }                                                               // 722
    },                                                                                                                // 723
    'sss': {                                                                                                          // 724
      regex: '[0-9][0-9][0-9]',                                                                                       // 725
      apply: function(value) { this.milliseconds = +value; }                                                          // 726
    },                                                                                                                // 727
    'ss': {                                                                                                           // 728
      regex: '[0-5][0-9]',                                                                                            // 729
      apply: function(value) { this.seconds = +value; }                                                               // 730
    },                                                                                                                // 731
    's': {                                                                                                            // 732
      regex: '[0-9]|[1-5][0-9]',                                                                                      // 733
      apply: function(value) { this.seconds = +value; }                                                               // 734
    }                                                                                                                 // 735
  };                                                                                                                  // 736
                                                                                                                      // 737
  function createParser(format) {                                                                                     // 738
    var map = [], regex = format.split('');                                                                           // 739
                                                                                                                      // 740
    angular.forEach(formatCodeToRegex, function(data, code) {                                                         // 741
      var index = format.indexOf(code);                                                                               // 742
                                                                                                                      // 743
      if (index > -1) {                                                                                               // 744
        format = format.split('');                                                                                    // 745
                                                                                                                      // 746
        regex[index] = '(' + data.regex + ')';                                                                        // 747
        format[index] = '$'; // Custom symbol to define consumed part of format                                       // 748
        for (var i = index + 1, n = index + code.length; i < n; i++) {                                                // 749
          regex[i] = '';                                                                                              // 750
          format[i] = '$';                                                                                            // 751
        }                                                                                                             // 752
        format = format.join('');                                                                                     // 753
                                                                                                                      // 754
        map.push({ index: index, apply: data.apply });                                                                // 755
      }                                                                                                               // 756
    });                                                                                                               // 757
                                                                                                                      // 758
    return {                                                                                                          // 759
      regex: new RegExp('^' + regex.join('') + '$'),                                                                  // 760
      map: orderByFilter(map, 'index')                                                                                // 761
    };                                                                                                                // 762
  }                                                                                                                   // 763
                                                                                                                      // 764
  this.parse = function(input, format, baseDate) {                                                                    // 765
    if ( !angular.isString(input) || !format ) {                                                                      // 766
      return input;                                                                                                   // 767
    }                                                                                                                 // 768
                                                                                                                      // 769
    format = $locale.DATETIME_FORMATS[format] || format;                                                              // 770
    format = format.replace(SPECIAL_CHARACTERS_REGEXP, '\\$&');                                                       // 771
                                                                                                                      // 772
    if ( !this.parsers[format] ) {                                                                                    // 773
      this.parsers[format] = createParser(format);                                                                    // 774
    }                                                                                                                 // 775
                                                                                                                      // 776
    var parser = this.parsers[format],                                                                                // 777
        regex = parser.regex,                                                                                         // 778
        map = parser.map,                                                                                             // 779
        results = input.match(regex);                                                                                 // 780
                                                                                                                      // 781
    if ( results && results.length ) {                                                                                // 782
      var fields, dt;                                                                                                 // 783
      if (baseDate) {                                                                                                 // 784
        fields = {                                                                                                    // 785
          year: baseDate.getFullYear(),                                                                               // 786
          month: baseDate.getMonth(),                                                                                 // 787
          date: baseDate.getDate(),                                                                                   // 788
          hours: baseDate.getHours(),                                                                                 // 789
          minutes: baseDate.getMinutes(),                                                                             // 790
          seconds: baseDate.getSeconds(),                                                                             // 791
          milliseconds: baseDate.getMilliseconds()                                                                    // 792
        };                                                                                                            // 793
      } else {                                                                                                        // 794
        fields = { year: 1900, month: 0, date: 1, hours: 0, minutes: 0, seconds: 0, milliseconds: 0 };                // 795
      }                                                                                                               // 796
                                                                                                                      // 797
      for( var i = 1, n = results.length; i < n; i++ ) {                                                              // 798
        var mapper = map[i-1];                                                                                        // 799
        if ( mapper.apply ) {                                                                                         // 800
          mapper.apply.call(fields, results[i]);                                                                      // 801
        }                                                                                                             // 802
      }                                                                                                               // 803
                                                                                                                      // 804
      if ( isValid(fields.year, fields.month, fields.date) ) {                                                        // 805
        dt = new Date(fields.year, fields.month, fields.date, fields.hours, fields.minutes, fields.seconds,           // 806
          fields.milliseconds || 0);                                                                                  // 807
      }                                                                                                               // 808
                                                                                                                      // 809
      return dt;                                                                                                      // 810
    }                                                                                                                 // 811
  };                                                                                                                  // 812
                                                                                                                      // 813
  // Check if date is valid for specific month (and year for February).                                               // 814
  // Month: 0 = Jan, 1 = Feb, etc                                                                                     // 815
  function isValid(year, month, date) {                                                                               // 816
    if (date < 1) {                                                                                                   // 817
      return false;                                                                                                   // 818
    }                                                                                                                 // 819
                                                                                                                      // 820
    if ( month === 1 && date > 28) {                                                                                  // 821
        return date === 29 && ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0);                             // 822
    }                                                                                                                 // 823
                                                                                                                      // 824
    if ( month === 3 || month === 5 || month === 8 || month === 10) {                                                 // 825
        return date < 31;                                                                                             // 826
    }                                                                                                                 // 827
                                                                                                                      // 828
    return true;                                                                                                      // 829
  }                                                                                                                   // 830
}]);                                                                                                                  // 831
                                                                                                                      // 832
angular.module('ui.bootstrap.position', [])                                                                           // 833
                                                                                                                      // 834
/**                                                                                                                   // 835
 * A set of utility methods that can be use to retrieve position of DOM elements.                                     // 836
 * It is meant to be used where we need to absolute-position DOM elements in                                          // 837
 * relation to other, existing elements (this is the case for tooltips, popovers,                                     // 838
 * typeahead suggestions etc.).                                                                                       // 839
 */                                                                                                                   // 840
  .factory('$position', ['$document', '$window', function ($document, $window) {                                      // 841
                                                                                                                      // 842
    function getStyle(el, cssprop) {                                                                                  // 843
      if (el.currentStyle) { //IE                                                                                     // 844
        return el.currentStyle[cssprop];                                                                              // 845
      } else if ($window.getComputedStyle) {                                                                          // 846
        return $window.getComputedStyle(el)[cssprop];                                                                 // 847
      }                                                                                                               // 848
      // finally try and get inline style                                                                             // 849
      return el.style[cssprop];                                                                                       // 850
    }                                                                                                                 // 851
                                                                                                                      // 852
    /**                                                                                                               // 853
     * Checks if a given element is statically positioned                                                             // 854
     * @param element - raw DOM element                                                                               // 855
     */                                                                                                               // 856
    function isStaticPositioned(element) {                                                                            // 857
      return (getStyle(element, 'position') || 'static' ) === 'static';                                               // 858
    }                                                                                                                 // 859
                                                                                                                      // 860
    /**                                                                                                               // 861
     * returns the closest, non-statically positioned parentOffset of a given element                                 // 862
     * @param element                                                                                                 // 863
     */                                                                                                               // 864
    var parentOffsetEl = function (element) {                                                                         // 865
      var docDomEl = $document[0];                                                                                    // 866
      var offsetParent = element.offsetParent || docDomEl;                                                            // 867
      while (offsetParent && offsetParent !== docDomEl && isStaticPositioned(offsetParent) ) {                        // 868
        offsetParent = offsetParent.offsetParent;                                                                     // 869
      }                                                                                                               // 870
      return offsetParent || docDomEl;                                                                                // 871
    };                                                                                                                // 872
                                                                                                                      // 873
    return {                                                                                                          // 874
      /**                                                                                                             // 875
       * Provides read-only equivalent of jQuery's position function:                                                 // 876
       * http://api.jquery.com/position/                                                                              // 877
       */                                                                                                             // 878
      position: function (element) {                                                                                  // 879
        var elBCR = this.offset(element);                                                                             // 880
        var offsetParentBCR = { top: 0, left: 0 };                                                                    // 881
        var offsetParentEl = parentOffsetEl(element[0]);                                                              // 882
        if (offsetParentEl != $document[0]) {                                                                         // 883
          offsetParentBCR = this.offset(angular.element(offsetParentEl));                                             // 884
          offsetParentBCR.top += offsetParentEl.clientTop - offsetParentEl.scrollTop;                                 // 885
          offsetParentBCR.left += offsetParentEl.clientLeft - offsetParentEl.scrollLeft;                              // 886
        }                                                                                                             // 887
                                                                                                                      // 888
        var boundingClientRect = element[0].getBoundingClientRect();                                                  // 889
        return {                                                                                                      // 890
          width: boundingClientRect.width || element.prop('offsetWidth'),                                             // 891
          height: boundingClientRect.height || element.prop('offsetHeight'),                                          // 892
          top: elBCR.top - offsetParentBCR.top,                                                                       // 893
          left: elBCR.left - offsetParentBCR.left                                                                     // 894
        };                                                                                                            // 895
      },                                                                                                              // 896
                                                                                                                      // 897
      /**                                                                                                             // 898
       * Provides read-only equivalent of jQuery's offset function:                                                   // 899
       * http://api.jquery.com/offset/                                                                                // 900
       */                                                                                                             // 901
      offset: function (element) {                                                                                    // 902
        var boundingClientRect = element[0].getBoundingClientRect();                                                  // 903
        return {                                                                                                      // 904
          width: boundingClientRect.width || element.prop('offsetWidth'),                                             // 905
          height: boundingClientRect.height || element.prop('offsetHeight'),                                          // 906
          top: boundingClientRect.top + ($window.pageYOffset || $document[0].documentElement.scrollTop),              // 907
          left: boundingClientRect.left + ($window.pageXOffset || $document[0].documentElement.scrollLeft)            // 908
        };                                                                                                            // 909
      },                                                                                                              // 910
                                                                                                                      // 911
      /**                                                                                                             // 912
       * Provides coordinates for the targetEl in relation to hostEl                                                  // 913
       */                                                                                                             // 914
      positionElements: function (hostEl, targetEl, positionStr, appendToBody) {                                      // 915
                                                                                                                      // 916
        var positionStrParts = positionStr.split('-');                                                                // 917
        var pos0 = positionStrParts[0], pos1 = positionStrParts[1] || 'center';                                       // 918
                                                                                                                      // 919
        var hostElPos,                                                                                                // 920
          targetElWidth,                                                                                              // 921
          targetElHeight,                                                                                             // 922
          targetElPos;                                                                                                // 923
                                                                                                                      // 924
        hostElPos = appendToBody ? this.offset(hostEl) : this.position(hostEl);                                       // 925
                                                                                                                      // 926
        targetElWidth = targetEl.prop('offsetWidth');                                                                 // 927
        targetElHeight = targetEl.prop('offsetHeight');                                                               // 928
                                                                                                                      // 929
        var shiftWidth = {                                                                                            // 930
          center: function () {                                                                                       // 931
            return hostElPos.left + hostElPos.width / 2 - targetElWidth / 2;                                          // 932
          },                                                                                                          // 933
          left: function () {                                                                                         // 934
            return hostElPos.left;                                                                                    // 935
          },                                                                                                          // 936
          right: function () {                                                                                        // 937
            return hostElPos.left + hostElPos.width;                                                                  // 938
          }                                                                                                           // 939
        };                                                                                                            // 940
                                                                                                                      // 941
        var shiftHeight = {                                                                                           // 942
          center: function () {                                                                                       // 943
            return hostElPos.top + hostElPos.height / 2 - targetElHeight / 2;                                         // 944
          },                                                                                                          // 945
          top: function () {                                                                                          // 946
            return hostElPos.top;                                                                                     // 947
          },                                                                                                          // 948
          bottom: function () {                                                                                       // 949
            return hostElPos.top + hostElPos.height;                                                                  // 950
          }                                                                                                           // 951
        };                                                                                                            // 952
                                                                                                                      // 953
        switch (pos0) {                                                                                               // 954
          case 'right':                                                                                               // 955
            targetElPos = {                                                                                           // 956
              top: shiftHeight[pos1](),                                                                               // 957
              left: shiftWidth[pos0]()                                                                                // 958
            };                                                                                                        // 959
            break;                                                                                                    // 960
          case 'left':                                                                                                // 961
            targetElPos = {                                                                                           // 962
              top: shiftHeight[pos1](),                                                                               // 963
              left: hostElPos.left - targetElWidth                                                                    // 964
            };                                                                                                        // 965
            break;                                                                                                    // 966
          case 'bottom':                                                                                              // 967
            targetElPos = {                                                                                           // 968
              top: shiftHeight[pos0](),                                                                               // 969
              left: shiftWidth[pos1]()                                                                                // 970
            };                                                                                                        // 971
            break;                                                                                                    // 972
          default:                                                                                                    // 973
            targetElPos = {                                                                                           // 974
              top: hostElPos.top - targetElHeight,                                                                    // 975
              left: shiftWidth[pos1]()                                                                                // 976
            };                                                                                                        // 977
            break;                                                                                                    // 978
        }                                                                                                             // 979
                                                                                                                      // 980
        return targetElPos;                                                                                           // 981
      }                                                                                                               // 982
    };                                                                                                                // 983
  }]);                                                                                                                // 984
                                                                                                                      // 985
angular.module('ui.bootstrap.datepicker', ['ui.bootstrap.dateparser', 'ui.bootstrap.position'])                       // 986
                                                                                                                      // 987
.constant('datepickerConfig', {                                                                                       // 988
  formatDay: 'dd',                                                                                                    // 989
  formatMonth: 'MMMM',                                                                                                // 990
  formatYear: 'yyyy',                                                                                                 // 991
  formatDayHeader: 'EEE',                                                                                             // 992
  formatDayTitle: 'MMMM yyyy',                                                                                        // 993
  formatMonthTitle: 'yyyy',                                                                                           // 994
  datepickerMode: 'day',                                                                                              // 995
  minMode: 'day',                                                                                                     // 996
  maxMode: 'year',                                                                                                    // 997
  showWeeks: true,                                                                                                    // 998
  startingDay: 0,                                                                                                     // 999
  yearRange: 20,                                                                                                      // 1000
  minDate: null,                                                                                                      // 1001
  maxDate: null,                                                                                                      // 1002
  shortcutPropagation: false                                                                                          // 1003
})                                                                                                                    // 1004
                                                                                                                      // 1005
.controller('DatepickerController', ['$scope', '$attrs', '$parse', '$interpolate', '$timeout', '$log', 'dateFilter', 'datepickerConfig', function($scope, $attrs, $parse, $interpolate, $timeout, $log, dateFilter, datepickerConfig) {
  var self = this,                                                                                                    // 1007
      ngModelCtrl = { $setViewValue: angular.noop }; // nullModelCtrl;                                                // 1008
                                                                                                                      // 1009
  // Modes chain                                                                                                      // 1010
  this.modes = ['day', 'month', 'year'];                                                                              // 1011
                                                                                                                      // 1012
  // Configuration attributes                                                                                         // 1013
  angular.forEach(['formatDay', 'formatMonth', 'formatYear', 'formatDayHeader', 'formatDayTitle', 'formatMonthTitle', // 1014
                   'minMode', 'maxMode', 'showWeeks', 'startingDay', 'yearRange', 'shortcutPropagation'], function( key, index ) {
    self[key] = angular.isDefined($attrs[key]) ? (index < 8 ? $interpolate($attrs[key])($scope.$parent) : $scope.$parent.$eval($attrs[key])) : datepickerConfig[key];
  });                                                                                                                 // 1017
                                                                                                                      // 1018
  // Watchable date attributes                                                                                        // 1019
  angular.forEach(['minDate', 'maxDate'], function( key ) {                                                           // 1020
    if ( $attrs[key] ) {                                                                                              // 1021
      $scope.$parent.$watch($parse($attrs[key]), function(value) {                                                    // 1022
        self[key] = value ? new Date(value) : null;                                                                   // 1023
        self.refreshView();                                                                                           // 1024
      });                                                                                                             // 1025
    } else {                                                                                                          // 1026
      self[key] = datepickerConfig[key] ? new Date(datepickerConfig[key]) : null;                                     // 1027
    }                                                                                                                 // 1028
  });                                                                                                                 // 1029
                                                                                                                      // 1030
  $scope.datepickerMode = $scope.datepickerMode || datepickerConfig.datepickerMode;                                   // 1031
  $scope.maxMode = self.maxMode;                                                                                      // 1032
  $scope.uniqueId = 'datepicker-' + $scope.$id + '-' + Math.floor(Math.random() * 10000);                             // 1033
                                                                                                                      // 1034
  if(angular.isDefined($attrs.initDate)) {                                                                            // 1035
    this.activeDate = $scope.$parent.$eval($attrs.initDate) || new Date();                                            // 1036
    $scope.$parent.$watch($attrs.initDate, function(initDate){                                                        // 1037
      if(initDate && (ngModelCtrl.$isEmpty(ngModelCtrl.$modelValue) || ngModelCtrl.$invalid)){                        // 1038
        self.activeDate = initDate;                                                                                   // 1039
        self.refreshView();                                                                                           // 1040
      }                                                                                                               // 1041
    });                                                                                                               // 1042
  } else {                                                                                                            // 1043
    this.activeDate =  new Date();                                                                                    // 1044
  }                                                                                                                   // 1045
                                                                                                                      // 1046
  $scope.isActive = function(dateObject) {                                                                            // 1047
    if (self.compare(dateObject.date, self.activeDate) === 0) {                                                       // 1048
      $scope.activeDateId = dateObject.uid;                                                                           // 1049
      return true;                                                                                                    // 1050
    }                                                                                                                 // 1051
    return false;                                                                                                     // 1052
  };                                                                                                                  // 1053
                                                                                                                      // 1054
  this.init = function( ngModelCtrl_ ) {                                                                              // 1055
    ngModelCtrl = ngModelCtrl_;                                                                                       // 1056
                                                                                                                      // 1057
    ngModelCtrl.$render = function() {                                                                                // 1058
      self.render();                                                                                                  // 1059
    };                                                                                                                // 1060
  };                                                                                                                  // 1061
                                                                                                                      // 1062
  this.render = function() {                                                                                          // 1063
    if ( ngModelCtrl.$viewValue ) {                                                                                   // 1064
      var date = new Date( ngModelCtrl.$viewValue ),                                                                  // 1065
          isValid = !isNaN(date);                                                                                     // 1066
                                                                                                                      // 1067
      if ( isValid ) {                                                                                                // 1068
        this.activeDate = date;                                                                                       // 1069
      } else {                                                                                                        // 1070
        $log.error('Datepicker directive: "ng-model" value must be a Date object, a number of milliseconds since 01.01.1970 or a string representing an RFC2822 or ISO 8601 date.');
      }                                                                                                               // 1072
      ngModelCtrl.$setValidity('date', isValid);                                                                      // 1073
    }                                                                                                                 // 1074
    this.refreshView();                                                                                               // 1075
  };                                                                                                                  // 1076
                                                                                                                      // 1077
  this.refreshView = function() {                                                                                     // 1078
    if ( this.element ) {                                                                                             // 1079
      this._refreshView();                                                                                            // 1080
                                                                                                                      // 1081
      var date = ngModelCtrl.$viewValue ? new Date(ngModelCtrl.$viewValue) : null;                                    // 1082
      ngModelCtrl.$setValidity('date-disabled', !date || (this.element && !this.isDisabled(date)));                   // 1083
    }                                                                                                                 // 1084
  };                                                                                                                  // 1085
                                                                                                                      // 1086
  this.createDateObject = function(date, format) {                                                                    // 1087
    var model = ngModelCtrl.$viewValue ? new Date(ngModelCtrl.$viewValue) : null;                                     // 1088
    return {                                                                                                          // 1089
      date: date,                                                                                                     // 1090
      label: dateFilter(date, format),                                                                                // 1091
      selected: model && this.compare(date, model) === 0,                                                             // 1092
      disabled: this.isDisabled(date),                                                                                // 1093
      current: this.compare(date, new Date()) === 0,                                                                  // 1094
      customClass: this.customClass(date)                                                                             // 1095
    };                                                                                                                // 1096
  };                                                                                                                  // 1097
                                                                                                                      // 1098
  this.isDisabled = function( date ) {                                                                                // 1099
    return ((this.minDate && this.compare(date, this.minDate) < 0) || (this.maxDate && this.compare(date, this.maxDate) > 0) || ($attrs.dateDisabled && $scope.dateDisabled({date: date, mode: $scope.datepickerMode})));
  };                                                                                                                  // 1101
                                                                                                                      // 1102
    this.customClass = function( date ) {                                                                             // 1103
      return $scope.customClass({date: date, mode: $scope.datepickerMode});                                           // 1104
    };                                                                                                                // 1105
                                                                                                                      // 1106
  // Split array into smaller arrays                                                                                  // 1107
  this.split = function(arr, size) {                                                                                  // 1108
    var arrays = [];                                                                                                  // 1109
    while (arr.length > 0) {                                                                                          // 1110
      arrays.push(arr.splice(0, size));                                                                               // 1111
    }                                                                                                                 // 1112
    return arrays;                                                                                                    // 1113
  };                                                                                                                  // 1114
                                                                                                                      // 1115
  $scope.select = function( date ) {                                                                                  // 1116
    if ( $scope.datepickerMode === self.minMode ) {                                                                   // 1117
      var dt = ngModelCtrl.$viewValue ? new Date( ngModelCtrl.$viewValue ) : new Date(0, 0, 0, 0, 0, 0, 0);           // 1118
      dt.setFullYear( date.getFullYear(), date.getMonth(), date.getDate() );                                          // 1119
      ngModelCtrl.$setViewValue( dt );                                                                                // 1120
      ngModelCtrl.$render();                                                                                          // 1121
    } else {                                                                                                          // 1122
      self.activeDate = date;                                                                                         // 1123
      $scope.datepickerMode = self.modes[ self.modes.indexOf( $scope.datepickerMode ) - 1 ];                          // 1124
    }                                                                                                                 // 1125
  };                                                                                                                  // 1126
                                                                                                                      // 1127
  $scope.move = function( direction ) {                                                                               // 1128
    var year = self.activeDate.getFullYear() + direction * (self.step.years || 0),                                    // 1129
        month = self.activeDate.getMonth() + direction * (self.step.months || 0);                                     // 1130
    self.activeDate.setFullYear(year, month, 1);                                                                      // 1131
    self.refreshView();                                                                                               // 1132
  };                                                                                                                  // 1133
                                                                                                                      // 1134
  $scope.toggleMode = function( direction ) {                                                                         // 1135
    direction = direction || 1;                                                                                       // 1136
                                                                                                                      // 1137
    if (($scope.datepickerMode === self.maxMode && direction === 1) || ($scope.datepickerMode === self.minMode && direction === -1)) {
      return;                                                                                                         // 1139
    }                                                                                                                 // 1140
                                                                                                                      // 1141
    $scope.datepickerMode = self.modes[ self.modes.indexOf( $scope.datepickerMode ) + direction ];                    // 1142
  };                                                                                                                  // 1143
                                                                                                                      // 1144
  // Key event mapper                                                                                                 // 1145
  $scope.keys = { 13:'enter', 32:'space', 33:'pageup', 34:'pagedown', 35:'end', 36:'home', 37:'left', 38:'up', 39:'right', 40:'down' };
                                                                                                                      // 1147
  var focusElement = function() {                                                                                     // 1148
    $timeout(function() {                                                                                             // 1149
      self.element[0].focus();                                                                                        // 1150
    }, 0 , false);                                                                                                    // 1151
  };                                                                                                                  // 1152
                                                                                                                      // 1153
  // Listen for focus requests from popup directive                                                                   // 1154
  $scope.$on('datepicker.focus', focusElement);                                                                       // 1155
                                                                                                                      // 1156
  $scope.keydown = function( evt ) {                                                                                  // 1157
    var key = $scope.keys[evt.which];                                                                                 // 1158
                                                                                                                      // 1159
    if ( !key || evt.shiftKey || evt.altKey ) {                                                                       // 1160
      return;                                                                                                         // 1161
    }                                                                                                                 // 1162
                                                                                                                      // 1163
    evt.preventDefault();                                                                                             // 1164
    if(!self.shortcutPropagation){                                                                                    // 1165
        evt.stopPropagation();                                                                                        // 1166
    }                                                                                                                 // 1167
                                                                                                                      // 1168
    if (key === 'enter' || key === 'space') {                                                                         // 1169
      if ( self.isDisabled(self.activeDate)) {                                                                        // 1170
        return; // do nothing                                                                                         // 1171
      }                                                                                                               // 1172
      $scope.select(self.activeDate);                                                                                 // 1173
      focusElement();                                                                                                 // 1174
    } else if (evt.ctrlKey && (key === 'up' || key === 'down')) {                                                     // 1175
      $scope.toggleMode(key === 'up' ? 1 : -1);                                                                       // 1176
      focusElement();                                                                                                 // 1177
    } else {                                                                                                          // 1178
      self.handleKeyDown(key, evt);                                                                                   // 1179
      self.refreshView();                                                                                             // 1180
    }                                                                                                                 // 1181
  };                                                                                                                  // 1182
}])                                                                                                                   // 1183
                                                                                                                      // 1184
.directive( 'datepicker', function () {                                                                               // 1185
  return {                                                                                                            // 1186
    restrict: 'EA',                                                                                                   // 1187
    replace: true,                                                                                                    // 1188
    templateUrl: 'template/datepicker/datepicker.html',                                                               // 1189
    scope: {                                                                                                          // 1190
      datepickerMode: '=?',                                                                                           // 1191
      dateDisabled: '&',                                                                                              // 1192
      customClass: '&',                                                                                               // 1193
      shortcutPropagation: '&?'                                                                                       // 1194
    },                                                                                                                // 1195
    require: ['datepicker', '?^ngModel'],                                                                             // 1196
    controller: 'DatepickerController',                                                                               // 1197
    link: function(scope, element, attrs, ctrls) {                                                                    // 1198
      var datepickerCtrl = ctrls[0], ngModelCtrl = ctrls[1];                                                          // 1199
                                                                                                                      // 1200
      if ( ngModelCtrl ) {                                                                                            // 1201
        datepickerCtrl.init( ngModelCtrl );                                                                           // 1202
      }                                                                                                               // 1203
    }                                                                                                                 // 1204
  };                                                                                                                  // 1205
})                                                                                                                    // 1206
                                                                                                                      // 1207
.directive('daypicker', ['dateFilter', function (dateFilter) {                                                        // 1208
  return {                                                                                                            // 1209
    restrict: 'EA',                                                                                                   // 1210
    replace: true,                                                                                                    // 1211
    templateUrl: 'template/datepicker/day.html',                                                                      // 1212
    require: '^datepicker',                                                                                           // 1213
    link: function(scope, element, attrs, ctrl) {                                                                     // 1214
      scope.showWeeks = ctrl.showWeeks;                                                                               // 1215
                                                                                                                      // 1216
      ctrl.step = { months: 1 };                                                                                      // 1217
      ctrl.element = element;                                                                                         // 1218
                                                                                                                      // 1219
      var DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];                                           // 1220
      function getDaysInMonth( year, month ) {                                                                        // 1221
        return ((month === 1) && (year % 4 === 0) && ((year % 100 !== 0) || (year % 400 === 0))) ? 29 : DAYS_IN_MONTH[month];
      }                                                                                                               // 1223
                                                                                                                      // 1224
      function getDates(startDate, n) {                                                                               // 1225
        var dates = new Array(n), current = new Date(startDate), i = 0;                                               // 1226
        current.setHours(12); // Prevent repeated dates because of timezone bug                                       // 1227
        while ( i < n ) {                                                                                             // 1228
          dates[i++] = new Date(current);                                                                             // 1229
          current.setDate( current.getDate() + 1 );                                                                   // 1230
        }                                                                                                             // 1231
        return dates;                                                                                                 // 1232
      }                                                                                                               // 1233
                                                                                                                      // 1234
      ctrl._refreshView = function() {                                                                                // 1235
        var year = ctrl.activeDate.getFullYear(),                                                                     // 1236
          month = ctrl.activeDate.getMonth(),                                                                         // 1237
          firstDayOfMonth = new Date(year, month, 1),                                                                 // 1238
          difference = ctrl.startingDay - firstDayOfMonth.getDay(),                                                   // 1239
          numDisplayedFromPreviousMonth = (difference > 0) ? 7 - difference : - difference,                           // 1240
          firstDate = new Date(firstDayOfMonth);                                                                      // 1241
                                                                                                                      // 1242
        if ( numDisplayedFromPreviousMonth > 0 ) {                                                                    // 1243
          firstDate.setDate( - numDisplayedFromPreviousMonth + 1 );                                                   // 1244
        }                                                                                                             // 1245
                                                                                                                      // 1246
        // 42 is the number of days on a six-month calendar                                                           // 1247
        var days = getDates(firstDate, 42);                                                                           // 1248
        for (var i = 0; i < 42; i ++) {                                                                               // 1249
          days[i] = angular.extend(ctrl.createDateObject(days[i], ctrl.formatDay), {                                  // 1250
            secondary: days[i].getMonth() !== month,                                                                  // 1251
            uid: scope.uniqueId + '-' + i                                                                             // 1252
          });                                                                                                         // 1253
        }                                                                                                             // 1254
                                                                                                                      // 1255
        scope.labels = new Array(7);                                                                                  // 1256
        for (var j = 0; j < 7; j++) {                                                                                 // 1257
          scope.labels[j] = {                                                                                         // 1258
            abbr: dateFilter(days[j].date, ctrl.formatDayHeader),                                                     // 1259
            full: dateFilter(days[j].date, 'EEEE')                                                                    // 1260
          };                                                                                                          // 1261
        }                                                                                                             // 1262
                                                                                                                      // 1263
        scope.title = dateFilter(ctrl.activeDate, ctrl.formatDayTitle);                                               // 1264
        scope.rows = ctrl.split(days, 7);                                                                             // 1265
                                                                                                                      // 1266
        if ( scope.showWeeks ) {                                                                                      // 1267
          scope.weekNumbers = [];                                                                                     // 1268
          var thursdayIndex = (4 + 7 - ctrl.startingDay) % 7,                                                         // 1269
              numWeeks = scope.rows.length;                                                                           // 1270
          for (var curWeek = 0; curWeek < numWeeks; curWeek++) {                                                      // 1271
            scope.weekNumbers.push(                                                                                   // 1272
              getISO8601WeekNumber( scope.rows[curWeek][thursdayIndex].date ));                                       // 1273
          }                                                                                                           // 1274
        }                                                                                                             // 1275
      };                                                                                                              // 1276
                                                                                                                      // 1277
      ctrl.compare = function(date1, date2) {                                                                         // 1278
        return (new Date( date1.getFullYear(), date1.getMonth(), date1.getDate() ) - new Date( date2.getFullYear(), date2.getMonth(), date2.getDate() ) );
      };                                                                                                              // 1280
                                                                                                                      // 1281
      function getISO8601WeekNumber(date) {                                                                           // 1282
        var checkDate = new Date(date);                                                                               // 1283
        checkDate.setDate(checkDate.getDate() + 4 - (checkDate.getDay() || 7)); // Thursday                           // 1284
        var time = checkDate.getTime();                                                                               // 1285
        checkDate.setMonth(0); // Compare with Jan 1                                                                  // 1286
        checkDate.setDate(1);                                                                                         // 1287
        return Math.floor(Math.round((time - checkDate) / 86400000) / 7) + 1;                                         // 1288
      }                                                                                                               // 1289
                                                                                                                      // 1290
      ctrl.handleKeyDown = function( key, evt ) {                                                                     // 1291
        var date = ctrl.activeDate.getDate();                                                                         // 1292
                                                                                                                      // 1293
        if (key === 'left') {                                                                                         // 1294
          date = date - 1;   // up                                                                                    // 1295
        } else if (key === 'up') {                                                                                    // 1296
          date = date - 7;   // down                                                                                  // 1297
        } else if (key === 'right') {                                                                                 // 1298
          date = date + 1;   // down                                                                                  // 1299
        } else if (key === 'down') {                                                                                  // 1300
          date = date + 7;                                                                                            // 1301
        } else if (key === 'pageup' || key === 'pagedown') {                                                          // 1302
          var month = ctrl.activeDate.getMonth() + (key === 'pageup' ? - 1 : 1);                                      // 1303
          ctrl.activeDate.setMonth(month, 1);                                                                         // 1304
          date = Math.min(getDaysInMonth(ctrl.activeDate.getFullYear(), ctrl.activeDate.getMonth()), date);           // 1305
        } else if (key === 'home') {                                                                                  // 1306
          date = 1;                                                                                                   // 1307
        } else if (key === 'end') {                                                                                   // 1308
          date = getDaysInMonth(ctrl.activeDate.getFullYear(), ctrl.activeDate.getMonth());                           // 1309
        }                                                                                                             // 1310
        ctrl.activeDate.setDate(date);                                                                                // 1311
      };                                                                                                              // 1312
                                                                                                                      // 1313
      ctrl.refreshView();                                                                                             // 1314
    }                                                                                                                 // 1315
  };                                                                                                                  // 1316
}])                                                                                                                   // 1317
                                                                                                                      // 1318
.directive('monthpicker', ['dateFilter', function (dateFilter) {                                                      // 1319
  return {                                                                                                            // 1320
    restrict: 'EA',                                                                                                   // 1321
    replace: true,                                                                                                    // 1322
    templateUrl: 'template/datepicker/month.html',                                                                    // 1323
    require: '^datepicker',                                                                                           // 1324
    link: function(scope, element, attrs, ctrl) {                                                                     // 1325
      ctrl.step = { years: 1 };                                                                                       // 1326
      ctrl.element = element;                                                                                         // 1327
                                                                                                                      // 1328
      ctrl._refreshView = function() {                                                                                // 1329
        var months = new Array(12),                                                                                   // 1330
            year = ctrl.activeDate.getFullYear();                                                                     // 1331
                                                                                                                      // 1332
        for ( var i = 0; i < 12; i++ ) {                                                                              // 1333
          months[i] = angular.extend(ctrl.createDateObject(new Date(year, i, 1), ctrl.formatMonth), {                 // 1334
            uid: scope.uniqueId + '-' + i                                                                             // 1335
          });                                                                                                         // 1336
        }                                                                                                             // 1337
                                                                                                                      // 1338
        scope.title = dateFilter(ctrl.activeDate, ctrl.formatMonthTitle);                                             // 1339
        scope.rows = ctrl.split(months, 3);                                                                           // 1340
      };                                                                                                              // 1341
                                                                                                                      // 1342
      ctrl.compare = function(date1, date2) {                                                                         // 1343
        return new Date( date1.getFullYear(), date1.getMonth() ) - new Date( date2.getFullYear(), date2.getMonth() ); // 1344
      };                                                                                                              // 1345
                                                                                                                      // 1346
      ctrl.handleKeyDown = function( key, evt ) {                                                                     // 1347
        var date = ctrl.activeDate.getMonth();                                                                        // 1348
                                                                                                                      // 1349
        if (key === 'left') {                                                                                         // 1350
          date = date - 1;   // up                                                                                    // 1351
        } else if (key === 'up') {                                                                                    // 1352
          date = date - 3;   // down                                                                                  // 1353
        } else if (key === 'right') {                                                                                 // 1354
          date = date + 1;   // down                                                                                  // 1355
        } else if (key === 'down') {                                                                                  // 1356
          date = date + 3;                                                                                            // 1357
        } else if (key === 'pageup' || key === 'pagedown') {                                                          // 1358
          var year = ctrl.activeDate.getFullYear() + (key === 'pageup' ? - 1 : 1);                                    // 1359
          ctrl.activeDate.setFullYear(year);                                                                          // 1360
        } else if (key === 'home') {                                                                                  // 1361
          date = 0;                                                                                                   // 1362
        } else if (key === 'end') {                                                                                   // 1363
          date = 11;                                                                                                  // 1364
        }                                                                                                             // 1365
        ctrl.activeDate.setMonth(date);                                                                               // 1366
      };                                                                                                              // 1367
                                                                                                                      // 1368
      ctrl.refreshView();                                                                                             // 1369
    }                                                                                                                 // 1370
  };                                                                                                                  // 1371
}])                                                                                                                   // 1372
                                                                                                                      // 1373
.directive('yearpicker', ['dateFilter', function (dateFilter) {                                                       // 1374
  return {                                                                                                            // 1375
    restrict: 'EA',                                                                                                   // 1376
    replace: true,                                                                                                    // 1377
    templateUrl: 'template/datepicker/year.html',                                                                     // 1378
    require: '^datepicker',                                                                                           // 1379
    link: function(scope, element, attrs, ctrl) {                                                                     // 1380
      var range = ctrl.yearRange;                                                                                     // 1381
                                                                                                                      // 1382
      ctrl.step = { years: range };                                                                                   // 1383
      ctrl.element = element;                                                                                         // 1384
                                                                                                                      // 1385
      function getStartingYear( year ) {                                                                              // 1386
        return parseInt((year - 1) / range, 10) * range + 1;                                                          // 1387
      }                                                                                                               // 1388
                                                                                                                      // 1389
      ctrl._refreshView = function() {                                                                                // 1390
        var years = new Array(range);                                                                                 // 1391
                                                                                                                      // 1392
        for ( var i = 0, start = getStartingYear(ctrl.activeDate.getFullYear()); i < range; i++ ) {                   // 1393
          years[i] = angular.extend(ctrl.createDateObject(new Date(start + i, 0, 1), ctrl.formatYear), {              // 1394
            uid: scope.uniqueId + '-' + i                                                                             // 1395
          });                                                                                                         // 1396
        }                                                                                                             // 1397
                                                                                                                      // 1398
        scope.title = [years[0].label, years[range - 1].label].join(' - ');                                           // 1399
        scope.rows = ctrl.split(years, 5);                                                                            // 1400
      };                                                                                                              // 1401
                                                                                                                      // 1402
      ctrl.compare = function(date1, date2) {                                                                         // 1403
        return date1.getFullYear() - date2.getFullYear();                                                             // 1404
      };                                                                                                              // 1405
                                                                                                                      // 1406
      ctrl.handleKeyDown = function( key, evt ) {                                                                     // 1407
        var date = ctrl.activeDate.getFullYear();                                                                     // 1408
                                                                                                                      // 1409
        if (key === 'left') {                                                                                         // 1410
          date = date - 1;   // up                                                                                    // 1411
        } else if (key === 'up') {                                                                                    // 1412
          date = date - 5;   // down                                                                                  // 1413
        } else if (key === 'right') {                                                                                 // 1414
          date = date + 1;   // down                                                                                  // 1415
        } else if (key === 'down') {                                                                                  // 1416
          date = date + 5;                                                                                            // 1417
        } else if (key === 'pageup' || key === 'pagedown') {                                                          // 1418
          date += (key === 'pageup' ? - 1 : 1) * ctrl.step.years;                                                     // 1419
        } else if (key === 'home') {                                                                                  // 1420
          date = getStartingYear( ctrl.activeDate.getFullYear() );                                                    // 1421
        } else if (key === 'end') {                                                                                   // 1422
          date = getStartingYear( ctrl.activeDate.getFullYear() ) + range - 1;                                        // 1423
        }                                                                                                             // 1424
        ctrl.activeDate.setFullYear(date);                                                                            // 1425
      };                                                                                                              // 1426
                                                                                                                      // 1427
      ctrl.refreshView();                                                                                             // 1428
    }                                                                                                                 // 1429
  };                                                                                                                  // 1430
}])                                                                                                                   // 1431
                                                                                                                      // 1432
.constant('datepickerPopupConfig', {                                                                                  // 1433
  datepickerPopup: 'yyyy-MM-dd',                                                                                      // 1434
  html5Types: {                                                                                                       // 1435
    date: 'yyyy-MM-dd',                                                                                               // 1436
    'datetime-local': 'yyyy-MM-ddTHH:mm:ss.sss',                                                                      // 1437
    'month': 'yyyy-MM'                                                                                                // 1438
  },                                                                                                                  // 1439
  currentText: 'Today',                                                                                               // 1440
  clearText: 'Clear',                                                                                                 // 1441
  closeText: 'Done',                                                                                                  // 1442
  closeOnDateSelection: true,                                                                                         // 1443
  appendToBody: false,                                                                                                // 1444
  showButtonBar: true                                                                                                 // 1445
})                                                                                                                    // 1446
                                                                                                                      // 1447
.directive('datepickerPopup', ['$compile', '$parse', '$document', '$position', 'dateFilter', 'dateParser', 'datepickerPopupConfig',
function ($compile, $parse, $document, $position, dateFilter, dateParser, datepickerPopupConfig) {                    // 1449
  return {                                                                                                            // 1450
    restrict: 'EA',                                                                                                   // 1451
    require: 'ngModel',                                                                                               // 1452
    scope: {                                                                                                          // 1453
      isOpen: '=?',                                                                                                   // 1454
      currentText: '@',                                                                                               // 1455
      clearText: '@',                                                                                                 // 1456
      closeText: '@',                                                                                                 // 1457
      dateDisabled: '&',                                                                                              // 1458
      customClass: '&'                                                                                                // 1459
    },                                                                                                                // 1460
    link: function(scope, element, attrs, ngModel) {                                                                  // 1461
      var dateFormat,                                                                                                 // 1462
          closeOnDateSelection = angular.isDefined(attrs.closeOnDateSelection) ? scope.$parent.$eval(attrs.closeOnDateSelection) : datepickerPopupConfig.closeOnDateSelection,
          appendToBody = angular.isDefined(attrs.datepickerAppendToBody) ? scope.$parent.$eval(attrs.datepickerAppendToBody) : datepickerPopupConfig.appendToBody;
                                                                                                                      // 1465
      scope.showButtonBar = angular.isDefined(attrs.showButtonBar) ? scope.$parent.$eval(attrs.showButtonBar) : datepickerPopupConfig.showButtonBar;
                                                                                                                      // 1467
      scope.getText = function( key ) {                                                                               // 1468
        return scope[key + 'Text'] || datepickerPopupConfig[key + 'Text'];                                            // 1469
      };                                                                                                              // 1470
                                                                                                                      // 1471
      var isHtml5DateInput = false;                                                                                   // 1472
      if (datepickerPopupConfig.html5Types[attrs.type]) {                                                             // 1473
        dateFormat = datepickerPopupConfig.html5Types[attrs.type];                                                    // 1474
        isHtml5DateInput = true;                                                                                      // 1475
      } else {                                                                                                        // 1476
        dateFormat = attrs.datepickerPopup || datepickerPopupConfig.datepickerPopup;                                  // 1477
        attrs.$observe('datepickerPopup', function(value, oldValue) {                                                 // 1478
            var newDateFormat = value || datepickerPopupConfig.datepickerPopup;                                       // 1479
            // Invalidate the $modelValue to ensure that formatters re-run                                            // 1480
            // FIXME: Refactor when PR is merged: https://github.com/angular/angular.js/pull/10764                    // 1481
            if (newDateFormat !== dateFormat) {                                                                       // 1482
              dateFormat = newDateFormat;                                                                             // 1483
              ngModel.$modelValue = null;                                                                             // 1484
                                                                                                                      // 1485
              if (!dateFormat) {                                                                                      // 1486
                throw new Error('datepickerPopup must have a date format specified.');                                // 1487
              }                                                                                                       // 1488
            }                                                                                                         // 1489
        });                                                                                                           // 1490
      }                                                                                                               // 1491
                                                                                                                      // 1492
      if (!dateFormat) {                                                                                              // 1493
        throw new Error('datepickerPopup must have a date format specified.');                                        // 1494
      }                                                                                                               // 1495
                                                                                                                      // 1496
      if (isHtml5DateInput && attrs.datepickerPopup) {                                                                // 1497
        throw new Error('HTML5 date input types do not support custom formats.');                                     // 1498
      }                                                                                                               // 1499
                                                                                                                      // 1500
      // popup element used to display calendar                                                                       // 1501
      var popupEl = angular.element('<div datepicker-popup-wrap><div datepicker></div></div>');                       // 1502
      popupEl.attr({                                                                                                  // 1503
        'ng-model': 'date',                                                                                           // 1504
        'ng-change': 'dateSelection()'                                                                                // 1505
      });                                                                                                             // 1506
                                                                                                                      // 1507
      function cameltoDash( string ){                                                                                 // 1508
        return string.replace(/([A-Z])/g, function($1) { return '-' + $1.toLowerCase(); });                           // 1509
      }                                                                                                               // 1510
                                                                                                                      // 1511
      // datepicker element                                                                                           // 1512
      var datepickerEl = angular.element(popupEl.children()[0]);                                                      // 1513
      if (isHtml5DateInput) {                                                                                         // 1514
        if (attrs.type == 'month') {                                                                                  // 1515
          datepickerEl.attr('datepicker-mode', '"month"');                                                            // 1516
          datepickerEl.attr('min-mode', 'month');                                                                     // 1517
        }                                                                                                             // 1518
      }                                                                                                               // 1519
                                                                                                                      // 1520
      if ( attrs.datepickerOptions ) {                                                                                // 1521
        var options = scope.$parent.$eval(attrs.datepickerOptions);                                                   // 1522
        if(options.initDate) {                                                                                        // 1523
          scope.initDate = options.initDate;                                                                          // 1524
          datepickerEl.attr( 'init-date', 'initDate' );                                                               // 1525
          delete options.initDate;                                                                                    // 1526
        }                                                                                                             // 1527
        angular.forEach(options, function( value, option ) {                                                          // 1528
          datepickerEl.attr( cameltoDash(option), value );                                                            // 1529
        });                                                                                                           // 1530
      }                                                                                                               // 1531
                                                                                                                      // 1532
      scope.watchData = {};                                                                                           // 1533
      angular.forEach(['minDate', 'maxDate', 'datepickerMode', 'initDate', 'shortcutPropagation'], function( key ) {  // 1534
        if ( attrs[key] ) {                                                                                           // 1535
          var getAttribute = $parse(attrs[key]);                                                                      // 1536
          scope.$parent.$watch(getAttribute, function(value){                                                         // 1537
            scope.watchData[key] = value;                                                                             // 1538
          });                                                                                                         // 1539
          datepickerEl.attr(cameltoDash(key), 'watchData.' + key);                                                    // 1540
                                                                                                                      // 1541
          // Propagate changes from datepicker to outside                                                             // 1542
          if ( key === 'datepickerMode' ) {                                                                           // 1543
            var setAttribute = getAttribute.assign;                                                                   // 1544
            scope.$watch('watchData.' + key, function(value, oldvalue) {                                              // 1545
              if ( value !== oldvalue ) {                                                                             // 1546
                setAttribute(scope.$parent, value);                                                                   // 1547
              }                                                                                                       // 1548
            });                                                                                                       // 1549
          }                                                                                                           // 1550
        }                                                                                                             // 1551
      });                                                                                                             // 1552
      if (attrs.dateDisabled) {                                                                                       // 1553
        datepickerEl.attr('date-disabled', 'dateDisabled({ date: date, mode: mode })');                               // 1554
      }                                                                                                               // 1555
                                                                                                                      // 1556
      if (attrs.showWeeks) {                                                                                          // 1557
        datepickerEl.attr('show-weeks', attrs.showWeeks);                                                             // 1558
      }                                                                                                               // 1559
                                                                                                                      // 1560
      if (attrs.customClass){                                                                                         // 1561
        datepickerEl.attr('custom-class', 'customClass({ date: date, mode: mode })');                                 // 1562
      }                                                                                                               // 1563
                                                                                                                      // 1564
      function parseDate(viewValue) {                                                                                 // 1565
        if (angular.isNumber(viewValue)) {                                                                            // 1566
          // presumably timestamp to date object                                                                      // 1567
          viewValue = new Date(viewValue);                                                                            // 1568
        }                                                                                                             // 1569
                                                                                                                      // 1570
        if (!viewValue) {                                                                                             // 1571
          return null;                                                                                                // 1572
        } else if (angular.isDate(viewValue) && !isNaN(viewValue)) {                                                  // 1573
          return viewValue;                                                                                           // 1574
        } else if (angular.isString(viewValue)) {                                                                     // 1575
          var date = dateParser.parse(viewValue, dateFormat, scope.date) || new Date(viewValue);                      // 1576
          if (isNaN(date)) {                                                                                          // 1577
            return undefined;                                                                                         // 1578
          } else {                                                                                                    // 1579
            return date;                                                                                              // 1580
          }                                                                                                           // 1581
        } else {                                                                                                      // 1582
          return undefined;                                                                                           // 1583
        }                                                                                                             // 1584
      }                                                                                                               // 1585
                                                                                                                      // 1586
      function validator(modelValue, viewValue) {                                                                     // 1587
        var value = modelValue || viewValue;                                                                          // 1588
        if (angular.isNumber(value)) {                                                                                // 1589
          value = new Date(value);                                                                                    // 1590
        }                                                                                                             // 1591
        if (!value) {                                                                                                 // 1592
          return true;                                                                                                // 1593
        } else if (angular.isDate(value) && !isNaN(value)) {                                                          // 1594
          return true;                                                                                                // 1595
        } else if (angular.isString(value)) {                                                                         // 1596
          var date = dateParser.parse(value, dateFormat) || new Date(value);                                          // 1597
          return !isNaN(date);                                                                                        // 1598
        } else {                                                                                                      // 1599
          return false;                                                                                               // 1600
        }                                                                                                             // 1601
      }                                                                                                               // 1602
                                                                                                                      // 1603
      if (!isHtml5DateInput) {                                                                                        // 1604
        // Internal API to maintain the correct ng-invalid-[key] class                                                // 1605
        ngModel.$$parserName = 'date';                                                                                // 1606
        ngModel.$validators.date = validator;                                                                         // 1607
        ngModel.$parsers.unshift(parseDate);                                                                          // 1608
        ngModel.$formatters.push(function (value) {                                                                   // 1609
          scope.date = value;                                                                                         // 1610
          return ngModel.$isEmpty(value) ? value : dateFilter(value, dateFormat);                                     // 1611
        });                                                                                                           // 1612
      }                                                                                                               // 1613
      else {                                                                                                          // 1614
        ngModel.$formatters.push(function (value) {                                                                   // 1615
          scope.date = value;                                                                                         // 1616
          return value;                                                                                               // 1617
        });                                                                                                           // 1618
      }                                                                                                               // 1619
                                                                                                                      // 1620
      // Inner change                                                                                                 // 1621
      scope.dateSelection = function(dt) {                                                                            // 1622
        if (angular.isDefined(dt)) {                                                                                  // 1623
          scope.date = dt;                                                                                            // 1624
        }                                                                                                             // 1625
        var date = scope.date ? dateFilter(scope.date, dateFormat) : '';                                              // 1626
        element.val(date);                                                                                            // 1627
        ngModel.$setViewValue(date);                                                                                  // 1628
                                                                                                                      // 1629
        if ( closeOnDateSelection ) {                                                                                 // 1630
          scope.isOpen = false;                                                                                       // 1631
          element[0].focus();                                                                                         // 1632
        }                                                                                                             // 1633
      };                                                                                                              // 1634
                                                                                                                      // 1635
      // Detect changes in the view from the text box                                                                 // 1636
      ngModel.$viewChangeListeners.push(function () {                                                                 // 1637
        scope.date = dateParser.parse(ngModel.$viewValue, dateFormat, scope.date) || new Date(ngModel.$viewValue);    // 1638
      });                                                                                                             // 1639
                                                                                                                      // 1640
      var documentClickBind = function(event) {                                                                       // 1641
        if (scope.isOpen && event.target !== element[0]) {                                                            // 1642
          scope.$apply(function() {                                                                                   // 1643
            scope.isOpen = false;                                                                                     // 1644
          });                                                                                                         // 1645
        }                                                                                                             // 1646
      };                                                                                                              // 1647
                                                                                                                      // 1648
      var keydown = function(evt, noApply) {                                                                          // 1649
        scope.keydown(evt);                                                                                           // 1650
      };                                                                                                              // 1651
      element.bind('keydown', keydown);                                                                               // 1652
                                                                                                                      // 1653
      scope.keydown = function(evt) {                                                                                 // 1654
        if (evt.which === 27) {                                                                                       // 1655
          evt.preventDefault();                                                                                       // 1656
          if (scope.isOpen) {                                                                                         // 1657
            evt.stopPropagation();                                                                                    // 1658
          }                                                                                                           // 1659
          scope.close();                                                                                              // 1660
        } else if (evt.which === 40 && !scope.isOpen) {                                                               // 1661
          scope.isOpen = true;                                                                                        // 1662
        }                                                                                                             // 1663
      };                                                                                                              // 1664
                                                                                                                      // 1665
      scope.$watch('isOpen', function(value) {                                                                        // 1666
        if (value) {                                                                                                  // 1667
          scope.$broadcast('datepicker.focus');                                                                       // 1668
          scope.position = appendToBody ? $position.offset(element) : $position.position(element);                    // 1669
          scope.position.top = scope.position.top + element.prop('offsetHeight');                                     // 1670
                                                                                                                      // 1671
          $document.bind('click', documentClickBind);                                                                 // 1672
        } else {                                                                                                      // 1673
          $document.unbind('click', documentClickBind);                                                               // 1674
        }                                                                                                             // 1675
      });                                                                                                             // 1676
                                                                                                                      // 1677
      scope.select = function( date ) {                                                                               // 1678
        if (date === 'today') {                                                                                       // 1679
          var today = new Date();                                                                                     // 1680
          if (angular.isDate(scope.date)) {                                                                           // 1681
            date = new Date(scope.date);                                                                              // 1682
            date.setFullYear(today.getFullYear(), today.getMonth(), today.getDate());                                 // 1683
          } else {                                                                                                    // 1684
            date = new Date(today.setHours(0, 0, 0, 0));                                                              // 1685
          }                                                                                                           // 1686
        }                                                                                                             // 1687
        scope.dateSelection( date );                                                                                  // 1688
      };                                                                                                              // 1689
                                                                                                                      // 1690
      scope.close = function() {                                                                                      // 1691
        scope.isOpen = false;                                                                                         // 1692
        element[0].focus();                                                                                           // 1693
      };                                                                                                              // 1694
                                                                                                                      // 1695
      var $popup = $compile(popupEl)(scope);                                                                          // 1696
      // Prevent jQuery cache memory leak (template is now redundant after linking)                                   // 1697
      popupEl.remove();                                                                                               // 1698
                                                                                                                      // 1699
      if ( appendToBody ) {                                                                                           // 1700
        $document.find('body').append($popup);                                                                        // 1701
      } else {                                                                                                        // 1702
        element.after($popup);                                                                                        // 1703
      }                                                                                                               // 1704
                                                                                                                      // 1705
      scope.$on('$destroy', function() {                                                                              // 1706
        $popup.remove();                                                                                              // 1707
        element.unbind('keydown', keydown);                                                                           // 1708
        $document.unbind('click', documentClickBind);                                                                 // 1709
      });                                                                                                             // 1710
    }                                                                                                                 // 1711
  };                                                                                                                  // 1712
}])                                                                                                                   // 1713
                                                                                                                      // 1714
.directive('datepickerPopupWrap', function() {                                                                        // 1715
  return {                                                                                                            // 1716
    restrict:'EA',                                                                                                    // 1717
    replace: true,                                                                                                    // 1718
    transclude: true,                                                                                                 // 1719
    templateUrl: 'template/datepicker/popup.html',                                                                    // 1720
    link:function (scope, element, attrs) {                                                                           // 1721
      element.bind('click', function(event) {                                                                         // 1722
        event.preventDefault();                                                                                       // 1723
        event.stopPropagation();                                                                                      // 1724
      });                                                                                                             // 1725
    }                                                                                                                 // 1726
  };                                                                                                                  // 1727
});                                                                                                                   // 1728
                                                                                                                      // 1729
angular.module('ui.bootstrap.dropdown', ['ui.bootstrap.position'])                                                    // 1730
                                                                                                                      // 1731
.constant('dropdownConfig', {                                                                                         // 1732
  openClass: 'open'                                                                                                   // 1733
})                                                                                                                    // 1734
                                                                                                                      // 1735
.service('dropdownService', ['$document', '$rootScope', function($document, $rootScope) {                             // 1736
  var openScope = null;                                                                                               // 1737
                                                                                                                      // 1738
  this.open = function( dropdownScope ) {                                                                             // 1739
    if ( !openScope ) {                                                                                               // 1740
      $document.bind('click', closeDropdown);                                                                         // 1741
      $document.bind('keydown', escapeKeyBind);                                                                       // 1742
    }                                                                                                                 // 1743
                                                                                                                      // 1744
    if ( openScope && openScope !== dropdownScope ) {                                                                 // 1745
        openScope.isOpen = false;                                                                                     // 1746
    }                                                                                                                 // 1747
                                                                                                                      // 1748
    openScope = dropdownScope;                                                                                        // 1749
  };                                                                                                                  // 1750
                                                                                                                      // 1751
  this.close = function( dropdownScope ) {                                                                            // 1752
    if ( openScope === dropdownScope ) {                                                                              // 1753
      openScope = null;                                                                                               // 1754
      $document.unbind('click', closeDropdown);                                                                       // 1755
      $document.unbind('keydown', escapeKeyBind);                                                                     // 1756
    }                                                                                                                 // 1757
  };                                                                                                                  // 1758
                                                                                                                      // 1759
  var closeDropdown = function( evt ) {                                                                               // 1760
    // This method may still be called during the same mouse event that                                               // 1761
    // unbound this event handler. So check openScope before proceeding.                                              // 1762
    if (!openScope) { return; }                                                                                       // 1763
                                                                                                                      // 1764
    if( evt && openScope.getAutoClose() === 'disabled' )  { return ; }                                                // 1765
                                                                                                                      // 1766
    var toggleElement = openScope.getToggleElement();                                                                 // 1767
    if ( evt && toggleElement && toggleElement[0].contains(evt.target) ) {                                            // 1768
        return;                                                                                                       // 1769
    }                                                                                                                 // 1770
                                                                                                                      // 1771
    var $element = openScope.getElement();                                                                            // 1772
    if( evt && openScope.getAutoClose() === 'outsideClick' && $element && $element[0].contains(evt.target) ) {        // 1773
      return;                                                                                                         // 1774
    }                                                                                                                 // 1775
                                                                                                                      // 1776
    openScope.isOpen = false;                                                                                         // 1777
                                                                                                                      // 1778
    if (!$rootScope.$$phase) {                                                                                        // 1779
      openScope.$apply();                                                                                             // 1780
    }                                                                                                                 // 1781
  };                                                                                                                  // 1782
                                                                                                                      // 1783
  var escapeKeyBind = function( evt ) {                                                                               // 1784
    if ( evt.which === 27 ) {                                                                                         // 1785
      openScope.focusToggleElement();                                                                                 // 1786
      closeDropdown();                                                                                                // 1787
    }                                                                                                                 // 1788
  };                                                                                                                  // 1789
}])                                                                                                                   // 1790
                                                                                                                      // 1791
.controller('DropdownController', ['$scope', '$attrs', '$parse', 'dropdownConfig', 'dropdownService', '$animate', '$position', '$document', function($scope, $attrs, $parse, dropdownConfig, dropdownService, $animate, $position, $document) {
  var self = this,                                                                                                    // 1793
      scope = $scope.$new(), // create a child scope so we are not polluting original one                             // 1794
      openClass = dropdownConfig.openClass,                                                                           // 1795
      getIsOpen,                                                                                                      // 1796
      setIsOpen = angular.noop,                                                                                       // 1797
      toggleInvoker = $attrs.onToggle ? $parse($attrs.onToggle) : angular.noop,                                       // 1798
      appendToBody = false;                                                                                           // 1799
                                                                                                                      // 1800
  this.init = function( element ) {                                                                                   // 1801
    self.$element = element;                                                                                          // 1802
                                                                                                                      // 1803
    if ( $attrs.isOpen ) {                                                                                            // 1804
      getIsOpen = $parse($attrs.isOpen);                                                                              // 1805
      setIsOpen = getIsOpen.assign;                                                                                   // 1806
                                                                                                                      // 1807
      $scope.$watch(getIsOpen, function(value) {                                                                      // 1808
        scope.isOpen = !!value;                                                                                       // 1809
      });                                                                                                             // 1810
    }                                                                                                                 // 1811
                                                                                                                      // 1812
    appendToBody = angular.isDefined($attrs.dropdownAppendToBody);                                                    // 1813
                                                                                                                      // 1814
    if ( appendToBody && self.dropdownMenu ) {                                                                        // 1815
      $document.find('body').append( self.dropdownMenu );                                                             // 1816
      element.on('$destroy', function handleDestroyEvent() {                                                          // 1817
        self.dropdownMenu.remove();                                                                                   // 1818
      });                                                                                                             // 1819
    }                                                                                                                 // 1820
  };                                                                                                                  // 1821
                                                                                                                      // 1822
  this.toggle = function( open ) {                                                                                    // 1823
    return scope.isOpen = arguments.length ? !!open : !scope.isOpen;                                                  // 1824
  };                                                                                                                  // 1825
                                                                                                                      // 1826
  // Allow other directives to watch status                                                                           // 1827
  this.isOpen = function() {                                                                                          // 1828
    return scope.isOpen;                                                                                              // 1829
  };                                                                                                                  // 1830
                                                                                                                      // 1831
  scope.getToggleElement = function() {                                                                               // 1832
    return self.toggleElement;                                                                                        // 1833
  };                                                                                                                  // 1834
                                                                                                                      // 1835
  scope.getAutoClose = function() {                                                                                   // 1836
    return $attrs.autoClose || 'always'; //or 'outsideClick' or 'disabled'                                            // 1837
  };                                                                                                                  // 1838
                                                                                                                      // 1839
  scope.getElement = function() {                                                                                     // 1840
    return self.$element;                                                                                             // 1841
  };                                                                                                                  // 1842
                                                                                                                      // 1843
  scope.focusToggleElement = function() {                                                                             // 1844
    if ( self.toggleElement ) {                                                                                       // 1845
      self.toggleElement[0].focus();                                                                                  // 1846
    }                                                                                                                 // 1847
  };                                                                                                                  // 1848
                                                                                                                      // 1849
  scope.$watch('isOpen', function( isOpen, wasOpen ) {                                                                // 1850
    if ( appendToBody && self.dropdownMenu ) {                                                                        // 1851
      var pos = $position.positionElements(self.$element, self.dropdownMenu, 'bottom-left', true);                    // 1852
      self.dropdownMenu.css({                                                                                         // 1853
        top: pos.top + 'px',                                                                                          // 1854
        left: pos.left + 'px',                                                                                        // 1855
        display: isOpen ? 'block' : 'none'                                                                            // 1856
      });                                                                                                             // 1857
    }                                                                                                                 // 1858
                                                                                                                      // 1859
    $animate[isOpen ? 'addClass' : 'removeClass'](self.$element, openClass);                                          // 1860
                                                                                                                      // 1861
    if ( isOpen ) {                                                                                                   // 1862
      scope.focusToggleElement();                                                                                     // 1863
      dropdownService.open( scope );                                                                                  // 1864
    } else {                                                                                                          // 1865
      dropdownService.close( scope );                                                                                 // 1866
    }                                                                                                                 // 1867
                                                                                                                      // 1868
    setIsOpen($scope, isOpen);                                                                                        // 1869
    if (angular.isDefined(isOpen) && isOpen !== wasOpen) {                                                            // 1870
      toggleInvoker($scope, { open: !!isOpen });                                                                      // 1871
    }                                                                                                                 // 1872
  });                                                                                                                 // 1873
                                                                                                                      // 1874
  $scope.$on('$locationChangeSuccess', function() {                                                                   // 1875
    scope.isOpen = false;                                                                                             // 1876
  });                                                                                                                 // 1877
                                                                                                                      // 1878
  $scope.$on('$destroy', function() {                                                                                 // 1879
    scope.$destroy();                                                                                                 // 1880
  });                                                                                                                 // 1881
}])                                                                                                                   // 1882
                                                                                                                      // 1883
.directive('dropdown', function() {                                                                                   // 1884
  return {                                                                                                            // 1885
    controller: 'DropdownController',                                                                                 // 1886
    link: function(scope, element, attrs, dropdownCtrl) {                                                             // 1887
      dropdownCtrl.init( element );                                                                                   // 1888
    }                                                                                                                 // 1889
  };                                                                                                                  // 1890
})                                                                                                                    // 1891
                                                                                                                      // 1892
.directive('dropdownMenu', function() {                                                                               // 1893
  return {                                                                                                            // 1894
    restrict: 'AC',                                                                                                   // 1895
    require: '?^dropdown',                                                                                            // 1896
    link: function(scope, element, attrs, dropdownCtrl) {                                                             // 1897
      if ( !dropdownCtrl ) {                                                                                          // 1898
        return;                                                                                                       // 1899
      }                                                                                                               // 1900
      dropdownCtrl.dropdownMenu = element;                                                                            // 1901
    }                                                                                                                 // 1902
  };                                                                                                                  // 1903
})                                                                                                                    // 1904
                                                                                                                      // 1905
.directive('dropdownToggle', function() {                                                                             // 1906
  return {                                                                                                            // 1907
    require: '?^dropdown',                                                                                            // 1908
    link: function(scope, element, attrs, dropdownCtrl) {                                                             // 1909
      if ( !dropdownCtrl ) {                                                                                          // 1910
        return;                                                                                                       // 1911
      }                                                                                                               // 1912
                                                                                                                      // 1913
      dropdownCtrl.toggleElement = element;                                                                           // 1914
                                                                                                                      // 1915
      var toggleDropdown = function(event) {                                                                          // 1916
        event.preventDefault();                                                                                       // 1917
                                                                                                                      // 1918
        if ( !element.hasClass('disabled') && !attrs.disabled ) {                                                     // 1919
          scope.$apply(function() {                                                                                   // 1920
            dropdownCtrl.toggle();                                                                                    // 1921
          });                                                                                                         // 1922
        }                                                                                                             // 1923
      };                                                                                                              // 1924
                                                                                                                      // 1925
      element.bind('click', toggleDropdown);                                                                          // 1926
                                                                                                                      // 1927
      // WAI-ARIA                                                                                                     // 1928
      element.attr({ 'aria-haspopup': true, 'aria-expanded': false });                                                // 1929
      scope.$watch(dropdownCtrl.isOpen, function( isOpen ) {                                                          // 1930
        element.attr('aria-expanded', !!isOpen);                                                                      // 1931
      });                                                                                                             // 1932
                                                                                                                      // 1933
      scope.$on('$destroy', function() {                                                                              // 1934
        element.unbind('click', toggleDropdown);                                                                      // 1935
      });                                                                                                             // 1936
    }                                                                                                                 // 1937
  };                                                                                                                  // 1938
});                                                                                                                   // 1939
                                                                                                                      // 1940
angular.module('ui.bootstrap.modal', [])                                                                              // 1941
                                                                                                                      // 1942
/**                                                                                                                   // 1943
 * A helper, internal data structure that acts as a map but also allows getting / removing                            // 1944
 * elements in the LIFO order                                                                                         // 1945
 */                                                                                                                   // 1946
  .factory('$$stackedMap', function () {                                                                              // 1947
    return {                                                                                                          // 1948
      createNew: function () {                                                                                        // 1949
        var stack = [];                                                                                               // 1950
                                                                                                                      // 1951
        return {                                                                                                      // 1952
          add: function (key, value) {                                                                                // 1953
            stack.push({                                                                                              // 1954
              key: key,                                                                                               // 1955
              value: value                                                                                            // 1956
            });                                                                                                       // 1957
          },                                                                                                          // 1958
          get: function (key) {                                                                                       // 1959
            for (var i = 0; i < stack.length; i++) {                                                                  // 1960
              if (key == stack[i].key) {                                                                              // 1961
                return stack[i];                                                                                      // 1962
              }                                                                                                       // 1963
            }                                                                                                         // 1964
          },                                                                                                          // 1965
          keys: function() {                                                                                          // 1966
            var keys = [];                                                                                            // 1967
            for (var i = 0; i < stack.length; i++) {                                                                  // 1968
              keys.push(stack[i].key);                                                                                // 1969
            }                                                                                                         // 1970
            return keys;                                                                                              // 1971
          },                                                                                                          // 1972
          top: function () {                                                                                          // 1973
            return stack[stack.length - 1];                                                                           // 1974
          },                                                                                                          // 1975
          remove: function (key) {                                                                                    // 1976
            var idx = -1;                                                                                             // 1977
            for (var i = 0; i < stack.length; i++) {                                                                  // 1978
              if (key == stack[i].key) {                                                                              // 1979
                idx = i;                                                                                              // 1980
                break;                                                                                                // 1981
              }                                                                                                       // 1982
            }                                                                                                         // 1983
            return stack.splice(idx, 1)[0];                                                                           // 1984
          },                                                                                                          // 1985
          removeTop: function () {                                                                                    // 1986
            return stack.splice(stack.length - 1, 1)[0];                                                              // 1987
          },                                                                                                          // 1988
          length: function () {                                                                                       // 1989
            return stack.length;                                                                                      // 1990
          }                                                                                                           // 1991
        };                                                                                                            // 1992
      }                                                                                                               // 1993
    };                                                                                                                // 1994
  })                                                                                                                  // 1995
                                                                                                                      // 1996
/**                                                                                                                   // 1997
 * A helper directive for the $modal service. It creates a backdrop element.                                          // 1998
 */                                                                                                                   // 1999
  .directive('modalBackdrop', ['$timeout', function ($timeout) {                                                      // 2000
    return {                                                                                                          // 2001
      restrict: 'EA',                                                                                                 // 2002
      replace: true,                                                                                                  // 2003
      templateUrl: 'template/modal/backdrop.html',                                                                    // 2004
      compile: function (tElement, tAttrs) {                                                                          // 2005
        tElement.addClass(tAttrs.backdropClass);                                                                      // 2006
        return linkFn;                                                                                                // 2007
      }                                                                                                               // 2008
    };                                                                                                                // 2009
                                                                                                                      // 2010
    function linkFn(scope, element, attrs) {                                                                          // 2011
      scope.animate = false;                                                                                          // 2012
                                                                                                                      // 2013
      //trigger CSS transitions                                                                                       // 2014
      $timeout(function () {                                                                                          // 2015
        scope.animate = true;                                                                                         // 2016
      });                                                                                                             // 2017
    }                                                                                                                 // 2018
  }])                                                                                                                 // 2019
                                                                                                                      // 2020
  .directive('modalWindow', ['$modalStack', '$q', function ($modalStack, $q) {                                        // 2021
    return {                                                                                                          // 2022
      restrict: 'EA',                                                                                                 // 2023
      scope: {                                                                                                        // 2024
        index: '@',                                                                                                   // 2025
        animate: '='                                                                                                  // 2026
      },                                                                                                              // 2027
      replace: true,                                                                                                  // 2028
      transclude: true,                                                                                               // 2029
      templateUrl: function(tElement, tAttrs) {                                                                       // 2030
        return tAttrs.templateUrl || 'template/modal/window.html';                                                    // 2031
      },                                                                                                              // 2032
      link: function (scope, element, attrs) {                                                                        // 2033
        element.addClass(attrs.windowClass || '');                                                                    // 2034
        scope.size = attrs.size;                                                                                      // 2035
                                                                                                                      // 2036
        scope.close = function (evt) {                                                                                // 2037
          var modal = $modalStack.getTop();                                                                           // 2038
          if (modal && modal.value.backdrop && modal.value.backdrop != 'static' && (evt.target === evt.currentTarget)) {
            evt.preventDefault();                                                                                     // 2040
            evt.stopPropagation();                                                                                    // 2041
            $modalStack.dismiss(modal.key, 'backdrop click');                                                         // 2042
          }                                                                                                           // 2043
        };                                                                                                            // 2044
                                                                                                                      // 2045
        // This property is only added to the scope for the purpose of detecting when this directive is rendered.     // 2046
        // We can detect that by using this property in the template associated with this directive and then use      // 2047
        // {@link Attribute#$observe} on it. For more details please see {@link TableColumnResize}.                   // 2048
        scope.$isRendered = true;                                                                                     // 2049
                                                                                                                      // 2050
        // Deferred object that will be resolved when this modal is render.                                           // 2051
        var modalRenderDeferObj = $q.defer();                                                                         // 2052
        // Observe function will be called on next digest cycle after compilation, ensuring that the DOM is ready.    // 2053
        // In order to use this way of finding whether DOM is ready, we need to observe a scope property used in modal's template.
        attrs.$observe('modalRender', function (value) {                                                              // 2055
          if (value == 'true') {                                                                                      // 2056
            modalRenderDeferObj.resolve();                                                                            // 2057
          }                                                                                                           // 2058
        });                                                                                                           // 2059
                                                                                                                      // 2060
        modalRenderDeferObj.promise.then(function () {                                                                // 2061
          // trigger CSS transitions                                                                                  // 2062
          scope.animate = true;                                                                                       // 2063
                                                                                                                      // 2064
          var inputsWithAutofocus = element[0].querySelectorAll('[autofocus]');                                       // 2065
          /**                                                                                                         // 2066
           * Auto-focusing of a freshly-opened modal element causes any child elements                                // 2067
           * with the autofocus attribute to lose focus. This is an issue on touch                                    // 2068
           * based devices which will show and then hide the onscreen keyboard.                                       // 2069
           * Attempts to refocus the autofocus element via JavaScript will not reopen                                 // 2070
           * the onscreen keyboard. Fixed by updated the focusing logic to only autofocus                             // 2071
           * the modal element if the modal does not contain an autofocus element.                                    // 2072
           */                                                                                                         // 2073
          if (inputsWithAutofocus.length) {                                                                           // 2074
            inputsWithAutofocus[0].focus();                                                                           // 2075
          } else {                                                                                                    // 2076
            element[0].focus();                                                                                       // 2077
          }                                                                                                           // 2078
                                                                                                                      // 2079
          // Notify {@link $modalStack} that modal is rendered.                                                       // 2080
          var modal = $modalStack.getTop();                                                                           // 2081
          if (modal) {                                                                                                // 2082
            $modalStack.modalRendered(modal.key);                                                                     // 2083
          }                                                                                                           // 2084
        });                                                                                                           // 2085
      }                                                                                                               // 2086
    };                                                                                                                // 2087
  }])                                                                                                                 // 2088
                                                                                                                      // 2089
  .directive('modalAnimationClass', [                                                                                 // 2090
    function () {                                                                                                     // 2091
      return {                                                                                                        // 2092
        compile: function (tElement, tAttrs) {                                                                        // 2093
          if (tAttrs.modalAnimation) {                                                                                // 2094
            tElement.addClass(tAttrs.modalAnimationClass);                                                            // 2095
          }                                                                                                           // 2096
        }                                                                                                             // 2097
      };                                                                                                              // 2098
    }])                                                                                                               // 2099
                                                                                                                      // 2100
  .directive('modalTransclude', function () {                                                                         // 2101
    return {                                                                                                          // 2102
      link: function($scope, $element, $attrs, controller, $transclude) {                                             // 2103
        $transclude($scope.$parent, function(clone) {                                                                 // 2104
          $element.empty();                                                                                           // 2105
          $element.append(clone);                                                                                     // 2106
        });                                                                                                           // 2107
      }                                                                                                               // 2108
    };                                                                                                                // 2109
  })                                                                                                                  // 2110
                                                                                                                      // 2111
  .factory('$modalStack', ['$animate', '$timeout', '$document', '$compile', '$rootScope', '$$stackedMap',             // 2112
    function ($animate, $timeout, $document, $compile, $rootScope, $$stackedMap) {                                    // 2113
                                                                                                                      // 2114
      var OPENED_MODAL_CLASS = 'modal-open';                                                                          // 2115
                                                                                                                      // 2116
      var backdropDomEl, backdropScope;                                                                               // 2117
      var openedWindows = $$stackedMap.createNew();                                                                   // 2118
      var $modalStack = {};                                                                                           // 2119
                                                                                                                      // 2120
      function backdropIndex() {                                                                                      // 2121
        var topBackdropIndex = -1;                                                                                    // 2122
        var opened = openedWindows.keys();                                                                            // 2123
        for (var i = 0; i < opened.length; i++) {                                                                     // 2124
          if (openedWindows.get(opened[i]).value.backdrop) {                                                          // 2125
            topBackdropIndex = i;                                                                                     // 2126
          }                                                                                                           // 2127
        }                                                                                                             // 2128
        return topBackdropIndex;                                                                                      // 2129
      }                                                                                                               // 2130
                                                                                                                      // 2131
      $rootScope.$watch(backdropIndex, function(newBackdropIndex){                                                    // 2132
        if (backdropScope) {                                                                                          // 2133
          backdropScope.index = newBackdropIndex;                                                                     // 2134
        }                                                                                                             // 2135
      });                                                                                                             // 2136
                                                                                                                      // 2137
      function removeModalWindow(modalInstance) {                                                                     // 2138
                                                                                                                      // 2139
        var body = $document.find('body').eq(0);                                                                      // 2140
        var modalWindow = openedWindows.get(modalInstance).value;                                                     // 2141
                                                                                                                      // 2142
        //clean up the stack                                                                                          // 2143
        openedWindows.remove(modalInstance);                                                                          // 2144
                                                                                                                      // 2145
        //remove window DOM element                                                                                   // 2146
        removeAfterAnimate(modalWindow.modalDomEl, modalWindow.modalScope, function() {                               // 2147
          body.toggleClass(OPENED_MODAL_CLASS, openedWindows.length() > 0);                                           // 2148
          checkRemoveBackdrop();                                                                                      // 2149
        });                                                                                                           // 2150
      }                                                                                                               // 2151
                                                                                                                      // 2152
      function checkRemoveBackdrop() {                                                                                // 2153
          //remove backdrop if no longer needed                                                                       // 2154
          if (backdropDomEl && backdropIndex() == -1) {                                                               // 2155
            var backdropScopeRef = backdropScope;                                                                     // 2156
            removeAfterAnimate(backdropDomEl, backdropScope, function () {                                            // 2157
              backdropScopeRef = null;                                                                                // 2158
            });                                                                                                       // 2159
            backdropDomEl = undefined;                                                                                // 2160
            backdropScope = undefined;                                                                                // 2161
          }                                                                                                           // 2162
      }                                                                                                               // 2163
                                                                                                                      // 2164
      function removeAfterAnimate(domEl, scope, done) {                                                               // 2165
        // Closing animation                                                                                          // 2166
        scope.animate = false;                                                                                        // 2167
                                                                                                                      // 2168
        if (domEl.attr('modal-animation') && $animate.enabled()) {                                                    // 2169
          // transition out                                                                                           // 2170
          domEl.one('$animate:close', function closeFn() {                                                            // 2171
            $rootScope.$evalAsync(afterAnimating);                                                                    // 2172
          });                                                                                                         // 2173
        } else {                                                                                                      // 2174
          // Ensure this call is async                                                                                // 2175
          $timeout(afterAnimating);                                                                                   // 2176
        }                                                                                                             // 2177
                                                                                                                      // 2178
        function afterAnimating() {                                                                                   // 2179
          if (afterAnimating.done) {                                                                                  // 2180
            return;                                                                                                   // 2181
          }                                                                                                           // 2182
          afterAnimating.done = true;                                                                                 // 2183
                                                                                                                      // 2184
          domEl.remove();                                                                                             // 2185
          scope.$destroy();                                                                                           // 2186
          if (done) {                                                                                                 // 2187
            done();                                                                                                   // 2188
          }                                                                                                           // 2189
        }                                                                                                             // 2190
      }                                                                                                               // 2191
                                                                                                                      // 2192
      $document.bind('keydown', function (evt) {                                                                      // 2193
        var modal;                                                                                                    // 2194
                                                                                                                      // 2195
        if (evt.which === 27) {                                                                                       // 2196
          modal = openedWindows.top();                                                                                // 2197
          if (modal && modal.value.keyboard) {                                                                        // 2198
            evt.preventDefault();                                                                                     // 2199
            $rootScope.$apply(function () {                                                                           // 2200
              $modalStack.dismiss(modal.key, 'escape key press');                                                     // 2201
            });                                                                                                       // 2202
          }                                                                                                           // 2203
        }                                                                                                             // 2204
      });                                                                                                             // 2205
                                                                                                                      // 2206
      $modalStack.open = function (modalInstance, modal) {                                                            // 2207
                                                                                                                      // 2208
        var modalOpener = $document[0].activeElement;                                                                 // 2209
                                                                                                                      // 2210
        openedWindows.add(modalInstance, {                                                                            // 2211
          deferred: modal.deferred,                                                                                   // 2212
          renderDeferred: modal.renderDeferred,                                                                       // 2213
          modalScope: modal.scope,                                                                                    // 2214
          backdrop: modal.backdrop,                                                                                   // 2215
          keyboard: modal.keyboard                                                                                    // 2216
        });                                                                                                           // 2217
                                                                                                                      // 2218
        var body = $document.find('body').eq(0),                                                                      // 2219
            currBackdropIndex = backdropIndex();                                                                      // 2220
                                                                                                                      // 2221
        if (currBackdropIndex >= 0 && !backdropDomEl) {                                                               // 2222
          backdropScope = $rootScope.$new(true);                                                                      // 2223
          backdropScope.index = currBackdropIndex;                                                                    // 2224
          var angularBackgroundDomEl = angular.element('<div modal-backdrop="modal-backdrop"></div>');                // 2225
          angularBackgroundDomEl.attr('backdrop-class', modal.backdropClass);                                         // 2226
          if (modal.animation) {                                                                                      // 2227
            angularBackgroundDomEl.attr('modal-animation', 'true');                                                   // 2228
          }                                                                                                           // 2229
          backdropDomEl = $compile(angularBackgroundDomEl)(backdropScope);                                            // 2230
          body.append(backdropDomEl);                                                                                 // 2231
        }                                                                                                             // 2232
                                                                                                                      // 2233
        var angularDomEl = angular.element('<div modal-window="modal-window"></div>');                                // 2234
        angularDomEl.attr({                                                                                           // 2235
          'template-url': modal.windowTemplateUrl,                                                                    // 2236
          'window-class': modal.windowClass,                                                                          // 2237
          'size': modal.size,                                                                                         // 2238
          'index': openedWindows.length() - 1,                                                                        // 2239
          'animate': 'animate'                                                                                        // 2240
        }).html(modal.content);                                                                                       // 2241
        if (modal.animation) {                                                                                        // 2242
          angularDomEl.attr('modal-animation', 'true');                                                               // 2243
        }                                                                                                             // 2244
                                                                                                                      // 2245
        var modalDomEl = $compile(angularDomEl)(modal.scope);                                                         // 2246
        openedWindows.top().value.modalDomEl = modalDomEl;                                                            // 2247
        openedWindows.top().value.modalOpener = modalOpener;                                                          // 2248
        body.append(modalDomEl);                                                                                      // 2249
        body.addClass(OPENED_MODAL_CLASS);                                                                            // 2250
      };                                                                                                              // 2251
                                                                                                                      // 2252
      function broadcastClosing(modalWindow, resultOrReason, closing) {                                               // 2253
          return !modalWindow.value.modalScope.$broadcast('modal.closing', resultOrReason, closing).defaultPrevented; // 2254
      }                                                                                                               // 2255
                                                                                                                      // 2256
      $modalStack.close = function (modalInstance, result) {                                                          // 2257
        var modalWindow = openedWindows.get(modalInstance);                                                           // 2258
        if (modalWindow && broadcastClosing(modalWindow, result, true)) {                                             // 2259
          modalWindow.value.deferred.resolve(result);                                                                 // 2260
          removeModalWindow(modalInstance);                                                                           // 2261
          modalWindow.value.modalOpener.focus();                                                                      // 2262
          return true;                                                                                                // 2263
        }                                                                                                             // 2264
        return !modalWindow;                                                                                          // 2265
      };                                                                                                              // 2266
                                                                                                                      // 2267
      $modalStack.dismiss = function (modalInstance, reason) {                                                        // 2268
        var modalWindow = openedWindows.get(modalInstance);                                                           // 2269
        if (modalWindow && broadcastClosing(modalWindow, reason, false)) {                                            // 2270
          modalWindow.value.deferred.reject(reason);                                                                  // 2271
          removeModalWindow(modalInstance);                                                                           // 2272
          modalWindow.value.modalOpener.focus();                                                                      // 2273
          return true;                                                                                                // 2274
        }                                                                                                             // 2275
        return !modalWindow;                                                                                          // 2276
      };                                                                                                              // 2277
                                                                                                                      // 2278
      $modalStack.dismissAll = function (reason) {                                                                    // 2279
        var topModal = this.getTop();                                                                                 // 2280
        while (topModal && this.dismiss(topModal.key, reason)) {                                                      // 2281
          topModal = this.getTop();                                                                                   // 2282
        }                                                                                                             // 2283
      };                                                                                                              // 2284
                                                                                                                      // 2285
      $modalStack.getTop = function () {                                                                              // 2286
        return openedWindows.top();                                                                                   // 2287
      };                                                                                                              // 2288
                                                                                                                      // 2289
      $modalStack.modalRendered = function (modalInstance) {                                                          // 2290
        var modalWindow = openedWindows.get(modalInstance);                                                           // 2291
        if (modalWindow) {                                                                                            // 2292
          modalWindow.value.renderDeferred.resolve();                                                                 // 2293
        }                                                                                                             // 2294
      };                                                                                                              // 2295
                                                                                                                      // 2296
      return $modalStack;                                                                                             // 2297
    }])                                                                                                               // 2298
                                                                                                                      // 2299
  .provider('$modal', function () {                                                                                   // 2300
                                                                                                                      // 2301
    var $modalProvider = {                                                                                            // 2302
      options: {                                                                                                      // 2303
        animation: true,                                                                                              // 2304
        backdrop: true, //can also be false or 'static'                                                               // 2305
        keyboard: true                                                                                                // 2306
      },                                                                                                              // 2307
      $get: ['$injector', '$rootScope', '$q', '$templateRequest', '$controller', '$modalStack',                       // 2308
        function ($injector, $rootScope, $q, $templateRequest, $controller, $modalStack) {                            // 2309
                                                                                                                      // 2310
          var $modal = {};                                                                                            // 2311
                                                                                                                      // 2312
          function getTemplatePromise(options) {                                                                      // 2313
            return options.template ? $q.when(options.template) :                                                     // 2314
              $templateRequest(angular.isFunction(options.templateUrl) ? (options.templateUrl)() : options.templateUrl);
          }                                                                                                           // 2316
                                                                                                                      // 2317
          function getResolvePromises(resolves) {                                                                     // 2318
            var promisesArr = [];                                                                                     // 2319
            angular.forEach(resolves, function (value) {                                                              // 2320
              if (angular.isFunction(value) || angular.isArray(value)) {                                              // 2321
                promisesArr.push($q.when($injector.invoke(value)));                                                   // 2322
              }                                                                                                       // 2323
            });                                                                                                       // 2324
            return promisesArr;                                                                                       // 2325
          }                                                                                                           // 2326
                                                                                                                      // 2327
          $modal.open = function (modalOptions) {                                                                     // 2328
                                                                                                                      // 2329
            var modalResultDeferred = $q.defer();                                                                     // 2330
            var modalOpenedDeferred = $q.defer();                                                                     // 2331
            var modalRenderDeferred = $q.defer();                                                                     // 2332
                                                                                                                      // 2333
            //prepare an instance of a modal to be injected into controllers and returned to a caller                 // 2334
            var modalInstance = {                                                                                     // 2335
              result: modalResultDeferred.promise,                                                                    // 2336
              opened: modalOpenedDeferred.promise,                                                                    // 2337
              rendered: modalRenderDeferred.promise,                                                                  // 2338
              close: function (result) {                                                                              // 2339
                return $modalStack.close(modalInstance, result);                                                      // 2340
              },                                                                                                      // 2341
              dismiss: function (reason) {                                                                            // 2342
                return $modalStack.dismiss(modalInstance, reason);                                                    // 2343
              }                                                                                                       // 2344
            };                                                                                                        // 2345
                                                                                                                      // 2346
            //merge and clean up options                                                                              // 2347
            modalOptions = angular.extend({}, $modalProvider.options, modalOptions);                                  // 2348
            modalOptions.resolve = modalOptions.resolve || {};                                                        // 2349
                                                                                                                      // 2350
            //verify options                                                                                          // 2351
            if (!modalOptions.template && !modalOptions.templateUrl) {                                                // 2352
              throw new Error('One of template or templateUrl options is required.');                                 // 2353
            }                                                                                                         // 2354
                                                                                                                      // 2355
            var templateAndResolvePromise =                                                                           // 2356
              $q.all([getTemplatePromise(modalOptions)].concat(getResolvePromises(modalOptions.resolve)));            // 2357
                                                                                                                      // 2358
                                                                                                                      // 2359
            templateAndResolvePromise.then(function resolveSuccess(tplAndVars) {                                      // 2360
                                                                                                                      // 2361
              var modalScope = (modalOptions.scope || $rootScope).$new();                                             // 2362
              modalScope.$close = modalInstance.close;                                                                // 2363
              modalScope.$dismiss = modalInstance.dismiss;                                                            // 2364
                                                                                                                      // 2365
              var ctrlInstance, ctrlLocals = {};                                                                      // 2366
              var resolveIter = 1;                                                                                    // 2367
                                                                                                                      // 2368
              //controllers                                                                                           // 2369
              if (modalOptions.controller) {                                                                          // 2370
                ctrlLocals.$scope = modalScope;                                                                       // 2371
                ctrlLocals.$modalInstance = modalInstance;                                                            // 2372
                angular.forEach(modalOptions.resolve, function (value, key) {                                         // 2373
                  ctrlLocals[key] = tplAndVars[resolveIter++];                                                        // 2374
                });                                                                                                   // 2375
                                                                                                                      // 2376
                ctrlInstance = $controller(modalOptions.controller, ctrlLocals);                                      // 2377
                if (modalOptions.controllerAs) {                                                                      // 2378
                  modalScope[modalOptions.controllerAs] = ctrlInstance;                                               // 2379
                }                                                                                                     // 2380
              }                                                                                                       // 2381
                                                                                                                      // 2382
              $modalStack.open(modalInstance, {                                                                       // 2383
                scope: modalScope,                                                                                    // 2384
                deferred: modalResultDeferred,                                                                        // 2385
                renderDeferred: modalRenderDeferred,                                                                  // 2386
                content: tplAndVars[0],                                                                               // 2387
                animation: modalOptions.animation,                                                                    // 2388
                backdrop: modalOptions.backdrop,                                                                      // 2389
                keyboard: modalOptions.keyboard,                                                                      // 2390
                backdropClass: modalOptions.backdropClass,                                                            // 2391
                windowClass: modalOptions.windowClass,                                                                // 2392
                windowTemplateUrl: modalOptions.windowTemplateUrl,                                                    // 2393
                size: modalOptions.size                                                                               // 2394
              });                                                                                                     // 2395
                                                                                                                      // 2396
            }, function resolveError(reason) {                                                                        // 2397
              modalResultDeferred.reject(reason);                                                                     // 2398
            });                                                                                                       // 2399
                                                                                                                      // 2400
            templateAndResolvePromise.then(function () {                                                              // 2401
              modalOpenedDeferred.resolve(true);                                                                      // 2402
            }, function (reason) {                                                                                    // 2403
              modalOpenedDeferred.reject(reason);                                                                     // 2404
            });                                                                                                       // 2405
                                                                                                                      // 2406
            return modalInstance;                                                                                     // 2407
          };                                                                                                          // 2408
                                                                                                                      // 2409
          return $modal;                                                                                              // 2410
        }]                                                                                                            // 2411
    };                                                                                                                // 2412
                                                                                                                      // 2413
    return $modalProvider;                                                                                            // 2414
  });                                                                                                                 // 2415
                                                                                                                      // 2416
angular.module('ui.bootstrap.pagination', [])                                                                         // 2417
                                                                                                                      // 2418
.controller('PaginationController', ['$scope', '$attrs', '$parse', function ($scope, $attrs, $parse) {                // 2419
  var self = this,                                                                                                    // 2420
      ngModelCtrl = { $setViewValue: angular.noop }, // nullModelCtrl                                                 // 2421
      setNumPages = $attrs.numPages ? $parse($attrs.numPages).assign : angular.noop;                                  // 2422
                                                                                                                      // 2423
  this.init = function(ngModelCtrl_, config) {                                                                        // 2424
    ngModelCtrl = ngModelCtrl_;                                                                                       // 2425
    this.config = config;                                                                                             // 2426
                                                                                                                      // 2427
    ngModelCtrl.$render = function() {                                                                                // 2428
      self.render();                                                                                                  // 2429
    };                                                                                                                // 2430
                                                                                                                      // 2431
    if ($attrs.itemsPerPage) {                                                                                        // 2432
      $scope.$parent.$watch($parse($attrs.itemsPerPage), function(value) {                                            // 2433
        self.itemsPerPage = parseInt(value, 10);                                                                      // 2434
        $scope.totalPages = self.calculateTotalPages();                                                               // 2435
      });                                                                                                             // 2436
    } else {                                                                                                          // 2437
      this.itemsPerPage = config.itemsPerPage;                                                                        // 2438
    }                                                                                                                 // 2439
                                                                                                                      // 2440
    $scope.$watch('totalItems', function() {                                                                          // 2441
      $scope.totalPages = self.calculateTotalPages();                                                                 // 2442
    });                                                                                                               // 2443
                                                                                                                      // 2444
    $scope.$watch('totalPages', function(value) {                                                                     // 2445
      setNumPages($scope.$parent, value); // Readonly variable                                                        // 2446
                                                                                                                      // 2447
      if ( $scope.page > value ) {                                                                                    // 2448
        $scope.selectPage(value);                                                                                     // 2449
      } else {                                                                                                        // 2450
        ngModelCtrl.$render();                                                                                        // 2451
      }                                                                                                               // 2452
    });                                                                                                               // 2453
  };                                                                                                                  // 2454
                                                                                                                      // 2455
  this.calculateTotalPages = function() {                                                                             // 2456
    var totalPages = this.itemsPerPage < 1 ? 1 : Math.ceil($scope.totalItems / this.itemsPerPage);                    // 2457
    return Math.max(totalPages || 0, 1);                                                                              // 2458
  };                                                                                                                  // 2459
                                                                                                                      // 2460
  this.render = function() {                                                                                          // 2461
    $scope.page = parseInt(ngModelCtrl.$viewValue, 10) || 1;                                                          // 2462
  };                                                                                                                  // 2463
                                                                                                                      // 2464
  $scope.selectPage = function(page, evt) {                                                                           // 2465
    if ( $scope.page !== page && page > 0 && page <= $scope.totalPages) {                                             // 2466
      if (evt && evt.target) {                                                                                        // 2467
        evt.target.blur();                                                                                            // 2468
      }                                                                                                               // 2469
      ngModelCtrl.$setViewValue(page);                                                                                // 2470
      ngModelCtrl.$render();                                                                                          // 2471
    }                                                                                                                 // 2472
  };                                                                                                                  // 2473
                                                                                                                      // 2474
  $scope.getText = function( key ) {                                                                                  // 2475
    return $scope[key + 'Text'] || self.config[key + 'Text'];                                                         // 2476
  };                                                                                                                  // 2477
  $scope.noPrevious = function() {                                                                                    // 2478
    return $scope.page === 1;                                                                                         // 2479
  };                                                                                                                  // 2480
  $scope.noNext = function() {                                                                                        // 2481
    return $scope.page === $scope.totalPages;                                                                         // 2482
  };                                                                                                                  // 2483
}])                                                                                                                   // 2484
                                                                                                                      // 2485
.constant('paginationConfig', {                                                                                       // 2486
  itemsPerPage: 10,                                                                                                   // 2487
  boundaryLinks: false,                                                                                               // 2488
  directionLinks: true,                                                                                               // 2489
  firstText: 'First',                                                                                                 // 2490
  previousText: 'Previous',                                                                                           // 2491
  nextText: 'Next',                                                                                                   // 2492
  lastText: 'Last',                                                                                                   // 2493
  rotate: true                                                                                                        // 2494
})                                                                                                                    // 2495
                                                                                                                      // 2496
.directive('pagination', ['$parse', 'paginationConfig', function($parse, paginationConfig) {                          // 2497
  return {                                                                                                            // 2498
    restrict: 'EA',                                                                                                   // 2499
    scope: {                                                                                                          // 2500
      totalItems: '=',                                                                                                // 2501
      firstText: '@',                                                                                                 // 2502
      previousText: '@',                                                                                              // 2503
      nextText: '@',                                                                                                  // 2504
      lastText: '@'                                                                                                   // 2505
    },                                                                                                                // 2506
    require: ['pagination', '?ngModel'],                                                                              // 2507
    controller: 'PaginationController',                                                                               // 2508
    templateUrl: 'template/pagination/pagination.html',                                                               // 2509
    replace: true,                                                                                                    // 2510
    link: function(scope, element, attrs, ctrls) {                                                                    // 2511
      var paginationCtrl = ctrls[0], ngModelCtrl = ctrls[1];                                                          // 2512
                                                                                                                      // 2513
      if (!ngModelCtrl) {                                                                                             // 2514
         return; // do nothing if no ng-model                                                                         // 2515
      }                                                                                                               // 2516
                                                                                                                      // 2517
      // Setup configuration parameters                                                                               // 2518
      var maxSize = angular.isDefined(attrs.maxSize) ? scope.$parent.$eval(attrs.maxSize) : paginationConfig.maxSize, // 2519
          rotate = angular.isDefined(attrs.rotate) ? scope.$parent.$eval(attrs.rotate) : paginationConfig.rotate;     // 2520
      scope.boundaryLinks = angular.isDefined(attrs.boundaryLinks) ? scope.$parent.$eval(attrs.boundaryLinks) : paginationConfig.boundaryLinks;
      scope.directionLinks = angular.isDefined(attrs.directionLinks) ? scope.$parent.$eval(attrs.directionLinks) : paginationConfig.directionLinks;
                                                                                                                      // 2523
      paginationCtrl.init(ngModelCtrl, paginationConfig);                                                             // 2524
                                                                                                                      // 2525
      if (attrs.maxSize) {                                                                                            // 2526
        scope.$parent.$watch($parse(attrs.maxSize), function(value) {                                                 // 2527
          maxSize = parseInt(value, 10);                                                                              // 2528
          paginationCtrl.render();                                                                                    // 2529
        });                                                                                                           // 2530
      }                                                                                                               // 2531
                                                                                                                      // 2532
      // Create page object used in template                                                                          // 2533
      function makePage(number, text, isActive) {                                                                     // 2534
        return {                                                                                                      // 2535
          number: number,                                                                                             // 2536
          text: text,                                                                                                 // 2537
          active: isActive                                                                                            // 2538
        };                                                                                                            // 2539
      }                                                                                                               // 2540
                                                                                                                      // 2541
      function getPages(currentPage, totalPages) {                                                                    // 2542
        var pages = [];                                                                                               // 2543
                                                                                                                      // 2544
        // Default page limits                                                                                        // 2545
        var startPage = 1, endPage = totalPages;                                                                      // 2546
        var isMaxSized = ( angular.isDefined(maxSize) && maxSize < totalPages );                                      // 2547
                                                                                                                      // 2548
        // recompute if maxSize                                                                                       // 2549
        if ( isMaxSized ) {                                                                                           // 2550
          if ( rotate ) {                                                                                             // 2551
            // Current page is displayed in the middle of the visible ones                                            // 2552
            startPage = Math.max(currentPage - Math.floor(maxSize/2), 1);                                             // 2553
            endPage   = startPage + maxSize - 1;                                                                      // 2554
                                                                                                                      // 2555
            // Adjust if limit is exceeded                                                                            // 2556
            if (endPage > totalPages) {                                                                               // 2557
              endPage   = totalPages;                                                                                 // 2558
              startPage = endPage - maxSize + 1;                                                                      // 2559
            }                                                                                                         // 2560
          } else {                                                                                                    // 2561
            // Visible pages are paginated with maxSize                                                               // 2562
            startPage = ((Math.ceil(currentPage / maxSize) - 1) * maxSize) + 1;                                       // 2563
                                                                                                                      // 2564
            // Adjust last page if limit is exceeded                                                                  // 2565
            endPage = Math.min(startPage + maxSize - 1, totalPages);                                                  // 2566
          }                                                                                                           // 2567
        }                                                                                                             // 2568
                                                                                                                      // 2569
        // Add page number links                                                                                      // 2570
        for (var number = startPage; number <= endPage; number++) {                                                   // 2571
          var page = makePage(number, number, number === currentPage);                                                // 2572
          pages.push(page);                                                                                           // 2573
        }                                                                                                             // 2574
                                                                                                                      // 2575
        // Add links to move between page sets                                                                        // 2576
        if ( isMaxSized && ! rotate ) {                                                                               // 2577
          if ( startPage > 1 ) {                                                                                      // 2578
            var previousPageSet = makePage(startPage - 1, '...', false);                                              // 2579
            pages.unshift(previousPageSet);                                                                           // 2580
          }                                                                                                           // 2581
                                                                                                                      // 2582
          if ( endPage < totalPages ) {                                                                               // 2583
            var nextPageSet = makePage(endPage + 1, '...', false);                                                    // 2584
            pages.push(nextPageSet);                                                                                  // 2585
          }                                                                                                           // 2586
        }                                                                                                             // 2587
                                                                                                                      // 2588
        return pages;                                                                                                 // 2589
      }                                                                                                               // 2590
                                                                                                                      // 2591
      var originalRender = paginationCtrl.render;                                                                     // 2592
      paginationCtrl.render = function() {                                                                            // 2593
        originalRender();                                                                                             // 2594
        if (scope.page > 0 && scope.page <= scope.totalPages) {                                                       // 2595
          scope.pages = getPages(scope.page, scope.totalPages);                                                       // 2596
        }                                                                                                             // 2597
      };                                                                                                              // 2598
    }                                                                                                                 // 2599
  };                                                                                                                  // 2600
}])                                                                                                                   // 2601
                                                                                                                      // 2602
.constant('pagerConfig', {                                                                                            // 2603
  itemsPerPage: 10,                                                                                                   // 2604
  previousText: '« Previous',                                                                                         // 2605
  nextText: 'Next »',                                                                                                 // 2606
  align: true                                                                                                         // 2607
})                                                                                                                    // 2608
                                                                                                                      // 2609
.directive('pager', ['pagerConfig', function(pagerConfig) {                                                           // 2610
  return {                                                                                                            // 2611
    restrict: 'EA',                                                                                                   // 2612
    scope: {                                                                                                          // 2613
      totalItems: '=',                                                                                                // 2614
      previousText: '@',                                                                                              // 2615
      nextText: '@'                                                                                                   // 2616
    },                                                                                                                // 2617
    require: ['pager', '?ngModel'],                                                                                   // 2618
    controller: 'PaginationController',                                                                               // 2619
    templateUrl: 'template/pagination/pager.html',                                                                    // 2620
    replace: true,                                                                                                    // 2621
    link: function(scope, element, attrs, ctrls) {                                                                    // 2622
      var paginationCtrl = ctrls[0], ngModelCtrl = ctrls[1];                                                          // 2623
                                                                                                                      // 2624
      if (!ngModelCtrl) {                                                                                             // 2625
         return; // do nothing if no ng-model                                                                         // 2626
      }                                                                                                               // 2627
                                                                                                                      // 2628
      scope.align = angular.isDefined(attrs.align) ? scope.$parent.$eval(attrs.align) : pagerConfig.align;            // 2629
      paginationCtrl.init(ngModelCtrl, pagerConfig);                                                                  // 2630
    }                                                                                                                 // 2631
  };                                                                                                                  // 2632
}]);                                                                                                                  // 2633
                                                                                                                      // 2634
/**                                                                                                                   // 2635
 * The following features are still outstanding: animation as a                                                       // 2636
 * function, placement as a function, inside, support for more triggers than                                          // 2637
 * just mouse enter/leave, html tooltips, and selector delegation.                                                    // 2638
 */                                                                                                                   // 2639
angular.module( 'ui.bootstrap.tooltip', [ 'ui.bootstrap.position', 'ui.bootstrap.bindHtml' ] )                        // 2640
                                                                                                                      // 2641
/**                                                                                                                   // 2642
 * The $tooltip service creates tooltip- and popover-like directives as well as                                       // 2643
 * houses global options for them.                                                                                    // 2644
 */                                                                                                                   // 2645
.provider( '$tooltip', function () {                                                                                  // 2646
  // The default options tooltip and popover.                                                                         // 2647
  var defaultOptions = {                                                                                              // 2648
    placement: 'top',                                                                                                 // 2649
    animation: true,                                                                                                  // 2650
    popupDelay: 0,                                                                                                    // 2651
    useContentExp: false                                                                                              // 2652
  };                                                                                                                  // 2653
                                                                                                                      // 2654
  // Default hide triggers for each show trigger                                                                      // 2655
  var triggerMap = {                                                                                                  // 2656
    'mouseenter': 'mouseleave',                                                                                       // 2657
    'click': 'click',                                                                                                 // 2658
    'focus': 'blur'                                                                                                   // 2659
  };                                                                                                                  // 2660
                                                                                                                      // 2661
  // The options specified to the provider globally.                                                                  // 2662
  var globalOptions = {};                                                                                             // 2663
                                                                                                                      // 2664
  /**                                                                                                                 // 2665
   * `options({})` allows global configuration of all tooltips in the                                                 // 2666
   * application.                                                                                                     // 2667
   *                                                                                                                  // 2668
   *   var app = angular.module( 'App', ['ui.bootstrap.tooltip'], function( $tooltipProvider ) {                      // 2669
   *     // place tooltips left instead of top by default                                                             // 2670
   *     $tooltipProvider.options( { placement: 'left' } );                                                           // 2671
   *   });                                                                                                            // 2672
   */                                                                                                                 // 2673
	this.options = function( value ) {                                                                                   // 2674
		angular.extend( globalOptions, value );                                                                             // 2675
	};                                                                                                                   // 2676
                                                                                                                      // 2677
  /**                                                                                                                 // 2678
   * This allows you to extend the set of trigger mappings available. E.g.:                                           // 2679
   *                                                                                                                  // 2680
   *   $tooltipProvider.setTriggers( 'openTrigger': 'closeTrigger' );                                                 // 2681
   */                                                                                                                 // 2682
  this.setTriggers = function setTriggers ( triggers ) {                                                              // 2683
    angular.extend( triggerMap, triggers );                                                                           // 2684
  };                                                                                                                  // 2685
                                                                                                                      // 2686
  /**                                                                                                                 // 2687
   * This is a helper function for translating camel-case to snake-case.                                              // 2688
   */                                                                                                                 // 2689
  function snake_case(name){                                                                                          // 2690
    var regexp = /[A-Z]/g;                                                                                            // 2691
    var separator = '-';                                                                                              // 2692
    return name.replace(regexp, function(letter, pos) {                                                               // 2693
      return (pos ? separator : '') + letter.toLowerCase();                                                           // 2694
    });                                                                                                               // 2695
  }                                                                                                                   // 2696
                                                                                                                      // 2697
  /**                                                                                                                 // 2698
   * Returns the actual instance of the $tooltip service.                                                             // 2699
   * TODO support multiple triggers                                                                                   // 2700
   */                                                                                                                 // 2701
  this.$get = [ '$window', '$compile', '$timeout', '$document', '$position', '$interpolate', function ( $window, $compile, $timeout, $document, $position, $interpolate ) {
    return function $tooltip ( type, prefix, defaultTriggerShow, options ) {                                          // 2703
      options = angular.extend( {}, defaultOptions, globalOptions, options );                                         // 2704
                                                                                                                      // 2705
      /**                                                                                                             // 2706
       * Returns an object of show and hide triggers.                                                                 // 2707
       *                                                                                                              // 2708
       * If a trigger is supplied,                                                                                    // 2709
       * it is used to show the tooltip; otherwise, it will use the `trigger`                                         // 2710
       * option passed to the `$tooltipProvider.options` method; else it will                                         // 2711
       * default to the trigger supplied to this directive factory.                                                   // 2712
       *                                                                                                              // 2713
       * The hide trigger is based on the show trigger. If the `trigger` option                                       // 2714
       * was passed to the `$tooltipProvider.options` method, it will use the                                         // 2715
       * mapped trigger from `triggerMap` or the passed trigger if the map is                                         // 2716
       * undefined; otherwise, it uses the `triggerMap` value of the show                                             // 2717
       * trigger; else it will just use the show trigger.                                                             // 2718
       */                                                                                                             // 2719
      function getTriggers ( trigger ) {                                                                              // 2720
        var show = trigger || options.trigger || defaultTriggerShow;                                                  // 2721
        var hide = triggerMap[show] || show;                                                                          // 2722
        return {                                                                                                      // 2723
          show: show,                                                                                                 // 2724
          hide: hide                                                                                                  // 2725
        };                                                                                                            // 2726
      }                                                                                                               // 2727
                                                                                                                      // 2728
      var directiveName = snake_case( type );                                                                         // 2729
                                                                                                                      // 2730
      var startSym = $interpolate.startSymbol();                                                                      // 2731
      var endSym = $interpolate.endSymbol();                                                                          // 2732
      var template =                                                                                                  // 2733
        '<div '+ directiveName +'-popup '+                                                                            // 2734
          'title="'+startSym+'title'+endSym+'" '+                                                                     // 2735
          (options.useContentExp ?                                                                                    // 2736
            'content-exp="contentExp()" ' :                                                                           // 2737
            'content="'+startSym+'content'+endSym+'" ') +                                                             // 2738
          'placement="'+startSym+'placement'+endSym+'" '+                                                             // 2739
          'popup-class="'+startSym+'popupClass'+endSym+'" '+                                                          // 2740
          'animation="animation" '+                                                                                   // 2741
          'is-open="isOpen"'+                                                                                         // 2742
          'origin-scope="origScope" '+                                                                                // 2743
          '>'+                                                                                                        // 2744
        '</div>';                                                                                                     // 2745
                                                                                                                      // 2746
      return {                                                                                                        // 2747
        restrict: 'EA',                                                                                               // 2748
        compile: function (tElem, tAttrs) {                                                                           // 2749
          var tooltipLinker = $compile( template );                                                                   // 2750
                                                                                                                      // 2751
          return function link ( scope, element, attrs, tooltipCtrl ) {                                               // 2752
            var tooltip;                                                                                              // 2753
            var tooltipLinkedScope;                                                                                   // 2754
            var transitionTimeout;                                                                                    // 2755
            var popupTimeout;                                                                                         // 2756
            var appendToBody = angular.isDefined( options.appendToBody ) ? options.appendToBody : false;              // 2757
            var triggers = getTriggers( undefined );                                                                  // 2758
            var hasEnableExp = angular.isDefined(attrs[prefix+'Enable']);                                             // 2759
            var ttScope = scope.$new(true);                                                                           // 2760
                                                                                                                      // 2761
            var positionTooltip = function () {                                                                       // 2762
              if (!tooltip) { return; }                                                                               // 2763
                                                                                                                      // 2764
              var ttPosition = $position.positionElements(element, tooltip, ttScope.placement, appendToBody);         // 2765
              ttPosition.top += 'px';                                                                                 // 2766
              ttPosition.left += 'px';                                                                                // 2767
                                                                                                                      // 2768
              // Now set the calculated positioning.                                                                  // 2769
              tooltip.css( ttPosition );                                                                              // 2770
            };                                                                                                        // 2771
                                                                                                                      // 2772
            // Set up the correct scope to allow transclusion later                                                   // 2773
            ttScope.origScope = scope;                                                                                // 2774
                                                                                                                      // 2775
            // By default, the tooltip is not open.                                                                   // 2776
            // TODO add ability to start tooltip opened                                                               // 2777
            ttScope.isOpen = false;                                                                                   // 2778
                                                                                                                      // 2779
            function toggleTooltipBind () {                                                                           // 2780
              if ( ! ttScope.isOpen ) {                                                                               // 2781
                showTooltipBind();                                                                                    // 2782
              } else {                                                                                                // 2783
                hideTooltipBind();                                                                                    // 2784
              }                                                                                                       // 2785
            }                                                                                                         // 2786
                                                                                                                      // 2787
            // Show the tooltip with delay if specified, otherwise show it immediately                                // 2788
            function showTooltipBind() {                                                                              // 2789
              if(hasEnableExp && !scope.$eval(attrs[prefix+'Enable'])) {                                              // 2790
                return;                                                                                               // 2791
              }                                                                                                       // 2792
                                                                                                                      // 2793
              prepareTooltip();                                                                                       // 2794
                                                                                                                      // 2795
              if ( ttScope.popupDelay ) {                                                                             // 2796
                // Do nothing if the tooltip was already scheduled to pop-up.                                         // 2797
                // This happens if show is triggered multiple times before any hide is triggered.                     // 2798
                if (!popupTimeout) {                                                                                  // 2799
                  popupTimeout = $timeout( show, ttScope.popupDelay, false );                                         // 2800
                  popupTimeout.then(function(reposition){reposition();});                                             // 2801
                }                                                                                                     // 2802
              } else {                                                                                                // 2803
                show()();                                                                                             // 2804
              }                                                                                                       // 2805
            }                                                                                                         // 2806
                                                                                                                      // 2807
            function hideTooltipBind () {                                                                             // 2808
              scope.$apply(function () {                                                                              // 2809
                hide();                                                                                               // 2810
              });                                                                                                     // 2811
            }                                                                                                         // 2812
                                                                                                                      // 2813
            // Show the tooltip popup element.                                                                        // 2814
            function show() {                                                                                         // 2815
                                                                                                                      // 2816
              popupTimeout = null;                                                                                    // 2817
                                                                                                                      // 2818
              // If there is a pending remove transition, we must cancel it, lest the                                 // 2819
              // tooltip be mysteriously removed.                                                                     // 2820
              if ( transitionTimeout ) {                                                                              // 2821
                $timeout.cancel( transitionTimeout );                                                                 // 2822
                transitionTimeout = null;                                                                             // 2823
              }                                                                                                       // 2824
                                                                                                                      // 2825
              // Don't show empty tooltips.                                                                           // 2826
              if ( !(options.useContentExp ? ttScope.contentExp() : ttScope.content) ) {                              // 2827
                return angular.noop;                                                                                  // 2828
              }                                                                                                       // 2829
                                                                                                                      // 2830
              createTooltip();                                                                                        // 2831
                                                                                                                      // 2832
              // Set the initial positioning.                                                                         // 2833
              tooltip.css({ top: 0, left: 0, display: 'block' });                                                     // 2834
              ttScope.$digest();                                                                                      // 2835
                                                                                                                      // 2836
              positionTooltip();                                                                                      // 2837
                                                                                                                      // 2838
              // And show the tooltip.                                                                                // 2839
              ttScope.isOpen = true;                                                                                  // 2840
              ttScope.$apply(); // digest required as $apply is not called                                            // 2841
                                                                                                                      // 2842
              // Return positioning function as promise callback for correct                                          // 2843
              // positioning after draw.                                                                              // 2844
              return positionTooltip;                                                                                 // 2845
            }                                                                                                         // 2846
                                                                                                                      // 2847
            // Hide the tooltip popup element.                                                                        // 2848
            function hide() {                                                                                         // 2849
              // First things first: we don't show it anymore.                                                        // 2850
              ttScope.isOpen = false;                                                                                 // 2851
                                                                                                                      // 2852
              //if tooltip is going to be shown after delay, we must cancel this                                      // 2853
              $timeout.cancel( popupTimeout );                                                                        // 2854
              popupTimeout = null;                                                                                    // 2855
                                                                                                                      // 2856
              // And now we remove it from the DOM. However, if we have animation, we                                 // 2857
              // need to wait for it to expire beforehand.                                                            // 2858
              // FIXME: this is a placeholder for a port of the transitions library.                                  // 2859
              if ( ttScope.animation ) {                                                                              // 2860
                if (!transitionTimeout) {                                                                             // 2861
                  transitionTimeout = $timeout(removeTooltip, 500);                                                   // 2862
                }                                                                                                     // 2863
              } else {                                                                                                // 2864
                removeTooltip();                                                                                      // 2865
              }                                                                                                       // 2866
            }                                                                                                         // 2867
                                                                                                                      // 2868
            function createTooltip() {                                                                                // 2869
              // There can only be one tooltip element per directive shown at once.                                   // 2870
              if (tooltip) {                                                                                          // 2871
                removeTooltip();                                                                                      // 2872
              }                                                                                                       // 2873
              tooltipLinkedScope = ttScope.$new();                                                                    // 2874
              tooltip = tooltipLinker(tooltipLinkedScope, function (tooltip) {                                        // 2875
                if ( appendToBody ) {                                                                                 // 2876
                  $document.find( 'body' ).append( tooltip );                                                         // 2877
                } else {                                                                                              // 2878
                  element.after( tooltip );                                                                           // 2879
                }                                                                                                     // 2880
              });                                                                                                     // 2881
                                                                                                                      // 2882
              tooltipLinkedScope.$watch(function () {                                                                 // 2883
                $timeout(positionTooltip, 0, false);                                                                  // 2884
              });                                                                                                     // 2885
                                                                                                                      // 2886
              if (options.useContentExp) {                                                                            // 2887
                tooltipLinkedScope.$watch('contentExp()', function (val) {                                            // 2888
                  if (!val && ttScope.isOpen ) {                                                                      // 2889
                    hide();                                                                                           // 2890
                  }                                                                                                   // 2891
                });                                                                                                   // 2892
              }                                                                                                       // 2893
            }                                                                                                         // 2894
                                                                                                                      // 2895
            function removeTooltip() {                                                                                // 2896
              transitionTimeout = null;                                                                               // 2897
              if (tooltip) {                                                                                          // 2898
                tooltip.remove();                                                                                     // 2899
                tooltip = null;                                                                                       // 2900
              }                                                                                                       // 2901
              if (tooltipLinkedScope) {                                                                               // 2902
                tooltipLinkedScope.$destroy();                                                                        // 2903
                tooltipLinkedScope = null;                                                                            // 2904
              }                                                                                                       // 2905
            }                                                                                                         // 2906
                                                                                                                      // 2907
            function prepareTooltip() {                                                                               // 2908
              prepPopupClass();                                                                                       // 2909
              prepPlacement();                                                                                        // 2910
              prepPopupDelay();                                                                                       // 2911
            }                                                                                                         // 2912
                                                                                                                      // 2913
            ttScope.contentExp = function () {                                                                        // 2914
              return scope.$eval(attrs[type]);                                                                        // 2915
            };                                                                                                        // 2916
                                                                                                                      // 2917
            /**                                                                                                       // 2918
             * Observe the relevant attributes.                                                                       // 2919
             */                                                                                                       // 2920
            if (!options.useContentExp) {                                                                             // 2921
              attrs.$observe( type, function ( val ) {                                                                // 2922
                ttScope.content = val;                                                                                // 2923
                                                                                                                      // 2924
                if (!val && ttScope.isOpen ) {                                                                        // 2925
                  hide();                                                                                             // 2926
                }                                                                                                     // 2927
              });                                                                                                     // 2928
            }                                                                                                         // 2929
                                                                                                                      // 2930
            attrs.$observe( 'disabled', function ( val ) {                                                            // 2931
              if (val && ttScope.isOpen ) {                                                                           // 2932
                hide();                                                                                               // 2933
              }                                                                                                       // 2934
            });                                                                                                       // 2935
                                                                                                                      // 2936
            attrs.$observe( prefix+'Title', function ( val ) {                                                        // 2937
              ttScope.title = val;                                                                                    // 2938
            });                                                                                                       // 2939
                                                                                                                      // 2940
            function prepPopupClass() {                                                                               // 2941
              ttScope.popupClass = attrs[prefix + 'Class'];                                                           // 2942
            }                                                                                                         // 2943
                                                                                                                      // 2944
            function prepPlacement() {                                                                                // 2945
              var val = attrs[ prefix + 'Placement' ];                                                                // 2946
              ttScope.placement = angular.isDefined( val ) ? val : options.placement;                                 // 2947
            }                                                                                                         // 2948
                                                                                                                      // 2949
            function prepPopupDelay() {                                                                               // 2950
              var val = attrs[ prefix + 'PopupDelay' ];                                                               // 2951
              var delay = parseInt( val, 10 );                                                                        // 2952
              ttScope.popupDelay = ! isNaN(delay) ? delay : options.popupDelay;                                       // 2953
            }                                                                                                         // 2954
                                                                                                                      // 2955
            var unregisterTriggers = function () {                                                                    // 2956
              element.unbind(triggers.show, showTooltipBind);                                                         // 2957
              element.unbind(triggers.hide, hideTooltipBind);                                                         // 2958
            };                                                                                                        // 2959
                                                                                                                      // 2960
            function prepTriggers() {                                                                                 // 2961
              var val = attrs[ prefix + 'Trigger' ];                                                                  // 2962
              unregisterTriggers();                                                                                   // 2963
                                                                                                                      // 2964
              triggers = getTriggers( val );                                                                          // 2965
                                                                                                                      // 2966
              if ( triggers.show === triggers.hide ) {                                                                // 2967
                element.bind( triggers.show, toggleTooltipBind );                                                     // 2968
              } else {                                                                                                // 2969
                element.bind( triggers.show, showTooltipBind );                                                       // 2970
                element.bind( triggers.hide, hideTooltipBind );                                                       // 2971
              }                                                                                                       // 2972
            }                                                                                                         // 2973
            prepTriggers();                                                                                           // 2974
                                                                                                                      // 2975
            var animation = scope.$eval(attrs[prefix + 'Animation']);                                                 // 2976
            ttScope.animation = angular.isDefined(animation) ? !!animation : options.animation;                       // 2977
                                                                                                                      // 2978
            var appendToBodyVal = scope.$eval(attrs[prefix + 'AppendToBody']);                                        // 2979
            appendToBody = angular.isDefined(appendToBodyVal) ? appendToBodyVal : appendToBody;                       // 2980
                                                                                                                      // 2981
            // if a tooltip is attached to <body> we need to remove it on                                             // 2982
            // location change as its parent scope will probably not be destroyed                                     // 2983
            // by the change.                                                                                         // 2984
            if ( appendToBody ) {                                                                                     // 2985
              scope.$on('$locationChangeSuccess', function closeTooltipOnLocationChangeSuccess () {                   // 2986
              if ( ttScope.isOpen ) {                                                                                 // 2987
                hide();                                                                                               // 2988
              }                                                                                                       // 2989
            });                                                                                                       // 2990
            }                                                                                                         // 2991
                                                                                                                      // 2992
            // Make sure tooltip is destroyed and removed.                                                            // 2993
            scope.$on('$destroy', function onDestroyTooltip() {                                                       // 2994
              $timeout.cancel( transitionTimeout );                                                                   // 2995
              $timeout.cancel( popupTimeout );                                                                        // 2996
              unregisterTriggers();                                                                                   // 2997
              removeTooltip();                                                                                        // 2998
              ttScope = null;                                                                                         // 2999
            });                                                                                                       // 3000
          };                                                                                                          // 3001
        }                                                                                                             // 3002
      };                                                                                                              // 3003
    };                                                                                                                // 3004
  }];                                                                                                                 // 3005
})                                                                                                                    // 3006
                                                                                                                      // 3007
// This is mostly ngInclude code but with a custom scope                                                              // 3008
.directive( 'tooltipTemplateTransclude', [                                                                            // 3009
         '$animate', '$sce', '$compile', '$templateRequest',                                                          // 3010
function ($animate ,  $sce ,  $compile ,  $templateRequest) {                                                         // 3011
  return {                                                                                                            // 3012
    link: function ( scope, elem, attrs ) {                                                                           // 3013
      var origScope = scope.$eval(attrs.tooltipTemplateTranscludeScope);                                              // 3014
                                                                                                                      // 3015
      var changeCounter = 0,                                                                                          // 3016
        currentScope,                                                                                                 // 3017
        previousElement,                                                                                              // 3018
        currentElement;                                                                                               // 3019
                                                                                                                      // 3020
      var cleanupLastIncludeContent = function() {                                                                    // 3021
        if (previousElement) {                                                                                        // 3022
          previousElement.remove();                                                                                   // 3023
          previousElement = null;                                                                                     // 3024
        }                                                                                                             // 3025
        if (currentScope) {                                                                                           // 3026
          currentScope.$destroy();                                                                                    // 3027
          currentScope = null;                                                                                        // 3028
        }                                                                                                             // 3029
        if (currentElement) {                                                                                         // 3030
          $animate.leave(currentElement).then(function() {                                                            // 3031
            previousElement = null;                                                                                   // 3032
          });                                                                                                         // 3033
          previousElement = currentElement;                                                                           // 3034
          currentElement = null;                                                                                      // 3035
        }                                                                                                             // 3036
      };                                                                                                              // 3037
                                                                                                                      // 3038
      scope.$watch($sce.parseAsResourceUrl(attrs.tooltipTemplateTransclude), function (src) {                         // 3039
        var thisChangeId = ++changeCounter;                                                                           // 3040
                                                                                                                      // 3041
        if (src) {                                                                                                    // 3042
          //set the 2nd param to true to ignore the template request error so that the inner                          // 3043
          //contents and scope can be cleaned up.                                                                     // 3044
          $templateRequest(src, true).then(function(response) {                                                       // 3045
            if (thisChangeId !== changeCounter) { return; }                                                           // 3046
            var newScope = origScope.$new();                                                                          // 3047
            var template = response;                                                                                  // 3048
                                                                                                                      // 3049
            var clone = $compile(template)(newScope, function(clone) {                                                // 3050
              cleanupLastIncludeContent();                                                                            // 3051
              $animate.enter(clone, elem);                                                                            // 3052
            });                                                                                                       // 3053
                                                                                                                      // 3054
            currentScope = newScope;                                                                                  // 3055
            currentElement = clone;                                                                                   // 3056
                                                                                                                      // 3057
            currentScope.$emit('$includeContentLoaded', src);                                                         // 3058
          }, function() {                                                                                             // 3059
            if (thisChangeId === changeCounter) {                                                                     // 3060
              cleanupLastIncludeContent();                                                                            // 3061
              scope.$emit('$includeContentError', src);                                                               // 3062
            }                                                                                                         // 3063
          });                                                                                                         // 3064
          scope.$emit('$includeContentRequested', src);                                                               // 3065
        } else {                                                                                                      // 3066
          cleanupLastIncludeContent();                                                                                // 3067
        }                                                                                                             // 3068
      });                                                                                                             // 3069
                                                                                                                      // 3070
      scope.$on('$destroy', cleanupLastIncludeContent);                                                               // 3071
    }                                                                                                                 // 3072
  };                                                                                                                  // 3073
}])                                                                                                                   // 3074
                                                                                                                      // 3075
/**                                                                                                                   // 3076
 * Note that it's intentional that these classes are *not* applied through $animate.                                  // 3077
 * They must not be animated as they're expected to be present on the tooltip on                                      // 3078
 * initialization.                                                                                                    // 3079
 */                                                                                                                   // 3080
.directive('tooltipClasses', function () {                                                                            // 3081
  return {                                                                                                            // 3082
    restrict: 'A',                                                                                                    // 3083
    link: function (scope, element, attrs) {                                                                          // 3084
      if (scope.placement) {                                                                                          // 3085
        element.addClass(scope.placement);                                                                            // 3086
      }                                                                                                               // 3087
      if (scope.popupClass) {                                                                                         // 3088
        element.addClass(scope.popupClass);                                                                           // 3089
      }                                                                                                               // 3090
      if (scope.animation()) {                                                                                        // 3091
        element.addClass(attrs.tooltipAnimationClass);                                                                // 3092
      }                                                                                                               // 3093
    }                                                                                                                 // 3094
  };                                                                                                                  // 3095
})                                                                                                                    // 3096
                                                                                                                      // 3097
.directive( 'tooltipPopup', function () {                                                                             // 3098
  return {                                                                                                            // 3099
    restrict: 'EA',                                                                                                   // 3100
    replace: true,                                                                                                    // 3101
    scope: { content: '@', placement: '@', popupClass: '@', animation: '&', isOpen: '&' },                            // 3102
    templateUrl: 'template/tooltip/tooltip-popup.html'                                                                // 3103
  };                                                                                                                  // 3104
})                                                                                                                    // 3105
                                                                                                                      // 3106
.directive( 'tooltip', [ '$tooltip', function ( $tooltip ) {                                                          // 3107
  return $tooltip( 'tooltip', 'tooltip', 'mouseenter' );                                                              // 3108
}])                                                                                                                   // 3109
                                                                                                                      // 3110
.directive( 'tooltipTemplatePopup', function () {                                                                     // 3111
  return {                                                                                                            // 3112
    restrict: 'EA',                                                                                                   // 3113
    replace: true,                                                                                                    // 3114
    scope: { contentExp: '&', placement: '@', popupClass: '@', animation: '&', isOpen: '&',                           // 3115
      originScope: '&' },                                                                                             // 3116
    templateUrl: 'template/tooltip/tooltip-template-popup.html'                                                       // 3117
  };                                                                                                                  // 3118
})                                                                                                                    // 3119
                                                                                                                      // 3120
.directive( 'tooltipTemplate', [ '$tooltip', function ( $tooltip ) {                                                  // 3121
  return $tooltip('tooltipTemplate', 'tooltip', 'mouseenter', {                                                       // 3122
    useContentExp: true                                                                                               // 3123
  });                                                                                                                 // 3124
}])                                                                                                                   // 3125
                                                                                                                      // 3126
.directive( 'tooltipHtmlPopup', function () {                                                                         // 3127
  return {                                                                                                            // 3128
    restrict: 'EA',                                                                                                   // 3129
    replace: true,                                                                                                    // 3130
    scope: { contentExp: '&', placement: '@', popupClass: '@', animation: '&', isOpen: '&' },                         // 3131
    templateUrl: 'template/tooltip/tooltip-html-popup.html'                                                           // 3132
  };                                                                                                                  // 3133
})                                                                                                                    // 3134
                                                                                                                      // 3135
.directive( 'tooltipHtml', [ '$tooltip', function ( $tooltip ) {                                                      // 3136
  return $tooltip('tooltipHtml', 'tooltip', 'mouseenter', {                                                           // 3137
    useContentExp: true                                                                                               // 3138
  });                                                                                                                 // 3139
}])                                                                                                                   // 3140
                                                                                                                      // 3141
/*                                                                                                                    // 3142
Deprecated                                                                                                            // 3143
*/                                                                                                                    // 3144
.directive( 'tooltipHtmlUnsafePopup', function () {                                                                   // 3145
  return {                                                                                                            // 3146
    restrict: 'EA',                                                                                                   // 3147
    replace: true,                                                                                                    // 3148
    scope: { content: '@', placement: '@', popupClass: '@', animation: '&', isOpen: '&' },                            // 3149
    templateUrl: 'template/tooltip/tooltip-html-unsafe-popup.html'                                                    // 3150
  };                                                                                                                  // 3151
})                                                                                                                    // 3152
                                                                                                                      // 3153
.value('tooltipHtmlUnsafeSuppressDeprecated', false)                                                                  // 3154
.directive( 'tooltipHtmlUnsafe', [                                                                                    // 3155
          '$tooltip', 'tooltipHtmlUnsafeSuppressDeprecated', '$log',                                                  // 3156
function ( $tooltip ,  tooltipHtmlUnsafeSuppressDeprecated ,  $log) {                                                 // 3157
  if (!tooltipHtmlUnsafeSuppressDeprecated) {                                                                         // 3158
    $log.warn('tooltip-html-unsafe is now deprecated. Use tooltip-html or tooltip-template instead.');                // 3159
  }                                                                                                                   // 3160
  return $tooltip( 'tooltipHtmlUnsafe', 'tooltip', 'mouseenter' );                                                    // 3161
}]);                                                                                                                  // 3162
                                                                                                                      // 3163
/**                                                                                                                   // 3164
 * The following features are still outstanding: popup delay, animation as a                                          // 3165
 * function, placement as a function, inside, support for more triggers than                                          // 3166
 * just mouse enter/leave, html popovers, and selector delegatation.                                                  // 3167
 */                                                                                                                   // 3168
angular.module( 'ui.bootstrap.popover', [ 'ui.bootstrap.tooltip' ] )                                                  // 3169
                                                                                                                      // 3170
.directive( 'popoverTemplatePopup', function () {                                                                     // 3171
  return {                                                                                                            // 3172
    restrict: 'EA',                                                                                                   // 3173
    replace: true,                                                                                                    // 3174
    scope: { title: '@', contentExp: '&', placement: '@', popupClass: '@', animation: '&', isOpen: '&',               // 3175
      originScope: '&' },                                                                                             // 3176
    templateUrl: 'template/popover/popover-template.html'                                                             // 3177
  };                                                                                                                  // 3178
})                                                                                                                    // 3179
                                                                                                                      // 3180
.directive( 'popoverTemplate', [ '$tooltip', function ( $tooltip ) {                                                  // 3181
  return $tooltip( 'popoverTemplate', 'popover', 'click', {                                                           // 3182
    useContentExp: true                                                                                               // 3183
  } );                                                                                                                // 3184
}])                                                                                                                   // 3185
                                                                                                                      // 3186
.directive( 'popoverPopup', function () {                                                                             // 3187
  return {                                                                                                            // 3188
    restrict: 'EA',                                                                                                   // 3189
    replace: true,                                                                                                    // 3190
    scope: { title: '@', content: '@', placement: '@', popupClass: '@', animation: '&', isOpen: '&' },                // 3191
    templateUrl: 'template/popover/popover.html'                                                                      // 3192
  };                                                                                                                  // 3193
})                                                                                                                    // 3194
                                                                                                                      // 3195
.directive( 'popover', [ '$tooltip', function ( $tooltip ) {                                                          // 3196
  return $tooltip( 'popover', 'popover', 'click' );                                                                   // 3197
}]);                                                                                                                  // 3198
                                                                                                                      // 3199
angular.module('ui.bootstrap.progressbar', [])                                                                        // 3200
                                                                                                                      // 3201
.constant('progressConfig', {                                                                                         // 3202
  animate: true,                                                                                                      // 3203
  max: 100                                                                                                            // 3204
})                                                                                                                    // 3205
                                                                                                                      // 3206
.controller('ProgressController', ['$scope', '$attrs', 'progressConfig', function($scope, $attrs, progressConfig) {   // 3207
    var self = this,                                                                                                  // 3208
        animate = angular.isDefined($attrs.animate) ? $scope.$parent.$eval($attrs.animate) : progressConfig.animate;  // 3209
                                                                                                                      // 3210
    this.bars = [];                                                                                                   // 3211
    $scope.max = angular.isDefined($scope.max) ? $scope.max : progressConfig.max;                                     // 3212
                                                                                                                      // 3213
    this.addBar = function(bar, element) {                                                                            // 3214
        if ( !animate ) {                                                                                             // 3215
            element.css({'transition': 'none'});                                                                      // 3216
        }                                                                                                             // 3217
                                                                                                                      // 3218
        this.bars.push(bar);                                                                                          // 3219
                                                                                                                      // 3220
        bar.$watch('value', function( value ) {                                                                       // 3221
            bar.percent = +(100 * value / $scope.max).toFixed(2);                                                     // 3222
        });                                                                                                           // 3223
                                                                                                                      // 3224
        bar.$on('$destroy', function() {                                                                              // 3225
            element = null;                                                                                           // 3226
            self.removeBar(bar);                                                                                      // 3227
        });                                                                                                           // 3228
    };                                                                                                                // 3229
                                                                                                                      // 3230
    this.removeBar = function(bar) {                                                                                  // 3231
        this.bars.splice(this.bars.indexOf(bar), 1);                                                                  // 3232
    };                                                                                                                // 3233
}])                                                                                                                   // 3234
                                                                                                                      // 3235
.directive('progress', function() {                                                                                   // 3236
    return {                                                                                                          // 3237
        restrict: 'EA',                                                                                               // 3238
        replace: true,                                                                                                // 3239
        transclude: true,                                                                                             // 3240
        controller: 'ProgressController',                                                                             // 3241
        require: 'progress',                                                                                          // 3242
        scope: {},                                                                                                    // 3243
        templateUrl: 'template/progressbar/progress.html'                                                             // 3244
    };                                                                                                                // 3245
})                                                                                                                    // 3246
                                                                                                                      // 3247
.directive('bar', function() {                                                                                        // 3248
    return {                                                                                                          // 3249
        restrict: 'EA',                                                                                               // 3250
        replace: true,                                                                                                // 3251
        transclude: true,                                                                                             // 3252
        require: '^progress',                                                                                         // 3253
        scope: {                                                                                                      // 3254
            value: '=',                                                                                               // 3255
            max: '=?',                                                                                                // 3256
            type: '@'                                                                                                 // 3257
        },                                                                                                            // 3258
        templateUrl: 'template/progressbar/bar.html',                                                                 // 3259
        link: function(scope, element, attrs, progressCtrl) {                                                         // 3260
            progressCtrl.addBar(scope, element);                                                                      // 3261
        }                                                                                                             // 3262
    };                                                                                                                // 3263
})                                                                                                                    // 3264
                                                                                                                      // 3265
.directive('progressbar', function() {                                                                                // 3266
    return {                                                                                                          // 3267
        restrict: 'EA',                                                                                               // 3268
        replace: true,                                                                                                // 3269
        transclude: true,                                                                                             // 3270
        controller: 'ProgressController',                                                                             // 3271
        scope: {                                                                                                      // 3272
            value: '=',                                                                                               // 3273
            max: '=?',                                                                                                // 3274
            type: '@'                                                                                                 // 3275
        },                                                                                                            // 3276
        templateUrl: 'template/progressbar/progressbar.html',                                                         // 3277
        link: function(scope, element, attrs, progressCtrl) {                                                         // 3278
            progressCtrl.addBar(scope, angular.element(element.children()[0]));                                       // 3279
        }                                                                                                             // 3280
    };                                                                                                                // 3281
});                                                                                                                   // 3282
                                                                                                                      // 3283
angular.module('ui.bootstrap.rating', [])                                                                             // 3284
                                                                                                                      // 3285
.constant('ratingConfig', {                                                                                           // 3286
  max: 5,                                                                                                             // 3287
  stateOn: null,                                                                                                      // 3288
  stateOff: null                                                                                                      // 3289
})                                                                                                                    // 3290
                                                                                                                      // 3291
.controller('RatingController', ['$scope', '$attrs', 'ratingConfig', function($scope, $attrs, ratingConfig) {         // 3292
  var ngModelCtrl  = { $setViewValue: angular.noop };                                                                 // 3293
                                                                                                                      // 3294
  this.init = function(ngModelCtrl_) {                                                                                // 3295
    ngModelCtrl = ngModelCtrl_;                                                                                       // 3296
    ngModelCtrl.$render = this.render;                                                                                // 3297
                                                                                                                      // 3298
    ngModelCtrl.$formatters.push(function(value) {                                                                    // 3299
      if (angular.isNumber(value) && value << 0 !== value) {                                                          // 3300
        value = Math.round(value);                                                                                    // 3301
      }                                                                                                               // 3302
      return value;                                                                                                   // 3303
    });                                                                                                               // 3304
                                                                                                                      // 3305
    this.stateOn = angular.isDefined($attrs.stateOn) ? $scope.$parent.$eval($attrs.stateOn) : ratingConfig.stateOn;   // 3306
    this.stateOff = angular.isDefined($attrs.stateOff) ? $scope.$parent.$eval($attrs.stateOff) : ratingConfig.stateOff;
                                                                                                                      // 3308
    var ratingStates = angular.isDefined($attrs.ratingStates) ? $scope.$parent.$eval($attrs.ratingStates) :           // 3309
                        new Array( angular.isDefined($attrs.max) ? $scope.$parent.$eval($attrs.max) : ratingConfig.max );
    $scope.range = this.buildTemplateObjects(ratingStates);                                                           // 3311
  };                                                                                                                  // 3312
                                                                                                                      // 3313
  this.buildTemplateObjects = function(states) {                                                                      // 3314
    for (var i = 0, n = states.length; i < n; i++) {                                                                  // 3315
      states[i] = angular.extend({ index: i }, { stateOn: this.stateOn, stateOff: this.stateOff }, states[i]);        // 3316
    }                                                                                                                 // 3317
    return states;                                                                                                    // 3318
  };                                                                                                                  // 3319
                                                                                                                      // 3320
  $scope.rate = function(value) {                                                                                     // 3321
    if ( !$scope.readonly && value >= 0 && value <= $scope.range.length ) {                                           // 3322
      ngModelCtrl.$setViewValue(value);                                                                               // 3323
      ngModelCtrl.$render();                                                                                          // 3324
    }                                                                                                                 // 3325
  };                                                                                                                  // 3326
                                                                                                                      // 3327
  $scope.enter = function(value) {                                                                                    // 3328
    if ( !$scope.readonly ) {                                                                                         // 3329
      $scope.value = value;                                                                                           // 3330
    }                                                                                                                 // 3331
    $scope.onHover({value: value});                                                                                   // 3332
  };                                                                                                                  // 3333
                                                                                                                      // 3334
  $scope.reset = function() {                                                                                         // 3335
    $scope.value = ngModelCtrl.$viewValue;                                                                            // 3336
    $scope.onLeave();                                                                                                 // 3337
  };                                                                                                                  // 3338
                                                                                                                      // 3339
  $scope.onKeydown = function(evt) {                                                                                  // 3340
    if (/(37|38|39|40)/.test(evt.which)) {                                                                            // 3341
      evt.preventDefault();                                                                                           // 3342
      evt.stopPropagation();                                                                                          // 3343
      $scope.rate( $scope.value + (evt.which === 38 || evt.which === 39 ? 1 : -1) );                                  // 3344
    }                                                                                                                 // 3345
  };                                                                                                                  // 3346
                                                                                                                      // 3347
  this.render = function() {                                                                                          // 3348
    $scope.value = ngModelCtrl.$viewValue;                                                                            // 3349
  };                                                                                                                  // 3350
}])                                                                                                                   // 3351
                                                                                                                      // 3352
.directive('rating', function() {                                                                                     // 3353
  return {                                                                                                            // 3354
    restrict: 'EA',                                                                                                   // 3355
    require: ['rating', 'ngModel'],                                                                                   // 3356
    scope: {                                                                                                          // 3357
      readonly: '=?',                                                                                                 // 3358
      onHover: '&',                                                                                                   // 3359
      onLeave: '&'                                                                                                    // 3360
    },                                                                                                                // 3361
    controller: 'RatingController',                                                                                   // 3362
    templateUrl: 'template/rating/rating.html',                                                                       // 3363
    replace: true,                                                                                                    // 3364
    link: function(scope, element, attrs, ctrls) {                                                                    // 3365
      var ratingCtrl = ctrls[0], ngModelCtrl = ctrls[1];                                                              // 3366
      ratingCtrl.init( ngModelCtrl );                                                                                 // 3367
    }                                                                                                                 // 3368
  };                                                                                                                  // 3369
});                                                                                                                   // 3370
                                                                                                                      // 3371
/**                                                                                                                   // 3372
 * @ngdoc overview                                                                                                    // 3373
 * @name ui.bootstrap.tabs                                                                                            // 3374
 *                                                                                                                    // 3375
 * @description                                                                                                       // 3376
 * AngularJS version of the tabs directive.                                                                           // 3377
 */                                                                                                                   // 3378
                                                                                                                      // 3379
angular.module('ui.bootstrap.tabs', [])                                                                               // 3380
                                                                                                                      // 3381
.controller('TabsetController', ['$scope', function TabsetCtrl($scope) {                                              // 3382
  var ctrl = this,                                                                                                    // 3383
      tabs = ctrl.tabs = $scope.tabs = [];                                                                            // 3384
                                                                                                                      // 3385
  ctrl.select = function(selectedTab) {                                                                               // 3386
    angular.forEach(tabs, function(tab) {                                                                             // 3387
      if (tab.active && tab !== selectedTab) {                                                                        // 3388
        tab.active = false;                                                                                           // 3389
        tab.onDeselect();                                                                                             // 3390
      }                                                                                                               // 3391
    });                                                                                                               // 3392
    selectedTab.active = true;                                                                                        // 3393
    selectedTab.onSelect();                                                                                           // 3394
  };                                                                                                                  // 3395
                                                                                                                      // 3396
  ctrl.addTab = function addTab(tab) {                                                                                // 3397
    tabs.push(tab);                                                                                                   // 3398
    // we can't run the select function on the first tab                                                              // 3399
    // since that would select it twice                                                                               // 3400
    if (tabs.length === 1 && tab.active !== false) {                                                                  // 3401
      tab.active = true;                                                                                              // 3402
    } else if (tab.active) {                                                                                          // 3403
      ctrl.select(tab);                                                                                               // 3404
    }                                                                                                                 // 3405
    else {                                                                                                            // 3406
      tab.active = false;                                                                                             // 3407
    }                                                                                                                 // 3408
  };                                                                                                                  // 3409
                                                                                                                      // 3410
  ctrl.removeTab = function removeTab(tab) {                                                                          // 3411
    var index = tabs.indexOf(tab);                                                                                    // 3412
    //Select a new tab if the tab to be removed is selected and not destroyed                                         // 3413
    if (tab.active && tabs.length > 1 && !destroyed) {                                                                // 3414
      //If this is the last tab, select the previous tab. else, the next tab.                                         // 3415
      var newActiveIndex = index == tabs.length - 1 ? index - 1 : index + 1;                                          // 3416
      ctrl.select(tabs[newActiveIndex]);                                                                              // 3417
    }                                                                                                                 // 3418
    tabs.splice(index, 1);                                                                                            // 3419
  };                                                                                                                  // 3420
                                                                                                                      // 3421
  var destroyed;                                                                                                      // 3422
  $scope.$on('$destroy', function() {                                                                                 // 3423
    destroyed = true;                                                                                                 // 3424
  });                                                                                                                 // 3425
}])                                                                                                                   // 3426
                                                                                                                      // 3427
/**                                                                                                                   // 3428
 * @ngdoc directive                                                                                                   // 3429
 * @name ui.bootstrap.tabs.directive:tabset                                                                           // 3430
 * @restrict EA                                                                                                       // 3431
 *                                                                                                                    // 3432
 * @description                                                                                                       // 3433
 * Tabset is the outer container for the tabs directive                                                               // 3434
 *                                                                                                                    // 3435
 * @param {boolean=} vertical Whether or not to use vertical styling for the tabs.                                    // 3436
 * @param {boolean=} justified Whether or not to use justified styling for the tabs.                                  // 3437
 *                                                                                                                    // 3438
 * @example                                                                                                           // 3439
<example module="ui.bootstrap">                                                                                       // 3440
  <file name="index.html">                                                                                            // 3441
    <tabset>                                                                                                          // 3442
      <tab heading="Tab 1"><b>First</b> Content!</tab>                                                                // 3443
      <tab heading="Tab 2"><i>Second</i> Content!</tab>                                                               // 3444
    </tabset>                                                                                                         // 3445
    <hr />                                                                                                            // 3446
    <tabset vertical="true">                                                                                          // 3447
      <tab heading="Vertical Tab 1"><b>First</b> Vertical Content!</tab>                                              // 3448
      <tab heading="Vertical Tab 2"><i>Second</i> Vertical Content!</tab>                                             // 3449
    </tabset>                                                                                                         // 3450
    <tabset justified="true">                                                                                         // 3451
      <tab heading="Justified Tab 1"><b>First</b> Justified Content!</tab>                                            // 3452
      <tab heading="Justified Tab 2"><i>Second</i> Justified Content!</tab>                                           // 3453
    </tabset>                                                                                                         // 3454
  </file>                                                                                                             // 3455
</example>                                                                                                            // 3456
 */                                                                                                                   // 3457
.directive('tabset', function() {                                                                                     // 3458
  return {                                                                                                            // 3459
    restrict: 'EA',                                                                                                   // 3460
    transclude: true,                                                                                                 // 3461
    replace: true,                                                                                                    // 3462
    scope: {                                                                                                          // 3463
      type: '@'                                                                                                       // 3464
    },                                                                                                                // 3465
    controller: 'TabsetController',                                                                                   // 3466
    templateUrl: 'template/tabs/tabset.html',                                                                         // 3467
    link: function(scope, element, attrs) {                                                                           // 3468
      scope.vertical = angular.isDefined(attrs.vertical) ? scope.$parent.$eval(attrs.vertical) : false;               // 3469
      scope.justified = angular.isDefined(attrs.justified) ? scope.$parent.$eval(attrs.justified) : false;            // 3470
    }                                                                                                                 // 3471
  };                                                                                                                  // 3472
})                                                                                                                    // 3473
                                                                                                                      // 3474
/**                                                                                                                   // 3475
 * @ngdoc directive                                                                                                   // 3476
 * @name ui.bootstrap.tabs.directive:tab                                                                              // 3477
 * @restrict EA                                                                                                       // 3478
 *                                                                                                                    // 3479
 * @param {string=} heading The visible heading, or title, of the tab. Set HTML headings with {@link ui.bootstrap.tabs.directive:tabHeading tabHeading}.
 * @param {string=} select An expression to evaluate when the tab is selected.                                        // 3481
 * @param {boolean=} active A binding, telling whether or not this tab is selected.                                   // 3482
 * @param {boolean=} disabled A binding, telling whether or not this tab is disabled.                                 // 3483
 *                                                                                                                    // 3484
 * @description                                                                                                       // 3485
 * Creates a tab with a heading and content. Must be placed within a {@link ui.bootstrap.tabs.directive:tabset tabset}.
 *                                                                                                                    // 3487
 * @example                                                                                                           // 3488
<example module="ui.bootstrap">                                                                                       // 3489
  <file name="index.html">                                                                                            // 3490
    <div ng-controller="TabsDemoCtrl">                                                                                // 3491
      <button class="btn btn-small" ng-click="items[0].active = true">                                                // 3492
        Select item 1, using active binding                                                                           // 3493
      </button>                                                                                                       // 3494
      <button class="btn btn-small" ng-click="items[1].disabled = !items[1].disabled">                                // 3495
        Enable/disable item 2, using disabled binding                                                                 // 3496
      </button>                                                                                                       // 3497
      <br />                                                                                                          // 3498
      <tabset>                                                                                                        // 3499
        <tab heading="Tab 1">First Tab</tab>                                                                          // 3500
        <tab select="alertMe()">                                                                                      // 3501
          <tab-heading><i class="icon-bell"></i> Alert me!</tab-heading>                                              // 3502
          Second Tab, with alert callback and html heading!                                                           // 3503
        </tab>                                                                                                        // 3504
        <tab ng-repeat="item in items"                                                                                // 3505
          heading="{{item.title}}"                                                                                    // 3506
          disabled="item.disabled"                                                                                    // 3507
          active="item.active">                                                                                       // 3508
          {{item.content}}                                                                                            // 3509
        </tab>                                                                                                        // 3510
      </tabset>                                                                                                       // 3511
    </div>                                                                                                            // 3512
  </file>                                                                                                             // 3513
  <file name="script.js">                                                                                             // 3514
    function TabsDemoCtrl($scope) {                                                                                   // 3515
      $scope.items = [                                                                                                // 3516
        { title:"Dynamic Title 1", content:"Dynamic Item 0" },                                                        // 3517
        { title:"Dynamic Title 2", content:"Dynamic Item 1", disabled: true }                                         // 3518
      ];                                                                                                              // 3519
                                                                                                                      // 3520
      $scope.alertMe = function() {                                                                                   // 3521
        setTimeout(function() {                                                                                       // 3522
          alert("You've selected the alert tab!");                                                                    // 3523
        });                                                                                                           // 3524
      };                                                                                                              // 3525
    };                                                                                                                // 3526
  </file>                                                                                                             // 3527
</example>                                                                                                            // 3528
 */                                                                                                                   // 3529
                                                                                                                      // 3530
/**                                                                                                                   // 3531
 * @ngdoc directive                                                                                                   // 3532
 * @name ui.bootstrap.tabs.directive:tabHeading                                                                       // 3533
 * @restrict EA                                                                                                       // 3534
 *                                                                                                                    // 3535
 * @description                                                                                                       // 3536
 * Creates an HTML heading for a {@link ui.bootstrap.tabs.directive:tab tab}. Must be placed as a child of a tab element.
 *                                                                                                                    // 3538
 * @example                                                                                                           // 3539
<example module="ui.bootstrap">                                                                                       // 3540
  <file name="index.html">                                                                                            // 3541
    <tabset>                                                                                                          // 3542
      <tab>                                                                                                           // 3543
        <tab-heading><b>HTML</b> in my titles?!</tab-heading>                                                         // 3544
        And some content, too!                                                                                        // 3545
      </tab>                                                                                                          // 3546
      <tab>                                                                                                           // 3547
        <tab-heading><i class="icon-heart"></i> Icon heading?!?</tab-heading>                                         // 3548
        That's right.                                                                                                 // 3549
      </tab>                                                                                                          // 3550
    </tabset>                                                                                                         // 3551
  </file>                                                                                                             // 3552
</example>                                                                                                            // 3553
 */                                                                                                                   // 3554
.directive('tab', ['$parse', '$log', function($parse, $log) {                                                         // 3555
  return {                                                                                                            // 3556
    require: '^tabset',                                                                                               // 3557
    restrict: 'EA',                                                                                                   // 3558
    replace: true,                                                                                                    // 3559
    templateUrl: 'template/tabs/tab.html',                                                                            // 3560
    transclude: true,                                                                                                 // 3561
    scope: {                                                                                                          // 3562
      active: '=?',                                                                                                   // 3563
      heading: '@',                                                                                                   // 3564
      onSelect: '&select', //This callback is called in contentHeadingTransclude                                      // 3565
                          //once it inserts the tab's content into the dom                                            // 3566
      onDeselect: '&deselect'                                                                                         // 3567
    },                                                                                                                // 3568
    controller: function() {                                                                                          // 3569
      //Empty controller so other directives can require being 'under' a tab                                          // 3570
    },                                                                                                                // 3571
    compile: function(elm, attrs, transclude) {                                                                       // 3572
      return function postLink(scope, elm, attrs, tabsetCtrl) {                                                       // 3573
        scope.$watch('active', function(active) {                                                                     // 3574
          if (active) {                                                                                               // 3575
            tabsetCtrl.select(scope);                                                                                 // 3576
          }                                                                                                           // 3577
        });                                                                                                           // 3578
                                                                                                                      // 3579
        scope.disabled = false;                                                                                       // 3580
        if ( attrs.disable ) {                                                                                        // 3581
          scope.$parent.$watch($parse(attrs.disable), function(value) {                                               // 3582
            scope.disabled = !! value;                                                                                // 3583
          });                                                                                                         // 3584
        }                                                                                                             // 3585
                                                                                                                      // 3586
        // Deprecation support of "disabled" parameter                                                                // 3587
        // fix(tab): IE9 disabled attr renders grey text on enabled tab #2677                                         // 3588
        // This code is duplicated from the lines above to make it easy to remove once                                // 3589
        // the feature has been completely deprecated                                                                 // 3590
        if ( attrs.disabled ) {                                                                                       // 3591
          $log.warn('Use of "disabled" attribute has been deprecated, please use "disable"');                         // 3592
          scope.$parent.$watch($parse(attrs.disabled), function(value) {                                              // 3593
            scope.disabled = !! value;                                                                                // 3594
          });                                                                                                         // 3595
        }                                                                                                             // 3596
                                                                                                                      // 3597
        scope.select = function() {                                                                                   // 3598
          if ( !scope.disabled ) {                                                                                    // 3599
            scope.active = true;                                                                                      // 3600
          }                                                                                                           // 3601
        };                                                                                                            // 3602
                                                                                                                      // 3603
        tabsetCtrl.addTab(scope);                                                                                     // 3604
        scope.$on('$destroy', function() {                                                                            // 3605
          tabsetCtrl.removeTab(scope);                                                                                // 3606
        });                                                                                                           // 3607
                                                                                                                      // 3608
        //We need to transclude later, once the content container is ready.                                           // 3609
        //when this link happens, we're inside a tab heading.                                                         // 3610
        scope.$transcludeFn = transclude;                                                                             // 3611
      };                                                                                                              // 3612
    }                                                                                                                 // 3613
  };                                                                                                                  // 3614
}])                                                                                                                   // 3615
                                                                                                                      // 3616
.directive('tabHeadingTransclude', [function() {                                                                      // 3617
  return {                                                                                                            // 3618
    restrict: 'A',                                                                                                    // 3619
    require: '^tab',                                                                                                  // 3620
    link: function(scope, elm, attrs, tabCtrl) {                                                                      // 3621
      scope.$watch('headingElement', function updateHeadingElement(heading) {                                         // 3622
        if (heading) {                                                                                                // 3623
          elm.html('');                                                                                               // 3624
          elm.append(heading);                                                                                        // 3625
        }                                                                                                             // 3626
      });                                                                                                             // 3627
    }                                                                                                                 // 3628
  };                                                                                                                  // 3629
}])                                                                                                                   // 3630
                                                                                                                      // 3631
.directive('tabContentTransclude', function() {                                                                       // 3632
  return {                                                                                                            // 3633
    restrict: 'A',                                                                                                    // 3634
    require: '^tabset',                                                                                               // 3635
    link: function(scope, elm, attrs) {                                                                               // 3636
      var tab = scope.$eval(attrs.tabContentTransclude);                                                              // 3637
                                                                                                                      // 3638
      //Now our tab is ready to be transcluded: both the tab heading area                                             // 3639
      //and the tab content area are loaded.  Transclude 'em both.                                                    // 3640
      tab.$transcludeFn(tab.$parent, function(contents) {                                                             // 3641
        angular.forEach(contents, function(node) {                                                                    // 3642
          if (isTabHeading(node)) {                                                                                   // 3643
            //Let tabHeadingTransclude know.                                                                          // 3644
            tab.headingElement = node;                                                                                // 3645
          } else {                                                                                                    // 3646
            elm.append(node);                                                                                         // 3647
          }                                                                                                           // 3648
        });                                                                                                           // 3649
      });                                                                                                             // 3650
    }                                                                                                                 // 3651
  };                                                                                                                  // 3652
  function isTabHeading(node) {                                                                                       // 3653
    return node.tagName &&  (                                                                                         // 3654
      node.hasAttribute('tab-heading') ||                                                                             // 3655
      node.hasAttribute('data-tab-heading') ||                                                                        // 3656
      node.tagName.toLowerCase() === 'tab-heading' ||                                                                 // 3657
      node.tagName.toLowerCase() === 'data-tab-heading'                                                               // 3658
    );                                                                                                                // 3659
  }                                                                                                                   // 3660
})                                                                                                                    // 3661
                                                                                                                      // 3662
;                                                                                                                     // 3663
                                                                                                                      // 3664
angular.module('ui.bootstrap.timepicker', [])                                                                         // 3665
                                                                                                                      // 3666
.constant('timepickerConfig', {                                                                                       // 3667
  hourStep: 1,                                                                                                        // 3668
  minuteStep: 1,                                                                                                      // 3669
  showMeridian: true,                                                                                                 // 3670
  meridians: null,                                                                                                    // 3671
  readonlyInput: false,                                                                                               // 3672
  mousewheel: true,                                                                                                   // 3673
  arrowkeys: true                                                                                                     // 3674
})                                                                                                                    // 3675
                                                                                                                      // 3676
.controller('TimepickerController', ['$scope', '$attrs', '$parse', '$log', '$locale', 'timepickerConfig', function($scope, $attrs, $parse, $log, $locale, timepickerConfig) {
  var selected = new Date(),                                                                                          // 3678
      ngModelCtrl = { $setViewValue: angular.noop }, // nullModelCtrl                                                 // 3679
      meridians = angular.isDefined($attrs.meridians) ? $scope.$parent.$eval($attrs.meridians) : timepickerConfig.meridians || $locale.DATETIME_FORMATS.AMPMS;
                                                                                                                      // 3681
  this.init = function( ngModelCtrl_, inputs ) {                                                                      // 3682
    ngModelCtrl = ngModelCtrl_;                                                                                       // 3683
    ngModelCtrl.$render = this.render;                                                                                // 3684
                                                                                                                      // 3685
    ngModelCtrl.$formatters.unshift(function (modelValue) {                                                           // 3686
      return modelValue ? new Date( modelValue ) : null;                                                              // 3687
    });                                                                                                               // 3688
                                                                                                                      // 3689
    var hoursInputEl = inputs.eq(0),                                                                                  // 3690
        minutesInputEl = inputs.eq(1);                                                                                // 3691
                                                                                                                      // 3692
    var mousewheel = angular.isDefined($attrs.mousewheel) ? $scope.$parent.$eval($attrs.mousewheel) : timepickerConfig.mousewheel;
    if ( mousewheel ) {                                                                                               // 3694
      this.setupMousewheelEvents( hoursInputEl, minutesInputEl );                                                     // 3695
    }                                                                                                                 // 3696
                                                                                                                      // 3697
    var arrowkeys = angular.isDefined($attrs.arrowkeys) ? $scope.$parent.$eval($attrs.arrowkeys) : timepickerConfig.arrowkeys;
    if (arrowkeys) {                                                                                                  // 3699
      this.setupArrowkeyEvents( hoursInputEl, minutesInputEl );                                                       // 3700
    }                                                                                                                 // 3701
                                                                                                                      // 3702
    $scope.readonlyInput = angular.isDefined($attrs.readonlyInput) ? $scope.$parent.$eval($attrs.readonlyInput) : timepickerConfig.readonlyInput;
    this.setupInputEvents( hoursInputEl, minutesInputEl );                                                            // 3704
  };                                                                                                                  // 3705
                                                                                                                      // 3706
  var hourStep = timepickerConfig.hourStep;                                                                           // 3707
  if ($attrs.hourStep) {                                                                                              // 3708
    $scope.$parent.$watch($parse($attrs.hourStep), function(value) {                                                  // 3709
      hourStep = parseInt(value, 10);                                                                                 // 3710
    });                                                                                                               // 3711
  }                                                                                                                   // 3712
                                                                                                                      // 3713
  var minuteStep = timepickerConfig.minuteStep;                                                                       // 3714
  if ($attrs.minuteStep) {                                                                                            // 3715
    $scope.$parent.$watch($parse($attrs.minuteStep), function(value) {                                                // 3716
      minuteStep = parseInt(value, 10);                                                                               // 3717
    });                                                                                                               // 3718
  }                                                                                                                   // 3719
                                                                                                                      // 3720
  // 12H / 24H mode                                                                                                   // 3721
  $scope.showMeridian = timepickerConfig.showMeridian;                                                                // 3722
  if ($attrs.showMeridian) {                                                                                          // 3723
    $scope.$parent.$watch($parse($attrs.showMeridian), function(value) {                                              // 3724
      $scope.showMeridian = !!value;                                                                                  // 3725
                                                                                                                      // 3726
      if ( ngModelCtrl.$error.time ) {                                                                                // 3727
        // Evaluate from template                                                                                     // 3728
        var hours = getHoursFromTemplate(), minutes = getMinutesFromTemplate();                                       // 3729
        if (angular.isDefined( hours ) && angular.isDefined( minutes )) {                                             // 3730
          selected.setHours( hours );                                                                                 // 3731
          refresh();                                                                                                  // 3732
        }                                                                                                             // 3733
      } else {                                                                                                        // 3734
        updateTemplate();                                                                                             // 3735
      }                                                                                                               // 3736
    });                                                                                                               // 3737
  }                                                                                                                   // 3738
                                                                                                                      // 3739
  // Get $scope.hours in 24H mode if valid                                                                            // 3740
  function getHoursFromTemplate ( ) {                                                                                 // 3741
    var hours = parseInt( $scope.hours, 10 );                                                                         // 3742
    var valid = ( $scope.showMeridian ) ? (hours > 0 && hours < 13) : (hours >= 0 && hours < 24);                     // 3743
    if ( !valid ) {                                                                                                   // 3744
      return undefined;                                                                                               // 3745
    }                                                                                                                 // 3746
                                                                                                                      // 3747
    if ( $scope.showMeridian ) {                                                                                      // 3748
      if ( hours === 12 ) {                                                                                           // 3749
        hours = 0;                                                                                                    // 3750
      }                                                                                                               // 3751
      if ( $scope.meridian === meridians[1] ) {                                                                       // 3752
        hours = hours + 12;                                                                                           // 3753
      }                                                                                                               // 3754
    }                                                                                                                 // 3755
    return hours;                                                                                                     // 3756
  }                                                                                                                   // 3757
                                                                                                                      // 3758
  function getMinutesFromTemplate() {                                                                                 // 3759
    var minutes = parseInt($scope.minutes, 10);                                                                       // 3760
    return ( minutes >= 0 && minutes < 60 ) ? minutes : undefined;                                                    // 3761
  }                                                                                                                   // 3762
                                                                                                                      // 3763
  function pad( value ) {                                                                                             // 3764
    return ( angular.isDefined(value) && value.toString().length < 2 ) ? '0' + value : value.toString();              // 3765
  }                                                                                                                   // 3766
                                                                                                                      // 3767
  // Respond on mousewheel spin                                                                                       // 3768
  this.setupMousewheelEvents = function( hoursInputEl, minutesInputEl ) {                                             // 3769
    var isScrollingUp = function(e) {                                                                                 // 3770
      if (e.originalEvent) {                                                                                          // 3771
        e = e.originalEvent;                                                                                          // 3772
      }                                                                                                               // 3773
      //pick correct delta variable depending on event                                                                // 3774
      var delta = (e.wheelDelta) ? e.wheelDelta : -e.deltaY;                                                          // 3775
      return (e.detail || delta > 0);                                                                                 // 3776
    };                                                                                                                // 3777
                                                                                                                      // 3778
    hoursInputEl.bind('mousewheel wheel', function(e) {                                                               // 3779
      $scope.$apply( (isScrollingUp(e)) ? $scope.incrementHours() : $scope.decrementHours() );                        // 3780
      e.preventDefault();                                                                                             // 3781
    });                                                                                                               // 3782
                                                                                                                      // 3783
    minutesInputEl.bind('mousewheel wheel', function(e) {                                                             // 3784
      $scope.$apply( (isScrollingUp(e)) ? $scope.incrementMinutes() : $scope.decrementMinutes() );                    // 3785
      e.preventDefault();                                                                                             // 3786
    });                                                                                                               // 3787
                                                                                                                      // 3788
  };                                                                                                                  // 3789
                                                                                                                      // 3790
  // Respond on up/down arrowkeys                                                                                     // 3791
  this.setupArrowkeyEvents = function( hoursInputEl, minutesInputEl ) {                                               // 3792
    hoursInputEl.bind('keydown', function(e) {                                                                        // 3793
      if ( e.which === 38 ) { // up                                                                                   // 3794
        e.preventDefault();                                                                                           // 3795
        $scope.incrementHours();                                                                                      // 3796
        $scope.$apply();                                                                                              // 3797
      }                                                                                                               // 3798
      else if ( e.which === 40 ) { // down                                                                            // 3799
        e.preventDefault();                                                                                           // 3800
        $scope.decrementHours();                                                                                      // 3801
        $scope.$apply();                                                                                              // 3802
      }                                                                                                               // 3803
    });                                                                                                               // 3804
                                                                                                                      // 3805
    minutesInputEl.bind('keydown', function(e) {                                                                      // 3806
      if ( e.which === 38 ) { // up                                                                                   // 3807
        e.preventDefault();                                                                                           // 3808
        $scope.incrementMinutes();                                                                                    // 3809
        $scope.$apply();                                                                                              // 3810
      }                                                                                                               // 3811
      else if ( e.which === 40 ) { // down                                                                            // 3812
        e.preventDefault();                                                                                           // 3813
        $scope.decrementMinutes();                                                                                    // 3814
        $scope.$apply();                                                                                              // 3815
      }                                                                                                               // 3816
    });                                                                                                               // 3817
  };                                                                                                                  // 3818
                                                                                                                      // 3819
  this.setupInputEvents = function( hoursInputEl, minutesInputEl ) {                                                  // 3820
    if ( $scope.readonlyInput ) {                                                                                     // 3821
      $scope.updateHours = angular.noop;                                                                              // 3822
      $scope.updateMinutes = angular.noop;                                                                            // 3823
      return;                                                                                                         // 3824
    }                                                                                                                 // 3825
                                                                                                                      // 3826
    var invalidate = function(invalidHours, invalidMinutes) {                                                         // 3827
      ngModelCtrl.$setViewValue( null );                                                                              // 3828
      ngModelCtrl.$setValidity('time', false);                                                                        // 3829
      if (angular.isDefined(invalidHours)) {                                                                          // 3830
        $scope.invalidHours = invalidHours;                                                                           // 3831
      }                                                                                                               // 3832
      if (angular.isDefined(invalidMinutes)) {                                                                        // 3833
        $scope.invalidMinutes = invalidMinutes;                                                                       // 3834
      }                                                                                                               // 3835
    };                                                                                                                // 3836
                                                                                                                      // 3837
    $scope.updateHours = function() {                                                                                 // 3838
      var hours = getHoursFromTemplate();                                                                             // 3839
                                                                                                                      // 3840
      if ( angular.isDefined(hours) ) {                                                                               // 3841
        selected.setHours( hours );                                                                                   // 3842
        refresh( 'h' );                                                                                               // 3843
      } else {                                                                                                        // 3844
        invalidate(true);                                                                                             // 3845
      }                                                                                                               // 3846
    };                                                                                                                // 3847
                                                                                                                      // 3848
    hoursInputEl.bind('blur', function(e) {                                                                           // 3849
      if ( !$scope.invalidHours && $scope.hours < 10) {                                                               // 3850
        $scope.$apply( function() {                                                                                   // 3851
          $scope.hours = pad( $scope.hours );                                                                         // 3852
        });                                                                                                           // 3853
      }                                                                                                               // 3854
    });                                                                                                               // 3855
                                                                                                                      // 3856
    $scope.updateMinutes = function() {                                                                               // 3857
      var minutes = getMinutesFromTemplate();                                                                         // 3858
                                                                                                                      // 3859
      if ( angular.isDefined(minutes) ) {                                                                             // 3860
        selected.setMinutes( minutes );                                                                               // 3861
        refresh( 'm' );                                                                                               // 3862
      } else {                                                                                                        // 3863
        invalidate(undefined, true);                                                                                  // 3864
      }                                                                                                               // 3865
    };                                                                                                                // 3866
                                                                                                                      // 3867
    minutesInputEl.bind('blur', function(e) {                                                                         // 3868
      if ( !$scope.invalidMinutes && $scope.minutes < 10 ) {                                                          // 3869
        $scope.$apply( function() {                                                                                   // 3870
          $scope.minutes = pad( $scope.minutes );                                                                     // 3871
        });                                                                                                           // 3872
      }                                                                                                               // 3873
    });                                                                                                               // 3874
                                                                                                                      // 3875
  };                                                                                                                  // 3876
                                                                                                                      // 3877
  this.render = function() {                                                                                          // 3878
    var date = ngModelCtrl.$viewValue;                                                                                // 3879
                                                                                                                      // 3880
    if ( isNaN(date) ) {                                                                                              // 3881
      ngModelCtrl.$setValidity('time', false);                                                                        // 3882
      $log.error('Timepicker directive: "ng-model" value must be a Date object, a number of milliseconds since 01.01.1970 or a string representing an RFC2822 or ISO 8601 date.');
    } else {                                                                                                          // 3884
      if ( date ) {                                                                                                   // 3885
        selected = date;                                                                                              // 3886
      }                                                                                                               // 3887
      makeValid();                                                                                                    // 3888
      updateTemplate();                                                                                               // 3889
    }                                                                                                                 // 3890
  };                                                                                                                  // 3891
                                                                                                                      // 3892
  // Call internally when we know that model is valid.                                                                // 3893
  function refresh( keyboardChange ) {                                                                                // 3894
    makeValid();                                                                                                      // 3895
    ngModelCtrl.$setViewValue( new Date(selected) );                                                                  // 3896
    updateTemplate( keyboardChange );                                                                                 // 3897
  }                                                                                                                   // 3898
                                                                                                                      // 3899
  function makeValid() {                                                                                              // 3900
    ngModelCtrl.$setValidity('time', true);                                                                           // 3901
    $scope.invalidHours = false;                                                                                      // 3902
    $scope.invalidMinutes = false;                                                                                    // 3903
  }                                                                                                                   // 3904
                                                                                                                      // 3905
  function updateTemplate( keyboardChange ) {                                                                         // 3906
    var hours = selected.getHours(), minutes = selected.getMinutes();                                                 // 3907
                                                                                                                      // 3908
    if ( $scope.showMeridian ) {                                                                                      // 3909
      hours = ( hours === 0 || hours === 12 ) ? 12 : hours % 12; // Convert 24 to 12 hour system                      // 3910
    }                                                                                                                 // 3911
                                                                                                                      // 3912
    $scope.hours = keyboardChange === 'h' ? hours : pad(hours);                                                       // 3913
    if (keyboardChange !== 'm') {                                                                                     // 3914
      $scope.minutes = pad(minutes);                                                                                  // 3915
    }                                                                                                                 // 3916
    $scope.meridian = selected.getHours() < 12 ? meridians[0] : meridians[1];                                         // 3917
  }                                                                                                                   // 3918
                                                                                                                      // 3919
  function addMinutes( minutes ) {                                                                                    // 3920
    var dt = new Date( selected.getTime() + minutes * 60000 );                                                        // 3921
    selected.setHours( dt.getHours(), dt.getMinutes() );                                                              // 3922
    refresh();                                                                                                        // 3923
  }                                                                                                                   // 3924
                                                                                                                      // 3925
  $scope.incrementHours = function() {                                                                                // 3926
    addMinutes( hourStep * 60 );                                                                                      // 3927
  };                                                                                                                  // 3928
  $scope.decrementHours = function() {                                                                                // 3929
    addMinutes( - hourStep * 60 );                                                                                    // 3930
  };                                                                                                                  // 3931
  $scope.incrementMinutes = function() {                                                                              // 3932
    addMinutes( minuteStep );                                                                                         // 3933
  };                                                                                                                  // 3934
  $scope.decrementMinutes = function() {                                                                              // 3935
    addMinutes( - minuteStep );                                                                                       // 3936
  };                                                                                                                  // 3937
  $scope.toggleMeridian = function() {                                                                                // 3938
    addMinutes( 12 * 60 * (( selected.getHours() < 12 ) ? 1 : -1) );                                                  // 3939
  };                                                                                                                  // 3940
}])                                                                                                                   // 3941
                                                                                                                      // 3942
.directive('timepicker', function () {                                                                                // 3943
  return {                                                                                                            // 3944
    restrict: 'EA',                                                                                                   // 3945
    require: ['timepicker', '?^ngModel'],                                                                             // 3946
    controller:'TimepickerController',                                                                                // 3947
    replace: true,                                                                                                    // 3948
    scope: {},                                                                                                        // 3949
    templateUrl: 'template/timepicker/timepicker.html',                                                               // 3950
    link: function(scope, element, attrs, ctrls) {                                                                    // 3951
      var timepickerCtrl = ctrls[0], ngModelCtrl = ctrls[1];                                                          // 3952
                                                                                                                      // 3953
      if ( ngModelCtrl ) {                                                                                            // 3954
        timepickerCtrl.init( ngModelCtrl, element.find('input') );                                                    // 3955
      }                                                                                                               // 3956
    }                                                                                                                 // 3957
  };                                                                                                                  // 3958
});                                                                                                                   // 3959
                                                                                                                      // 3960
angular.module('ui.bootstrap.transition', [])                                                                         // 3961
                                                                                                                      // 3962
.value('$transitionSuppressDeprecated', false)                                                                        // 3963
/**                                                                                                                   // 3964
 * $transition service provides a consistent interface to trigger CSS 3 transitions and to be informed when they complete.
 * @param  {DOMElement} element  The DOMElement that will be animated.                                                // 3966
 * @param  {string|object|function} trigger  The thing that will cause the transition to start:                       // 3967
 *   - As a string, it represents the css class to be added to the element.                                           // 3968
 *   - As an object, it represents a hash of style attributes to be applied to the element.                           // 3969
 *   - As a function, it represents a function to be called that will cause the transition to occur.                  // 3970
 * @return {Promise}  A promise that is resolved when the transition finishes.                                        // 3971
 */                                                                                                                   // 3972
.factory('$transition', [                                                                                             // 3973
        '$q', '$timeout', '$rootScope', '$log', '$transitionSuppressDeprecated',                                      // 3974
function($q ,  $timeout ,  $rootScope ,  $log ,  $transitionSuppressDeprecated) {                                     // 3975
                                                                                                                      // 3976
  if (!$transitionSuppressDeprecated) {                                                                               // 3977
    $log.warn('$transition is now deprecated. Use $animate from ngAnimate instead.');                                 // 3978
  }                                                                                                                   // 3979
                                                                                                                      // 3980
  var $transition = function(element, trigger, options) {                                                             // 3981
    options = options || {};                                                                                          // 3982
    var deferred = $q.defer();                                                                                        // 3983
    var endEventName = $transition[options.animation ? 'animationEndEventName' : 'transitionEndEventName'];           // 3984
                                                                                                                      // 3985
    var transitionEndHandler = function(event) {                                                                      // 3986
      $rootScope.$apply(function() {                                                                                  // 3987
        element.unbind(endEventName, transitionEndHandler);                                                           // 3988
        deferred.resolve(element);                                                                                    // 3989
      });                                                                                                             // 3990
    };                                                                                                                // 3991
                                                                                                                      // 3992
    if (endEventName) {                                                                                               // 3993
      element.bind(endEventName, transitionEndHandler);                                                               // 3994
    }                                                                                                                 // 3995
                                                                                                                      // 3996
    // Wrap in a timeout to allow the browser time to update the DOM before the transition is to occur                // 3997
    $timeout(function() {                                                                                             // 3998
      if ( angular.isString(trigger) ) {                                                                              // 3999
        element.addClass(trigger);                                                                                    // 4000
      } else if ( angular.isFunction(trigger) ) {                                                                     // 4001
        trigger(element);                                                                                             // 4002
      } else if ( angular.isObject(trigger) ) {                                                                       // 4003
        element.css(trigger);                                                                                         // 4004
      }                                                                                                               // 4005
      //If browser does not support transitions, instantly resolve                                                    // 4006
      if ( !endEventName ) {                                                                                          // 4007
        deferred.resolve(element);                                                                                    // 4008
      }                                                                                                               // 4009
    });                                                                                                               // 4010
                                                                                                                      // 4011
    // Add our custom cancel function to the promise that is returned                                                 // 4012
    // We can call this if we are about to run a new transition, which we know will prevent this transition from ending,
    // i.e. it will therefore never raise a transitionEnd event for that transition                                   // 4014
    deferred.promise.cancel = function() {                                                                            // 4015
      if ( endEventName ) {                                                                                           // 4016
        element.unbind(endEventName, transitionEndHandler);                                                           // 4017
      }                                                                                                               // 4018
      deferred.reject('Transition cancelled');                                                                        // 4019
    };                                                                                                                // 4020
                                                                                                                      // 4021
    return deferred.promise;                                                                                          // 4022
  };                                                                                                                  // 4023
                                                                                                                      // 4024
  // Work out the name of the transitionEnd event                                                                     // 4025
  var transElement = document.createElement('trans');                                                                 // 4026
  var transitionEndEventNames = {                                                                                     // 4027
    'WebkitTransition': 'webkitTransitionEnd',                                                                        // 4028
    'MozTransition': 'transitionend',                                                                                 // 4029
    'OTransition': 'oTransitionEnd',                                                                                  // 4030
    'transition': 'transitionend'                                                                                     // 4031
  };                                                                                                                  // 4032
  var animationEndEventNames = {                                                                                      // 4033
    'WebkitTransition': 'webkitAnimationEnd',                                                                         // 4034
    'MozTransition': 'animationend',                                                                                  // 4035
    'OTransition': 'oAnimationEnd',                                                                                   // 4036
    'transition': 'animationend'                                                                                      // 4037
  };                                                                                                                  // 4038
  function findEndEventName(endEventNames) {                                                                          // 4039
    for (var name in endEventNames){                                                                                  // 4040
      if (transElement.style[name] !== undefined) {                                                                   // 4041
        return endEventNames[name];                                                                                   // 4042
      }                                                                                                               // 4043
    }                                                                                                                 // 4044
  }                                                                                                                   // 4045
  $transition.transitionEndEventName = findEndEventName(transitionEndEventNames);                                     // 4046
  $transition.animationEndEventName = findEndEventName(animationEndEventNames);                                       // 4047
  return $transition;                                                                                                 // 4048
}]);                                                                                                                  // 4049
                                                                                                                      // 4050
angular.module('ui.bootstrap.typeahead', ['ui.bootstrap.position', 'ui.bootstrap.bindHtml'])                          // 4051
                                                                                                                      // 4052
/**                                                                                                                   // 4053
 * A helper service that can parse typeahead's syntax (string provided by users)                                      // 4054
 * Extracted to a separate service for ease of unit testing                                                           // 4055
 */                                                                                                                   // 4056
  .factory('typeaheadParser', ['$parse', function ($parse) {                                                          // 4057
                                                                                                                      // 4058
  //                      00000111000000000000022200000000000000003333333333333330000000000044000                     // 4059
  var TYPEAHEAD_REGEXP = /^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w\d]*))\s+in\s+([\s\S]+?)$/;    // 4060
                                                                                                                      // 4061
  return {                                                                                                            // 4062
    parse:function (input) {                                                                                          // 4063
                                                                                                                      // 4064
      var match = input.match(TYPEAHEAD_REGEXP);                                                                      // 4065
      if (!match) {                                                                                                   // 4066
        throw new Error(                                                                                              // 4067
          'Expected typeahead specification in form of "_modelValue_ (as _label_)? for _item_ in _collection_"' +     // 4068
            ' but got "' + input + '".');                                                                             // 4069
      }                                                                                                               // 4070
                                                                                                                      // 4071
      return {                                                                                                        // 4072
        itemName:match[3],                                                                                            // 4073
        source:$parse(match[4]),                                                                                      // 4074
        viewMapper:$parse(match[2] || match[1]),                                                                      // 4075
        modelMapper:$parse(match[1])                                                                                  // 4076
      };                                                                                                              // 4077
    }                                                                                                                 // 4078
  };                                                                                                                  // 4079
}])                                                                                                                   // 4080
                                                                                                                      // 4081
  .directive('typeahead', ['$compile', '$parse', '$q', '$timeout', '$document', '$position', 'typeaheadParser',       // 4082
    function ($compile, $parse, $q, $timeout, $document, $position, typeaheadParser) {                                // 4083
                                                                                                                      // 4084
  var HOT_KEYS = [9, 13, 27, 38, 40];                                                                                 // 4085
                                                                                                                      // 4086
  return {                                                                                                            // 4087
    require:'ngModel',                                                                                                // 4088
    link:function (originalScope, element, attrs, modelCtrl) {                                                        // 4089
                                                                                                                      // 4090
      //SUPPORTED ATTRIBUTES (OPTIONS)                                                                                // 4091
                                                                                                                      // 4092
      //minimal no of characters that needs to be entered before typeahead kicks-in                                   // 4093
      var minSearch = originalScope.$eval(attrs.typeaheadMinLength) || 1;                                             // 4094
                                                                                                                      // 4095
      //minimal wait time after last character typed before typeahead kicks-in                                        // 4096
      var waitTime = originalScope.$eval(attrs.typeaheadWaitMs) || 0;                                                 // 4097
                                                                                                                      // 4098
      //should it restrict model values to the ones selected from the popup only?                                     // 4099
      var isEditable = originalScope.$eval(attrs.typeaheadEditable) !== false;                                        // 4100
                                                                                                                      // 4101
      //binding to a variable that indicates if matches are being retrieved asynchronously                            // 4102
      var isLoadingSetter = $parse(attrs.typeaheadLoading).assign || angular.noop;                                    // 4103
                                                                                                                      // 4104
      //a callback executed when a match is selected                                                                  // 4105
      var onSelectCallback = $parse(attrs.typeaheadOnSelect);                                                         // 4106
                                                                                                                      // 4107
      var inputFormatter = attrs.typeaheadInputFormatter ? $parse(attrs.typeaheadInputFormatter) : undefined;         // 4108
                                                                                                                      // 4109
      var appendToBody =  attrs.typeaheadAppendToBody ? originalScope.$eval(attrs.typeaheadAppendToBody) : false;     // 4110
                                                                                                                      // 4111
      var focusFirst = originalScope.$eval(attrs.typeaheadFocusFirst) !== false;                                      // 4112
                                                                                                                      // 4113
      //INTERNAL VARIABLES                                                                                            // 4114
                                                                                                                      // 4115
      //model setter executed upon match selection                                                                    // 4116
      var $setModelValue = $parse(attrs.ngModel).assign;                                                              // 4117
                                                                                                                      // 4118
      //expressions used by typeahead                                                                                 // 4119
      var parserResult = typeaheadParser.parse(attrs.typeahead);                                                      // 4120
                                                                                                                      // 4121
      var hasFocus;                                                                                                   // 4122
                                                                                                                      // 4123
      //create a child scope for the typeahead directive so we are not polluting original scope                       // 4124
      //with typeahead-specific data (matches, query etc.)                                                            // 4125
      var scope = originalScope.$new();                                                                               // 4126
      originalScope.$on('$destroy', function(){                                                                       // 4127
        scope.$destroy();                                                                                             // 4128
      });                                                                                                             // 4129
                                                                                                                      // 4130
      // WAI-ARIA                                                                                                     // 4131
      var popupId = 'typeahead-' + scope.$id + '-' + Math.floor(Math.random() * 10000);                               // 4132
      element.attr({                                                                                                  // 4133
        'aria-autocomplete': 'list',                                                                                  // 4134
        'aria-expanded': false,                                                                                       // 4135
        'aria-owns': popupId                                                                                          // 4136
      });                                                                                                             // 4137
                                                                                                                      // 4138
      //pop-up element used to display matches                                                                        // 4139
      var popUpEl = angular.element('<div typeahead-popup></div>');                                                   // 4140
      popUpEl.attr({                                                                                                  // 4141
        id: popupId,                                                                                                  // 4142
        matches: 'matches',                                                                                           // 4143
        active: 'activeIdx',                                                                                          // 4144
        select: 'select(activeIdx)',                                                                                  // 4145
        query: 'query',                                                                                               // 4146
        position: 'position'                                                                                          // 4147
      });                                                                                                             // 4148
      //custom item template                                                                                          // 4149
      if (angular.isDefined(attrs.typeaheadTemplateUrl)) {                                                            // 4150
        popUpEl.attr('template-url', attrs.typeaheadTemplateUrl);                                                     // 4151
      }                                                                                                               // 4152
                                                                                                                      // 4153
      var resetMatches = function() {                                                                                 // 4154
        scope.matches = [];                                                                                           // 4155
        scope.activeIdx = -1;                                                                                         // 4156
        element.attr('aria-expanded', false);                                                                         // 4157
      };                                                                                                              // 4158
                                                                                                                      // 4159
      var getMatchId = function(index) {                                                                              // 4160
        return popupId + '-option-' + index;                                                                          // 4161
      };                                                                                                              // 4162
                                                                                                                      // 4163
      // Indicate that the specified match is the active (pre-selected) item in the list owned by this typeahead.     // 4164
      // This attribute is added or removed automatically when the `activeIdx` changes.                               // 4165
      scope.$watch('activeIdx', function(index) {                                                                     // 4166
        if (index < 0) {                                                                                              // 4167
          element.removeAttr('aria-activedescendant');                                                                // 4168
        } else {                                                                                                      // 4169
          element.attr('aria-activedescendant', getMatchId(index));                                                   // 4170
        }                                                                                                             // 4171
      });                                                                                                             // 4172
                                                                                                                      // 4173
      var getMatchesAsync = function(inputValue) {                                                                    // 4174
                                                                                                                      // 4175
        var locals = {$viewValue: inputValue};                                                                        // 4176
        isLoadingSetter(originalScope, true);                                                                         // 4177
        $q.when(parserResult.source(originalScope, locals)).then(function(matches) {                                  // 4178
                                                                                                                      // 4179
          //it might happen that several async queries were in progress if a user were typing fast                    // 4180
          //but we are interested only in responses that correspond to the current view value                         // 4181
          var onCurrentRequest = (inputValue === modelCtrl.$viewValue);                                               // 4182
          if (onCurrentRequest && hasFocus) {                                                                         // 4183
            if (matches && matches.length > 0) {                                                                      // 4184
                                                                                                                      // 4185
              scope.activeIdx = focusFirst ? 0 : -1;                                                                  // 4186
              scope.matches.length = 0;                                                                               // 4187
                                                                                                                      // 4188
              //transform labels                                                                                      // 4189
              for(var i=0; i<matches.length; i++) {                                                                   // 4190
                locals[parserResult.itemName] = matches[i];                                                           // 4191
                scope.matches.push({                                                                                  // 4192
                  id: getMatchId(i),                                                                                  // 4193
                  label: parserResult.viewMapper(scope, locals),                                                      // 4194
                  model: matches[i]                                                                                   // 4195
                });                                                                                                   // 4196
              }                                                                                                       // 4197
                                                                                                                      // 4198
              scope.query = inputValue;                                                                               // 4199
              //position pop-up with matches - we need to re-calculate its position each time we are opening a window // 4200
              //with matches as a pop-up might be absolute-positioned and position of an input might have changed on a page
              //due to other elements being rendered                                                                  // 4202
              scope.position = appendToBody ? $position.offset(element) : $position.position(element);                // 4203
              scope.position.top = scope.position.top + element.prop('offsetHeight');                                 // 4204
                                                                                                                      // 4205
              element.attr('aria-expanded', true);                                                                    // 4206
            } else {                                                                                                  // 4207
              resetMatches();                                                                                         // 4208
            }                                                                                                         // 4209
          }                                                                                                           // 4210
          if (onCurrentRequest) {                                                                                     // 4211
            isLoadingSetter(originalScope, false);                                                                    // 4212
          }                                                                                                           // 4213
        }, function(){                                                                                                // 4214
          resetMatches();                                                                                             // 4215
          isLoadingSetter(originalScope, false);                                                                      // 4216
        });                                                                                                           // 4217
      };                                                                                                              // 4218
                                                                                                                      // 4219
      resetMatches();                                                                                                 // 4220
                                                                                                                      // 4221
      //we need to propagate user's query so we can higlight matches                                                  // 4222
      scope.query = undefined;                                                                                        // 4223
                                                                                                                      // 4224
      //Declare the timeout promise var outside the function scope so that stacked calls can be cancelled later       // 4225
      var timeoutPromise;                                                                                             // 4226
                                                                                                                      // 4227
      var scheduleSearchWithTimeout = function(inputValue) {                                                          // 4228
        timeoutPromise = $timeout(function () {                                                                       // 4229
          getMatchesAsync(inputValue);                                                                                // 4230
        }, waitTime);                                                                                                 // 4231
      };                                                                                                              // 4232
                                                                                                                      // 4233
      var cancelPreviousTimeout = function() {                                                                        // 4234
        if (timeoutPromise) {                                                                                         // 4235
          $timeout.cancel(timeoutPromise);                                                                            // 4236
        }                                                                                                             // 4237
      };                                                                                                              // 4238
                                                                                                                      // 4239
      //plug into $parsers pipeline to open a typeahead on view changes initiated from DOM                            // 4240
      //$parsers kick-in on all the changes coming from the view as well as manually triggered by $setViewValue       // 4241
      modelCtrl.$parsers.unshift(function (inputValue) {                                                              // 4242
                                                                                                                      // 4243
        hasFocus = true;                                                                                              // 4244
                                                                                                                      // 4245
        if (inputValue && inputValue.length >= minSearch) {                                                           // 4246
          if (waitTime > 0) {                                                                                         // 4247
            cancelPreviousTimeout();                                                                                  // 4248
            scheduleSearchWithTimeout(inputValue);                                                                    // 4249
          } else {                                                                                                    // 4250
            getMatchesAsync(inputValue);                                                                              // 4251
          }                                                                                                           // 4252
        } else {                                                                                                      // 4253
          isLoadingSetter(originalScope, false);                                                                      // 4254
          cancelPreviousTimeout();                                                                                    // 4255
          resetMatches();                                                                                             // 4256
        }                                                                                                             // 4257
                                                                                                                      // 4258
        if (isEditable) {                                                                                             // 4259
          return inputValue;                                                                                          // 4260
        } else {                                                                                                      // 4261
          if (!inputValue) {                                                                                          // 4262
            // Reset in case user had typed something previously.                                                     // 4263
            modelCtrl.$setValidity('editable', true);                                                                 // 4264
            return inputValue;                                                                                        // 4265
          } else {                                                                                                    // 4266
            modelCtrl.$setValidity('editable', false);                                                                // 4267
            return undefined;                                                                                         // 4268
          }                                                                                                           // 4269
        }                                                                                                             // 4270
      });                                                                                                             // 4271
                                                                                                                      // 4272
      modelCtrl.$formatters.push(function (modelValue) {                                                              // 4273
                                                                                                                      // 4274
        var candidateViewValue, emptyViewValue;                                                                       // 4275
        var locals = {};                                                                                              // 4276
                                                                                                                      // 4277
        // The validity may be set to false via $parsers (see above) if                                               // 4278
        // the model is restricted to selected values. If the model                                                   // 4279
        // is set manually it is considered to be valid.                                                              // 4280
        if (!isEditable) {                                                                                            // 4281
          modelCtrl.$setValidity('editable', true);                                                                   // 4282
        }                                                                                                             // 4283
                                                                                                                      // 4284
        if (inputFormatter) {                                                                                         // 4285
                                                                                                                      // 4286
          locals.$model = modelValue;                                                                                 // 4287
          return inputFormatter(originalScope, locals);                                                               // 4288
                                                                                                                      // 4289
        } else {                                                                                                      // 4290
                                                                                                                      // 4291
          //it might happen that we don't have enough info to properly render input value                             // 4292
          //we need to check for this situation and simply return model value if we can't apply custom formatting     // 4293
          locals[parserResult.itemName] = modelValue;                                                                 // 4294
          candidateViewValue = parserResult.viewMapper(originalScope, locals);                                        // 4295
          locals[parserResult.itemName] = undefined;                                                                  // 4296
          emptyViewValue = parserResult.viewMapper(originalScope, locals);                                            // 4297
                                                                                                                      // 4298
          return candidateViewValue!== emptyViewValue ? candidateViewValue : modelValue;                              // 4299
        }                                                                                                             // 4300
      });                                                                                                             // 4301
                                                                                                                      // 4302
      scope.select = function (activeIdx) {                                                                           // 4303
        //called from within the $digest() cycle                                                                      // 4304
        var locals = {};                                                                                              // 4305
        var model, item;                                                                                              // 4306
                                                                                                                      // 4307
        locals[parserResult.itemName] = item = scope.matches[activeIdx].model;                                        // 4308
        model = parserResult.modelMapper(originalScope, locals);                                                      // 4309
        $setModelValue(originalScope, model);                                                                         // 4310
        modelCtrl.$setValidity('editable', true);                                                                     // 4311
        modelCtrl.$setValidity('parse', true);                                                                        // 4312
                                                                                                                      // 4313
        onSelectCallback(originalScope, {                                                                             // 4314
          $item: item,                                                                                                // 4315
          $model: model,                                                                                              // 4316
          $label: parserResult.viewMapper(originalScope, locals)                                                      // 4317
        });                                                                                                           // 4318
                                                                                                                      // 4319
        resetMatches();                                                                                               // 4320
                                                                                                                      // 4321
        //return focus to the input element if a match was selected via a mouse click event                           // 4322
        // use timeout to avoid $rootScope:inprog error                                                               // 4323
        $timeout(function() { element[0].focus(); }, 0, false);                                                       // 4324
      };                                                                                                              // 4325
                                                                                                                      // 4326
      //bind keyboard events: arrows up(38) / down(40), enter(13) and tab(9), esc(27)                                 // 4327
      element.bind('keydown', function (evt) {                                                                        // 4328
                                                                                                                      // 4329
        //typeahead is open and an "interesting" key was pressed                                                      // 4330
        if (scope.matches.length === 0 || HOT_KEYS.indexOf(evt.which) === -1) {                                       // 4331
          return;                                                                                                     // 4332
        }                                                                                                             // 4333
                                                                                                                      // 4334
        // if there's nothing selected (i.e. focusFirst) and enter is hit, don't do anything                          // 4335
        if (scope.activeIdx == -1 && (evt.which === 13 || evt.which === 9)) {                                         // 4336
          return;                                                                                                     // 4337
        }                                                                                                             // 4338
                                                                                                                      // 4339
        evt.preventDefault();                                                                                         // 4340
                                                                                                                      // 4341
        if (evt.which === 40) {                                                                                       // 4342
          scope.activeIdx = (scope.activeIdx + 1) % scope.matches.length;                                             // 4343
          scope.$digest();                                                                                            // 4344
                                                                                                                      // 4345
        } else if (evt.which === 38) {                                                                                // 4346
          scope.activeIdx = (scope.activeIdx > 0 ? scope.activeIdx : scope.matches.length) - 1;                       // 4347
          scope.$digest();                                                                                            // 4348
                                                                                                                      // 4349
        } else if (evt.which === 13 || evt.which === 9) {                                                             // 4350
          scope.$apply(function () {                                                                                  // 4351
            scope.select(scope.activeIdx);                                                                            // 4352
          });                                                                                                         // 4353
                                                                                                                      // 4354
        } else if (evt.which === 27) {                                                                                // 4355
          evt.stopPropagation();                                                                                      // 4356
                                                                                                                      // 4357
          resetMatches();                                                                                             // 4358
          scope.$digest();                                                                                            // 4359
        }                                                                                                             // 4360
      });                                                                                                             // 4361
                                                                                                                      // 4362
      element.bind('blur', function (evt) {                                                                           // 4363
        hasFocus = false;                                                                                             // 4364
      });                                                                                                             // 4365
                                                                                                                      // 4366
      // Keep reference to click handler to unbind it.                                                                // 4367
      var dismissClickHandler = function (evt) {                                                                      // 4368
        if (element[0] !== evt.target) {                                                                              // 4369
          resetMatches();                                                                                             // 4370
          scope.$digest();                                                                                            // 4371
        }                                                                                                             // 4372
      };                                                                                                              // 4373
                                                                                                                      // 4374
      $document.bind('click', dismissClickHandler);                                                                   // 4375
                                                                                                                      // 4376
      originalScope.$on('$destroy', function(){                                                                       // 4377
        $document.unbind('click', dismissClickHandler);                                                               // 4378
        if (appendToBody) {                                                                                           // 4379
          $popup.remove();                                                                                            // 4380
        }                                                                                                             // 4381
        // Prevent jQuery cache memory leak                                                                           // 4382
        popUpEl.remove();                                                                                             // 4383
      });                                                                                                             // 4384
                                                                                                                      // 4385
      var $popup = $compile(popUpEl)(scope);                                                                          // 4386
                                                                                                                      // 4387
      if (appendToBody) {                                                                                             // 4388
        $document.find('body').append($popup);                                                                        // 4389
      } else {                                                                                                        // 4390
        element.after($popup);                                                                                        // 4391
      }                                                                                                               // 4392
    }                                                                                                                 // 4393
  };                                                                                                                  // 4394
                                                                                                                      // 4395
}])                                                                                                                   // 4396
                                                                                                                      // 4397
  .directive('typeaheadPopup', function () {                                                                          // 4398
    return {                                                                                                          // 4399
      restrict:'EA',                                                                                                  // 4400
      scope:{                                                                                                         // 4401
        matches:'=',                                                                                                  // 4402
        query:'=',                                                                                                    // 4403
        active:'=',                                                                                                   // 4404
        position:'=',                                                                                                 // 4405
        select:'&'                                                                                                    // 4406
      },                                                                                                              // 4407
      replace:true,                                                                                                   // 4408
      templateUrl:'template/typeahead/typeahead-popup.html',                                                          // 4409
      link:function (scope, element, attrs) {                                                                         // 4410
                                                                                                                      // 4411
        scope.templateUrl = attrs.templateUrl;                                                                        // 4412
                                                                                                                      // 4413
        scope.isOpen = function () {                                                                                  // 4414
          return scope.matches.length > 0;                                                                            // 4415
        };                                                                                                            // 4416
                                                                                                                      // 4417
        scope.isActive = function (matchIdx) {                                                                        // 4418
          return scope.active == matchIdx;                                                                            // 4419
        };                                                                                                            // 4420
                                                                                                                      // 4421
        scope.selectActive = function (matchIdx) {                                                                    // 4422
          scope.active = matchIdx;                                                                                    // 4423
        };                                                                                                            // 4424
                                                                                                                      // 4425
        scope.selectMatch = function (activeIdx) {                                                                    // 4426
          scope.select({activeIdx:activeIdx});                                                                        // 4427
        };                                                                                                            // 4428
      }                                                                                                               // 4429
    };                                                                                                                // 4430
  })                                                                                                                  // 4431
                                                                                                                      // 4432
  .directive('typeaheadMatch', ['$templateRequest', '$compile', '$parse', function ($templateRequest, $compile, $parse) {
    return {                                                                                                          // 4434
      restrict:'EA',                                                                                                  // 4435
      scope:{                                                                                                         // 4436
        index:'=',                                                                                                    // 4437
        match:'=',                                                                                                    // 4438
        query:'='                                                                                                     // 4439
      },                                                                                                              // 4440
      link:function (scope, element, attrs) {                                                                         // 4441
        var tplUrl = $parse(attrs.templateUrl)(scope.$parent) || 'template/typeahead/typeahead-match.html';           // 4442
        $templateRequest(tplUrl).then(function(tplContent) {                                                          // 4443
          $compile(tplContent.trim())(scope, function(clonedElement){                                                 // 4444
            element.replaceWith(clonedElement);                                                                       // 4445
          });                                                                                                         // 4446
        });                                                                                                           // 4447
      }                                                                                                               // 4448
    };                                                                                                                // 4449
  }])                                                                                                                 // 4450
                                                                                                                      // 4451
  .filter('typeaheadHighlight', function() {                                                                          // 4452
                                                                                                                      // 4453
    function escapeRegexp(queryToEscape) {                                                                            // 4454
      return queryToEscape.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');                                                 // 4455
    }                                                                                                                 // 4456
                                                                                                                      // 4457
    return function(matchItem, query) {                                                                               // 4458
      return query ? ('' + matchItem).replace(new RegExp(escapeRegexp(query), 'gi'), '<strong>$&</strong>') : matchItem;
    };                                                                                                                // 4460
  });                                                                                                                 // 4461
                                                                                                                      // 4462
angular.module("template/accordion/accordion-group.html", []).run(["$templateCache", function($templateCache) {       // 4463
  $templateCache.put("template/accordion/accordion-group.html",                                                       // 4464
    "<div class=\"panel panel-default\">\n" +                                                                         // 4465
    "  <div class=\"panel-heading\">\n" +                                                                             // 4466
    "    <h4 class=\"panel-title\">\n" +                                                                              // 4467
    "      <a href=\"javascript:void(0)\" tabindex=\"0\" class=\"accordion-toggle\" ng-click=\"toggleOpen()\" accordion-transclude=\"heading\"><span ng-class=\"{'text-muted': isDisabled}\">{{heading}}</span></a>\n" +
    "    </h4>\n" +                                                                                                   // 4469
    "  </div>\n" +                                                                                                    // 4470
    "  <div class=\"panel-collapse collapse\" collapse=\"!isOpen\">\n" +                                              // 4471
    "	  <div class=\"panel-body\" ng-transclude></div>\n" +                                                           // 4472
    "  </div>\n" +                                                                                                    // 4473
    "</div>\n" +                                                                                                      // 4474
    "");                                                                                                              // 4475
}]);                                                                                                                  // 4476
                                                                                                                      // 4477
angular.module("template/accordion/accordion.html", []).run(["$templateCache", function($templateCache) {             // 4478
  $templateCache.put("template/accordion/accordion.html",                                                             // 4479
    "<div class=\"panel-group\" ng-transclude></div>");                                                               // 4480
}]);                                                                                                                  // 4481
                                                                                                                      // 4482
angular.module("template/alert/alert.html", []).run(["$templateCache", function($templateCache) {                     // 4483
  $templateCache.put("template/alert/alert.html",                                                                     // 4484
    "<div class=\"alert\" ng-class=\"['alert-' + (type || 'warning'), closeable ? 'alert-dismissable' : null]\" role=\"alert\">\n" +
    "    <button ng-show=\"closeable\" type=\"button\" class=\"close\" ng-click=\"close()\">\n" +                     // 4486
    "        <span aria-hidden=\"true\">&times;</span>\n" +                                                           // 4487
    "        <span class=\"sr-only\">Close</span>\n" +                                                                // 4488
    "    </button>\n" +                                                                                               // 4489
    "    <div ng-transclude></div>\n" +                                                                               // 4490
    "</div>\n" +                                                                                                      // 4491
    "");                                                                                                              // 4492
}]);                                                                                                                  // 4493
                                                                                                                      // 4494
angular.module("template/carousel/carousel.html", []).run(["$templateCache", function($templateCache) {               // 4495
  $templateCache.put("template/carousel/carousel.html",                                                               // 4496
    "<div ng-mouseenter=\"pause()\" ng-mouseleave=\"play()\" class=\"carousel\" ng-swipe-right=\"prev()\" ng-swipe-left=\"next()\">\n" +
    "    <ol class=\"carousel-indicators\" ng-show=\"slides.length > 1\">\n" +                                        // 4498
    "        <li ng-repeat=\"slide in slides | orderBy:'index' track by $index\" ng-class=\"{active: isActive(slide)}\" ng-click=\"select(slide)\"></li>\n" +
    "    </ol>\n" +                                                                                                   // 4500
    "    <div class=\"carousel-inner\" ng-transclude></div>\n" +                                                      // 4501
    "    <a class=\"left carousel-control\" ng-click=\"prev()\" ng-show=\"slides.length > 1\"><span class=\"glyphicon glyphicon-chevron-left\"></span></a>\n" +
    "    <a class=\"right carousel-control\" ng-click=\"next()\" ng-show=\"slides.length > 1\"><span class=\"glyphicon glyphicon-chevron-right\"></span></a>\n" +
    "</div>\n" +                                                                                                      // 4504
    "");                                                                                                              // 4505
}]);                                                                                                                  // 4506
                                                                                                                      // 4507
angular.module("template/carousel/slide.html", []).run(["$templateCache", function($templateCache) {                  // 4508
  $templateCache.put("template/carousel/slide.html",                                                                  // 4509
    "<div ng-class=\"{\n" +                                                                                           // 4510
    "    'active': active\n" +                                                                                        // 4511
    "  }\" class=\"item text-center\" ng-transclude></div>\n" +                                                       // 4512
    "");                                                                                                              // 4513
}]);                                                                                                                  // 4514
                                                                                                                      // 4515
angular.module("template/datepicker/datepicker.html", []).run(["$templateCache", function($templateCache) {           // 4516
  $templateCache.put("template/datepicker/datepicker.html",                                                           // 4517
    "<div ng-switch=\"datepickerMode\" role=\"application\" ng-keydown=\"keydown($event)\">\n" +                      // 4518
    "  <daypicker ng-switch-when=\"day\" tabindex=\"0\"></daypicker>\n" +                                             // 4519
    "  <monthpicker ng-switch-when=\"month\" tabindex=\"0\"></monthpicker>\n" +                                       // 4520
    "  <yearpicker ng-switch-when=\"year\" tabindex=\"0\"></yearpicker>\n" +                                          // 4521
    "</div>");                                                                                                        // 4522
}]);                                                                                                                  // 4523
                                                                                                                      // 4524
angular.module("template/datepicker/day.html", []).run(["$templateCache", function($templateCache) {                  // 4525
  $templateCache.put("template/datepicker/day.html",                                                                  // 4526
    "<table role=\"grid\" aria-labelledby=\"{{uniqueId}}-title\" aria-activedescendant=\"{{activeDateId}}\">\n" +     // 4527
    "  <thead>\n" +                                                                                                   // 4528
    "    <tr>\n" +                                                                                                    // 4529
    "      <th><button type=\"button\" class=\"btn btn-default btn-sm pull-left\" ng-click=\"move(-1)\" tabindex=\"-1\"><i class=\"glyphicon glyphicon-chevron-left\"></i></button></th>\n" +
    "      <th colspan=\"{{5 + showWeeks}}\"><button id=\"{{uniqueId}}-title\" role=\"heading\" aria-live=\"assertive\" aria-atomic=\"true\" type=\"button\" class=\"btn btn-default btn-sm\" ng-click=\"toggleMode()\" ng-disabled=\"datepickerMode === maxMode\" tabindex=\"-1\" style=\"width:100%;\"><strong>{{title}}</strong></button></th>\n" +
    "      <th><button type=\"button\" class=\"btn btn-default btn-sm pull-right\" ng-click=\"move(1)\" tabindex=\"-1\"><i class=\"glyphicon glyphicon-chevron-right\"></i></button></th>\n" +
    "    </tr>\n" +                                                                                                   // 4533
    "    <tr>\n" +                                                                                                    // 4534
    "      <th ng-show=\"showWeeks\" class=\"text-center\"></th>\n" +                                                 // 4535
    "      <th ng-repeat=\"label in labels track by $index\" class=\"text-center\"><small aria-label=\"{{label.full}}\">{{label.abbr}}</small></th>\n" +
    "    </tr>\n" +                                                                                                   // 4537
    "  </thead>\n" +                                                                                                  // 4538
    "  <tbody>\n" +                                                                                                   // 4539
    "    <tr ng-repeat=\"row in rows track by $index\">\n" +                                                          // 4540
    "      <td ng-show=\"showWeeks\" class=\"text-center h6\"><em>{{ weekNumbers[$index] }}</em></td>\n" +            // 4541
    "      <td ng-repeat=\"dt in row track by dt.date\" class=\"text-center\" role=\"gridcell\" id=\"{{dt.uid}}\" aria-disabled=\"{{!!dt.disabled}}\" ng-class=\"dt.customClass\">\n" +
    "        <button type=\"button\" style=\"width:100%;\" class=\"btn btn-default btn-sm\" ng-class=\"{'btn-info': dt.selected, active: isActive(dt)}\" ng-click=\"select(dt.date)\" ng-disabled=\"dt.disabled\" tabindex=\"-1\"><span ng-class=\"{'text-muted': dt.secondary, 'text-info': dt.current}\">{{dt.label}}</span></button>\n" +
    "      </td>\n" +                                                                                                 // 4544
    "    </tr>\n" +                                                                                                   // 4545
    "  </tbody>\n" +                                                                                                  // 4546
    "</table>\n" +                                                                                                    // 4547
    "");                                                                                                              // 4548
}]);                                                                                                                  // 4549
                                                                                                                      // 4550
angular.module("template/datepicker/month.html", []).run(["$templateCache", function($templateCache) {                // 4551
  $templateCache.put("template/datepicker/month.html",                                                                // 4552
    "<table role=\"grid\" aria-labelledby=\"{{uniqueId}}-title\" aria-activedescendant=\"{{activeDateId}}\">\n" +     // 4553
    "  <thead>\n" +                                                                                                   // 4554
    "    <tr>\n" +                                                                                                    // 4555
    "      <th><button type=\"button\" class=\"btn btn-default btn-sm pull-left\" ng-click=\"move(-1)\" tabindex=\"-1\"><i class=\"glyphicon glyphicon-chevron-left\"></i></button></th>\n" +
    "      <th><button id=\"{{uniqueId}}-title\" role=\"heading\" aria-live=\"assertive\" aria-atomic=\"true\" type=\"button\" class=\"btn btn-default btn-sm\" ng-click=\"toggleMode()\" ng-disabled=\"datepickerMode === maxMode\" tabindex=\"-1\" style=\"width:100%;\"><strong>{{title}}</strong></button></th>\n" +
    "      <th><button type=\"button\" class=\"btn btn-default btn-sm pull-right\" ng-click=\"move(1)\" tabindex=\"-1\"><i class=\"glyphicon glyphicon-chevron-right\"></i></button></th>\n" +
    "    </tr>\n" +                                                                                                   // 4559
    "  </thead>\n" +                                                                                                  // 4560
    "  <tbody>\n" +                                                                                                   // 4561
    "    <tr ng-repeat=\"row in rows track by $index\">\n" +                                                          // 4562
    "      <td ng-repeat=\"dt in row track by dt.date\" class=\"text-center\" role=\"gridcell\" id=\"{{dt.uid}}\" aria-disabled=\"{{!!dt.disabled}}\">\n" +
    "        <button type=\"button\" style=\"width:100%;\" class=\"btn btn-default\" ng-class=\"{'btn-info': dt.selected, active: isActive(dt)}\" ng-click=\"select(dt.date)\" ng-disabled=\"dt.disabled\" tabindex=\"-1\"><span ng-class=\"{'text-info': dt.current}\">{{dt.label}}</span></button>\n" +
    "      </td>\n" +                                                                                                 // 4565
    "    </tr>\n" +                                                                                                   // 4566
    "  </tbody>\n" +                                                                                                  // 4567
    "</table>\n" +                                                                                                    // 4568
    "");                                                                                                              // 4569
}]);                                                                                                                  // 4570
                                                                                                                      // 4571
angular.module("template/datepicker/popup.html", []).run(["$templateCache", function($templateCache) {                // 4572
  $templateCache.put("template/datepicker/popup.html",                                                                // 4573
    "<ul class=\"dropdown-menu\" ng-style=\"{display: (isOpen && 'block') || 'none', top: position.top+'px', left: position.left+'px'}\" ng-keydown=\"keydown($event)\">\n" +
    "	<li ng-transclude></li>\n" +                                                                                    // 4575
    "	<li ng-if=\"showButtonBar\" style=\"padding:10px 9px 2px\">\n" +                                                // 4576
    "		<span class=\"btn-group pull-left\">\n" +                                                                      // 4577
    "			<button type=\"button\" class=\"btn btn-sm btn-info\" ng-click=\"select('today')\">{{ getText('current') }}</button>\n" +
    "			<button type=\"button\" class=\"btn btn-sm btn-danger\" ng-click=\"select(null)\">{{ getText('clear') }}</button>\n" +
    "		</span>\n" +                                                                                                   // 4580
    "		<button type=\"button\" class=\"btn btn-sm btn-success pull-right\" ng-click=\"close()\">{{ getText('close') }}</button>\n" +
    "	</li>\n" +                                                                                                      // 4582
    "</ul>\n" +                                                                                                       // 4583
    "");                                                                                                              // 4584
}]);                                                                                                                  // 4585
                                                                                                                      // 4586
angular.module("template/datepicker/year.html", []).run(["$templateCache", function($templateCache) {                 // 4587
  $templateCache.put("template/datepicker/year.html",                                                                 // 4588
    "<table role=\"grid\" aria-labelledby=\"{{uniqueId}}-title\" aria-activedescendant=\"{{activeDateId}}\">\n" +     // 4589
    "  <thead>\n" +                                                                                                   // 4590
    "    <tr>\n" +                                                                                                    // 4591
    "      <th><button type=\"button\" class=\"btn btn-default btn-sm pull-left\" ng-click=\"move(-1)\" tabindex=\"-1\"><i class=\"glyphicon glyphicon-chevron-left\"></i></button></th>\n" +
    "      <th colspan=\"3\"><button id=\"{{uniqueId}}-title\" role=\"heading\" aria-live=\"assertive\" aria-atomic=\"true\" type=\"button\" class=\"btn btn-default btn-sm\" ng-click=\"toggleMode()\" ng-disabled=\"datepickerMode === maxMode\" tabindex=\"-1\" style=\"width:100%;\"><strong>{{title}}</strong></button></th>\n" +
    "      <th><button type=\"button\" class=\"btn btn-default btn-sm pull-right\" ng-click=\"move(1)\" tabindex=\"-1\"><i class=\"glyphicon glyphicon-chevron-right\"></i></button></th>\n" +
    "    </tr>\n" +                                                                                                   // 4595
    "  </thead>\n" +                                                                                                  // 4596
    "  <tbody>\n" +                                                                                                   // 4597
    "    <tr ng-repeat=\"row in rows track by $index\">\n" +                                                          // 4598
    "      <td ng-repeat=\"dt in row track by dt.date\" class=\"text-center\" role=\"gridcell\" id=\"{{dt.uid}}\" aria-disabled=\"{{!!dt.disabled}}\">\n" +
    "        <button type=\"button\" style=\"width:100%;\" class=\"btn btn-default\" ng-class=\"{'btn-info': dt.selected, active: isActive(dt)}\" ng-click=\"select(dt.date)\" ng-disabled=\"dt.disabled\" tabindex=\"-1\"><span ng-class=\"{'text-info': dt.current}\">{{dt.label}}</span></button>\n" +
    "      </td>\n" +                                                                                                 // 4601
    "    </tr>\n" +                                                                                                   // 4602
    "  </tbody>\n" +                                                                                                  // 4603
    "</table>\n" +                                                                                                    // 4604
    "");                                                                                                              // 4605
}]);                                                                                                                  // 4606
                                                                                                                      // 4607
angular.module("template/modal/backdrop.html", []).run(["$templateCache", function($templateCache) {                  // 4608
  $templateCache.put("template/modal/backdrop.html",                                                                  // 4609
    "<div class=\"modal-backdrop\"\n" +                                                                               // 4610
    "     modal-animation-class=\"fade\"\n" +                                                                         // 4611
    "     ng-class=\"{in: animate}\"\n" +                                                                             // 4612
    "     ng-style=\"{'z-index': 1040 + (index && 1 || 0) + index*10}\"\n" +                                          // 4613
    "></div>\n" +                                                                                                     // 4614
    "");                                                                                                              // 4615
}]);                                                                                                                  // 4616
                                                                                                                      // 4617
angular.module("template/modal/window.html", []).run(["$templateCache", function($templateCache) {                    // 4618
  $templateCache.put("template/modal/window.html",                                                                    // 4619
    "<div modal-render=\"{{$isRendered}}\" tabindex=\"-1\" role=\"dialog\" class=\"modal\"\n" +                       // 4620
    "    modal-animation-class=\"fade\"\n" +                                                                          // 4621
    "	ng-class=\"{in: animate}\" ng-style=\"{'z-index': 1050 + index*10, display: 'block'}\" ng-click=\"close($event)\">\n" +
    "    <div class=\"modal-dialog\" ng-class=\"size ? 'modal-' + size : ''\"><div class=\"modal-content\" modal-transclude></div></div>\n" +
    "</div>\n" +                                                                                                      // 4624
    "");                                                                                                              // 4625
}]);                                                                                                                  // 4626
                                                                                                                      // 4627
angular.module("template/pagination/pager.html", []).run(["$templateCache", function($templateCache) {                // 4628
  $templateCache.put("template/pagination/pager.html",                                                                // 4629
    "<ul class=\"pager\">\n" +                                                                                        // 4630
    "  <li ng-class=\"{disabled: noPrevious(), previous: align}\"><a href ng-click=\"selectPage(page - 1, $event)\">{{getText('previous')}}</a></li>\n" +
    "  <li ng-class=\"{disabled: noNext(), next: align}\"><a href ng-click=\"selectPage(page + 1, $event)\">{{getText('next')}}</a></li>\n" +
    "</ul>");                                                                                                         // 4633
}]);                                                                                                                  // 4634
                                                                                                                      // 4635
angular.module("template/pagination/pagination.html", []).run(["$templateCache", function($templateCache) {           // 4636
  $templateCache.put("template/pagination/pagination.html",                                                           // 4637
    "<ul class=\"pagination\">\n" +                                                                                   // 4638
    "  <li ng-if=\"boundaryLinks\" ng-class=\"{disabled: noPrevious()}\"><a href ng-click=\"selectPage(1, $event)\">{{getText('first')}}</a></li>\n" +
    "  <li ng-if=\"directionLinks\" ng-class=\"{disabled: noPrevious()}\"><a href ng-click=\"selectPage(page - 1, $event)\">{{getText('previous')}}</a></li>\n" +
    "  <li ng-repeat=\"page in pages track by $index\" ng-class=\"{active: page.active}\"><a href ng-click=\"selectPage(page.number, $event)\">{{page.text}}</a></li>\n" +
    "  <li ng-if=\"directionLinks\" ng-class=\"{disabled: noNext()}\"><a href ng-click=\"selectPage(page + 1, $event)\">{{getText('next')}}</a></li>\n" +
    "  <li ng-if=\"boundaryLinks\" ng-class=\"{disabled: noNext()}\"><a href ng-click=\"selectPage(totalPages, $event)\">{{getText('last')}}</a></li>\n" +
    "</ul>");                                                                                                         // 4644
}]);                                                                                                                  // 4645
                                                                                                                      // 4646
angular.module("template/tooltip/tooltip-html-popup.html", []).run(["$templateCache", function($templateCache) {      // 4647
  $templateCache.put("template/tooltip/tooltip-html-popup.html",                                                      // 4648
    "<div class=\"tooltip\"\n" +                                                                                      // 4649
    "  tooltip-animation-class=\"fade\"\n" +                                                                          // 4650
    "  tooltip-classes\n" +                                                                                           // 4651
    "  ng-class=\"{ in: isOpen() }\">\n" +                                                                            // 4652
    "  <div class=\"tooltip-arrow\"></div>\n" +                                                                       // 4653
    "  <div class=\"tooltip-inner\" ng-bind-html=\"contentExp()\"></div>\n" +                                         // 4654
    "</div>\n" +                                                                                                      // 4655
    "");                                                                                                              // 4656
}]);                                                                                                                  // 4657
                                                                                                                      // 4658
angular.module("template/tooltip/tooltip-html-unsafe-popup.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/tooltip/tooltip-html-unsafe-popup.html",                                               // 4660
    "<div class=\"tooltip\"\n" +                                                                                      // 4661
    "  tooltip-animation-class=\"fade\"\n" +                                                                          // 4662
    "  tooltip-classes\n" +                                                                                           // 4663
    "  ng-class=\"{ in: isOpen() }\">\n" +                                                                            // 4664
    "  <div class=\"tooltip-arrow\"></div>\n" +                                                                       // 4665
    "  <div class=\"tooltip-inner\" bind-html-unsafe=\"content\"></div>\n" +                                          // 4666
    "</div>\n" +                                                                                                      // 4667
    "");                                                                                                              // 4668
}]);                                                                                                                  // 4669
                                                                                                                      // 4670
angular.module("template/tooltip/tooltip-popup.html", []).run(["$templateCache", function($templateCache) {           // 4671
  $templateCache.put("template/tooltip/tooltip-popup.html",                                                           // 4672
    "<div class=\"tooltip\"\n" +                                                                                      // 4673
    "  tooltip-animation-class=\"fade\"\n" +                                                                          // 4674
    "  tooltip-classes\n" +                                                                                           // 4675
    "  ng-class=\"{ in: isOpen() }\">\n" +                                                                            // 4676
    "  <div class=\"tooltip-arrow\"></div>\n" +                                                                       // 4677
    "  <div class=\"tooltip-inner\" ng-bind=\"content\"></div>\n" +                                                   // 4678
    "</div>\n" +                                                                                                      // 4679
    "");                                                                                                              // 4680
}]);                                                                                                                  // 4681
                                                                                                                      // 4682
angular.module("template/tooltip/tooltip-template-popup.html", []).run(["$templateCache", function($templateCache) {  // 4683
  $templateCache.put("template/tooltip/tooltip-template-popup.html",                                                  // 4684
    "<div class=\"tooltip\"\n" +                                                                                      // 4685
    "  tooltip-animation-class=\"fade\"\n" +                                                                          // 4686
    "  tooltip-classes\n" +                                                                                           // 4687
    "  ng-class=\"{ in: isOpen() }\">\n" +                                                                            // 4688
    "  <div class=\"tooltip-arrow\"></div>\n" +                                                                       // 4689
    "  <div class=\"tooltip-inner\"\n" +                                                                              // 4690
    "    tooltip-template-transclude=\"contentExp()\"\n" +                                                            // 4691
    "    tooltip-template-transclude-scope=\"originScope()\"></div>\n" +                                              // 4692
    "</div>\n" +                                                                                                      // 4693
    "");                                                                                                              // 4694
}]);                                                                                                                  // 4695
                                                                                                                      // 4696
angular.module("template/popover/popover-template.html", []).run(["$templateCache", function($templateCache) {        // 4697
  $templateCache.put("template/popover/popover-template.html",                                                        // 4698
    "<div class=\"popover\"\n" +                                                                                      // 4699
    "  tooltip-animation-class=\"fade\"\n" +                                                                          // 4700
    "  tooltip-classes\n" +                                                                                           // 4701
    "  ng-class=\"{ in: isOpen() }\">\n" +                                                                            // 4702
    "  <div class=\"arrow\"></div>\n" +                                                                               // 4703
    "\n" +                                                                                                            // 4704
    "  <div class=\"popover-inner\">\n" +                                                                             // 4705
    "      <h3 class=\"popover-title\" ng-bind=\"title\" ng-if=\"title\"></h3>\n" +                                   // 4706
    "      <div class=\"popover-content\"\n" +                                                                        // 4707
    "        tooltip-template-transclude=\"contentExp()\"\n" +                                                        // 4708
    "        tooltip-template-transclude-scope=\"originScope()\"></div>\n" +                                          // 4709
    "  </div>\n" +                                                                                                    // 4710
    "</div>\n" +                                                                                                      // 4711
    "");                                                                                                              // 4712
}]);                                                                                                                  // 4713
                                                                                                                      // 4714
angular.module("template/popover/popover-window.html", []).run(["$templateCache", function($templateCache) {          // 4715
  $templateCache.put("template/popover/popover-window.html",                                                          // 4716
    "<div class=\"popover {{placement}}\" ng-class=\"{ in: isOpen, fade: animation }\">\n" +                          // 4717
    "  <div class=\"arrow\"></div>\n" +                                                                               // 4718
    "\n" +                                                                                                            // 4719
    "  <div class=\"popover-inner\">\n" +                                                                             // 4720
    "      <h3 class=\"popover-title\" ng-bind=\"title\" ng-show=\"title\"></h3>\n" +                                 // 4721
    "      <div class=\"popover-content\" tooltip-template-transclude></div>\n" +                                     // 4722
    "  </div>\n" +                                                                                                    // 4723
    "</div>\n" +                                                                                                      // 4724
    "");                                                                                                              // 4725
}]);                                                                                                                  // 4726
                                                                                                                      // 4727
angular.module("template/popover/popover.html", []).run(["$templateCache", function($templateCache) {                 // 4728
  $templateCache.put("template/popover/popover.html",                                                                 // 4729
    "<div class=\"popover\"\n" +                                                                                      // 4730
    "  tooltip-animation-class=\"fade\"\n" +                                                                          // 4731
    "  tooltip-classes\n" +                                                                                           // 4732
    "  ng-class=\"{ in: isOpen() }\">\n" +                                                                            // 4733
    "  <div class=\"arrow\"></div>\n" +                                                                               // 4734
    "\n" +                                                                                                            // 4735
    "  <div class=\"popover-inner\">\n" +                                                                             // 4736
    "      <h3 class=\"popover-title\" ng-bind=\"title\" ng-if=\"title\"></h3>\n" +                                   // 4737
    "      <div class=\"popover-content\" ng-bind=\"content\"></div>\n" +                                             // 4738
    "  </div>\n" +                                                                                                    // 4739
    "</div>\n" +                                                                                                      // 4740
    "");                                                                                                              // 4741
}]);                                                                                                                  // 4742
                                                                                                                      // 4743
angular.module("template/progressbar/bar.html", []).run(["$templateCache", function($templateCache) {                 // 4744
  $templateCache.put("template/progressbar/bar.html",                                                                 // 4745
    "<div class=\"progress-bar\" ng-class=\"type && 'progress-bar-' + type\" role=\"progressbar\" aria-valuenow=\"{{value}}\" aria-valuemin=\"0\" aria-valuemax=\"{{max}}\" ng-style=\"{width: (percent < 100 ? percent : 100) + '%'}\" aria-valuetext=\"{{percent | number:0}}%\" ng-transclude></div>\n" +
    "");                                                                                                              // 4747
}]);                                                                                                                  // 4748
                                                                                                                      // 4749
angular.module("template/progressbar/progress.html", []).run(["$templateCache", function($templateCache) {            // 4750
  $templateCache.put("template/progressbar/progress.html",                                                            // 4751
    "<div class=\"progress\" ng-transclude></div>");                                                                  // 4752
}]);                                                                                                                  // 4753
                                                                                                                      // 4754
angular.module("template/progressbar/progressbar.html", []).run(["$templateCache", function($templateCache) {         // 4755
  $templateCache.put("template/progressbar/progressbar.html",                                                         // 4756
    "<div class=\"progress\">\n" +                                                                                    // 4757
    "  <div class=\"progress-bar\" ng-class=\"type && 'progress-bar-' + type\" role=\"progressbar\" aria-valuenow=\"{{value}}\" aria-valuemin=\"0\" aria-valuemax=\"{{max}}\" ng-style=\"{width: (percent < 100 ? percent : 100) + '%'}\" aria-valuetext=\"{{percent | number:0}}%\" ng-transclude></div>\n" +
    "</div>\n" +                                                                                                      // 4759
    "");                                                                                                              // 4760
}]);                                                                                                                  // 4761
                                                                                                                      // 4762
angular.module("template/rating/rating.html", []).run(["$templateCache", function($templateCache) {                   // 4763
  $templateCache.put("template/rating/rating.html",                                                                   // 4764
    "<span ng-mouseleave=\"reset()\" ng-keydown=\"onKeydown($event)\" tabindex=\"0\" role=\"slider\" aria-valuemin=\"0\" aria-valuemax=\"{{range.length}}\" aria-valuenow=\"{{value}}\">\n" +
    "    <i ng-repeat=\"r in range track by $index\" ng-mouseenter=\"enter($index + 1)\" ng-click=\"rate($index + 1)\" class=\"glyphicon\" ng-class=\"$index < value && (r.stateOn || 'glyphicon-star') || (r.stateOff || 'glyphicon-star-empty')\">\n" +
    "        <span class=\"sr-only\">({{ $index < value ? '*' : ' ' }})</span>\n" +                                   // 4767
    "    </i>\n" +                                                                                                    // 4768
    "</span>");                                                                                                       // 4769
}]);                                                                                                                  // 4770
                                                                                                                      // 4771
angular.module("template/tabs/tab.html", []).run(["$templateCache", function($templateCache) {                        // 4772
  $templateCache.put("template/tabs/tab.html",                                                                        // 4773
    "<li ng-class=\"{active: active, disabled: disabled}\">\n" +                                                      // 4774
    "  <a href ng-click=\"select()\" tab-heading-transclude>{{heading}}</a>\n" +                                      // 4775
    "</li>\n" +                                                                                                       // 4776
    "");                                                                                                              // 4777
}]);                                                                                                                  // 4778
                                                                                                                      // 4779
angular.module("template/tabs/tabset.html", []).run(["$templateCache", function($templateCache) {                     // 4780
  $templateCache.put("template/tabs/tabset.html",                                                                     // 4781
    "<div>\n" +                                                                                                       // 4782
    "  <ul class=\"nav nav-{{type || 'tabs'}}\" ng-class=\"{'nav-stacked': vertical, 'nav-justified': justified}\" ng-transclude></ul>\n" +
    "  <div class=\"tab-content\">\n" +                                                                               // 4784
    "    <div class=\"tab-pane\" \n" +                                                                                // 4785
    "         ng-repeat=\"tab in tabs\" \n" +                                                                         // 4786
    "         ng-class=\"{active: tab.active}\"\n" +                                                                  // 4787
    "         tab-content-transclude=\"tab\">\n" +                                                                    // 4788
    "    </div>\n" +                                                                                                  // 4789
    "  </div>\n" +                                                                                                    // 4790
    "</div>\n" +                                                                                                      // 4791
    "");                                                                                                              // 4792
}]);                                                                                                                  // 4793
                                                                                                                      // 4794
angular.module("template/timepicker/timepicker.html", []).run(["$templateCache", function($templateCache) {           // 4795
  $templateCache.put("template/timepicker/timepicker.html",                                                           // 4796
    "<table>\n" +                                                                                                     // 4797
    "	<tbody>\n" +                                                                                                    // 4798
    "		<tr class=\"text-center\">\n" +                                                                                // 4799
    "			<td><a ng-click=\"incrementHours()\" class=\"btn btn-link\"><span class=\"glyphicon glyphicon-chevron-up\"></span></a></td>\n" +
    "			<td>&nbsp;</td>\n" +                                                                                          // 4801
    "			<td><a ng-click=\"incrementMinutes()\" class=\"btn btn-link\"><span class=\"glyphicon glyphicon-chevron-up\"></span></a></td>\n" +
    "			<td ng-show=\"showMeridian\"></td>\n" +                                                                       // 4803
    "		</tr>\n" +                                                                                                     // 4804
    "		<tr>\n" +                                                                                                      // 4805
    "			<td class=\"form-group\" ng-class=\"{'has-error': invalidHours}\">\n" +                                       // 4806
    "				<input style=\"width:50px;\" type=\"text\" ng-model=\"hours\" ng-change=\"updateHours()\" class=\"form-control text-center\" ng-readonly=\"readonlyInput\" maxlength=\"2\">\n" +
    "			</td>\n" +                                                                                                    // 4808
    "			<td>:</td>\n" +                                                                                               // 4809
    "			<td class=\"form-group\" ng-class=\"{'has-error': invalidMinutes}\">\n" +                                     // 4810
    "				<input style=\"width:50px;\" type=\"text\" ng-model=\"minutes\" ng-change=\"updateMinutes()\" class=\"form-control text-center\" ng-readonly=\"readonlyInput\" maxlength=\"2\">\n" +
    "			</td>\n" +                                                                                                    // 4812
    "			<td ng-show=\"showMeridian\"><button type=\"button\" class=\"btn btn-default text-center\" ng-click=\"toggleMeridian()\">{{meridian}}</button></td>\n" +
    "		</tr>\n" +                                                                                                     // 4814
    "		<tr class=\"text-center\">\n" +                                                                                // 4815
    "			<td><a ng-click=\"decrementHours()\" class=\"btn btn-link\"><span class=\"glyphicon glyphicon-chevron-down\"></span></a></td>\n" +
    "			<td>&nbsp;</td>\n" +                                                                                          // 4817
    "			<td><a ng-click=\"decrementMinutes()\" class=\"btn btn-link\"><span class=\"glyphicon glyphicon-chevron-down\"></span></a></td>\n" +
    "			<td ng-show=\"showMeridian\"></td>\n" +                                                                       // 4819
    "		</tr>\n" +                                                                                                     // 4820
    "	</tbody>\n" +                                                                                                   // 4821
    "</table>\n" +                                                                                                    // 4822
    "");                                                                                                              // 4823
}]);                                                                                                                  // 4824
                                                                                                                      // 4825
angular.module("template/typeahead/typeahead-match.html", []).run(["$templateCache", function($templateCache) {       // 4826
  $templateCache.put("template/typeahead/typeahead-match.html",                                                       // 4827
    "<a tabindex=\"-1\" bind-html-unsafe=\"match.label | typeaheadHighlight:query\"></a>");                           // 4828
}]);                                                                                                                  // 4829
                                                                                                                      // 4830
angular.module("template/typeahead/typeahead-popup.html", []).run(["$templateCache", function($templateCache) {       // 4831
  $templateCache.put("template/typeahead/typeahead-popup.html",                                                       // 4832
    "<ul class=\"dropdown-menu\" ng-show=\"isOpen()\" ng-style=\"{top: position.top+'px', left: position.left+'px'}\" style=\"display: block;\" role=\"listbox\" aria-hidden=\"{{!isOpen()}}\">\n" +
    "    <li ng-repeat=\"match in matches track by $index\" ng-class=\"{active: isActive($index) }\" ng-mouseenter=\"selectActive($index)\" ng-click=\"selectMatch($index)\" role=\"option\" id=\"{{match.id}}\">\n" +
    "        <div typeahead-match index=\"$index\" match=\"match\" query=\"query\" template-url=\"templateUrl\"></div>\n" +
    "    </li>\n" +                                                                                                   // 4836
    "</ul>\n" +                                                                                                       // 4837
    "");                                                                                                              // 4838
}]);                                                                                                                  // 4839
!angular.$$csp() && angular.element(document).find('head').prepend('<style type="text/css">.ng-animate.item:not(.left):not(.right){-webkit-transition:0s ease-in-out left;transition:0s ease-in-out left}</style>');
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                     // 4850
}).call(this);                                                       // 4851
                                                                     // 4852
///////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['angularui:angular-ui-bootstrap'] = {};

})();

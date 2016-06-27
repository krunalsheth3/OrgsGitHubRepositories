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
// packages/angularutils_pagination/dirPagination.js                                                                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
/**                                                                                                                    // 1
 * dirPagination - AngularJS module for paginating (almost) anything.                                                  // 2
 *                                                                                                                     // 3
 *                                                                                                                     // 4
 * Credits                                                                                                             // 5
 * =======                                                                                                             // 6
 *                                                                                                                     // 7
 * Daniel Tabuenca: https://groups.google.com/d/msg/angular/an9QpzqIYiM/r8v-3W1X5vcJ                                   // 8
 * for the idea on how to dynamically invoke the ng-repeat directive.                                                  // 9
 *                                                                                                                     // 10
 * I borrowed a couple of lines and a few attribute names from the AngularUI Bootstrap project:                        // 11
 * https://github.com/angular-ui/bootstrap/blob/master/src/pagination/pagination.js                                    // 12
 *                                                                                                                     // 13
 * Copyright 2014 Michael Bromley <michael@michaelbromley.co.uk>                                                       // 14
 */                                                                                                                    // 15
                                                                                                                       // 16
(function() {                                                                                                          // 17
                                                                                                                       // 18
    /**                                                                                                                // 19
     * Config                                                                                                          // 20
     */                                                                                                                // 21
    var moduleName = 'angularUtils.directives.dirPagination';                                                          // 22
    var DEFAULT_ID = '__default';                                                                                      // 23
                                                                                                                       // 24
    /**                                                                                                                // 25
     * Module                                                                                                          // 26
     */                                                                                                                // 27
    angular.module(moduleName, [])                                                                                     // 28
        .directive('dirPaginate', ['$compile', '$parse', 'paginationService', dirPaginateDirective])                   // 29
        .directive('dirPaginateNoCompile', noCompileDirective)                                                         // 30
        .directive('dirPaginationControls', ['paginationService', 'paginationTemplate', dirPaginationControlsDirective])
        .filter('itemsPerPage', ['paginationService', itemsPerPageFilter])                                             // 32
        .service('paginationService', paginationService)                                                               // 33
        .provider('paginationTemplate', paginationTemplateProvider)                                                    // 34
        .run(['$templateCache',dirPaginationControlsTemplateInstaller]);                                               // 35
                                                                                                                       // 36
    function dirPaginateDirective($compile, $parse, paginationService) {                                               // 37
                                                                                                                       // 38
        return  {                                                                                                      // 39
            terminal: true,                                                                                            // 40
            multiElement: true,                                                                                        // 41
            priority: 100,                                                                                             // 42
            compile: dirPaginationCompileFn                                                                            // 43
        };                                                                                                             // 44
                                                                                                                       // 45
        function dirPaginationCompileFn(tElement, tAttrs){                                                             // 46
                                                                                                                       // 47
            var expression = tAttrs.dirPaginate;                                                                       // 48
            // regex taken directly from https://github.com/angular/angular.js/blob/v1.4.x/src/ng/directive/ngRepeat.js#L339
            var match = expression.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+track\s+by\s+([\s\S]+?))?\s*$/);
                                                                                                                       // 51
            var filterPattern = /\|\s*itemsPerPage\s*:\s*(.*\(\s*\w*\)|([^\)]*?(?=\s+as\s+))|[^\)]*)/;                 // 52
            if (match[2].match(filterPattern) === null) {                                                              // 53
                throw 'pagination directive: the \'itemsPerPage\' filter must be set.';                                // 54
            }                                                                                                          // 55
            var itemsPerPageFilterRemoved = match[2].replace(filterPattern, '');                                       // 56
            var collectionGetter = $parse(itemsPerPageFilterRemoved);                                                  // 57
                                                                                                                       // 58
            addNoCompileAttributes(tElement);                                                                          // 59
                                                                                                                       // 60
            // If any value is specified for paginationId, we register the un-evaluated expression at this stage for the benefit of any
            // dir-pagination-controls directives that may be looking for this ID.                                     // 62
            var rawId = tAttrs.paginationId || DEFAULT_ID;                                                             // 63
            paginationService.registerInstance(rawId);                                                                 // 64
                                                                                                                       // 65
            return function dirPaginationLinkFn(scope, element, attrs){                                                // 66
                                                                                                                       // 67
                // Now that we have access to the `scope` we can interpolate any expression given in the paginationId attribute and
                // potentially register a new ID if it evaluates to a different value than the rawId.                  // 69
                var paginationId = $parse(attrs.paginationId)(scope) || attrs.paginationId || DEFAULT_ID;              // 70
                paginationService.registerInstance(paginationId);                                                      // 71
                                                                                                                       // 72
                var repeatExpression = getRepeatExpression(expression, paginationId);                                  // 73
                addNgRepeatToElement(element, attrs, repeatExpression);                                                // 74
                                                                                                                       // 75
                removeTemporaryAttributes(element);                                                                    // 76
                var compiled =  $compile(element);                                                                     // 77
                                                                                                                       // 78
                var currentPageGetter = makeCurrentPageGetterFn(scope, attrs, paginationId);                           // 79
                paginationService.setCurrentPageParser(paginationId, currentPageGetter, scope);                        // 80
                                                                                                                       // 81
                if (typeof attrs.totalItems !== 'undefined') {                                                         // 82
                    paginationService.setAsyncModeTrue(paginationId);                                                  // 83
                    scope.$watch(function() {                                                                          // 84
                        return $parse(attrs.totalItems)(scope);                                                        // 85
                    }, function (result) {                                                                             // 86
                        if (0 <= result) {                                                                             // 87
                            paginationService.setCollectionLength(paginationId, result);                               // 88
                        }                                                                                              // 89
                    });                                                                                                // 90
                } else {                                                                                               // 91
                    scope.$watchCollection(function() {                                                                // 92
                        return collectionGetter(scope);                                                                // 93
                    }, function(collection) {                                                                          // 94
                        if (collection) {                                                                              // 95
                            paginationService.setCollectionLength(paginationId, collection.length);                    // 96
                        }                                                                                              // 97
                    });                                                                                                // 98
                }                                                                                                      // 99
                                                                                                                       // 100
                // Delegate to the link function returned by the new compilation of the ng-repeat                      // 101
                compiled(scope);                                                                                       // 102
            };                                                                                                         // 103
        }                                                                                                              // 104
                                                                                                                       // 105
        /**                                                                                                            // 106
         * If a pagination id has been specified, we need to check that it is present as the second argument passed to
         * the itemsPerPage filter. If it is not there, we add it and return the modified expression.                  // 108
         *                                                                                                             // 109
         * @param expression                                                                                           // 110
         * @param paginationId                                                                                         // 111
         * @returns {*}                                                                                                // 112
         */                                                                                                            // 113
        function getRepeatExpression(expression, paginationId) {                                                       // 114
            var repeatExpression,                                                                                      // 115
                idDefinedInFilter = !!expression.match(/(\|\s*itemsPerPage\s*:[^|]*:[^|]*)/);                          // 116
                                                                                                                       // 117
            if (paginationId !== DEFAULT_ID && !idDefinedInFilter) {                                                   // 118
                repeatExpression = expression.replace(/(\|\s*itemsPerPage\s*:[^|]*)/, "$1 : '" + paginationId + "'");  // 119
            } else {                                                                                                   // 120
                repeatExpression = expression;                                                                         // 121
            }                                                                                                          // 122
                                                                                                                       // 123
            return repeatExpression;                                                                                   // 124
        }                                                                                                              // 125
                                                                                                                       // 126
        /**                                                                                                            // 127
         * Adds the ng-repeat directive to the element. In the case of multi-element (-start, -end) it adds the        // 128
         * appropriate multi-element ng-repeat to the first and last element in the range.                             // 129
         * @param element                                                                                              // 130
         * @param attrs                                                                                                // 131
         * @param repeatExpression                                                                                     // 132
         */                                                                                                            // 133
        function addNgRepeatToElement(element, attrs, repeatExpression) {                                              // 134
            if (element[0].hasAttribute('dir-paginate-start') || element[0].hasAttribute('data-dir-paginate-start')) {
                // using multiElement mode (dir-paginate-start, dir-paginate-end)                                      // 136
                attrs.$set('ngRepeatStart', repeatExpression);                                                         // 137
                element.eq(element.length - 1).attr('ng-repeat-end', true);                                            // 138
            } else {                                                                                                   // 139
                attrs.$set('ngRepeat', repeatExpression);                                                              // 140
            }                                                                                                          // 141
        }                                                                                                              // 142
                                                                                                                       // 143
        /**                                                                                                            // 144
         * Adds the dir-paginate-no-compile directive to each element in the tElement range.                           // 145
         * @param tElement                                                                                             // 146
         */                                                                                                            // 147
        function addNoCompileAttributes(tElement) {                                                                    // 148
            angular.forEach(tElement, function(el) {                                                                   // 149
                if (el.nodeType === 1) {                                                                               // 150
                    angular.element(el).attr('dir-paginate-no-compile', true);                                         // 151
                }                                                                                                      // 152
            });                                                                                                        // 153
        }                                                                                                              // 154
                                                                                                                       // 155
        /**                                                                                                            // 156
         * Removes the variations on dir-paginate (data-, -start, -end) and the dir-paginate-no-compile directives.    // 157
         * @param element                                                                                              // 158
         */                                                                                                            // 159
        function removeTemporaryAttributes(element) {                                                                  // 160
            angular.forEach(element, function(el) {                                                                    // 161
                if (el.nodeType === 1) {                                                                               // 162
                    angular.element(el).removeAttr('dir-paginate-no-compile');                                         // 163
                }                                                                                                      // 164
            });                                                                                                        // 165
            element.eq(0).removeAttr('dir-paginate-start').removeAttr('dir-paginate').removeAttr('data-dir-paginate-start').removeAttr('data-dir-paginate');
            element.eq(element.length - 1).removeAttr('dir-paginate-end').removeAttr('data-dir-paginate-end');         // 167
        }                                                                                                              // 168
                                                                                                                       // 169
        /**                                                                                                            // 170
         * Creates a getter function for the current-page attribute, using the expression provided or a default value if
         * no current-page expression was specified.                                                                   // 172
         *                                                                                                             // 173
         * @param scope                                                                                                // 174
         * @param attrs                                                                                                // 175
         * @param paginationId                                                                                         // 176
         * @returns {*}                                                                                                // 177
         */                                                                                                            // 178
        function makeCurrentPageGetterFn(scope, attrs, paginationId) {                                                 // 179
            var currentPageGetter;                                                                                     // 180
            if (attrs.currentPage) {                                                                                   // 181
                currentPageGetter = $parse(attrs.currentPage);                                                         // 182
            } else {                                                                                                   // 183
                // If the current-page attribute was not set, we'll make our own.                                      // 184
                // Replace any non-alphanumeric characters which might confuse                                         // 185
                // the $parse service and give unexpected results.                                                     // 186
                // See https://github.com/michaelbromley/angularUtils/issues/233                                       // 187
                var defaultCurrentPage = (paginationId + '__currentPage').replace(/\W/g, '_');                         // 188
                scope[defaultCurrentPage] = 1;                                                                         // 189
                currentPageGetter = $parse(defaultCurrentPage);                                                        // 190
            }                                                                                                          // 191
            return currentPageGetter;                                                                                  // 192
        }                                                                                                              // 193
    }                                                                                                                  // 194
                                                                                                                       // 195
    /**                                                                                                                // 196
     * This is a helper directive that allows correct compilation when in multi-element mode (ie dir-paginate-start, dir-paginate-end).
     * It is dynamically added to all elements in the dir-paginate compile function, and it prevents further compilation of
     * any inner directives. It is then removed in the link function, and all inner directives are then manually compiled.
     */                                                                                                                // 200
    function noCompileDirective() {                                                                                    // 201
        return {                                                                                                       // 202
            priority: 5000,                                                                                            // 203
            terminal: true                                                                                             // 204
        };                                                                                                             // 205
    }                                                                                                                  // 206
                                                                                                                       // 207
    function dirPaginationControlsTemplateInstaller($templateCache) {                                                  // 208
        $templateCache.put('angularUtils.directives.dirPagination.template', '<ul class="pagination" ng-if="1 < pages.length || !autoHide"><li ng-if="boundaryLinks" ng-class="{ disabled : pagination.current == 1 }"><a href="" ng-click="setCurrent(1)">&laquo;</a></li><li ng-if="directionLinks" ng-class="{ disabled : pagination.current == 1 }"><a href="" ng-click="setCurrent(pagination.current - 1)">&lsaquo;</a></li><li ng-repeat="pageNumber in pages track by tracker(pageNumber, $index)" ng-class="{ active : pagination.current == pageNumber, disabled : pageNumber == \'...\' || ( ! autoHide && pages.length === 1 ) }"><a href="" ng-click="setCurrent(pageNumber)">{{ pageNumber }}</a></li><li ng-if="directionLinks" ng-class="{ disabled : pagination.current == pagination.last }"><a href="" ng-click="setCurrent(pagination.current + 1)">&rsaquo;</a></li><li ng-if="boundaryLinks"  ng-class="{ disabled : pagination.current == pagination.last }"><a href="" ng-click="setCurrent(pagination.last)">&raquo;</a></li></ul>');
    }                                                                                                                  // 210
                                                                                                                       // 211
    function dirPaginationControlsDirective(paginationService, paginationTemplate) {                                   // 212
                                                                                                                       // 213
        var numberRegex = /^\d+$/;                                                                                     // 214
                                                                                                                       // 215
        return {                                                                                                       // 216
            restrict: 'AE',                                                                                            // 217
            templateUrl: function(elem, attrs) {                                                                       // 218
                return attrs.templateUrl || paginationTemplate.getPath();                                              // 219
            },                                                                                                         // 220
            scope: {                                                                                                   // 221
                maxSize: '=?',                                                                                         // 222
                onPageChange: '&?',                                                                                    // 223
                paginationId: '=?',                                                                                    // 224
                autoHide: '=?'                                                                                         // 225
            },                                                                                                         // 226
            link: dirPaginationControlsLinkFn                                                                          // 227
        };                                                                                                             // 228
                                                                                                                       // 229
        function dirPaginationControlsLinkFn(scope, element, attrs) {                                                  // 230
                                                                                                                       // 231
            // rawId is the un-interpolated value of the pagination-id attribute. This is only important when the corresponding dir-paginate directive has
            // not yet been linked (e.g. if it is inside an ng-if block), and in that case it prevents this controls directive from assuming that there is
            // no corresponding dir-paginate directive and wrongly throwing an exception.                              // 234
            var rawId = attrs.paginationId ||  DEFAULT_ID;                                                             // 235
            var paginationId = scope.paginationId || attrs.paginationId ||  DEFAULT_ID;                                // 236
                                                                                                                       // 237
            if (!paginationService.isRegistered(paginationId) && !paginationService.isRegistered(rawId)) {             // 238
                var idMessage = (paginationId !== DEFAULT_ID) ? ' (id: ' + paginationId + ') ' : ' ';                  // 239
                console.warn('Pagination directive: the pagination controls' + idMessage + 'cannot be used without the corresponding pagination directive, which was not found at link time.');
            }                                                                                                          // 241
                                                                                                                       // 242
            if (!scope.maxSize) { scope.maxSize = 9; }                                                                 // 243
            scope.autoHide = scope.autoHide === undefined ? true : scope.autoHide;                                     // 244
            scope.directionLinks = angular.isDefined(attrs.directionLinks) ? scope.$parent.$eval(attrs.directionLinks) : true;
            scope.boundaryLinks = angular.isDefined(attrs.boundaryLinks) ? scope.$parent.$eval(attrs.boundaryLinks) : false;
                                                                                                                       // 247
            var paginationRange = Math.max(scope.maxSize, 5);                                                          // 248
            scope.pages = [];                                                                                          // 249
            scope.pagination = {                                                                                       // 250
                last: 1,                                                                                               // 251
                current: 1                                                                                             // 252
            };                                                                                                         // 253
            scope.range = {                                                                                            // 254
                lower: 1,                                                                                              // 255
                upper: 1,                                                                                              // 256
                total: 1                                                                                               // 257
            };                                                                                                         // 258
                                                                                                                       // 259
            scope.$watch(function() {                                                                                  // 260
                if (paginationService.isRegistered(paginationId)) {                                                    // 261
                    return (paginationService.getCollectionLength(paginationId) + 1) * paginationService.getItemsPerPage(paginationId);
                }                                                                                                      // 263
            }, function(length) {                                                                                      // 264
                if (0 < length) {                                                                                      // 265
                    generatePagination();                                                                              // 266
                }                                                                                                      // 267
            });                                                                                                        // 268
                                                                                                                       // 269
            scope.$watch(function() {                                                                                  // 270
                if (paginationService.isRegistered(paginationId)) {                                                    // 271
                    return (paginationService.getItemsPerPage(paginationId));                                          // 272
                }                                                                                                      // 273
            }, function(current, previous) {                                                                           // 274
                if (current != previous && typeof previous !== 'undefined') {                                          // 275
                    goToPage(scope.pagination.current);                                                                // 276
                }                                                                                                      // 277
            });                                                                                                        // 278
                                                                                                                       // 279
            scope.$watch(function() {                                                                                  // 280
                if (paginationService.isRegistered(paginationId)) {                                                    // 281
                    return paginationService.getCurrentPage(paginationId);                                             // 282
                }                                                                                                      // 283
            }, function(currentPage, previousPage) {                                                                   // 284
                if (currentPage != previousPage) {                                                                     // 285
                    goToPage(currentPage);                                                                             // 286
                }                                                                                                      // 287
            });                                                                                                        // 288
                                                                                                                       // 289
            scope.setCurrent = function(num) {                                                                         // 290
                if (paginationService.isRegistered(paginationId) && isValidPageNumber(num)) {                          // 291
                    num = parseInt(num, 10);                                                                           // 292
                    paginationService.setCurrentPage(paginationId, num);                                               // 293
                }                                                                                                      // 294
            };                                                                                                         // 295
                                                                                                                       // 296
            /**                                                                                                        // 297
             * Custom "track by" function which allows for duplicate "..." entries on long lists,                      // 298
             * yet fixes the problem of wrongly-highlighted links which happens when using                             // 299
             * "track by $index" - see https://github.com/michaelbromley/angularUtils/issues/153                       // 300
             * @param id                                                                                               // 301
             * @param index                                                                                            // 302
             * @returns {string}                                                                                       // 303
             */                                                                                                        // 304
            scope.tracker = function(id, index) {                                                                      // 305
                return id + '_' + index;                                                                               // 306
            };                                                                                                         // 307
                                                                                                                       // 308
            function goToPage(num) {                                                                                   // 309
                if (paginationService.isRegistered(paginationId) && isValidPageNumber(num)) {                          // 310
                    scope.pages = generatePagesArray(num, paginationService.getCollectionLength(paginationId), paginationService.getItemsPerPage(paginationId), paginationRange);
                    scope.pagination.current = num;                                                                    // 312
                    updateRangeValues();                                                                               // 313
                                                                                                                       // 314
                    // if a callback has been set, then call it with the page number as an argument                    // 315
                    if (scope.onPageChange) {                                                                          // 316
                        scope.onPageChange({ newPageNumber : num });                                                   // 317
                    }                                                                                                  // 318
                }                                                                                                      // 319
            }                                                                                                          // 320
                                                                                                                       // 321
            function generatePagination() {                                                                            // 322
                if (paginationService.isRegistered(paginationId)) {                                                    // 323
                    var page = parseInt(paginationService.getCurrentPage(paginationId)) || 1;                          // 324
                    scope.pages = generatePagesArray(page, paginationService.getCollectionLength(paginationId), paginationService.getItemsPerPage(paginationId), paginationRange);
                    scope.pagination.current = page;                                                                   // 326
                    scope.pagination.last = scope.pages[scope.pages.length - 1];                                       // 327
                    if (scope.pagination.last < scope.pagination.current) {                                            // 328
                        scope.setCurrent(scope.pagination.last);                                                       // 329
                    } else {                                                                                           // 330
                        updateRangeValues();                                                                           // 331
                    }                                                                                                  // 332
                }                                                                                                      // 333
            }                                                                                                          // 334
                                                                                                                       // 335
            /**                                                                                                        // 336
             * This function updates the values (lower, upper, total) of the `scope.range` object, which can be used in the pagination
             * template to display the current page range, e.g. "showing 21 - 40 of 144 results";                      // 338
             */                                                                                                        // 339
            function updateRangeValues() {                                                                             // 340
                if (paginationService.isRegistered(paginationId)) {                                                    // 341
                    var currentPage = paginationService.getCurrentPage(paginationId),                                  // 342
                        itemsPerPage = paginationService.getItemsPerPage(paginationId),                                // 343
                        totalItems = paginationService.getCollectionLength(paginationId);                              // 344
                                                                                                                       // 345
                    scope.range.lower = (currentPage - 1) * itemsPerPage + 1;                                          // 346
                    scope.range.upper = Math.min(currentPage * itemsPerPage, totalItems);                              // 347
                    scope.range.total = totalItems;                                                                    // 348
                }                                                                                                      // 349
            }                                                                                                          // 350
            function isValidPageNumber(num) {                                                                          // 351
                return (numberRegex.test(num) && (0 < num && num <= scope.pagination.last));                           // 352
            }                                                                                                          // 353
        }                                                                                                              // 354
                                                                                                                       // 355
        /**                                                                                                            // 356
         * Generate an array of page numbers (or the '...' string) which is used in an ng-repeat to generate the       // 357
         * links used in pagination                                                                                    // 358
         *                                                                                                             // 359
         * @param currentPage                                                                                          // 360
         * @param rowsPerPage                                                                                          // 361
         * @param paginationRange                                                                                      // 362
         * @param collectionLength                                                                                     // 363
         * @returns {Array}                                                                                            // 364
         */                                                                                                            // 365
        function generatePagesArray(currentPage, collectionLength, rowsPerPage, paginationRange) {                     // 366
            var pages = [];                                                                                            // 367
            var totalPages = Math.ceil(collectionLength / rowsPerPage);                                                // 368
            var halfWay = Math.ceil(paginationRange / 2);                                                              // 369
            var position;                                                                                              // 370
                                                                                                                       // 371
            if (currentPage <= halfWay) {                                                                              // 372
                position = 'start';                                                                                    // 373
            } else if (totalPages - halfWay < currentPage) {                                                           // 374
                position = 'end';                                                                                      // 375
            } else {                                                                                                   // 376
                position = 'middle';                                                                                   // 377
            }                                                                                                          // 378
                                                                                                                       // 379
            var ellipsesNeeded = paginationRange < totalPages;                                                         // 380
            var i = 1;                                                                                                 // 381
            while (i <= totalPages && i <= paginationRange) {                                                          // 382
                var pageNumber = calculatePageNumber(i, currentPage, paginationRange, totalPages);                     // 383
                                                                                                                       // 384
                var openingEllipsesNeeded = (i === 2 && (position === 'middle' || position === 'end'));                // 385
                var closingEllipsesNeeded = (i === paginationRange - 1 && (position === 'middle' || position === 'start'));
                if (ellipsesNeeded && (openingEllipsesNeeded || closingEllipsesNeeded)) {                              // 387
                    pages.push('...');                                                                                 // 388
                } else {                                                                                               // 389
                    pages.push(pageNumber);                                                                            // 390
                }                                                                                                      // 391
                i ++;                                                                                                  // 392
            }                                                                                                          // 393
            return pages;                                                                                              // 394
        }                                                                                                              // 395
                                                                                                                       // 396
        /**                                                                                                            // 397
         * Given the position in the sequence of pagination links [i], figure out what page number corresponds to that position.
         *                                                                                                             // 399
         * @param i                                                                                                    // 400
         * @param currentPage                                                                                          // 401
         * @param paginationRange                                                                                      // 402
         * @param totalPages                                                                                           // 403
         * @returns {*}                                                                                                // 404
         */                                                                                                            // 405
        function calculatePageNumber(i, currentPage, paginationRange, totalPages) {                                    // 406
            var halfWay = Math.ceil(paginationRange/2);                                                                // 407
            if (i === paginationRange) {                                                                               // 408
                return totalPages;                                                                                     // 409
            } else if (i === 1) {                                                                                      // 410
                return i;                                                                                              // 411
            } else if (paginationRange < totalPages) {                                                                 // 412
                if (totalPages - halfWay < currentPage) {                                                              // 413
                    return totalPages - paginationRange + i;                                                           // 414
                } else if (halfWay < currentPage) {                                                                    // 415
                    return currentPage - halfWay + i;                                                                  // 416
                } else {                                                                                               // 417
                    return i;                                                                                          // 418
                }                                                                                                      // 419
            } else {                                                                                                   // 420
                return i;                                                                                              // 421
            }                                                                                                          // 422
        }                                                                                                              // 423
    }                                                                                                                  // 424
                                                                                                                       // 425
    /**                                                                                                                // 426
     * This filter slices the collection into pages based on the current page number and number of items per page.     // 427
     * @param paginationService                                                                                        // 428
     * @returns {Function}                                                                                             // 429
     */                                                                                                                // 430
    function itemsPerPageFilter(paginationService) {                                                                   // 431
                                                                                                                       // 432
        return function(collection, itemsPerPage, paginationId) {                                                      // 433
            if (typeof (paginationId) === 'undefined') {                                                               // 434
                paginationId = DEFAULT_ID;                                                                             // 435
            }                                                                                                          // 436
            if (!paginationService.isRegistered(paginationId)) {                                                       // 437
                throw 'pagination directive: the itemsPerPage id argument (id: ' + paginationId + ') does not match a registered pagination-id.';
            }                                                                                                          // 439
            var end;                                                                                                   // 440
            var start;                                                                                                 // 441
            if (angular.isObject(collection)) {                                                                        // 442
                itemsPerPage = parseInt(itemsPerPage) || 9999999999;                                                   // 443
                if (paginationService.isAsyncMode(paginationId)) {                                                     // 444
                    start = 0;                                                                                         // 445
                } else {                                                                                               // 446
                    start = (paginationService.getCurrentPage(paginationId) - 1) * itemsPerPage;                       // 447
                }                                                                                                      // 448
                end = start + itemsPerPage;                                                                            // 449
                paginationService.setItemsPerPage(paginationId, itemsPerPage);                                         // 450
                                                                                                                       // 451
                if (collection instanceof Array) {                                                                     // 452
                    // the array just needs to be sliced                                                               // 453
                    return collection.slice(start, end);                                                               // 454
                } else {                                                                                               // 455
                    // in the case of an object, we need to get an array of keys, slice that, then map back to         // 456
                    // the original object.                                                                            // 457
                    var slicedObject = {};                                                                             // 458
                    angular.forEach(keys(collection).slice(start, end), function(key) {                                // 459
                        slicedObject[key] = collection[key];                                                           // 460
                    });                                                                                                // 461
                    return slicedObject;                                                                               // 462
                }                                                                                                      // 463
            } else {                                                                                                   // 464
                return collection;                                                                                     // 465
            }                                                                                                          // 466
        };                                                                                                             // 467
    }                                                                                                                  // 468
                                                                                                                       // 469
    /**                                                                                                                // 470
     * Shim for the Object.keys() method which does not exist in IE < 9                                                // 471
     * @param obj                                                                                                      // 472
     * @returns {Array}                                                                                                // 473
     */                                                                                                                // 474
    function keys(obj) {                                                                                               // 475
        if (!Object.keys) {                                                                                            // 476
            var objKeys = [];                                                                                          // 477
            for (var i in obj) {                                                                                       // 478
                if (obj.hasOwnProperty(i)) {                                                                           // 479
                    objKeys.push(i);                                                                                   // 480
                }                                                                                                      // 481
            }                                                                                                          // 482
            return objKeys;                                                                                            // 483
        } else {                                                                                                       // 484
            return Object.keys(obj);                                                                                   // 485
        }                                                                                                              // 486
    }                                                                                                                  // 487
                                                                                                                       // 488
    /**                                                                                                                // 489
     * This service allows the various parts of the module to communicate and stay in sync.                            // 490
     */                                                                                                                // 491
    function paginationService() {                                                                                     // 492
                                                                                                                       // 493
        var instances = {};                                                                                            // 494
        var lastRegisteredInstance;                                                                                    // 495
                                                                                                                       // 496
        this.registerInstance = function(instanceId) {                                                                 // 497
            if (typeof instances[instanceId] === 'undefined') {                                                        // 498
                instances[instanceId] = {                                                                              // 499
                    asyncMode: false                                                                                   // 500
                };                                                                                                     // 501
                lastRegisteredInstance = instanceId;                                                                   // 502
            }                                                                                                          // 503
        };                                                                                                             // 504
                                                                                                                       // 505
        this.isRegistered = function(instanceId) {                                                                     // 506
            return (typeof instances[instanceId] !== 'undefined');                                                     // 507
        };                                                                                                             // 508
                                                                                                                       // 509
        this.getLastInstanceId = function() {                                                                          // 510
            return lastRegisteredInstance;                                                                             // 511
        };                                                                                                             // 512
                                                                                                                       // 513
        this.setCurrentPageParser = function(instanceId, val, scope) {                                                 // 514
            instances[instanceId].currentPageParser = val;                                                             // 515
            instances[instanceId].context = scope;                                                                     // 516
        };                                                                                                             // 517
        this.setCurrentPage = function(instanceId, val) {                                                              // 518
            instances[instanceId].currentPageParser.assign(instances[instanceId].context, val);                        // 519
        };                                                                                                             // 520
        this.getCurrentPage = function(instanceId) {                                                                   // 521
            var parser = instances[instanceId].currentPageParser;                                                      // 522
            return parser ? parser(instances[instanceId].context) : 1;                                                 // 523
        };                                                                                                             // 524
                                                                                                                       // 525
        this.setItemsPerPage = function(instanceId, val) {                                                             // 526
            instances[instanceId].itemsPerPage = val;                                                                  // 527
        };                                                                                                             // 528
        this.getItemsPerPage = function(instanceId) {                                                                  // 529
            return instances[instanceId].itemsPerPage;                                                                 // 530
        };                                                                                                             // 531
                                                                                                                       // 532
        this.setCollectionLength = function(instanceId, val) {                                                         // 533
            instances[instanceId].collectionLength = val;                                                              // 534
        };                                                                                                             // 535
        this.getCollectionLength = function(instanceId) {                                                              // 536
            return instances[instanceId].collectionLength;                                                             // 537
        };                                                                                                             // 538
                                                                                                                       // 539
        this.setAsyncModeTrue = function(instanceId) {                                                                 // 540
            instances[instanceId].asyncMode = true;                                                                    // 541
        };                                                                                                             // 542
                                                                                                                       // 543
        this.isAsyncMode = function(instanceId) {                                                                      // 544
            return instances[instanceId].asyncMode;                                                                    // 545
        };                                                                                                             // 546
    }                                                                                                                  // 547
                                                                                                                       // 548
    /**                                                                                                                // 549
     * This provider allows global configuration of the template path used by the dir-pagination-controls directive.   // 550
     */                                                                                                                // 551
    function paginationTemplateProvider() {                                                                            // 552
                                                                                                                       // 553
        var templatePath = 'angularUtils.directives.dirPagination.template';                                           // 554
                                                                                                                       // 555
        this.setPath = function(path) {                                                                                // 556
            templatePath = path;                                                                                       // 557
        };                                                                                                             // 558
                                                                                                                       // 559
        this.$get = function() {                                                                                       // 560
            return {                                                                                                   // 561
                getPath: function() {                                                                                  // 562
                    return templatePath;                                                                               // 563
                }                                                                                                      // 564
            };                                                                                                         // 565
        };                                                                                                             // 566
    }                                                                                                                  // 567
})();                                                                                                                  // 568
                                                                                                                       // 569
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['angularutils:pagination'] = {};

})();

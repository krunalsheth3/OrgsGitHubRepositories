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

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// packages/benjamine_jsondiffpatch/public/build/jsondiffpatch-full.js                                             //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.jsondiffpatch=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var environment = require('./environment');                                                                        // 2
                                                                                                                   // 3
if (environment.isBrowser) {                                                                                       // 4
  /* global window */                                                                                              // 5
  /* jshint camelcase: false */                                                                                    // 6
  window.diff_match_patch = require('../public/external/diff_match_patch_uncompressed');                           // 7
  /* jshint camelcase: true */                                                                                     // 8
}                                                                                                                  // 9
                                                                                                                   // 10
module.exports = require('./main');                                                                                // 11
                                                                                                                   // 12
},{"../public/external/diff_match_patch_uncompressed":2,"./environment":9,"./main":16}],2:[function(require,module,exports){
/**                                                                                                                // 14
 * Diff Match and Patch                                                                                            // 15
 *                                                                                                                 // 16
 * Copyright 2006 Google Inc.                                                                                      // 17
 * http://code.google.com/p/google-diff-match-patch/                                                               // 18
 *                                                                                                                 // 19
 * Licensed under the Apache License, Version 2.0 (the "License");                                                 // 20
 * you may not use this file except in compliance with the License.                                                // 21
 * You may obtain a copy of the License at                                                                         // 22
 *                                                                                                                 // 23
 *   http://www.apache.org/licenses/LICENSE-2.0                                                                    // 24
 *                                                                                                                 // 25
 * Unless required by applicable law or agreed to in writing, software                                             // 26
 * distributed under the License is distributed on an "AS IS" BASIS,                                               // 27
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.                                        // 28
 * See the License for the specific language governing permissions and                                             // 29
 * limitations under the License.                                                                                  // 30
 */                                                                                                                // 31
                                                                                                                   // 32
/**                                                                                                                // 33
 * @fileoverview Computes the difference between two texts to create a patch.                                      // 34
 * Applies the patch onto another text, allowing for errors.                                                       // 35
 * @author fraser@google.com (Neil Fraser)                                                                         // 36
 */                                                                                                                // 37
                                                                                                                   // 38
/**                                                                                                                // 39
 * Class containing the diff, match and patch methods.                                                             // 40
 * @constructor                                                                                                    // 41
 */                                                                                                                // 42
function diff_match_patch() {                                                                                      // 43
                                                                                                                   // 44
  // Defaults.                                                                                                     // 45
  // Redefine these in your program to override the defaults.                                                      // 46
                                                                                                                   // 47
  // Number of seconds to map a diff before giving up (0 for infinity).                                            // 48
  this.Diff_Timeout = 1.0;                                                                                         // 49
  // Cost of an empty edit operation in terms of edit characters.                                                  // 50
  this.Diff_EditCost = 4;                                                                                          // 51
  // At what point is no match declared (0.0 = perfection, 1.0 = very loose).                                      // 52
  this.Match_Threshold = 0.5;                                                                                      // 53
  // How far to search for a match (0 = exact location, 1000+ = broad match).                                      // 54
  // A match this many characters away from the expected location will add                                         // 55
  // 1.0 to the score (0.0 is a perfect match).                                                                    // 56
  this.Match_Distance = 1000;                                                                                      // 57
  // When deleting a large block of text (over ~64 characters), how close does                                     // 58
  // the contents have to match the expected contents. (0.0 = perfection,                                          // 59
  // 1.0 = very loose).  Note that Match_Threshold controls how closely the                                        // 60
  // end points of a delete need to match.                                                                         // 61
  this.Patch_DeleteThreshold = 0.5;                                                                                // 62
  // Chunk size for context length.                                                                                // 63
  this.Patch_Margin = 4;                                                                                           // 64
                                                                                                                   // 65
  // The number of bits in an int.                                                                                 // 66
  this.Match_MaxBits = 32;                                                                                         // 67
}                                                                                                                  // 68
                                                                                                                   // 69
                                                                                                                   // 70
//  DIFF FUNCTIONS                                                                                                 // 71
                                                                                                                   // 72
                                                                                                                   // 73
/**                                                                                                                // 74
 * The data structure representing a diff is an array of tuples:                                                   // 75
 * [[DIFF_DELETE, 'Hello'], [DIFF_INSERT, 'Goodbye'], [DIFF_EQUAL, ' world.']]                                     // 76
 * which means: delete 'Hello', add 'Goodbye' and keep ' world.'                                                   // 77
 */                                                                                                                // 78
var DIFF_DELETE = -1;                                                                                              // 79
var DIFF_INSERT = 1;                                                                                               // 80
var DIFF_EQUAL = 0;                                                                                                // 81
                                                                                                                   // 82
/** @typedef {!Array.<number|string>} */                                                                           // 83
diff_match_patch.Diff;                                                                                             // 84
                                                                                                                   // 85
                                                                                                                   // 86
/**                                                                                                                // 87
 * Find the differences between two texts.  Simplifies the problem by stripping                                    // 88
 * any common prefix or suffix off the texts before diffing.                                                       // 89
 * @param {string} text1 Old string to be diffed.                                                                  // 90
 * @param {string} text2 New string to be diffed.                                                                  // 91
 * @param {boolean=} opt_checklines Optional speedup flag. If present and false,                                   // 92
 *     then don't run a line-level diff first to identify the changed areas.                                       // 93
 *     Defaults to true, which does a faster, slightly less optimal diff.                                          // 94
 * @param {number} opt_deadline Optional time when the diff should be complete                                     // 95
 *     by.  Used internally for recursive calls.  Users should set DiffTimeout                                     // 96
 *     instead.                                                                                                    // 97
 * @return {!Array.<!diff_match_patch.Diff>} Array of diff tuples.                                                 // 98
 */                                                                                                                // 99
diff_match_patch.prototype.diff_main = function(text1, text2, opt_checklines,                                      // 100
    opt_deadline) {                                                                                                // 101
  // Set a deadline by which time the diff must be complete.                                                       // 102
  if (typeof opt_deadline == 'undefined') {                                                                        // 103
    if (this.Diff_Timeout <= 0) {                                                                                  // 104
      opt_deadline = Number.MAX_VALUE;                                                                             // 105
    } else {                                                                                                       // 106
      opt_deadline = (new Date).getTime() + this.Diff_Timeout * 1000;                                              // 107
    }                                                                                                              // 108
  }                                                                                                                // 109
  var deadline = opt_deadline;                                                                                     // 110
                                                                                                                   // 111
  // Check for null inputs.                                                                                        // 112
  if (text1 == null || text2 == null) {                                                                            // 113
    throw new Error('Null input. (diff_main)');                                                                    // 114
  }                                                                                                                // 115
                                                                                                                   // 116
  // Check for equality (speedup).                                                                                 // 117
  if (text1 == text2) {                                                                                            // 118
    if (text1) {                                                                                                   // 119
      return [[DIFF_EQUAL, text1]];                                                                                // 120
    }                                                                                                              // 121
    return [];                                                                                                     // 122
  }                                                                                                                // 123
                                                                                                                   // 124
  if (typeof opt_checklines == 'undefined') {                                                                      // 125
    opt_checklines = true;                                                                                         // 126
  }                                                                                                                // 127
  var checklines = opt_checklines;                                                                                 // 128
                                                                                                                   // 129
  // Trim off common prefix (speedup).                                                                             // 130
  var commonlength = this.diff_commonPrefix(text1, text2);                                                         // 131
  var commonprefix = text1.substring(0, commonlength);                                                             // 132
  text1 = text1.substring(commonlength);                                                                           // 133
  text2 = text2.substring(commonlength);                                                                           // 134
                                                                                                                   // 135
  // Trim off common suffix (speedup).                                                                             // 136
  commonlength = this.diff_commonSuffix(text1, text2);                                                             // 137
  var commonsuffix = text1.substring(text1.length - commonlength);                                                 // 138
  text1 = text1.substring(0, text1.length - commonlength);                                                         // 139
  text2 = text2.substring(0, text2.length - commonlength);                                                         // 140
                                                                                                                   // 141
  // Compute the diff on the middle block.                                                                         // 142
  var diffs = this.diff_compute_(text1, text2, checklines, deadline);                                              // 143
                                                                                                                   // 144
  // Restore the prefix and suffix.                                                                                // 145
  if (commonprefix) {                                                                                              // 146
    diffs.unshift([DIFF_EQUAL, commonprefix]);                                                                     // 147
  }                                                                                                                // 148
  if (commonsuffix) {                                                                                              // 149
    diffs.push([DIFF_EQUAL, commonsuffix]);                                                                        // 150
  }                                                                                                                // 151
  this.diff_cleanupMerge(diffs);                                                                                   // 152
  return diffs;                                                                                                    // 153
};                                                                                                                 // 154
                                                                                                                   // 155
                                                                                                                   // 156
/**                                                                                                                // 157
 * Find the differences between two texts.  Assumes that the texts do not                                          // 158
 * have any common prefix or suffix.                                                                               // 159
 * @param {string} text1 Old string to be diffed.                                                                  // 160
 * @param {string} text2 New string to be diffed.                                                                  // 161
 * @param {boolean} checklines Speedup flag.  If false, then don't run a                                           // 162
 *     line-level diff first to identify the changed areas.                                                        // 163
 *     If true, then run a faster, slightly less optimal diff.                                                     // 164
 * @param {number} deadline Time when the diff should be complete by.                                              // 165
 * @return {!Array.<!diff_match_patch.Diff>} Array of diff tuples.                                                 // 166
 * @private                                                                                                        // 167
 */                                                                                                                // 168
diff_match_patch.prototype.diff_compute_ = function(text1, text2, checklines,                                      // 169
    deadline) {                                                                                                    // 170
  var diffs;                                                                                                       // 171
                                                                                                                   // 172
  if (!text1) {                                                                                                    // 173
    // Just add some text (speedup).                                                                               // 174
    return [[DIFF_INSERT, text2]];                                                                                 // 175
  }                                                                                                                // 176
                                                                                                                   // 177
  if (!text2) {                                                                                                    // 178
    // Just delete some text (speedup).                                                                            // 179
    return [[DIFF_DELETE, text1]];                                                                                 // 180
  }                                                                                                                // 181
                                                                                                                   // 182
  var longtext = text1.length > text2.length ? text1 : text2;                                                      // 183
  var shorttext = text1.length > text2.length ? text2 : text1;                                                     // 184
  var i = longtext.indexOf(shorttext);                                                                             // 185
  if (i != -1) {                                                                                                   // 186
    // Shorter text is inside the longer text (speedup).                                                           // 187
    diffs = [[DIFF_INSERT, longtext.substring(0, i)],                                                              // 188
             [DIFF_EQUAL, shorttext],                                                                              // 189
             [DIFF_INSERT, longtext.substring(i + shorttext.length)]];                                             // 190
    // Swap insertions for deletions if diff is reversed.                                                          // 191
    if (text1.length > text2.length) {                                                                             // 192
      diffs[0][0] = diffs[2][0] = DIFF_DELETE;                                                                     // 193
    }                                                                                                              // 194
    return diffs;                                                                                                  // 195
  }                                                                                                                // 196
                                                                                                                   // 197
  if (shorttext.length == 1) {                                                                                     // 198
    // Single character string.                                                                                    // 199
    // After the previous speedup, the character can't be an equality.                                             // 200
    return [[DIFF_DELETE, text1], [DIFF_INSERT, text2]];                                                           // 201
  }                                                                                                                // 202
  longtext = shorttext = null;  // Garbage collect.                                                                // 203
                                                                                                                   // 204
  // Check to see if the problem can be split in two.                                                              // 205
  var hm = this.diff_halfMatch_(text1, text2);                                                                     // 206
  if (hm) {                                                                                                        // 207
    // A half-match was found, sort out the return data.                                                           // 208
    var text1_a = hm[0];                                                                                           // 209
    var text1_b = hm[1];                                                                                           // 210
    var text2_a = hm[2];                                                                                           // 211
    var text2_b = hm[3];                                                                                           // 212
    var mid_common = hm[4];                                                                                        // 213
    // Send both pairs off for separate processing.                                                                // 214
    var diffs_a = this.diff_main(text1_a, text2_a, checklines, deadline);                                          // 215
    var diffs_b = this.diff_main(text1_b, text2_b, checklines, deadline);                                          // 216
    // Merge the results.                                                                                          // 217
    return diffs_a.concat([[DIFF_EQUAL, mid_common]], diffs_b);                                                    // 218
  }                                                                                                                // 219
                                                                                                                   // 220
  if (checklines && text1.length > 100 && text2.length > 100) {                                                    // 221
    return this.diff_lineMode_(text1, text2, deadline);                                                            // 222
  }                                                                                                                // 223
                                                                                                                   // 224
  return this.diff_bisect_(text1, text2, deadline);                                                                // 225
};                                                                                                                 // 226
                                                                                                                   // 227
                                                                                                                   // 228
/**                                                                                                                // 229
 * Do a quick line-level diff on both strings, then rediff the parts for                                           // 230
 * greater accuracy.                                                                                               // 231
 * This speedup can produce non-minimal diffs.                                                                     // 232
 * @param {string} text1 Old string to be diffed.                                                                  // 233
 * @param {string} text2 New string to be diffed.                                                                  // 234
 * @param {number} deadline Time when the diff should be complete by.                                              // 235
 * @return {!Array.<!diff_match_patch.Diff>} Array of diff tuples.                                                 // 236
 * @private                                                                                                        // 237
 */                                                                                                                // 238
diff_match_patch.prototype.diff_lineMode_ = function(text1, text2, deadline) {                                     // 239
  // Scan the text on a line-by-line basis first.                                                                  // 240
  var a = this.diff_linesToChars_(text1, text2);                                                                   // 241
  text1 = /** @type {string} */(a[0]);                                                                             // 242
  text2 = /** @type {string} */(a[1]);                                                                             // 243
  var linearray = /** @type {!Array.<string>} */(a[2]);                                                            // 244
                                                                                                                   // 245
  var diffs = this.diff_bisect_(text1, text2, deadline);                                                           // 246
                                                                                                                   // 247
  // Convert the diff back to original text.                                                                       // 248
  this.diff_charsToLines_(diffs, linearray);                                                                       // 249
  // Eliminate freak matches (e.g. blank lines)                                                                    // 250
  this.diff_cleanupSemantic(diffs);                                                                                // 251
                                                                                                                   // 252
  // Rediff any replacement blocks, this time character-by-character.                                              // 253
  // Add a dummy entry at the end.                                                                                 // 254
  diffs.push([DIFF_EQUAL, '']);                                                                                    // 255
  var pointer = 0;                                                                                                 // 256
  var count_delete = 0;                                                                                            // 257
  var count_insert = 0;                                                                                            // 258
  var text_delete = '';                                                                                            // 259
  var text_insert = '';                                                                                            // 260
  while (pointer < diffs.length) {                                                                                 // 261
    switch (diffs[pointer][0]) {                                                                                   // 262
      case DIFF_INSERT:                                                                                            // 263
        count_insert++;                                                                                            // 264
        text_insert += diffs[pointer][1];                                                                          // 265
        break;                                                                                                     // 266
      case DIFF_DELETE:                                                                                            // 267
        count_delete++;                                                                                            // 268
        text_delete += diffs[pointer][1];                                                                          // 269
        break;                                                                                                     // 270
      case DIFF_EQUAL:                                                                                             // 271
        // Upon reaching an equality, check for prior redundancies.                                                // 272
        if (count_delete >= 1 && count_insert >= 1) {                                                              // 273
          // Delete the offending records and add the merged ones.                                                 // 274
          var a = this.diff_main(text_delete, text_insert, false, deadline);                                       // 275
          diffs.splice(pointer - count_delete - count_insert,                                                      // 276
                       count_delete + count_insert);                                                               // 277
          pointer = pointer - count_delete - count_insert;                                                         // 278
          for (var j = a.length - 1; j >= 0; j--) {                                                                // 279
            diffs.splice(pointer, 0, a[j]);                                                                        // 280
          }                                                                                                        // 281
          pointer = pointer + a.length;                                                                            // 282
        }                                                                                                          // 283
        count_insert = 0;                                                                                          // 284
        count_delete = 0;                                                                                          // 285
        text_delete = '';                                                                                          // 286
        text_insert = '';                                                                                          // 287
        break;                                                                                                     // 288
    }                                                                                                              // 289
    pointer++;                                                                                                     // 290
  }                                                                                                                // 291
  diffs.pop();  // Remove the dummy entry at the end.                                                              // 292
                                                                                                                   // 293
  return diffs;                                                                                                    // 294
};                                                                                                                 // 295
                                                                                                                   // 296
                                                                                                                   // 297
/**                                                                                                                // 298
 * Find the 'middle snake' of a diff, split the problem in two                                                     // 299
 * and return the recursively constructed diff.                                                                    // 300
 * See Myers 1986 paper: An O(ND) Difference Algorithm and Its Variations.                                         // 301
 * @param {string} text1 Old string to be diffed.                                                                  // 302
 * @param {string} text2 New string to be diffed.                                                                  // 303
 * @param {number} deadline Time at which to bail if not yet complete.                                             // 304
 * @return {!Array.<!diff_match_patch.Diff>} Array of diff tuples.                                                 // 305
 * @private                                                                                                        // 306
 */                                                                                                                // 307
diff_match_patch.prototype.diff_bisect_ = function(text1, text2, deadline) {                                       // 308
  // Cache the text lengths to prevent multiple calls.                                                             // 309
  var text1_length = text1.length;                                                                                 // 310
  var text2_length = text2.length;                                                                                 // 311
  var max_d = Math.ceil((text1_length + text2_length) / 2);                                                        // 312
  var v_offset = max_d;                                                                                            // 313
  var v_length = 2 * max_d;                                                                                        // 314
  var v1 = new Array(v_length);                                                                                    // 315
  var v2 = new Array(v_length);                                                                                    // 316
  // Setting all elements to -1 is faster in Chrome & Firefox than mixing                                          // 317
  // integers and undefined.                                                                                       // 318
  for (var x = 0; x < v_length; x++) {                                                                             // 319
    v1[x] = -1;                                                                                                    // 320
    v2[x] = -1;                                                                                                    // 321
  }                                                                                                                // 322
  v1[v_offset + 1] = 0;                                                                                            // 323
  v2[v_offset + 1] = 0;                                                                                            // 324
  var delta = text1_length - text2_length;                                                                         // 325
  // If the total number of characters is odd, then the front path will collide                                    // 326
  // with the reverse path.                                                                                        // 327
  var front = (delta % 2 != 0);                                                                                    // 328
  // Offsets for start and end of k loop.                                                                          // 329
  // Prevents mapping of space beyond the grid.                                                                    // 330
  var k1start = 0;                                                                                                 // 331
  var k1end = 0;                                                                                                   // 332
  var k2start = 0;                                                                                                 // 333
  var k2end = 0;                                                                                                   // 334
  for (var d = 0; d < max_d; d++) {                                                                                // 335
    // Bail out if deadline is reached.                                                                            // 336
    if ((new Date()).getTime() > deadline) {                                                                       // 337
      break;                                                                                                       // 338
    }                                                                                                              // 339
                                                                                                                   // 340
    // Walk the front path one step.                                                                               // 341
    for (var k1 = -d + k1start; k1 <= d - k1end; k1 += 2) {                                                        // 342
      var k1_offset = v_offset + k1;                                                                               // 343
      var x1;                                                                                                      // 344
      if (k1 == -d || k1 != d && v1[k1_offset - 1] < v1[k1_offset + 1]) {                                          // 345
        x1 = v1[k1_offset + 1];                                                                                    // 346
      } else {                                                                                                     // 347
        x1 = v1[k1_offset - 1] + 1;                                                                                // 348
      }                                                                                                            // 349
      var y1 = x1 - k1;                                                                                            // 350
      while (x1 < text1_length && y1 < text2_length &&                                                             // 351
             text1.charAt(x1) == text2.charAt(y1)) {                                                               // 352
        x1++;                                                                                                      // 353
        y1++;                                                                                                      // 354
      }                                                                                                            // 355
      v1[k1_offset] = x1;                                                                                          // 356
      if (x1 > text1_length) {                                                                                     // 357
        // Ran off the right of the graph.                                                                         // 358
        k1end += 2;                                                                                                // 359
      } else if (y1 > text2_length) {                                                                              // 360
        // Ran off the bottom of the graph.                                                                        // 361
        k1start += 2;                                                                                              // 362
      } else if (front) {                                                                                          // 363
        var k2_offset = v_offset + delta - k1;                                                                     // 364
        if (k2_offset >= 0 && k2_offset < v_length && v2[k2_offset] != -1) {                                       // 365
          // Mirror x2 onto top-left coordinate system.                                                            // 366
          var x2 = text1_length - v2[k2_offset];                                                                   // 367
          if (x1 >= x2) {                                                                                          // 368
            // Overlap detected.                                                                                   // 369
            return this.diff_bisectSplit_(text1, text2, x1, y1, deadline);                                         // 370
          }                                                                                                        // 371
        }                                                                                                          // 372
      }                                                                                                            // 373
    }                                                                                                              // 374
                                                                                                                   // 375
    // Walk the reverse path one step.                                                                             // 376
    for (var k2 = -d + k2start; k2 <= d - k2end; k2 += 2) {                                                        // 377
      var k2_offset = v_offset + k2;                                                                               // 378
      var x2;                                                                                                      // 379
      if (k2 == -d || k2 != d && v2[k2_offset - 1] < v2[k2_offset + 1]) {                                          // 380
        x2 = v2[k2_offset + 1];                                                                                    // 381
      } else {                                                                                                     // 382
        x2 = v2[k2_offset - 1] + 1;                                                                                // 383
      }                                                                                                            // 384
      var y2 = x2 - k2;                                                                                            // 385
      while (x2 < text1_length && y2 < text2_length &&                                                             // 386
             text1.charAt(text1_length - x2 - 1) ==                                                                // 387
             text2.charAt(text2_length - y2 - 1)) {                                                                // 388
        x2++;                                                                                                      // 389
        y2++;                                                                                                      // 390
      }                                                                                                            // 391
      v2[k2_offset] = x2;                                                                                          // 392
      if (x2 > text1_length) {                                                                                     // 393
        // Ran off the left of the graph.                                                                          // 394
        k2end += 2;                                                                                                // 395
      } else if (y2 > text2_length) {                                                                              // 396
        // Ran off the top of the graph.                                                                           // 397
        k2start += 2;                                                                                              // 398
      } else if (!front) {                                                                                         // 399
        var k1_offset = v_offset + delta - k2;                                                                     // 400
        if (k1_offset >= 0 && k1_offset < v_length && v1[k1_offset] != -1) {                                       // 401
          var x1 = v1[k1_offset];                                                                                  // 402
          var y1 = v_offset + x1 - k1_offset;                                                                      // 403
          // Mirror x2 onto top-left coordinate system.                                                            // 404
          x2 = text1_length - x2;                                                                                  // 405
          if (x1 >= x2) {                                                                                          // 406
            // Overlap detected.                                                                                   // 407
            return this.diff_bisectSplit_(text1, text2, x1, y1, deadline);                                         // 408
          }                                                                                                        // 409
        }                                                                                                          // 410
      }                                                                                                            // 411
    }                                                                                                              // 412
  }                                                                                                                // 413
  // Diff took too long and hit the deadline or                                                                    // 414
  // number of diffs equals number of characters, no commonality at all.                                           // 415
  return [[DIFF_DELETE, text1], [DIFF_INSERT, text2]];                                                             // 416
};                                                                                                                 // 417
                                                                                                                   // 418
                                                                                                                   // 419
/**                                                                                                                // 420
 * Given the location of the 'middle snake', split the diff in two parts                                           // 421
 * and recurse.                                                                                                    // 422
 * @param {string} text1 Old string to be diffed.                                                                  // 423
 * @param {string} text2 New string to be diffed.                                                                  // 424
 * @param {number} x Index of split point in text1.                                                                // 425
 * @param {number} y Index of split point in text2.                                                                // 426
 * @param {number} deadline Time at which to bail if not yet complete.                                             // 427
 * @return {!Array.<!diff_match_patch.Diff>} Array of diff tuples.                                                 // 428
 * @private                                                                                                        // 429
 */                                                                                                                // 430
diff_match_patch.prototype.diff_bisectSplit_ = function(text1, text2, x, y,                                        // 431
    deadline) {                                                                                                    // 432
  var text1a = text1.substring(0, x);                                                                              // 433
  var text2a = text2.substring(0, y);                                                                              // 434
  var text1b = text1.substring(x);                                                                                 // 435
  var text2b = text2.substring(y);                                                                                 // 436
                                                                                                                   // 437
  // Compute both diffs serially.                                                                                  // 438
  var diffs = this.diff_main(text1a, text2a, false, deadline);                                                     // 439
  var diffsb = this.diff_main(text1b, text2b, false, deadline);                                                    // 440
                                                                                                                   // 441
  return diffs.concat(diffsb);                                                                                     // 442
};                                                                                                                 // 443
                                                                                                                   // 444
                                                                                                                   // 445
/**                                                                                                                // 446
 * Split two texts into an array of strings.  Reduce the texts to a string of                                      // 447
 * hashes where each Unicode character represents one line.                                                        // 448
 * @param {string} text1 First string.                                                                             // 449
 * @param {string} text2 Second string.                                                                            // 450
 * @return {!Array.<string|!Array.<string>>} Three element Array, containing the                                   // 451
 *     encoded text1, the encoded text2 and the array of unique strings.  The                                      // 452
 *     zeroth element of the array of unique strings is intentionally blank.                                       // 453
 * @private                                                                                                        // 454
 */                                                                                                                // 455
diff_match_patch.prototype.diff_linesToChars_ = function(text1, text2) {                                           // 456
  var lineArray = [];  // e.g. lineArray[4] == 'Hello\n'                                                           // 457
  var lineHash = {};   // e.g. lineHash['Hello\n'] == 4                                                            // 458
                                                                                                                   // 459
  // '\x00' is a valid character, but various debuggers don't like it.                                             // 460
  // So we'll insert a junk entry to avoid generating a null character.                                            // 461
  lineArray[0] = '';                                                                                               // 462
                                                                                                                   // 463
  /**                                                                                                              // 464
   * Split a text into an array of strings.  Reduce the texts to a string of                                       // 465
   * hashes where each Unicode character represents one line.                                                      // 466
   * Modifies linearray and linehash through being a closure.                                                      // 467
   * @param {string} text String to encode.                                                                        // 468
   * @return {string} Encoded string.                                                                              // 469
   * @private                                                                                                      // 470
   */                                                                                                              // 471
  function diff_linesToCharsMunge_(text) {                                                                         // 472
    var chars = '';                                                                                                // 473
    // Walk the text, pulling out a substring for each line.                                                       // 474
    // text.split('\n') would would temporarily double our memory footprint.                                       // 475
    // Modifying text would create many large strings to garbage collect.                                          // 476
    var lineStart = 0;                                                                                             // 477
    var lineEnd = -1;                                                                                              // 478
    // Keeping our own length variable is faster than looking it up.                                               // 479
    var lineArrayLength = lineArray.length;                                                                        // 480
    while (lineEnd < text.length - 1) {                                                                            // 481
      lineEnd = text.indexOf('\n', lineStart);                                                                     // 482
      if (lineEnd == -1) {                                                                                         // 483
        lineEnd = text.length - 1;                                                                                 // 484
      }                                                                                                            // 485
      var line = text.substring(lineStart, lineEnd + 1);                                                           // 486
      lineStart = lineEnd + 1;                                                                                     // 487
                                                                                                                   // 488
      if (lineHash.hasOwnProperty ? lineHash.hasOwnProperty(line) :                                                // 489
          (lineHash[line] !== undefined)) {                                                                        // 490
        chars += String.fromCharCode(lineHash[line]);                                                              // 491
      } else {                                                                                                     // 492
        chars += String.fromCharCode(lineArrayLength);                                                             // 493
        lineHash[line] = lineArrayLength;                                                                          // 494
        lineArray[lineArrayLength++] = line;                                                                       // 495
      }                                                                                                            // 496
    }                                                                                                              // 497
    return chars;                                                                                                  // 498
  }                                                                                                                // 499
                                                                                                                   // 500
  var chars1 = diff_linesToCharsMunge_(text1);                                                                     // 501
  var chars2 = diff_linesToCharsMunge_(text2);                                                                     // 502
  return [chars1, chars2, lineArray];                                                                              // 503
};                                                                                                                 // 504
                                                                                                                   // 505
                                                                                                                   // 506
/**                                                                                                                // 507
 * Rehydrate the text in a diff from a string of line hashes to real lines of                                      // 508
 * text.                                                                                                           // 509
 * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.                                            // 510
 * @param {!Array.<string>} lineArray Array of unique strings.                                                     // 511
 * @private                                                                                                        // 512
 */                                                                                                                // 513
diff_match_patch.prototype.diff_charsToLines_ = function(diffs, lineArray) {                                       // 514
  for (var x = 0; x < diffs.length; x++) {                                                                         // 515
    var chars = diffs[x][1];                                                                                       // 516
    var text = [];                                                                                                 // 517
    for (var y = 0; y < chars.length; y++) {                                                                       // 518
      text[y] = lineArray[chars.charCodeAt(y)];                                                                    // 519
    }                                                                                                              // 520
    diffs[x][1] = text.join('');                                                                                   // 521
  }                                                                                                                // 522
};                                                                                                                 // 523
                                                                                                                   // 524
                                                                                                                   // 525
/**                                                                                                                // 526
 * Determine the common prefix of two strings.                                                                     // 527
 * @param {string} text1 First string.                                                                             // 528
 * @param {string} text2 Second string.                                                                            // 529
 * @return {number} The number of characters common to the start of each                                           // 530
 *     string.                                                                                                     // 531
 */                                                                                                                // 532
diff_match_patch.prototype.diff_commonPrefix = function(text1, text2) {                                            // 533
  // Quick check for common null cases.                                                                            // 534
  if (!text1 || !text2 || text1.charAt(0) != text2.charAt(0)) {                                                    // 535
    return 0;                                                                                                      // 536
  }                                                                                                                // 537
  // Binary search.                                                                                                // 538
  // Performance analysis: http://neil.fraser.name/news/2007/10/09/                                                // 539
  var pointermin = 0;                                                                                              // 540
  var pointermax = Math.min(text1.length, text2.length);                                                           // 541
  var pointermid = pointermax;                                                                                     // 542
  var pointerstart = 0;                                                                                            // 543
  while (pointermin < pointermid) {                                                                                // 544
    if (text1.substring(pointerstart, pointermid) ==                                                               // 545
        text2.substring(pointerstart, pointermid)) {                                                               // 546
      pointermin = pointermid;                                                                                     // 547
      pointerstart = pointermin;                                                                                   // 548
    } else {                                                                                                       // 549
      pointermax = pointermid;                                                                                     // 550
    }                                                                                                              // 551
    pointermid = Math.floor((pointermax - pointermin) / 2 + pointermin);                                           // 552
  }                                                                                                                // 553
  return pointermid;                                                                                               // 554
};                                                                                                                 // 555
                                                                                                                   // 556
                                                                                                                   // 557
/**                                                                                                                // 558
 * Determine the common suffix of two strings.                                                                     // 559
 * @param {string} text1 First string.                                                                             // 560
 * @param {string} text2 Second string.                                                                            // 561
 * @return {number} The number of characters common to the end of each string.                                     // 562
 */                                                                                                                // 563
diff_match_patch.prototype.diff_commonSuffix = function(text1, text2) {                                            // 564
  // Quick check for common null cases.                                                                            // 565
  if (!text1 || !text2 ||                                                                                          // 566
      text1.charAt(text1.length - 1) != text2.charAt(text2.length - 1)) {                                          // 567
    return 0;                                                                                                      // 568
  }                                                                                                                // 569
  // Binary search.                                                                                                // 570
  // Performance analysis: http://neil.fraser.name/news/2007/10/09/                                                // 571
  var pointermin = 0;                                                                                              // 572
  var pointermax = Math.min(text1.length, text2.length);                                                           // 573
  var pointermid = pointermax;                                                                                     // 574
  var pointerend = 0;                                                                                              // 575
  while (pointermin < pointermid) {                                                                                // 576
    if (text1.substring(text1.length - pointermid, text1.length - pointerend) ==                                   // 577
        text2.substring(text2.length - pointermid, text2.length - pointerend)) {                                   // 578
      pointermin = pointermid;                                                                                     // 579
      pointerend = pointermin;                                                                                     // 580
    } else {                                                                                                       // 581
      pointermax = pointermid;                                                                                     // 582
    }                                                                                                              // 583
    pointermid = Math.floor((pointermax - pointermin) / 2 + pointermin);                                           // 584
  }                                                                                                                // 585
  return pointermid;                                                                                               // 586
};                                                                                                                 // 587
                                                                                                                   // 588
                                                                                                                   // 589
/**                                                                                                                // 590
 * Determine if the suffix of one string is the prefix of another.                                                 // 591
 * @param {string} text1 First string.                                                                             // 592
 * @param {string} text2 Second string.                                                                            // 593
 * @return {number} The number of characters common to the end of the first                                        // 594
 *     string and the start of the second string.                                                                  // 595
 * @private                                                                                                        // 596
 */                                                                                                                // 597
diff_match_patch.prototype.diff_commonOverlap_ = function(text1, text2) {                                          // 598
  // Cache the text lengths to prevent multiple calls.                                                             // 599
  var text1_length = text1.length;                                                                                 // 600
  var text2_length = text2.length;                                                                                 // 601
  // Eliminate the null case.                                                                                      // 602
  if (text1_length == 0 || text2_length == 0) {                                                                    // 603
    return 0;                                                                                                      // 604
  }                                                                                                                // 605
  // Truncate the longer string.                                                                                   // 606
  if (text1_length > text2_length) {                                                                               // 607
    text1 = text1.substring(text1_length - text2_length);                                                          // 608
  } else if (text1_length < text2_length) {                                                                        // 609
    text2 = text2.substring(0, text1_length);                                                                      // 610
  }                                                                                                                // 611
  var text_length = Math.min(text1_length, text2_length);                                                          // 612
  // Quick check for the worst case.                                                                               // 613
  if (text1 == text2) {                                                                                            // 614
    return text_length;                                                                                            // 615
  }                                                                                                                // 616
                                                                                                                   // 617
  // Start by looking for a single character match                                                                 // 618
  // and increase length until no match is found.                                                                  // 619
  // Performance analysis: http://neil.fraser.name/news/2010/11/04/                                                // 620
  var best = 0;                                                                                                    // 621
  var length = 1;                                                                                                  // 622
  while (true) {                                                                                                   // 623
    var pattern = text1.substring(text_length - length);                                                           // 624
    var found = text2.indexOf(pattern);                                                                            // 625
    if (found == -1) {                                                                                             // 626
      return best;                                                                                                 // 627
    }                                                                                                              // 628
    length += found;                                                                                               // 629
    if (found == 0 || text1.substring(text_length - length) ==                                                     // 630
        text2.substring(0, length)) {                                                                              // 631
      best = length;                                                                                               // 632
      length++;                                                                                                    // 633
    }                                                                                                              // 634
  }                                                                                                                // 635
};                                                                                                                 // 636
                                                                                                                   // 637
                                                                                                                   // 638
/**                                                                                                                // 639
 * Do the two texts share a substring which is at least half the length of the                                     // 640
 * longer text?                                                                                                    // 641
 * This speedup can produce non-minimal diffs.                                                                     // 642
 * @param {string} text1 First string.                                                                             // 643
 * @param {string} text2 Second string.                                                                            // 644
 * @return {Array.<string>} Five element Array, containing the prefix of                                           // 645
 *     text1, the suffix of text1, the prefix of text2, the suffix of                                              // 646
 *     text2 and the common middle.  Or null if there was no match.                                                // 647
 * @private                                                                                                        // 648
 */                                                                                                                // 649
diff_match_patch.prototype.diff_halfMatch_ = function(text1, text2) {                                              // 650
  if (this.Diff_Timeout <= 0) {                                                                                    // 651
    // Don't risk returning a non-optimal diff if we have unlimited time.                                          // 652
    return null;                                                                                                   // 653
  }                                                                                                                // 654
  var longtext = text1.length > text2.length ? text1 : text2;                                                      // 655
  var shorttext = text1.length > text2.length ? text2 : text1;                                                     // 656
  if (longtext.length < 4 || shorttext.length * 2 < longtext.length) {                                             // 657
    return null;  // Pointless.                                                                                    // 658
  }                                                                                                                // 659
  var dmp = this;  // 'this' becomes 'window' in a closure.                                                        // 660
                                                                                                                   // 661
  /**                                                                                                              // 662
   * Does a substring of shorttext exist within longtext such that the substring                                   // 663
   * is at least half the length of longtext?                                                                      // 664
   * Closure, but does not reference any external variables.                                                       // 665
   * @param {string} longtext Longer string.                                                                       // 666
   * @param {string} shorttext Shorter string.                                                                     // 667
   * @param {number} i Start index of quarter length substring within longtext.                                    // 668
   * @return {Array.<string>} Five element Array, containing the prefix of                                         // 669
   *     longtext, the suffix of longtext, the prefix of shorttext, the suffix                                     // 670
   *     of shorttext and the common middle.  Or null if there was no match.                                       // 671
   * @private                                                                                                      // 672
   */                                                                                                              // 673
  function diff_halfMatchI_(longtext, shorttext, i) {                                                              // 674
    // Start with a 1/4 length substring at position i as a seed.                                                  // 675
    var seed = longtext.substring(i, i + Math.floor(longtext.length / 4));                                         // 676
    var j = -1;                                                                                                    // 677
    var best_common = '';                                                                                          // 678
    var best_longtext_a, best_longtext_b, best_shorttext_a, best_shorttext_b;                                      // 679
    while ((j = shorttext.indexOf(seed, j + 1)) != -1) {                                                           // 680
      var prefixLength = dmp.diff_commonPrefix(longtext.substring(i),                                              // 681
                                               shorttext.substring(j));                                            // 682
      var suffixLength = dmp.diff_commonSuffix(longtext.substring(0, i),                                           // 683
                                               shorttext.substring(0, j));                                         // 684
      if (best_common.length < suffixLength + prefixLength) {                                                      // 685
        best_common = shorttext.substring(j - suffixLength, j) +                                                   // 686
            shorttext.substring(j, j + prefixLength);                                                              // 687
        best_longtext_a = longtext.substring(0, i - suffixLength);                                                 // 688
        best_longtext_b = longtext.substring(i + prefixLength);                                                    // 689
        best_shorttext_a = shorttext.substring(0, j - suffixLength);                                               // 690
        best_shorttext_b = shorttext.substring(j + prefixLength);                                                  // 691
      }                                                                                                            // 692
    }                                                                                                              // 693
    if (best_common.length * 2 >= longtext.length) {                                                               // 694
      return [best_longtext_a, best_longtext_b,                                                                    // 695
              best_shorttext_a, best_shorttext_b, best_common];                                                    // 696
    } else {                                                                                                       // 697
      return null;                                                                                                 // 698
    }                                                                                                              // 699
  }                                                                                                                // 700
                                                                                                                   // 701
  // First check if the second quarter is the seed for a half-match.                                               // 702
  var hm1 = diff_halfMatchI_(longtext, shorttext,                                                                  // 703
                             Math.ceil(longtext.length / 4));                                                      // 704
  // Check again based on the third quarter.                                                                       // 705
  var hm2 = diff_halfMatchI_(longtext, shorttext,                                                                  // 706
                             Math.ceil(longtext.length / 2));                                                      // 707
  var hm;                                                                                                          // 708
  if (!hm1 && !hm2) {                                                                                              // 709
    return null;                                                                                                   // 710
  } else if (!hm2) {                                                                                               // 711
    hm = hm1;                                                                                                      // 712
  } else if (!hm1) {                                                                                               // 713
    hm = hm2;                                                                                                      // 714
  } else {                                                                                                         // 715
    // Both matched.  Select the longest.                                                                          // 716
    hm = hm1[4].length > hm2[4].length ? hm1 : hm2;                                                                // 717
  }                                                                                                                // 718
                                                                                                                   // 719
  // A half-match was found, sort out the return data.                                                             // 720
  var text1_a, text1_b, text2_a, text2_b;                                                                          // 721
  if (text1.length > text2.length) {                                                                               // 722
    text1_a = hm[0];                                                                                               // 723
    text1_b = hm[1];                                                                                               // 724
    text2_a = hm[2];                                                                                               // 725
    text2_b = hm[3];                                                                                               // 726
  } else {                                                                                                         // 727
    text2_a = hm[0];                                                                                               // 728
    text2_b = hm[1];                                                                                               // 729
    text1_a = hm[2];                                                                                               // 730
    text1_b = hm[3];                                                                                               // 731
  }                                                                                                                // 732
  var mid_common = hm[4];                                                                                          // 733
  return [text1_a, text1_b, text2_a, text2_b, mid_common];                                                         // 734
};                                                                                                                 // 735
                                                                                                                   // 736
                                                                                                                   // 737
/**                                                                                                                // 738
 * Reduce the number of edits by eliminating semantically trivial equalities.                                      // 739
 * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.                                            // 740
 */                                                                                                                // 741
diff_match_patch.prototype.diff_cleanupSemantic = function(diffs) {                                                // 742
  var changes = false;                                                                                             // 743
  var equalities = [];  // Stack of indices where equalities are found.                                            // 744
  var equalitiesLength = 0;  // Keeping our own length var is faster in JS.                                        // 745
  /** @type {?string} */                                                                                           // 746
  var lastequality = null;  // Always equal to equalities[equalitiesLength-1][1]                                   // 747
  var pointer = 0;  // Index of current position.                                                                  // 748
  // Number of characters that changed prior to the equality.                                                      // 749
  var length_insertions1 = 0;                                                                                      // 750
  var length_deletions1 = 0;                                                                                       // 751
  // Number of characters that changed after the equality.                                                         // 752
  var length_insertions2 = 0;                                                                                      // 753
  var length_deletions2 = 0;                                                                                       // 754
  while (pointer < diffs.length) {                                                                                 // 755
    if (diffs[pointer][0] == DIFF_EQUAL) {  // Equality found.                                                     // 756
      equalities[equalitiesLength++] = pointer;                                                                    // 757
      length_insertions1 = length_insertions2;                                                                     // 758
      length_deletions1 = length_deletions2;                                                                       // 759
      length_insertions2 = 0;                                                                                      // 760
      length_deletions2 = 0;                                                                                       // 761
      lastequality = /** @type {string} */(diffs[pointer][1]);                                                     // 762
    } else {  // An insertion or deletion.                                                                         // 763
      if (diffs[pointer][0] == DIFF_INSERT) {                                                                      // 764
        length_insertions2 += diffs[pointer][1].length;                                                            // 765
      } else {                                                                                                     // 766
        length_deletions2 += diffs[pointer][1].length;                                                             // 767
      }                                                                                                            // 768
      // Eliminate an equality that is smaller or equal to the edits on both                                       // 769
      // sides of it.                                                                                              // 770
      if (lastequality !== null && (lastequality.length <=                                                         // 771
          Math.max(length_insertions1, length_deletions1)) &&                                                      // 772
          (lastequality.length <= Math.max(length_insertions2,                                                     // 773
                                           length_deletions2))) {                                                  // 774
        // Duplicate record.                                                                                       // 775
        diffs.splice(equalities[equalitiesLength - 1], 0,                                                          // 776
                     [DIFF_DELETE, lastequality]);                                                                 // 777
        // Change second copy to insert.                                                                           // 778
        diffs[equalities[equalitiesLength - 1] + 1][0] = DIFF_INSERT;                                              // 779
        // Throw away the equality we just deleted.                                                                // 780
        equalitiesLength--;                                                                                        // 781
        // Throw away the previous equality (it needs to be reevaluated).                                          // 782
        equalitiesLength--;                                                                                        // 783
        pointer = equalitiesLength > 0 ? equalities[equalitiesLength - 1] : -1;                                    // 784
        length_insertions1 = 0;  // Reset the counters.                                                            // 785
        length_deletions1 = 0;                                                                                     // 786
        length_insertions2 = 0;                                                                                    // 787
        length_deletions2 = 0;                                                                                     // 788
        lastequality = null;                                                                                       // 789
        changes = true;                                                                                            // 790
      }                                                                                                            // 791
    }                                                                                                              // 792
    pointer++;                                                                                                     // 793
  }                                                                                                                // 794
                                                                                                                   // 795
  // Normalize the diff.                                                                                           // 796
  if (changes) {                                                                                                   // 797
    this.diff_cleanupMerge(diffs);                                                                                 // 798
  }                                                                                                                // 799
  this.diff_cleanupSemanticLossless(diffs);                                                                        // 800
                                                                                                                   // 801
  // Find any overlaps between deletions and insertions.                                                           // 802
  // e.g: <del>abcxxx</del><ins>xxxdef</ins>                                                                       // 803
  //   -> <del>abc</del>xxx<ins>def</ins>                                                                          // 804
  // Only extract an overlap if it is as big as the edit ahead or behind it.                                       // 805
  pointer = 1;                                                                                                     // 806
  while (pointer < diffs.length) {                                                                                 // 807
    if (diffs[pointer - 1][0] == DIFF_DELETE &&                                                                    // 808
        diffs[pointer][0] == DIFF_INSERT) {                                                                        // 809
      var deletion = /** @type {string} */(diffs[pointer - 1][1]);                                                 // 810
      var insertion = /** @type {string} */(diffs[pointer][1]);                                                    // 811
      var overlap_length = this.diff_commonOverlap_(deletion, insertion);                                          // 812
      if (overlap_length >= deletion.length / 2 ||                                                                 // 813
          overlap_length >= insertion.length / 2) {                                                                // 814
        // Overlap found.  Insert an equality and trim the surrounding edits.                                      // 815
        diffs.splice(pointer, 0,                                                                                   // 816
            [DIFF_EQUAL, insertion.substring(0, overlap_length)]);                                                 // 817
        diffs[pointer - 1][1] =                                                                                    // 818
            deletion.substring(0, deletion.length - overlap_length);                                               // 819
        diffs[pointer + 1][1] = insertion.substring(overlap_length);                                               // 820
        pointer++;                                                                                                 // 821
      }                                                                                                            // 822
      pointer++;                                                                                                   // 823
    }                                                                                                              // 824
    pointer++;                                                                                                     // 825
  }                                                                                                                // 826
};                                                                                                                 // 827
                                                                                                                   // 828
                                                                                                                   // 829
/**                                                                                                                // 830
 * Look for single edits surrounded on both sides by equalities                                                    // 831
 * which can be shifted sideways to align the edit to a word boundary.                                             // 832
 * e.g: The c<ins>at c</ins>ame. -> The <ins>cat </ins>came.                                                       // 833
 * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.                                            // 834
 */                                                                                                                // 835
diff_match_patch.prototype.diff_cleanupSemanticLossless = function(diffs) {                                        // 836
  // Define some regex patterns for matching boundaries.                                                           // 837
  var punctuation = /[^a-zA-Z0-9]/;                                                                                // 838
  var whitespace = /\s/;                                                                                           // 839
  var linebreak = /[\r\n]/;                                                                                        // 840
  var blanklineEnd = /\n\r?\n$/;                                                                                   // 841
  var blanklineStart = /^\r?\n\r?\n/;                                                                              // 842
                                                                                                                   // 843
  /**                                                                                                              // 844
   * Given two strings, compute a score representing whether the internal                                          // 845
   * boundary falls on logical boundaries.                                                                         // 846
   * Scores range from 5 (best) to 0 (worst).                                                                      // 847
   * Closure, makes reference to regex patterns defined above.                                                     // 848
   * @param {string} one First string.                                                                             // 849
   * @param {string} two Second string.                                                                            // 850
   * @return {number} The score.                                                                                   // 851
   * @private                                                                                                      // 852
   */                                                                                                              // 853
  function diff_cleanupSemanticScore_(one, two) {                                                                  // 854
    if (!one || !two) {                                                                                            // 855
      // Edges are the best.                                                                                       // 856
      return 5;                                                                                                    // 857
    }                                                                                                              // 858
                                                                                                                   // 859
    // Each port of this function behaves slightly differently due to                                              // 860
    // subtle differences in each language's definition of things like                                             // 861
    // 'whitespace'.  Since this function's purpose is largely cosmetic,                                           // 862
    // the choice has been made to use each language's native features                                             // 863
    // rather than force total conformity.                                                                         // 864
    var score = 0;                                                                                                 // 865
    // One point for non-alphanumeric.                                                                             // 866
    if (one.charAt(one.length - 1).match(punctuation) ||                                                           // 867
        two.charAt(0).match(punctuation)) {                                                                        // 868
      score++;                                                                                                     // 869
      // Two points for whitespace.                                                                                // 870
      if (one.charAt(one.length - 1).match(whitespace) ||                                                          // 871
          two.charAt(0).match(whitespace)) {                                                                       // 872
        score++;                                                                                                   // 873
        // Three points for line breaks.                                                                           // 874
        if (one.charAt(one.length - 1).match(linebreak) ||                                                         // 875
            two.charAt(0).match(linebreak)) {                                                                      // 876
          score++;                                                                                                 // 877
          // Four points for blank lines.                                                                          // 878
          if (one.match(blanklineEnd) || two.match(blanklineStart)) {                                              // 879
            score++;                                                                                               // 880
          }                                                                                                        // 881
        }                                                                                                          // 882
      }                                                                                                            // 883
    }                                                                                                              // 884
    return score;                                                                                                  // 885
  }                                                                                                                // 886
                                                                                                                   // 887
  var pointer = 1;                                                                                                 // 888
  // Intentionally ignore the first and last element (don't need checking).                                        // 889
  while (pointer < diffs.length - 1) {                                                                             // 890
    if (diffs[pointer - 1][0] == DIFF_EQUAL &&                                                                     // 891
        diffs[pointer + 1][0] == DIFF_EQUAL) {                                                                     // 892
      // This is a single edit surrounded by equalities.                                                           // 893
      var equality1 = /** @type {string} */(diffs[pointer - 1][1]);                                                // 894
      var edit = /** @type {string} */(diffs[pointer][1]);                                                         // 895
      var equality2 = /** @type {string} */(diffs[pointer + 1][1]);                                                // 896
                                                                                                                   // 897
      // First, shift the edit as far left as possible.                                                            // 898
      var commonOffset = this.diff_commonSuffix(equality1, edit);                                                  // 899
      if (commonOffset) {                                                                                          // 900
        var commonString = edit.substring(edit.length - commonOffset);                                             // 901
        equality1 = equality1.substring(0, equality1.length - commonOffset);                                       // 902
        edit = commonString + edit.substring(0, edit.length - commonOffset);                                       // 903
        equality2 = commonString + equality2;                                                                      // 904
      }                                                                                                            // 905
                                                                                                                   // 906
      // Second, step character by character right, looking for the best fit.                                      // 907
      var bestEquality1 = equality1;                                                                               // 908
      var bestEdit = edit;                                                                                         // 909
      var bestEquality2 = equality2;                                                                               // 910
      var bestScore = diff_cleanupSemanticScore_(equality1, edit) +                                                // 911
          diff_cleanupSemanticScore_(edit, equality2);                                                             // 912
      while (edit.charAt(0) === equality2.charAt(0)) {                                                             // 913
        equality1 += edit.charAt(0);                                                                               // 914
        edit = edit.substring(1) + equality2.charAt(0);                                                            // 915
        equality2 = equality2.substring(1);                                                                        // 916
        var score = diff_cleanupSemanticScore_(equality1, edit) +                                                  // 917
            diff_cleanupSemanticScore_(edit, equality2);                                                           // 918
        // The >= encourages trailing rather than leading whitespace on edits.                                     // 919
        if (score >= bestScore) {                                                                                  // 920
          bestScore = score;                                                                                       // 921
          bestEquality1 = equality1;                                                                               // 922
          bestEdit = edit;                                                                                         // 923
          bestEquality2 = equality2;                                                                               // 924
        }                                                                                                          // 925
      }                                                                                                            // 926
                                                                                                                   // 927
      if (diffs[pointer - 1][1] != bestEquality1) {                                                                // 928
        // We have an improvement, save it back to the diff.                                                       // 929
        if (bestEquality1) {                                                                                       // 930
          diffs[pointer - 1][1] = bestEquality1;                                                                   // 931
        } else {                                                                                                   // 932
          diffs.splice(pointer - 1, 1);                                                                            // 933
          pointer--;                                                                                               // 934
        }                                                                                                          // 935
        diffs[pointer][1] = bestEdit;                                                                              // 936
        if (bestEquality2) {                                                                                       // 937
          diffs[pointer + 1][1] = bestEquality2;                                                                   // 938
        } else {                                                                                                   // 939
          diffs.splice(pointer + 1, 1);                                                                            // 940
          pointer--;                                                                                               // 941
        }                                                                                                          // 942
      }                                                                                                            // 943
    }                                                                                                              // 944
    pointer++;                                                                                                     // 945
  }                                                                                                                // 946
};                                                                                                                 // 947
                                                                                                                   // 948
                                                                                                                   // 949
/**                                                                                                                // 950
 * Reduce the number of edits by eliminating operationally trivial equalities.                                     // 951
 * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.                                            // 952
 */                                                                                                                // 953
diff_match_patch.prototype.diff_cleanupEfficiency = function(diffs) {                                              // 954
  var changes = false;                                                                                             // 955
  var equalities = [];  // Stack of indices where equalities are found.                                            // 956
  var equalitiesLength = 0;  // Keeping our own length var is faster in JS.                                        // 957
  var lastequality = '';  // Always equal to equalities[equalitiesLength-1][1]                                     // 958
  var pointer = 0;  // Index of current position.                                                                  // 959
  // Is there an insertion operation before the last equality.                                                     // 960
  var pre_ins = false;                                                                                             // 961
  // Is there a deletion operation before the last equality.                                                       // 962
  var pre_del = false;                                                                                             // 963
  // Is there an insertion operation after the last equality.                                                      // 964
  var post_ins = false;                                                                                            // 965
  // Is there a deletion operation after the last equality.                                                        // 966
  var post_del = false;                                                                                            // 967
  while (pointer < diffs.length) {                                                                                 // 968
    if (diffs[pointer][0] == DIFF_EQUAL) {  // Equality found.                                                     // 969
      if (diffs[pointer][1].length < this.Diff_EditCost &&                                                         // 970
          (post_ins || post_del)) {                                                                                // 971
        // Candidate found.                                                                                        // 972
        equalities[equalitiesLength++] = pointer;                                                                  // 973
        pre_ins = post_ins;                                                                                        // 974
        pre_del = post_del;                                                                                        // 975
        lastequality = diffs[pointer][1];                                                                          // 976
      } else {                                                                                                     // 977
        // Not a candidate, and can never become one.                                                              // 978
        equalitiesLength = 0;                                                                                      // 979
        lastequality = '';                                                                                         // 980
      }                                                                                                            // 981
      post_ins = post_del = false;                                                                                 // 982
    } else {  // An insertion or deletion.                                                                         // 983
      if (diffs[pointer][0] == DIFF_DELETE) {                                                                      // 984
        post_del = true;                                                                                           // 985
      } else {                                                                                                     // 986
        post_ins = true;                                                                                           // 987
      }                                                                                                            // 988
      /*                                                                                                           // 989
       * Five types to be split:                                                                                   // 990
       * <ins>A</ins><del>B</del>XY<ins>C</ins><del>D</del>                                                        // 991
       * <ins>A</ins>X<ins>C</ins><del>D</del>                                                                     // 992
       * <ins>A</ins><del>B</del>X<ins>C</ins>                                                                     // 993
       * <ins>A</del>X<ins>C</ins><del>D</del>                                                                     // 994
       * <ins>A</ins><del>B</del>X<del>C</del>                                                                     // 995
       */                                                                                                          // 996
      if (lastequality && ((pre_ins && pre_del && post_ins && post_del) ||                                         // 997
                           ((lastequality.length < this.Diff_EditCost / 2) &&                                      // 998
                            (pre_ins + pre_del + post_ins + post_del) == 3))) {                                    // 999
        // Duplicate record.                                                                                       // 1000
        diffs.splice(equalities[equalitiesLength - 1], 0,                                                          // 1001
                     [DIFF_DELETE, lastequality]);                                                                 // 1002
        // Change second copy to insert.                                                                           // 1003
        diffs[equalities[equalitiesLength - 1] + 1][0] = DIFF_INSERT;                                              // 1004
        equalitiesLength--;  // Throw away the equality we just deleted;                                           // 1005
        lastequality = '';                                                                                         // 1006
        if (pre_ins && pre_del) {                                                                                  // 1007
          // No changes made which could affect previous entry, keep going.                                        // 1008
          post_ins = post_del = true;                                                                              // 1009
          equalitiesLength = 0;                                                                                    // 1010
        } else {                                                                                                   // 1011
          equalitiesLength--;  // Throw away the previous equality.                                                // 1012
          pointer = equalitiesLength > 0 ?                                                                         // 1013
              equalities[equalitiesLength - 1] : -1;                                                               // 1014
          post_ins = post_del = false;                                                                             // 1015
        }                                                                                                          // 1016
        changes = true;                                                                                            // 1017
      }                                                                                                            // 1018
    }                                                                                                              // 1019
    pointer++;                                                                                                     // 1020
  }                                                                                                                // 1021
                                                                                                                   // 1022
  if (changes) {                                                                                                   // 1023
    this.diff_cleanupMerge(diffs);                                                                                 // 1024
  }                                                                                                                // 1025
};                                                                                                                 // 1026
                                                                                                                   // 1027
                                                                                                                   // 1028
/**                                                                                                                // 1029
 * Reorder and merge like edit sections.  Merge equalities.                                                        // 1030
 * Any edit section can move as long as it doesn't cross an equality.                                              // 1031
 * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.                                            // 1032
 */                                                                                                                // 1033
diff_match_patch.prototype.diff_cleanupMerge = function(diffs) {                                                   // 1034
  diffs.push([DIFF_EQUAL, '']);  // Add a dummy entry at the end.                                                  // 1035
  var pointer = 0;                                                                                                 // 1036
  var count_delete = 0;                                                                                            // 1037
  var count_insert = 0;                                                                                            // 1038
  var text_delete = '';                                                                                            // 1039
  var text_insert = '';                                                                                            // 1040
  var commonlength;                                                                                                // 1041
  while (pointer < diffs.length) {                                                                                 // 1042
    switch (diffs[pointer][0]) {                                                                                   // 1043
      case DIFF_INSERT:                                                                                            // 1044
        count_insert++;                                                                                            // 1045
        text_insert += diffs[pointer][1];                                                                          // 1046
        pointer++;                                                                                                 // 1047
        break;                                                                                                     // 1048
      case DIFF_DELETE:                                                                                            // 1049
        count_delete++;                                                                                            // 1050
        text_delete += diffs[pointer][1];                                                                          // 1051
        pointer++;                                                                                                 // 1052
        break;                                                                                                     // 1053
      case DIFF_EQUAL:                                                                                             // 1054
        // Upon reaching an equality, check for prior redundancies.                                                // 1055
        if (count_delete + count_insert > 1) {                                                                     // 1056
          if (count_delete !== 0 && count_insert !== 0) {                                                          // 1057
            // Factor out any common prefixies.                                                                    // 1058
            commonlength = this.diff_commonPrefix(text_insert, text_delete);                                       // 1059
            if (commonlength !== 0) {                                                                              // 1060
              if ((pointer - count_delete - count_insert) > 0 &&                                                   // 1061
                  diffs[pointer - count_delete - count_insert - 1][0] ==                                           // 1062
                  DIFF_EQUAL) {                                                                                    // 1063
                diffs[pointer - count_delete - count_insert - 1][1] +=                                             // 1064
                    text_insert.substring(0, commonlength);                                                        // 1065
              } else {                                                                                             // 1066
                diffs.splice(0, 0, [DIFF_EQUAL,                                                                    // 1067
                                    text_insert.substring(0, commonlength)]);                                      // 1068
                pointer++;                                                                                         // 1069
              }                                                                                                    // 1070
              text_insert = text_insert.substring(commonlength);                                                   // 1071
              text_delete = text_delete.substring(commonlength);                                                   // 1072
            }                                                                                                      // 1073
            // Factor out any common suffixies.                                                                    // 1074
            commonlength = this.diff_commonSuffix(text_insert, text_delete);                                       // 1075
            if (commonlength !== 0) {                                                                              // 1076
              diffs[pointer][1] = text_insert.substring(text_insert.length -                                       // 1077
                  commonlength) + diffs[pointer][1];                                                               // 1078
              text_insert = text_insert.substring(0, text_insert.length -                                          // 1079
                  commonlength);                                                                                   // 1080
              text_delete = text_delete.substring(0, text_delete.length -                                          // 1081
                  commonlength);                                                                                   // 1082
            }                                                                                                      // 1083
          }                                                                                                        // 1084
          // Delete the offending records and add the merged ones.                                                 // 1085
          if (count_delete === 0) {                                                                                // 1086
            diffs.splice(pointer - count_delete - count_insert,                                                    // 1087
                count_delete + count_insert, [DIFF_INSERT, text_insert]);                                          // 1088
          } else if (count_insert === 0) {                                                                         // 1089
            diffs.splice(pointer - count_delete - count_insert,                                                    // 1090
                count_delete + count_insert, [DIFF_DELETE, text_delete]);                                          // 1091
          } else {                                                                                                 // 1092
            diffs.splice(pointer - count_delete - count_insert,                                                    // 1093
                count_delete + count_insert, [DIFF_DELETE, text_delete],                                           // 1094
                [DIFF_INSERT, text_insert]);                                                                       // 1095
          }                                                                                                        // 1096
          pointer = pointer - count_delete - count_insert +                                                        // 1097
                    (count_delete ? 1 : 0) + (count_insert ? 1 : 0) + 1;                                           // 1098
        } else if (pointer !== 0 && diffs[pointer - 1][0] == DIFF_EQUAL) {                                         // 1099
          // Merge this equality with the previous one.                                                            // 1100
          diffs[pointer - 1][1] += diffs[pointer][1];                                                              // 1101
          diffs.splice(pointer, 1);                                                                                // 1102
        } else {                                                                                                   // 1103
          pointer++;                                                                                               // 1104
        }                                                                                                          // 1105
        count_insert = 0;                                                                                          // 1106
        count_delete = 0;                                                                                          // 1107
        text_delete = '';                                                                                          // 1108
        text_insert = '';                                                                                          // 1109
        break;                                                                                                     // 1110
    }                                                                                                              // 1111
  }                                                                                                                // 1112
  if (diffs[diffs.length - 1][1] === '') {                                                                         // 1113
    diffs.pop();  // Remove the dummy entry at the end.                                                            // 1114
  }                                                                                                                // 1115
                                                                                                                   // 1116
  // Second pass: look for single edits surrounded on both sides by equalities                                     // 1117
  // which can be shifted sideways to eliminate an equality.                                                       // 1118
  // e.g: A<ins>BA</ins>C -> <ins>AB</ins>AC                                                                       // 1119
  var changes = false;                                                                                             // 1120
  pointer = 1;                                                                                                     // 1121
  // Intentionally ignore the first and last element (don't need checking).                                        // 1122
  while (pointer < diffs.length - 1) {                                                                             // 1123
    if (diffs[pointer - 1][0] == DIFF_EQUAL &&                                                                     // 1124
        diffs[pointer + 1][0] == DIFF_EQUAL) {                                                                     // 1125
      // This is a single edit surrounded by equalities.                                                           // 1126
      if (diffs[pointer][1].substring(diffs[pointer][1].length -                                                   // 1127
          diffs[pointer - 1][1].length) == diffs[pointer - 1][1]) {                                                // 1128
        // Shift the edit over the previous equality.                                                              // 1129
        diffs[pointer][1] = diffs[pointer - 1][1] +                                                                // 1130
            diffs[pointer][1].substring(0, diffs[pointer][1].length -                                              // 1131
                                        diffs[pointer - 1][1].length);                                             // 1132
        diffs[pointer + 1][1] = diffs[pointer - 1][1] + diffs[pointer + 1][1];                                     // 1133
        diffs.splice(pointer - 1, 1);                                                                              // 1134
        changes = true;                                                                                            // 1135
      } else if (diffs[pointer][1].substring(0, diffs[pointer + 1][1].length) ==                                   // 1136
          diffs[pointer + 1][1]) {                                                                                 // 1137
        // Shift the edit over the next equality.                                                                  // 1138
        diffs[pointer - 1][1] += diffs[pointer + 1][1];                                                            // 1139
        diffs[pointer][1] =                                                                                        // 1140
            diffs[pointer][1].substring(diffs[pointer + 1][1].length) +                                            // 1141
            diffs[pointer + 1][1];                                                                                 // 1142
        diffs.splice(pointer + 1, 1);                                                                              // 1143
        changes = true;                                                                                            // 1144
      }                                                                                                            // 1145
    }                                                                                                              // 1146
    pointer++;                                                                                                     // 1147
  }                                                                                                                // 1148
  // If shifts were made, the diff needs reordering and another shift sweep.                                       // 1149
  if (changes) {                                                                                                   // 1150
    this.diff_cleanupMerge(diffs);                                                                                 // 1151
  }                                                                                                                // 1152
};                                                                                                                 // 1153
                                                                                                                   // 1154
                                                                                                                   // 1155
/**                                                                                                                // 1156
 * loc is a location in text1, compute and return the equivalent location in                                       // 1157
 * text2.                                                                                                          // 1158
 * e.g. 'The cat' vs 'The big cat', 1->1, 5->8                                                                     // 1159
 * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.                                            // 1160
 * @param {number} loc Location within text1.                                                                      // 1161
 * @return {number} Location within text2.                                                                         // 1162
 */                                                                                                                // 1163
diff_match_patch.prototype.diff_xIndex = function(diffs, loc) {                                                    // 1164
  var chars1 = 0;                                                                                                  // 1165
  var chars2 = 0;                                                                                                  // 1166
  var last_chars1 = 0;                                                                                             // 1167
  var last_chars2 = 0;                                                                                             // 1168
  var x;                                                                                                           // 1169
  for (x = 0; x < diffs.length; x++) {                                                                             // 1170
    if (diffs[x][0] !== DIFF_INSERT) {  // Equality or deletion.                                                   // 1171
      chars1 += diffs[x][1].length;                                                                                // 1172
    }                                                                                                              // 1173
    if (diffs[x][0] !== DIFF_DELETE) {  // Equality or insertion.                                                  // 1174
      chars2 += diffs[x][1].length;                                                                                // 1175
    }                                                                                                              // 1176
    if (chars1 > loc) {  // Overshot the location.                                                                 // 1177
      break;                                                                                                       // 1178
    }                                                                                                              // 1179
    last_chars1 = chars1;                                                                                          // 1180
    last_chars2 = chars2;                                                                                          // 1181
  }                                                                                                                // 1182
  // Was the location was deleted?                                                                                 // 1183
  if (diffs.length != x && diffs[x][0] === DIFF_DELETE) {                                                          // 1184
    return last_chars2;                                                                                            // 1185
  }                                                                                                                // 1186
  // Add the remaining character length.                                                                           // 1187
  return last_chars2 + (loc - last_chars1);                                                                        // 1188
};                                                                                                                 // 1189
                                                                                                                   // 1190
                                                                                                                   // 1191
/**                                                                                                                // 1192
 * Convert a diff array into a pretty HTML report.                                                                 // 1193
 * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.                                            // 1194
 * @return {string} HTML representation.                                                                           // 1195
 */                                                                                                                // 1196
diff_match_patch.prototype.diff_prettyHtml = function(diffs) {                                                     // 1197
  var html = [];                                                                                                   // 1198
  var i = 0;                                                                                                       // 1199
  var pattern_amp = /&/g;                                                                                          // 1200
  var pattern_lt = /</g;                                                                                           // 1201
  var pattern_gt = />/g;                                                                                           // 1202
  var pattern_para = /\n/g;                                                                                        // 1203
  for (var x = 0; x < diffs.length; x++) {                                                                         // 1204
    var op = diffs[x][0];    // Operation (insert, delete, equal)                                                  // 1205
    var data = diffs[x][1];  // Text of change.                                                                    // 1206
    var text = data.replace(pattern_amp, '&amp;').replace(pattern_lt, '&lt;')                                      // 1207
        .replace(pattern_gt, '&gt;').replace(pattern_para, '&para;<br>');                                          // 1208
    switch (op) {                                                                                                  // 1209
      case DIFF_INSERT:                                                                                            // 1210
        html[x] = '<ins style="background:#e6ffe6;">' + text + '</ins>';                                           // 1211
        break;                                                                                                     // 1212
      case DIFF_DELETE:                                                                                            // 1213
        html[x] = '<del style="background:#ffe6e6;">' + text + '</del>';                                           // 1214
        break;                                                                                                     // 1215
      case DIFF_EQUAL:                                                                                             // 1216
        html[x] = '<span>' + text + '</span>';                                                                     // 1217
        break;                                                                                                     // 1218
    }                                                                                                              // 1219
    if (op !== DIFF_DELETE) {                                                                                      // 1220
      i += data.length;                                                                                            // 1221
    }                                                                                                              // 1222
  }                                                                                                                // 1223
  return html.join('');                                                                                            // 1224
};                                                                                                                 // 1225
                                                                                                                   // 1226
                                                                                                                   // 1227
/**                                                                                                                // 1228
 * Compute and return the source text (all equalities and deletions).                                              // 1229
 * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.                                            // 1230
 * @return {string} Source text.                                                                                   // 1231
 */                                                                                                                // 1232
diff_match_patch.prototype.diff_text1 = function(diffs) {                                                          // 1233
  var text = [];                                                                                                   // 1234
  for (var x = 0; x < diffs.length; x++) {                                                                         // 1235
    if (diffs[x][0] !== DIFF_INSERT) {                                                                             // 1236
      text[x] = diffs[x][1];                                                                                       // 1237
    }                                                                                                              // 1238
  }                                                                                                                // 1239
  return text.join('');                                                                                            // 1240
};                                                                                                                 // 1241
                                                                                                                   // 1242
                                                                                                                   // 1243
/**                                                                                                                // 1244
 * Compute and return the destination text (all equalities and insertions).                                        // 1245
 * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.                                            // 1246
 * @return {string} Destination text.                                                                              // 1247
 */                                                                                                                // 1248
diff_match_patch.prototype.diff_text2 = function(diffs) {                                                          // 1249
  var text = [];                                                                                                   // 1250
  for (var x = 0; x < diffs.length; x++) {                                                                         // 1251
    if (diffs[x][0] !== DIFF_DELETE) {                                                                             // 1252
      text[x] = diffs[x][1];                                                                                       // 1253
    }                                                                                                              // 1254
  }                                                                                                                // 1255
  return text.join('');                                                                                            // 1256
};                                                                                                                 // 1257
                                                                                                                   // 1258
                                                                                                                   // 1259
/**                                                                                                                // 1260
 * Compute the Levenshtein distance; the number of inserted, deleted or                                            // 1261
 * substituted characters.                                                                                         // 1262
 * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.                                            // 1263
 * @return {number} Number of changes.                                                                             // 1264
 */                                                                                                                // 1265
diff_match_patch.prototype.diff_levenshtein = function(diffs) {                                                    // 1266
  var levenshtein = 0;                                                                                             // 1267
  var insertions = 0;                                                                                              // 1268
  var deletions = 0;                                                                                               // 1269
  for (var x = 0; x < diffs.length; x++) {                                                                         // 1270
    var op = diffs[x][0];                                                                                          // 1271
    var data = diffs[x][1];                                                                                        // 1272
    switch (op) {                                                                                                  // 1273
      case DIFF_INSERT:                                                                                            // 1274
        insertions += data.length;                                                                                 // 1275
        break;                                                                                                     // 1276
      case DIFF_DELETE:                                                                                            // 1277
        deletions += data.length;                                                                                  // 1278
        break;                                                                                                     // 1279
      case DIFF_EQUAL:                                                                                             // 1280
        // A deletion and an insertion is one substitution.                                                        // 1281
        levenshtein += Math.max(insertions, deletions);                                                            // 1282
        insertions = 0;                                                                                            // 1283
        deletions = 0;                                                                                             // 1284
        break;                                                                                                     // 1285
    }                                                                                                              // 1286
  }                                                                                                                // 1287
  levenshtein += Math.max(insertions, deletions);                                                                  // 1288
  return levenshtein;                                                                                              // 1289
};                                                                                                                 // 1290
                                                                                                                   // 1291
                                                                                                                   // 1292
/**                                                                                                                // 1293
 * Crush the diff into an encoded string which describes the operations                                            // 1294
 * required to transform text1 into text2.                                                                         // 1295
 * E.g. =3\t-2\t+ing  -> Keep 3 chars, delete 2 chars, insert 'ing'.                                               // 1296
 * Operations are tab-separated.  Inserted text is escaped using %xx notation.                                     // 1297
 * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.                                            // 1298
 * @return {string} Delta text.                                                                                    // 1299
 */                                                                                                                // 1300
diff_match_patch.prototype.diff_toDelta = function(diffs) {                                                        // 1301
  var text = [];                                                                                                   // 1302
  for (var x = 0; x < diffs.length; x++) {                                                                         // 1303
    switch (diffs[x][0]) {                                                                                         // 1304
      case DIFF_INSERT:                                                                                            // 1305
        text[x] = '+' + encodeURI(diffs[x][1]);                                                                    // 1306
        break;                                                                                                     // 1307
      case DIFF_DELETE:                                                                                            // 1308
        text[x] = '-' + diffs[x][1].length;                                                                        // 1309
        break;                                                                                                     // 1310
      case DIFF_EQUAL:                                                                                             // 1311
        text[x] = '=' + diffs[x][1].length;                                                                        // 1312
        break;                                                                                                     // 1313
    }                                                                                                              // 1314
  }                                                                                                                // 1315
  return text.join('\t').replace(/%20/g, ' ');                                                                     // 1316
};                                                                                                                 // 1317
                                                                                                                   // 1318
                                                                                                                   // 1319
/**                                                                                                                // 1320
 * Given the original text1, and an encoded string which describes the                                             // 1321
 * operations required to transform text1 into text2, compute the full diff.                                       // 1322
 * @param {string} text1 Source string for the diff.                                                               // 1323
 * @param {string} delta Delta text.                                                                               // 1324
 * @return {!Array.<!diff_match_patch.Diff>} Array of diff tuples.                                                 // 1325
 * @throws {!Error} If invalid input.                                                                              // 1326
 */                                                                                                                // 1327
diff_match_patch.prototype.diff_fromDelta = function(text1, delta) {                                               // 1328
  var diffs = [];                                                                                                  // 1329
  var diffsLength = 0;  // Keeping our own length var is faster in JS.                                             // 1330
  var pointer = 0;  // Cursor in text1                                                                             // 1331
  var tokens = delta.split(/\t/g);                                                                                 // 1332
  for (var x = 0; x < tokens.length; x++) {                                                                        // 1333
    // Each token begins with a one character parameter which specifies the                                        // 1334
    // operation of this token (delete, insert, equality).                                                         // 1335
    var param = tokens[x].substring(1);                                                                            // 1336
    switch (tokens[x].charAt(0)) {                                                                                 // 1337
      case '+':                                                                                                    // 1338
        try {                                                                                                      // 1339
          diffs[diffsLength++] = [DIFF_INSERT, decodeURI(param)];                                                  // 1340
        } catch (ex) {                                                                                             // 1341
          // Malformed URI sequence.                                                                               // 1342
          throw new Error('Illegal escape in diff_fromDelta: ' + param);                                           // 1343
        }                                                                                                          // 1344
        break;                                                                                                     // 1345
      case '-':                                                                                                    // 1346
        // Fall through.                                                                                           // 1347
      case '=':                                                                                                    // 1348
        var n = parseInt(param, 10);                                                                               // 1349
        if (isNaN(n) || n < 0) {                                                                                   // 1350
          throw new Error('Invalid number in diff_fromDelta: ' + param);                                           // 1351
        }                                                                                                          // 1352
        var text = text1.substring(pointer, pointer += n);                                                         // 1353
        if (tokens[x].charAt(0) == '=') {                                                                          // 1354
          diffs[diffsLength++] = [DIFF_EQUAL, text];                                                               // 1355
        } else {                                                                                                   // 1356
          diffs[diffsLength++] = [DIFF_DELETE, text];                                                              // 1357
        }                                                                                                          // 1358
        break;                                                                                                     // 1359
      default:                                                                                                     // 1360
        // Blank tokens are ok (from a trailing \t).                                                               // 1361
        // Anything else is an error.                                                                              // 1362
        if (tokens[x]) {                                                                                           // 1363
          throw new Error('Invalid diff operation in diff_fromDelta: ' +                                           // 1364
                          tokens[x]);                                                                              // 1365
        }                                                                                                          // 1366
    }                                                                                                              // 1367
  }                                                                                                                // 1368
  if (pointer != text1.length) {                                                                                   // 1369
    throw new Error('Delta length (' + pointer +                                                                   // 1370
        ') does not equal source text length (' + text1.length + ').');                                            // 1371
  }                                                                                                                // 1372
  return diffs;                                                                                                    // 1373
};                                                                                                                 // 1374
                                                                                                                   // 1375
                                                                                                                   // 1376
//  MATCH FUNCTIONS                                                                                                // 1377
                                                                                                                   // 1378
                                                                                                                   // 1379
/**                                                                                                                // 1380
 * Locate the best instance of 'pattern' in 'text' near 'loc'.                                                     // 1381
 * @param {string} text The text to search.                                                                        // 1382
 * @param {string} pattern The pattern to search for.                                                              // 1383
 * @param {number} loc The location to search around.                                                              // 1384
 * @return {number} Best match index or -1.                                                                        // 1385
 */                                                                                                                // 1386
diff_match_patch.prototype.match_main = function(text, pattern, loc) {                                             // 1387
  // Check for null inputs.                                                                                        // 1388
  if (text == null || pattern == null || loc == null) {                                                            // 1389
    throw new Error('Null input. (match_main)');                                                                   // 1390
  }                                                                                                                // 1391
                                                                                                                   // 1392
  loc = Math.max(0, Math.min(loc, text.length));                                                                   // 1393
  if (text == pattern) {                                                                                           // 1394
    // Shortcut (potentially not guaranteed by the algorithm)                                                      // 1395
    return 0;                                                                                                      // 1396
  } else if (!text.length) {                                                                                       // 1397
    // Nothing to match.                                                                                           // 1398
    return -1;                                                                                                     // 1399
  } else if (text.substring(loc, loc + pattern.length) == pattern) {                                               // 1400
    // Perfect match at the perfect spot!  (Includes case of null pattern)                                         // 1401
    return loc;                                                                                                    // 1402
  } else {                                                                                                         // 1403
    // Do a fuzzy compare.                                                                                         // 1404
    return this.match_bitap_(text, pattern, loc);                                                                  // 1405
  }                                                                                                                // 1406
};                                                                                                                 // 1407
                                                                                                                   // 1408
                                                                                                                   // 1409
/**                                                                                                                // 1410
 * Locate the best instance of 'pattern' in 'text' near 'loc' using the                                            // 1411
 * Bitap algorithm.                                                                                                // 1412
 * @param {string} text The text to search.                                                                        // 1413
 * @param {string} pattern The pattern to search for.                                                              // 1414
 * @param {number} loc The location to search around.                                                              // 1415
 * @return {number} Best match index or -1.                                                                        // 1416
 * @private                                                                                                        // 1417
 */                                                                                                                // 1418
diff_match_patch.prototype.match_bitap_ = function(text, pattern, loc) {                                           // 1419
  if (pattern.length > this.Match_MaxBits) {                                                                       // 1420
    throw new Error('Pattern too long for this browser.');                                                         // 1421
  }                                                                                                                // 1422
                                                                                                                   // 1423
  // Initialise the alphabet.                                                                                      // 1424
  var s = this.match_alphabet_(pattern);                                                                           // 1425
                                                                                                                   // 1426
  var dmp = this;  // 'this' becomes 'window' in a closure.                                                        // 1427
                                                                                                                   // 1428
  /**                                                                                                              // 1429
   * Compute and return the score for a match with e errors and x location.                                        // 1430
   * Accesses loc and pattern through being a closure.                                                             // 1431
   * @param {number} e Number of errors in match.                                                                  // 1432
   * @param {number} x Location of match.                                                                          // 1433
   * @return {number} Overall score for match (0.0 = good, 1.0 = bad).                                             // 1434
   * @private                                                                                                      // 1435
   */                                                                                                              // 1436
  function match_bitapScore_(e, x) {                                                                               // 1437
    var accuracy = e / pattern.length;                                                                             // 1438
    var proximity = Math.abs(loc - x);                                                                             // 1439
    if (!dmp.Match_Distance) {                                                                                     // 1440
      // Dodge divide by zero error.                                                                               // 1441
      return proximity ? 1.0 : accuracy;                                                                           // 1442
    }                                                                                                              // 1443
    return accuracy + (proximity / dmp.Match_Distance);                                                            // 1444
  }                                                                                                                // 1445
                                                                                                                   // 1446
  // Highest score beyond which we give up.                                                                        // 1447
  var score_threshold = this.Match_Threshold;                                                                      // 1448
  // Is there a nearby exact match? (speedup)                                                                      // 1449
  var best_loc = text.indexOf(pattern, loc);                                                                       // 1450
  if (best_loc != -1) {                                                                                            // 1451
    score_threshold = Math.min(match_bitapScore_(0, best_loc), score_threshold);                                   // 1452
    // What about in the other direction? (speedup)                                                                // 1453
    best_loc = text.lastIndexOf(pattern, loc + pattern.length);                                                    // 1454
    if (best_loc != -1) {                                                                                          // 1455
      score_threshold =                                                                                            // 1456
          Math.min(match_bitapScore_(0, best_loc), score_threshold);                                               // 1457
    }                                                                                                              // 1458
  }                                                                                                                // 1459
                                                                                                                   // 1460
  // Initialise the bit arrays.                                                                                    // 1461
  var matchmask = 1 << (pattern.length - 1);                                                                       // 1462
  best_loc = -1;                                                                                                   // 1463
                                                                                                                   // 1464
  var bin_min, bin_mid;                                                                                            // 1465
  var bin_max = pattern.length + text.length;                                                                      // 1466
  var last_rd;                                                                                                     // 1467
  for (var d = 0; d < pattern.length; d++) {                                                                       // 1468
    // Scan for the best match; each iteration allows for one more error.                                          // 1469
    // Run a binary search to determine how far from 'loc' we can stray at this                                    // 1470
    // error level.                                                                                                // 1471
    bin_min = 0;                                                                                                   // 1472
    bin_mid = bin_max;                                                                                             // 1473
    while (bin_min < bin_mid) {                                                                                    // 1474
      if (match_bitapScore_(d, loc + bin_mid) <= score_threshold) {                                                // 1475
        bin_min = bin_mid;                                                                                         // 1476
      } else {                                                                                                     // 1477
        bin_max = bin_mid;                                                                                         // 1478
      }                                                                                                            // 1479
      bin_mid = Math.floor((bin_max - bin_min) / 2 + bin_min);                                                     // 1480
    }                                                                                                              // 1481
    // Use the result from this iteration as the maximum for the next.                                             // 1482
    bin_max = bin_mid;                                                                                             // 1483
    var start = Math.max(1, loc - bin_mid + 1);                                                                    // 1484
    var finish = Math.min(loc + bin_mid, text.length) + pattern.length;                                            // 1485
                                                                                                                   // 1486
    var rd = Array(finish + 2);                                                                                    // 1487
    rd[finish + 1] = (1 << d) - 1;                                                                                 // 1488
    for (var j = finish; j >= start; j--) {                                                                        // 1489
      // The alphabet (s) is a sparse hash, so the following line generates                                        // 1490
      // warnings.                                                                                                 // 1491
      var charMatch = s[text.charAt(j - 1)];                                                                       // 1492
      if (d === 0) {  // First pass: exact match.                                                                  // 1493
        rd[j] = ((rd[j + 1] << 1) | 1) & charMatch;                                                                // 1494
      } else {  // Subsequent passes: fuzzy match.                                                                 // 1495
        rd[j] = ((rd[j + 1] << 1) | 1) & charMatch |                                                               // 1496
                (((last_rd[j + 1] | last_rd[j]) << 1) | 1) |                                                       // 1497
                last_rd[j + 1];                                                                                    // 1498
      }                                                                                                            // 1499
      if (rd[j] & matchmask) {                                                                                     // 1500
        var score = match_bitapScore_(d, j - 1);                                                                   // 1501
        // This match will almost certainly be better than any existing match.                                     // 1502
        // But check anyway.                                                                                       // 1503
        if (score <= score_threshold) {                                                                            // 1504
          // Told you so.                                                                                          // 1505
          score_threshold = score;                                                                                 // 1506
          best_loc = j - 1;                                                                                        // 1507
          if (best_loc > loc) {                                                                                    // 1508
            // When passing loc, don't exceed our current distance from loc.                                       // 1509
            start = Math.max(1, 2 * loc - best_loc);                                                               // 1510
          } else {                                                                                                 // 1511
            // Already passed loc, downhill from here on in.                                                       // 1512
            break;                                                                                                 // 1513
          }                                                                                                        // 1514
        }                                                                                                          // 1515
      }                                                                                                            // 1516
    }                                                                                                              // 1517
    // No hope for a (better) match at greater error levels.                                                       // 1518
    if (match_bitapScore_(d + 1, loc) > score_threshold) {                                                         // 1519
      break;                                                                                                       // 1520
    }                                                                                                              // 1521
    last_rd = rd;                                                                                                  // 1522
  }                                                                                                                // 1523
  return best_loc;                                                                                                 // 1524
};                                                                                                                 // 1525
                                                                                                                   // 1526
                                                                                                                   // 1527
/**                                                                                                                // 1528
 * Initialise the alphabet for the Bitap algorithm.                                                                // 1529
 * @param {string} pattern The text to encode.                                                                     // 1530
 * @return {!Object} Hash of character locations.                                                                  // 1531
 * @private                                                                                                        // 1532
 */                                                                                                                // 1533
diff_match_patch.prototype.match_alphabet_ = function(pattern) {                                                   // 1534
  var s = {};                                                                                                      // 1535
  for (var i = 0; i < pattern.length; i++) {                                                                       // 1536
    s[pattern.charAt(i)] = 0;                                                                                      // 1537
  }                                                                                                                // 1538
  for (var i = 0; i < pattern.length; i++) {                                                                       // 1539
    s[pattern.charAt(i)] |= 1 << (pattern.length - i - 1);                                                         // 1540
  }                                                                                                                // 1541
  return s;                                                                                                        // 1542
};                                                                                                                 // 1543
                                                                                                                   // 1544
                                                                                                                   // 1545
//  PATCH FUNCTIONS                                                                                                // 1546
                                                                                                                   // 1547
                                                                                                                   // 1548
/**                                                                                                                // 1549
 * Increase the context until it is unique,                                                                        // 1550
 * but don't let the pattern expand beyond Match_MaxBits.                                                          // 1551
 * @param {!diff_match_patch.patch_obj} patch The patch to grow.                                                   // 1552
 * @param {string} text Source text.                                                                               // 1553
 * @private                                                                                                        // 1554
 */                                                                                                                // 1555
diff_match_patch.prototype.patch_addContext_ = function(patch, text) {                                             // 1556
  if (text.length == 0) {                                                                                          // 1557
    return;                                                                                                        // 1558
  }                                                                                                                // 1559
  var pattern = text.substring(patch.start2, patch.start2 + patch.length1);                                        // 1560
  var padding = 0;                                                                                                 // 1561
                                                                                                                   // 1562
  // Look for the first and last matches of pattern in text.  If two different                                     // 1563
  // matches are found, increase the pattern length.                                                               // 1564
  while (text.indexOf(pattern) != text.lastIndexOf(pattern) &&                                                     // 1565
         pattern.length < this.Match_MaxBits - this.Patch_Margin -                                                 // 1566
         this.Patch_Margin) {                                                                                      // 1567
    padding += this.Patch_Margin;                                                                                  // 1568
    pattern = text.substring(patch.start2 - padding,                                                               // 1569
                             patch.start2 + patch.length1 + padding);                                              // 1570
  }                                                                                                                // 1571
  // Add one chunk for good luck.                                                                                  // 1572
  padding += this.Patch_Margin;                                                                                    // 1573
                                                                                                                   // 1574
  // Add the prefix.                                                                                               // 1575
  var prefix = text.substring(patch.start2 - padding, patch.start2);                                               // 1576
  if (prefix) {                                                                                                    // 1577
    patch.diffs.unshift([DIFF_EQUAL, prefix]);                                                                     // 1578
  }                                                                                                                // 1579
  // Add the suffix.                                                                                               // 1580
  var suffix = text.substring(patch.start2 + patch.length1,                                                        // 1581
                              patch.start2 + patch.length1 + padding);                                             // 1582
  if (suffix) {                                                                                                    // 1583
    patch.diffs.push([DIFF_EQUAL, suffix]);                                                                        // 1584
  }                                                                                                                // 1585
                                                                                                                   // 1586
  // Roll back the start points.                                                                                   // 1587
  patch.start1 -= prefix.length;                                                                                   // 1588
  patch.start2 -= prefix.length;                                                                                   // 1589
  // Extend the lengths.                                                                                           // 1590
  patch.length1 += prefix.length + suffix.length;                                                                  // 1591
  patch.length2 += prefix.length + suffix.length;                                                                  // 1592
};                                                                                                                 // 1593
                                                                                                                   // 1594
                                                                                                                   // 1595
/**                                                                                                                // 1596
 * Compute a list of patches to turn text1 into text2.                                                             // 1597
 * Use diffs if provided, otherwise compute it ourselves.                                                          // 1598
 * There are four ways to call this function, depending on what data is                                            // 1599
 * available to the caller:                                                                                        // 1600
 * Method 1:                                                                                                       // 1601
 * a = text1, b = text2                                                                                            // 1602
 * Method 2:                                                                                                       // 1603
 * a = diffs                                                                                                       // 1604
 * Method 3 (optimal):                                                                                             // 1605
 * a = text1, b = diffs                                                                                            // 1606
 * Method 4 (deprecated, use method 3):                                                                            // 1607
 * a = text1, b = text2, c = diffs                                                                                 // 1608
 *                                                                                                                 // 1609
 * @param {string|!Array.<!diff_match_patch.Diff>} a text1 (methods 1,3,4) or                                      // 1610
 * Array of diff tuples for text1 to text2 (method 2).                                                             // 1611
 * @param {string|!Array.<!diff_match_patch.Diff>} opt_b text2 (methods 1,4) or                                    // 1612
 * Array of diff tuples for text1 to text2 (method 3) or undefined (method 2).                                     // 1613
 * @param {string|!Array.<!diff_match_patch.Diff>} opt_c Array of diff tuples                                      // 1614
 * for text1 to text2 (method 4) or undefined (methods 1,2,3).                                                     // 1615
 * @return {!Array.<!diff_match_patch.patch_obj>} Array of patch objects.                                          // 1616
 */                                                                                                                // 1617
diff_match_patch.prototype.patch_make = function(a, opt_b, opt_c) {                                                // 1618
  var text1, diffs;                                                                                                // 1619
  if (typeof a == 'string' && typeof opt_b == 'string' &&                                                          // 1620
      typeof opt_c == 'undefined') {                                                                               // 1621
    // Method 1: text1, text2                                                                                      // 1622
    // Compute diffs from text1 and text2.                                                                         // 1623
    text1 = /** @type {string} */(a);                                                                              // 1624
    diffs = this.diff_main(text1, /** @type {string} */(opt_b), true);                                             // 1625
    if (diffs.length > 2) {                                                                                        // 1626
      this.diff_cleanupSemantic(diffs);                                                                            // 1627
      this.diff_cleanupEfficiency(diffs);                                                                          // 1628
    }                                                                                                              // 1629
  } else if (a && typeof a == 'object' && typeof opt_b == 'undefined' &&                                           // 1630
      typeof opt_c == 'undefined') {                                                                               // 1631
    // Method 2: diffs                                                                                             // 1632
    // Compute text1 from diffs.                                                                                   // 1633
    diffs = /** @type {!Array.<!diff_match_patch.Diff>} */(a);                                                     // 1634
    text1 = this.diff_text1(diffs);                                                                                // 1635
  } else if (typeof a == 'string' && opt_b && typeof opt_b == 'object' &&                                          // 1636
      typeof opt_c == 'undefined') {                                                                               // 1637
    // Method 3: text1, diffs                                                                                      // 1638
    text1 = /** @type {string} */(a);                                                                              // 1639
    diffs = /** @type {!Array.<!diff_match_patch.Diff>} */(opt_b);                                                 // 1640
  } else if (typeof a == 'string' && typeof opt_b == 'string' &&                                                   // 1641
      opt_c && typeof opt_c == 'object') {                                                                         // 1642
    // Method 4: text1, text2, diffs                                                                               // 1643
    // text2 is not used.                                                                                          // 1644
    text1 = /** @type {string} */(a);                                                                              // 1645
    diffs = /** @type {!Array.<!diff_match_patch.Diff>} */(opt_c);                                                 // 1646
  } else {                                                                                                         // 1647
    throw new Error('Unknown call format to patch_make.');                                                         // 1648
  }                                                                                                                // 1649
                                                                                                                   // 1650
  if (diffs.length === 0) {                                                                                        // 1651
    return [];  // Get rid of the null case.                                                                       // 1652
  }                                                                                                                // 1653
  var patches = [];                                                                                                // 1654
  var patch = new diff_match_patch.patch_obj();                                                                    // 1655
  var patchDiffLength = 0;  // Keeping our own length var is faster in JS.                                         // 1656
  var char_count1 = 0;  // Number of characters into the text1 string.                                             // 1657
  var char_count2 = 0;  // Number of characters into the text2 string.                                             // 1658
  // Start with text1 (prepatch_text) and apply the diffs until we arrive at                                       // 1659
  // text2 (postpatch_text).  We recreate the patches one by one to determine                                      // 1660
  // context info.                                                                                                 // 1661
  var prepatch_text = text1;                                                                                       // 1662
  var postpatch_text = text1;                                                                                      // 1663
  for (var x = 0; x < diffs.length; x++) {                                                                         // 1664
    var diff_type = diffs[x][0];                                                                                   // 1665
    var diff_text = diffs[x][1];                                                                                   // 1666
                                                                                                                   // 1667
    if (!patchDiffLength && diff_type !== DIFF_EQUAL) {                                                            // 1668
      // A new patch starts here.                                                                                  // 1669
      patch.start1 = char_count1;                                                                                  // 1670
      patch.start2 = char_count2;                                                                                  // 1671
    }                                                                                                              // 1672
                                                                                                                   // 1673
    switch (diff_type) {                                                                                           // 1674
      case DIFF_INSERT:                                                                                            // 1675
        patch.diffs[patchDiffLength++] = diffs[x];                                                                 // 1676
        patch.length2 += diff_text.length;                                                                         // 1677
        postpatch_text = postpatch_text.substring(0, char_count2) + diff_text +                                    // 1678
                         postpatch_text.substring(char_count2);                                                    // 1679
        break;                                                                                                     // 1680
      case DIFF_DELETE:                                                                                            // 1681
        patch.length1 += diff_text.length;                                                                         // 1682
        patch.diffs[patchDiffLength++] = diffs[x];                                                                 // 1683
        postpatch_text = postpatch_text.substring(0, char_count2) +                                                // 1684
                         postpatch_text.substring(char_count2 +                                                    // 1685
                             diff_text.length);                                                                    // 1686
        break;                                                                                                     // 1687
      case DIFF_EQUAL:                                                                                             // 1688
        if (diff_text.length <= 2 * this.Patch_Margin &&                                                           // 1689
            patchDiffLength && diffs.length != x + 1) {                                                            // 1690
          // Small equality inside a patch.                                                                        // 1691
          patch.diffs[patchDiffLength++] = diffs[x];                                                               // 1692
          patch.length1 += diff_text.length;                                                                       // 1693
          patch.length2 += diff_text.length;                                                                       // 1694
        } else if (diff_text.length >= 2 * this.Patch_Margin) {                                                    // 1695
          // Time for a new patch.                                                                                 // 1696
          if (patchDiffLength) {                                                                                   // 1697
            this.patch_addContext_(patch, prepatch_text);                                                          // 1698
            patches.push(patch);                                                                                   // 1699
            patch = new diff_match_patch.patch_obj();                                                              // 1700
            patchDiffLength = 0;                                                                                   // 1701
            // Unlike Unidiff, our patch lists have a rolling context.                                             // 1702
            // http://code.google.com/p/google-diff-match-patch/wiki/Unidiff                                       // 1703
            // Update prepatch text & pos to reflect the application of the                                        // 1704
            // just completed patch.                                                                               // 1705
            prepatch_text = postpatch_text;                                                                        // 1706
            char_count1 = char_count2;                                                                             // 1707
          }                                                                                                        // 1708
        }                                                                                                          // 1709
        break;                                                                                                     // 1710
    }                                                                                                              // 1711
                                                                                                                   // 1712
    // Update the current character count.                                                                         // 1713
    if (diff_type !== DIFF_INSERT) {                                                                               // 1714
      char_count1 += diff_text.length;                                                                             // 1715
    }                                                                                                              // 1716
    if (diff_type !== DIFF_DELETE) {                                                                               // 1717
      char_count2 += diff_text.length;                                                                             // 1718
    }                                                                                                              // 1719
  }                                                                                                                // 1720
  // Pick up the leftover patch if not empty.                                                                      // 1721
  if (patchDiffLength) {                                                                                           // 1722
    this.patch_addContext_(patch, prepatch_text);                                                                  // 1723
    patches.push(patch);                                                                                           // 1724
  }                                                                                                                // 1725
                                                                                                                   // 1726
  return patches;                                                                                                  // 1727
};                                                                                                                 // 1728
                                                                                                                   // 1729
                                                                                                                   // 1730
/**                                                                                                                // 1731
 * Given an array of patches, return another array that is identical.                                              // 1732
 * @param {!Array.<!diff_match_patch.patch_obj>} patches Array of patch objects.                                   // 1733
 * @return {!Array.<!diff_match_patch.patch_obj>} Array of patch objects.                                          // 1734
 */                                                                                                                // 1735
diff_match_patch.prototype.patch_deepCopy = function(patches) {                                                    // 1736
  // Making deep copies is hard in JavaScript.                                                                     // 1737
  var patchesCopy = [];                                                                                            // 1738
  for (var x = 0; x < patches.length; x++) {                                                                       // 1739
    var patch = patches[x];                                                                                        // 1740
    var patchCopy = new diff_match_patch.patch_obj();                                                              // 1741
    patchCopy.diffs = [];                                                                                          // 1742
    for (var y = 0; y < patch.diffs.length; y++) {                                                                 // 1743
      patchCopy.diffs[y] = patch.diffs[y].slice();                                                                 // 1744
    }                                                                                                              // 1745
    patchCopy.start1 = patch.start1;                                                                               // 1746
    patchCopy.start2 = patch.start2;                                                                               // 1747
    patchCopy.length1 = patch.length1;                                                                             // 1748
    patchCopy.length2 = patch.length2;                                                                             // 1749
    patchesCopy[x] = patchCopy;                                                                                    // 1750
  }                                                                                                                // 1751
  return patchesCopy;                                                                                              // 1752
};                                                                                                                 // 1753
                                                                                                                   // 1754
                                                                                                                   // 1755
/**                                                                                                                // 1756
 * Merge a set of patches onto the text.  Return a patched text, as well                                           // 1757
 * as a list of true/false values indicating which patches were applied.                                           // 1758
 * @param {!Array.<!diff_match_patch.patch_obj>} patches Array of patch objects.                                   // 1759
 * @param {string} text Old text.                                                                                  // 1760
 * @return {!Array.<string|!Array.<boolean>>} Two element Array, containing the                                    // 1761
 *      new text and an array of boolean values.                                                                   // 1762
 */                                                                                                                // 1763
diff_match_patch.prototype.patch_apply = function(patches, text) {                                                 // 1764
  if (patches.length == 0) {                                                                                       // 1765
    return [text, []];                                                                                             // 1766
  }                                                                                                                // 1767
                                                                                                                   // 1768
  // Deep copy the patches so that no changes are made to originals.                                               // 1769
  patches = this.patch_deepCopy(patches);                                                                          // 1770
                                                                                                                   // 1771
  var nullPadding = this.patch_addPadding(patches);                                                                // 1772
  text = nullPadding + text + nullPadding;                                                                         // 1773
                                                                                                                   // 1774
  this.patch_splitMax(patches);                                                                                    // 1775
  // delta keeps track of the offset between the expected and actual location                                      // 1776
  // of the previous patch.  If there are patches expected at positions 10 and                                     // 1777
  // 20, but the first patch was found at 12, delta is 2 and the second patch                                      // 1778
  // has an effective expected position of 22.                                                                     // 1779
  var delta = 0;                                                                                                   // 1780
  var results = [];                                                                                                // 1781
  for (var x = 0; x < patches.length; x++) {                                                                       // 1782
    var expected_loc = patches[x].start2 + delta;                                                                  // 1783
    var text1 = this.diff_text1(patches[x].diffs);                                                                 // 1784
    var start_loc;                                                                                                 // 1785
    var end_loc = -1;                                                                                              // 1786
    if (text1.length > this.Match_MaxBits) {                                                                       // 1787
      // patch_splitMax will only provide an oversized pattern in the case of                                      // 1788
      // a monster delete.                                                                                         // 1789
      start_loc = this.match_main(text, text1.substring(0, this.Match_MaxBits),                                    // 1790
                                  expected_loc);                                                                   // 1791
      if (start_loc != -1) {                                                                                       // 1792
        end_loc = this.match_main(text,                                                                            // 1793
            text1.substring(text1.length - this.Match_MaxBits),                                                    // 1794
            expected_loc + text1.length - this.Match_MaxBits);                                                     // 1795
        if (end_loc == -1 || start_loc >= end_loc) {                                                               // 1796
          // Can't find valid trailing context.  Drop this patch.                                                  // 1797
          start_loc = -1;                                                                                          // 1798
        }                                                                                                          // 1799
      }                                                                                                            // 1800
    } else {                                                                                                       // 1801
      start_loc = this.match_main(text, text1, expected_loc);                                                      // 1802
    }                                                                                                              // 1803
    if (start_loc == -1) {                                                                                         // 1804
      // No match found.  :(                                                                                       // 1805
      results[x] = false;                                                                                          // 1806
      // Subtract the delta for this failed patch from subsequent patches.                                         // 1807
      delta -= patches[x].length2 - patches[x].length1;                                                            // 1808
    } else {                                                                                                       // 1809
      // Found a match.  :)                                                                                        // 1810
      results[x] = true;                                                                                           // 1811
      delta = start_loc - expected_loc;                                                                            // 1812
      var text2;                                                                                                   // 1813
      if (end_loc == -1) {                                                                                         // 1814
        text2 = text.substring(start_loc, start_loc + text1.length);                                               // 1815
      } else {                                                                                                     // 1816
        text2 = text.substring(start_loc, end_loc + this.Match_MaxBits);                                           // 1817
      }                                                                                                            // 1818
      if (text1 == text2) {                                                                                        // 1819
        // Perfect match, just shove the replacement text in.                                                      // 1820
        text = text.substring(0, start_loc) +                                                                      // 1821
               this.diff_text2(patches[x].diffs) +                                                                 // 1822
               text.substring(start_loc + text1.length);                                                           // 1823
      } else {                                                                                                     // 1824
        // Imperfect match.  Run a diff to get a framework of equivalent                                           // 1825
        // indices.                                                                                                // 1826
        var diffs = this.diff_main(text1, text2, false);                                                           // 1827
        if (text1.length > this.Match_MaxBits &&                                                                   // 1828
            this.diff_levenshtein(diffs) / text1.length >                                                          // 1829
            this.Patch_DeleteThreshold) {                                                                          // 1830
          // The end points match, but the content is unacceptably bad.                                            // 1831
          results[x] = false;                                                                                      // 1832
        } else {                                                                                                   // 1833
          this.diff_cleanupSemanticLossless(diffs);                                                                // 1834
          var index1 = 0;                                                                                          // 1835
          var index2;                                                                                              // 1836
          for (var y = 0; y < patches[x].diffs.length; y++) {                                                      // 1837
            var mod = patches[x].diffs[y];                                                                         // 1838
            if (mod[0] !== DIFF_EQUAL) {                                                                           // 1839
              index2 = this.diff_xIndex(diffs, index1);                                                            // 1840
            }                                                                                                      // 1841
            if (mod[0] === DIFF_INSERT) {  // Insertion                                                            // 1842
              text = text.substring(0, start_loc + index2) + mod[1] +                                              // 1843
                     text.substring(start_loc + index2);                                                           // 1844
            } else if (mod[0] === DIFF_DELETE) {  // Deletion                                                      // 1845
              text = text.substring(0, start_loc + index2) +                                                       // 1846
                     text.substring(start_loc + this.diff_xIndex(diffs,                                            // 1847
                         index1 + mod[1].length));                                                                 // 1848
            }                                                                                                      // 1849
            if (mod[0] !== DIFF_DELETE) {                                                                          // 1850
              index1 += mod[1].length;                                                                             // 1851
            }                                                                                                      // 1852
          }                                                                                                        // 1853
        }                                                                                                          // 1854
      }                                                                                                            // 1855
    }                                                                                                              // 1856
  }                                                                                                                // 1857
  // Strip the padding off.                                                                                        // 1858
  text = text.substring(nullPadding.length, text.length - nullPadding.length);                                     // 1859
  return [text, results];                                                                                          // 1860
};                                                                                                                 // 1861
                                                                                                                   // 1862
                                                                                                                   // 1863
/**                                                                                                                // 1864
 * Add some padding on text start and end so that edges can match something.                                       // 1865
 * Intended to be called only from within patch_apply.                                                             // 1866
 * @param {!Array.<!diff_match_patch.patch_obj>} patches Array of patch objects.                                   // 1867
 * @return {string} The padding string added to each side.                                                         // 1868
 */                                                                                                                // 1869
diff_match_patch.prototype.patch_addPadding = function(patches) {                                                  // 1870
  var paddingLength = this.Patch_Margin;                                                                           // 1871
  var nullPadding = '';                                                                                            // 1872
  for (var x = 1; x <= paddingLength; x++) {                                                                       // 1873
    nullPadding += String.fromCharCode(x);                                                                         // 1874
  }                                                                                                                // 1875
                                                                                                                   // 1876
  // Bump all the patches forward.                                                                                 // 1877
  for (var x = 0; x < patches.length; x++) {                                                                       // 1878
    patches[x].start1 += paddingLength;                                                                            // 1879
    patches[x].start2 += paddingLength;                                                                            // 1880
  }                                                                                                                // 1881
                                                                                                                   // 1882
  // Add some padding on start of first diff.                                                                      // 1883
  var patch = patches[0];                                                                                          // 1884
  var diffs = patch.diffs;                                                                                         // 1885
  if (diffs.length == 0 || diffs[0][0] != DIFF_EQUAL) {                                                            // 1886
    // Add nullPadding equality.                                                                                   // 1887
    diffs.unshift([DIFF_EQUAL, nullPadding]);                                                                      // 1888
    patch.start1 -= paddingLength;  // Should be 0.                                                                // 1889
    patch.start2 -= paddingLength;  // Should be 0.                                                                // 1890
    patch.length1 += paddingLength;                                                                                // 1891
    patch.length2 += paddingLength;                                                                                // 1892
  } else if (paddingLength > diffs[0][1].length) {                                                                 // 1893
    // Grow first equality.                                                                                        // 1894
    var extraLength = paddingLength - diffs[0][1].length;                                                          // 1895
    diffs[0][1] = nullPadding.substring(diffs[0][1].length) + diffs[0][1];                                         // 1896
    patch.start1 -= extraLength;                                                                                   // 1897
    patch.start2 -= extraLength;                                                                                   // 1898
    patch.length1 += extraLength;                                                                                  // 1899
    patch.length2 += extraLength;                                                                                  // 1900
  }                                                                                                                // 1901
                                                                                                                   // 1902
  // Add some padding on end of last diff.                                                                         // 1903
  patch = patches[patches.length - 1];                                                                             // 1904
  diffs = patch.diffs;                                                                                             // 1905
  if (diffs.length == 0 || diffs[diffs.length - 1][0] != DIFF_EQUAL) {                                             // 1906
    // Add nullPadding equality.                                                                                   // 1907
    diffs.push([DIFF_EQUAL, nullPadding]);                                                                         // 1908
    patch.length1 += paddingLength;                                                                                // 1909
    patch.length2 += paddingLength;                                                                                // 1910
  } else if (paddingLength > diffs[diffs.length - 1][1].length) {                                                  // 1911
    // Grow last equality.                                                                                         // 1912
    var extraLength = paddingLength - diffs[diffs.length - 1][1].length;                                           // 1913
    diffs[diffs.length - 1][1] += nullPadding.substring(0, extraLength);                                           // 1914
    patch.length1 += extraLength;                                                                                  // 1915
    patch.length2 += extraLength;                                                                                  // 1916
  }                                                                                                                // 1917
                                                                                                                   // 1918
  return nullPadding;                                                                                              // 1919
};                                                                                                                 // 1920
                                                                                                                   // 1921
                                                                                                                   // 1922
/**                                                                                                                // 1923
 * Look through the patches and break up any which are longer than the maximum                                     // 1924
 * limit of the match algorithm.                                                                                   // 1925
 * Intended to be called only from within patch_apply.                                                             // 1926
 * @param {!Array.<!diff_match_patch.patch_obj>} patches Array of patch objects.                                   // 1927
 */                                                                                                                // 1928
diff_match_patch.prototype.patch_splitMax = function(patches) {                                                    // 1929
  var patch_size = this.Match_MaxBits;                                                                             // 1930
  for (var x = 0; x < patches.length; x++) {                                                                       // 1931
    if (patches[x].length1 > patch_size) {                                                                         // 1932
      var bigpatch = patches[x];                                                                                   // 1933
      // Remove the big old patch.                                                                                 // 1934
      patches.splice(x--, 1);                                                                                      // 1935
      var start1 = bigpatch.start1;                                                                                // 1936
      var start2 = bigpatch.start2;                                                                                // 1937
      var precontext = '';                                                                                         // 1938
      while (bigpatch.diffs.length !== 0) {                                                                        // 1939
        // Create one of several smaller patches.                                                                  // 1940
        var patch = new diff_match_patch.patch_obj();                                                              // 1941
        var empty = true;                                                                                          // 1942
        patch.start1 = start1 - precontext.length;                                                                 // 1943
        patch.start2 = start2 - precontext.length;                                                                 // 1944
        if (precontext !== '') {                                                                                   // 1945
          patch.length1 = patch.length2 = precontext.length;                                                       // 1946
          patch.diffs.push([DIFF_EQUAL, precontext]);                                                              // 1947
        }                                                                                                          // 1948
        while (bigpatch.diffs.length !== 0 &&                                                                      // 1949
               patch.length1 < patch_size - this.Patch_Margin) {                                                   // 1950
          var diff_type = bigpatch.diffs[0][0];                                                                    // 1951
          var diff_text = bigpatch.diffs[0][1];                                                                    // 1952
          if (diff_type === DIFF_INSERT) {                                                                         // 1953
            // Insertions are harmless.                                                                            // 1954
            patch.length2 += diff_text.length;                                                                     // 1955
            start2 += diff_text.length;                                                                            // 1956
            patch.diffs.push(bigpatch.diffs.shift());                                                              // 1957
            empty = false;                                                                                         // 1958
          } else if (diff_type === DIFF_DELETE && patch.diffs.length == 1 &&                                       // 1959
                     patch.diffs[0][0] == DIFF_EQUAL &&                                                            // 1960
                     diff_text.length > 2 * patch_size) {                                                          // 1961
            // This is a large deletion.  Let it pass in one chunk.                                                // 1962
            patch.length1 += diff_text.length;                                                                     // 1963
            start1 += diff_text.length;                                                                            // 1964
            empty = false;                                                                                         // 1965
            patch.diffs.push([diff_type, diff_text]);                                                              // 1966
            bigpatch.diffs.shift();                                                                                // 1967
          } else {                                                                                                 // 1968
            // Deletion or equality.  Only take as much as we can stomach.                                         // 1969
            diff_text = diff_text.substring(0,                                                                     // 1970
                patch_size - patch.length1 - this.Patch_Margin);                                                   // 1971
            patch.length1 += diff_text.length;                                                                     // 1972
            start1 += diff_text.length;                                                                            // 1973
            if (diff_type === DIFF_EQUAL) {                                                                        // 1974
              patch.length2 += diff_text.length;                                                                   // 1975
              start2 += diff_text.length;                                                                          // 1976
            } else {                                                                                               // 1977
              empty = false;                                                                                       // 1978
            }                                                                                                      // 1979
            patch.diffs.push([diff_type, diff_text]);                                                              // 1980
            if (diff_text == bigpatch.diffs[0][1]) {                                                               // 1981
              bigpatch.diffs.shift();                                                                              // 1982
            } else {                                                                                               // 1983
              bigpatch.diffs[0][1] =                                                                               // 1984
                  bigpatch.diffs[0][1].substring(diff_text.length);                                                // 1985
            }                                                                                                      // 1986
          }                                                                                                        // 1987
        }                                                                                                          // 1988
        // Compute the head context for the next patch.                                                            // 1989
        precontext = this.diff_text2(patch.diffs);                                                                 // 1990
        precontext =                                                                                               // 1991
            precontext.substring(precontext.length - this.Patch_Margin);                                           // 1992
        // Append the end context for this patch.                                                                  // 1993
        var postcontext = this.diff_text1(bigpatch.diffs)                                                          // 1994
                              .substring(0, this.Patch_Margin);                                                    // 1995
        if (postcontext !== '') {                                                                                  // 1996
          patch.length1 += postcontext.length;                                                                     // 1997
          patch.length2 += postcontext.length;                                                                     // 1998
          if (patch.diffs.length !== 0 &&                                                                          // 1999
              patch.diffs[patch.diffs.length - 1][0] === DIFF_EQUAL) {                                             // 2000
            patch.diffs[patch.diffs.length - 1][1] += postcontext;                                                 // 2001
          } else {                                                                                                 // 2002
            patch.diffs.push([DIFF_EQUAL, postcontext]);                                                           // 2003
          }                                                                                                        // 2004
        }                                                                                                          // 2005
        if (!empty) {                                                                                              // 2006
          patches.splice(++x, 0, patch);                                                                           // 2007
        }                                                                                                          // 2008
      }                                                                                                            // 2009
    }                                                                                                              // 2010
  }                                                                                                                // 2011
};                                                                                                                 // 2012
                                                                                                                   // 2013
                                                                                                                   // 2014
/**                                                                                                                // 2015
 * Take a list of patches and return a textual representation.                                                     // 2016
 * @param {!Array.<!diff_match_patch.patch_obj>} patches Array of patch objects.                                   // 2017
 * @return {string} Text representation of patches.                                                                // 2018
 */                                                                                                                // 2019
diff_match_patch.prototype.patch_toText = function(patches) {                                                      // 2020
  var text = [];                                                                                                   // 2021
  for (var x = 0; x < patches.length; x++) {                                                                       // 2022
    text[x] = patches[x];                                                                                          // 2023
  }                                                                                                                // 2024
  return text.join('');                                                                                            // 2025
};                                                                                                                 // 2026
                                                                                                                   // 2027
                                                                                                                   // 2028
/**                                                                                                                // 2029
 * Parse a textual representation of patches and return a list of patch objects.                                   // 2030
 * @param {string} textline Text representation of patches.                                                        // 2031
 * @return {!Array.<!diff_match_patch.patch_obj>} Array of patch objects.                                          // 2032
 * @throws {!Error} If invalid input.                                                                              // 2033
 */                                                                                                                // 2034
diff_match_patch.prototype.patch_fromText = function(textline) {                                                   // 2035
  var patches = [];                                                                                                // 2036
  if (!textline) {                                                                                                 // 2037
    return patches;                                                                                                // 2038
  }                                                                                                                // 2039
  var text = textline.split('\n');                                                                                 // 2040
  var textPointer = 0;                                                                                             // 2041
  var patchHeader = /^@@ -(\d+),?(\d*) \+(\d+),?(\d*) @@$/;                                                        // 2042
  while (textPointer < text.length) {                                                                              // 2043
    var m = text[textPointer].match(patchHeader);                                                                  // 2044
    if (!m) {                                                                                                      // 2045
      throw new Error('Invalid patch string: ' + text[textPointer]);                                               // 2046
    }                                                                                                              // 2047
    var patch = new diff_match_patch.patch_obj();                                                                  // 2048
    patches.push(patch);                                                                                           // 2049
    patch.start1 = parseInt(m[1], 10);                                                                             // 2050
    if (m[2] === '') {                                                                                             // 2051
      patch.start1--;                                                                                              // 2052
      patch.length1 = 1;                                                                                           // 2053
    } else if (m[2] == '0') {                                                                                      // 2054
      patch.length1 = 0;                                                                                           // 2055
    } else {                                                                                                       // 2056
      patch.start1--;                                                                                              // 2057
      patch.length1 = parseInt(m[2], 10);                                                                          // 2058
    }                                                                                                              // 2059
                                                                                                                   // 2060
    patch.start2 = parseInt(m[3], 10);                                                                             // 2061
    if (m[4] === '') {                                                                                             // 2062
      patch.start2--;                                                                                              // 2063
      patch.length2 = 1;                                                                                           // 2064
    } else if (m[4] == '0') {                                                                                      // 2065
      patch.length2 = 0;                                                                                           // 2066
    } else {                                                                                                       // 2067
      patch.start2--;                                                                                              // 2068
      patch.length2 = parseInt(m[4], 10);                                                                          // 2069
    }                                                                                                              // 2070
    textPointer++;                                                                                                 // 2071
                                                                                                                   // 2072
    while (textPointer < text.length) {                                                                            // 2073
      var sign = text[textPointer].charAt(0);                                                                      // 2074
      try {                                                                                                        // 2075
        var line = decodeURI(text[textPointer].substring(1));                                                      // 2076
      } catch (ex) {                                                                                               // 2077
        // Malformed URI sequence.                                                                                 // 2078
        throw new Error('Illegal escape in patch_fromText: ' + line);                                              // 2079
      }                                                                                                            // 2080
      if (sign == '-') {                                                                                           // 2081
        // Deletion.                                                                                               // 2082
        patch.diffs.push([DIFF_DELETE, line]);                                                                     // 2083
      } else if (sign == '+') {                                                                                    // 2084
        // Insertion.                                                                                              // 2085
        patch.diffs.push([DIFF_INSERT, line]);                                                                     // 2086
      } else if (sign == ' ') {                                                                                    // 2087
        // Minor equality.                                                                                         // 2088
        patch.diffs.push([DIFF_EQUAL, line]);                                                                      // 2089
      } else if (sign == '@') {                                                                                    // 2090
        // Start of next patch.                                                                                    // 2091
        break;                                                                                                     // 2092
      } else if (sign === '') {                                                                                    // 2093
        // Blank line?  Whatever.                                                                                  // 2094
      } else {                                                                                                     // 2095
        // WTF?                                                                                                    // 2096
        throw new Error('Invalid patch mode "' + sign + '" in: ' + line);                                          // 2097
      }                                                                                                            // 2098
      textPointer++;                                                                                               // 2099
    }                                                                                                              // 2100
  }                                                                                                                // 2101
  return patches;                                                                                                  // 2102
};                                                                                                                 // 2103
                                                                                                                   // 2104
                                                                                                                   // 2105
/**                                                                                                                // 2106
 * Class representing one patch operation.                                                                         // 2107
 * @constructor                                                                                                    // 2108
 */                                                                                                                // 2109
diff_match_patch.patch_obj = function() {                                                                          // 2110
  /** @type {!Array.<!diff_match_patch.Diff>} */                                                                   // 2111
  this.diffs = [];                                                                                                 // 2112
  /** @type {?number} */                                                                                           // 2113
  this.start1 = null;                                                                                              // 2114
  /** @type {?number} */                                                                                           // 2115
  this.start2 = null;                                                                                              // 2116
  /** @type {number} */                                                                                            // 2117
  this.length1 = 0;                                                                                                // 2118
  /** @type {number} */                                                                                            // 2119
  this.length2 = 0;                                                                                                // 2120
};                                                                                                                 // 2121
                                                                                                                   // 2122
                                                                                                                   // 2123
/**                                                                                                                // 2124
 * Emmulate GNU diff's format.                                                                                     // 2125
 * Header: @@ -382,8 +481,9 @@                                                                                     // 2126
 * Indicies are printed as 1-based, not 0-based.                                                                   // 2127
 * @return {string} The GNU diff string.                                                                           // 2128
 */                                                                                                                // 2129
diff_match_patch.patch_obj.prototype.toString = function() {                                                       // 2130
  var coords1, coords2;                                                                                            // 2131
  if (this.length1 === 0) {                                                                                        // 2132
    coords1 = this.start1 + ',0';                                                                                  // 2133
  } else if (this.length1 == 1) {                                                                                  // 2134
    coords1 = this.start1 + 1;                                                                                     // 2135
  } else {                                                                                                         // 2136
    coords1 = (this.start1 + 1) + ',' + this.length1;                                                              // 2137
  }                                                                                                                // 2138
  if (this.length2 === 0) {                                                                                        // 2139
    coords2 = this.start2 + ',0';                                                                                  // 2140
  } else if (this.length2 == 1) {                                                                                  // 2141
    coords2 = this.start2 + 1;                                                                                     // 2142
  } else {                                                                                                         // 2143
    coords2 = (this.start2 + 1) + ',' + this.length2;                                                              // 2144
  }                                                                                                                // 2145
  var text = ['@@ -' + coords1 + ' +' + coords2 + ' @@\n'];                                                        // 2146
  var op;                                                                                                          // 2147
  // Escape the body of the patch with %xx notation.                                                               // 2148
  for (var x = 0; x < this.diffs.length; x++) {                                                                    // 2149
    switch (this.diffs[x][0]) {                                                                                    // 2150
      case DIFF_INSERT:                                                                                            // 2151
        op = '+';                                                                                                  // 2152
        break;                                                                                                     // 2153
      case DIFF_DELETE:                                                                                            // 2154
        op = '-';                                                                                                  // 2155
        break;                                                                                                     // 2156
      case DIFF_EQUAL:                                                                                             // 2157
        op = ' ';                                                                                                  // 2158
        break;                                                                                                     // 2159
    }                                                                                                              // 2160
    text[x + 1] = op + encodeURI(this.diffs[x][1]) + '\n';                                                         // 2161
  }                                                                                                                // 2162
  return text.join('').replace(/%20/g, ' ');                                                                       // 2163
};                                                                                                                 // 2164
                                                                                                                   // 2165
                                                                                                                   // 2166
// Export these global variables so that they survive Google's JS compiler.                                        // 2167
// In a browser, 'this' will be 'window'.                                                                          // 2168
// In node.js 'this' will be a global object.                                                                      // 2169
this['diff_match_patch'] = diff_match_patch;                                                                       // 2170
this['DIFF_DELETE'] = DIFF_DELETE;                                                                                 // 2171
this['DIFF_INSERT'] = DIFF_INSERT;                                                                                 // 2172
this['DIFF_EQUAL'] = DIFF_EQUAL;                                                                                   // 2173
                                                                                                                   // 2174
                                                                                                                   // 2175
},{}],3:[function(require,module,exports){                                                                         // 2176
                                                                                                                   // 2177
var Pipe = require('../pipe').Pipe;                                                                                // 2178
                                                                                                                   // 2179
var Context = function Context(){                                                                                  // 2180
};                                                                                                                 // 2181
                                                                                                                   // 2182
Context.prototype.setResult = function(result) {                                                                   // 2183
	this.result = result;                                                                                             // 2184
	this.hasResult = true;                                                                                            // 2185
	return this;                                                                                                      // 2186
};                                                                                                                 // 2187
                                                                                                                   // 2188
Context.prototype.exit = function() {                                                                              // 2189
	this.exiting = true;                                                                                              // 2190
	return this;                                                                                                      // 2191
};                                                                                                                 // 2192
                                                                                                                   // 2193
Context.prototype.switchTo = function(next, pipe) {                                                                // 2194
	if (typeof next === 'string' || next instanceof Pipe) {                                                           // 2195
		this.nextPipe = next;                                                                                            // 2196
	} else {                                                                                                          // 2197
		this.next = next;                                                                                                // 2198
		if (pipe) {                                                                                                      // 2199
			this.nextPipe = pipe;                                                                                           // 2200
		}                                                                                                                // 2201
	}                                                                                                                 // 2202
	return this;                                                                                                      // 2203
};                                                                                                                 // 2204
                                                                                                                   // 2205
Context.prototype.push = function(child, name) {                                                                   // 2206
	child.parent = this;                                                                                              // 2207
	if (typeof name !== 'undefined') {                                                                                // 2208
		child.childName = name;                                                                                          // 2209
	}                                                                                                                 // 2210
	child.root = this.root || this;                                                                                   // 2211
	child.options = child.options || this.options;                                                                    // 2212
	if (!this.children) {                                                                                             // 2213
		this.children = [child];                                                                                         // 2214
		this.nextAfterChildren = this.next || null;                                                                      // 2215
		this.next = child;                                                                                               // 2216
	} else {                                                                                                          // 2217
		this.children[this.children.length - 1].next = child;                                                            // 2218
		this.children.push(child);                                                                                       // 2219
	}                                                                                                                 // 2220
	child.next = this;                                                                                                // 2221
	return this;                                                                                                      // 2222
};                                                                                                                 // 2223
                                                                                                                   // 2224
exports.Context = Context;                                                                                         // 2225
                                                                                                                   // 2226
},{"../pipe":17}],4:[function(require,module,exports){                                                             // 2227
var Context = require('./context').Context;                                                                        // 2228
                                                                                                                   // 2229
var DiffContext = function DiffContext(left, right) {                                                              // 2230
  this.left = left;                                                                                                // 2231
  this.right = right;                                                                                              // 2232
  this.pipe = 'diff';                                                                                              // 2233
};                                                                                                                 // 2234
                                                                                                                   // 2235
DiffContext.prototype = new Context();                                                                             // 2236
                                                                                                                   // 2237
exports.DiffContext = DiffContext;                                                                                 // 2238
                                                                                                                   // 2239
},{"./context":3}],5:[function(require,module,exports){                                                            // 2240
var Context = require('./context').Context;                                                                        // 2241
                                                                                                                   // 2242
var PatchContext = function PatchContext(left, delta) {                                                            // 2243
  this.left = left;                                                                                                // 2244
  this.delta = delta;                                                                                              // 2245
  this.pipe = 'patch';                                                                                             // 2246
};                                                                                                                 // 2247
                                                                                                                   // 2248
PatchContext.prototype = new Context();                                                                            // 2249
                                                                                                                   // 2250
exports.PatchContext = PatchContext;                                                                               // 2251
                                                                                                                   // 2252
},{"./context":3}],6:[function(require,module,exports){                                                            // 2253
var Context = require('./context').Context;                                                                        // 2254
                                                                                                                   // 2255
var ReverseContext = function ReverseContext(delta) {                                                              // 2256
  this.delta = delta;                                                                                              // 2257
  this.pipe = 'reverse';                                                                                           // 2258
};                                                                                                                 // 2259
                                                                                                                   // 2260
ReverseContext.prototype = new Context();                                                                          // 2261
                                                                                                                   // 2262
exports.ReverseContext = ReverseContext;                                                                           // 2263
                                                                                                                   // 2264
},{"./context":3}],7:[function(require,module,exports){                                                            // 2265
// use as 2nd parameter for JSON.parse to revive Date instances                                                    // 2266
module.exports = function dateReviver(key, value) {                                                                // 2267
  var parts;                                                                                                       // 2268
  if (typeof value === 'string') {                                                                                 // 2269
    parts = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.(\d*))?(Z|([+\-])(\d{2}):(\d{2}))$/.exec(value);
    if (parts) {                                                                                                   // 2271
      return new Date(Date.UTC(+parts[1], +parts[2] - 1, +parts[3], +parts[4], +parts[5], +parts[6], +(parts[7] || 0)));
    }                                                                                                              // 2273
  }                                                                                                                // 2274
  return value;                                                                                                    // 2275
};                                                                                                                 // 2276
                                                                                                                   // 2277
},{}],8:[function(require,module,exports){                                                                         // 2278
var Processor = require('./processor').Processor;                                                                  // 2279
var Pipe = require('./pipe').Pipe;                                                                                 // 2280
var DiffContext = require('./contexts/diff').DiffContext;                                                          // 2281
var PatchContext = require('./contexts/patch').PatchContext;                                                       // 2282
var ReverseContext = require('./contexts/reverse').ReverseContext;                                                 // 2283
                                                                                                                   // 2284
var trivial = require('./filters/trivial');                                                                        // 2285
var nested = require('./filters/nested');                                                                          // 2286
var arrays = require('./filters/arrays');                                                                          // 2287
var dates = require('./filters/dates');                                                                            // 2288
var texts = require('./filters/texts');                                                                            // 2289
                                                                                                                   // 2290
var DiffPatcher = function DiffPatcher(options) {                                                                  // 2291
  this.processor = new Processor(options);                                                                         // 2292
  this.processor.pipe(new Pipe('diff').append(                                                                     // 2293
    nested.collectChildrenDiffFilter,                                                                              // 2294
    trivial.diffFilter,                                                                                            // 2295
    dates.diffFilter,                                                                                              // 2296
    texts.diffFilter,                                                                                              // 2297
    nested.objectsDiffFilter,                                                                                      // 2298
    arrays.diffFilter                                                                                              // 2299
  ).shouldHaveResult());                                                                                           // 2300
  this.processor.pipe(new Pipe('patch').append(                                                                    // 2301
    nested.collectChildrenPatchFilter,                                                                             // 2302
    arrays.collectChildrenPatchFilter,                                                                             // 2303
    trivial.patchFilter,                                                                                           // 2304
    texts.patchFilter,                                                                                             // 2305
    nested.patchFilter,                                                                                            // 2306
    arrays.patchFilter                                                                                             // 2307
  ).shouldHaveResult());                                                                                           // 2308
  this.processor.pipe(new Pipe('reverse').append(                                                                  // 2309
    nested.collectChildrenReverseFilter,                                                                           // 2310
    arrays.collectChildrenReverseFilter,                                                                           // 2311
    trivial.reverseFilter,                                                                                         // 2312
    texts.reverseFilter,                                                                                           // 2313
    nested.reverseFilter,                                                                                          // 2314
    arrays.reverseFilter                                                                                           // 2315
  ).shouldHaveResult());                                                                                           // 2316
};                                                                                                                 // 2317
                                                                                                                   // 2318
DiffPatcher.prototype.options = function() {                                                                       // 2319
  return this.processor.options.apply(this.processor, arguments);                                                  // 2320
};                                                                                                                 // 2321
                                                                                                                   // 2322
DiffPatcher.prototype.diff = function(left, right) {                                                               // 2323
  return this.processor.process(new DiffContext(left, right));                                                     // 2324
};                                                                                                                 // 2325
                                                                                                                   // 2326
DiffPatcher.prototype.patch = function(left, delta) {                                                              // 2327
  return this.processor.process(new PatchContext(left, delta));                                                    // 2328
};                                                                                                                 // 2329
                                                                                                                   // 2330
DiffPatcher.prototype.reverse = function(delta) {                                                                  // 2331
  return this.processor.process(new ReverseContext(delta));                                                        // 2332
};                                                                                                                 // 2333
                                                                                                                   // 2334
DiffPatcher.prototype.unpatch = function(right, delta) {                                                           // 2335
  return this.patch(right, this.reverse(delta));                                                                   // 2336
};                                                                                                                 // 2337
                                                                                                                   // 2338
exports.DiffPatcher = DiffPatcher;                                                                                 // 2339
                                                                                                                   // 2340
},{"./contexts/diff":4,"./contexts/patch":5,"./contexts/reverse":6,"./filters/arrays":10,"./filters/dates":11,"./filters/nested":13,"./filters/texts":14,"./filters/trivial":15,"./pipe":17,"./processor":18}],9:[function(require,module,exports){
                                                                                                                   // 2342
exports.isBrowser = typeof window !== 'undefined';                                                                 // 2343
                                                                                                                   // 2344
},{}],10:[function(require,module,exports){                                                                        // 2345
var DiffContext = require('../contexts/diff').DiffContext;                                                         // 2346
var PatchContext = require('../contexts/patch').PatchContext;                                                      // 2347
var ReverseContext = require('../contexts/reverse').ReverseContext;                                                // 2348
                                                                                                                   // 2349
var lcs = require('./lcs');                                                                                        // 2350
                                                                                                                   // 2351
var ARRAY_MOVE = 3;                                                                                                // 2352
                                                                                                                   // 2353
var isArray = (typeof Array.isArray === 'function') ?                                                              // 2354
  // use native function                                                                                           // 2355
  Array.isArray :                                                                                                  // 2356
  // use instanceof operator                                                                                       // 2357
  function(a) {                                                                                                    // 2358
    return a instanceof Array;                                                                                     // 2359
  };                                                                                                               // 2360
                                                                                                                   // 2361
var arrayIndexOf = typeof Array.prototype.indexOf === 'function' ?                                                 // 2362
  function(array, item) {                                                                                          // 2363
    return array.indexOf(item);                                                                                    // 2364
  } : function(array, item) {                                                                                      // 2365
    var length = array.length;                                                                                     // 2366
    for (var i = 0; i < length; i++) {                                                                             // 2367
      if (array[i] === item) {                                                                                     // 2368
        return i;                                                                                                  // 2369
      }                                                                                                            // 2370
    }                                                                                                              // 2371
    return -1;                                                                                                     // 2372
  };                                                                                                               // 2373
                                                                                                                   // 2374
function arraysHaveMatchByRef(array1, array2, len1, len2) {                                                        // 2375
  for (var index1 = 0; index1 < len1; index1++) {                                                                  // 2376
    var val1 = array1[index1];                                                                                     // 2377
    for (var index2 = 0; index2 < len2; index2++) {                                                                // 2378
      var val2 = array2[index2];                                                                                   // 2379
      if (val1 === val2) {                                                                                         // 2380
        return true;                                                                                               // 2381
      }                                                                                                            // 2382
    }                                                                                                              // 2383
  }                                                                                                                // 2384
}                                                                                                                  // 2385
                                                                                                                   // 2386
function matchItems(array1, array2, index1, index2, context) {                                                     // 2387
  var value1 = array1[index1];                                                                                     // 2388
  var value2 = array2[index2];                                                                                     // 2389
  if (value1 === value2) {                                                                                         // 2390
    return true;                                                                                                   // 2391
  }                                                                                                                // 2392
  if (typeof value1 !== 'object' || typeof value2 !== 'object') {                                                  // 2393
    return false;                                                                                                  // 2394
  }                                                                                                                // 2395
  var objectHash = context.objectHash;                                                                             // 2396
  if (!objectHash) {                                                                                               // 2397
    // no way to match objects was provided, try match by position                                                 // 2398
    return context.matchByPosition && index1 === index2;                                                           // 2399
  }                                                                                                                // 2400
  var hash1;                                                                                                       // 2401
  var hash2;                                                                                                       // 2402
  if (typeof index1 === 'number') {                                                                                // 2403
    context.hashCache1 = context.hashCache1 || [];                                                                 // 2404
    hash1 = context.hashCache1[index1];                                                                            // 2405
    if (typeof hash1 === 'undefined') {                                                                            // 2406
      context.hashCache1[index1] = hash1 = objectHash(value1, index1);                                             // 2407
    }                                                                                                              // 2408
  } else {                                                                                                         // 2409
    hash1 = objectHash(value1);                                                                                    // 2410
  }                                                                                                                // 2411
  if (typeof hash1 === 'undefined') {                                                                              // 2412
    return false;                                                                                                  // 2413
  }                                                                                                                // 2414
  if (typeof index2 === 'number') {                                                                                // 2415
    context.hashCache2 = context.hashCache2 || [];                                                                 // 2416
    hash2 = context.hashCache2[index2];                                                                            // 2417
    if (typeof hash2 === 'undefined') {                                                                            // 2418
      context.hashCache2[index2] = hash2 = objectHash(value2, index2);                                             // 2419
    }                                                                                                              // 2420
  } else {                                                                                                         // 2421
    hash2 = objectHash(value2);                                                                                    // 2422
  }                                                                                                                // 2423
  if (typeof hash2 === 'undefined') {                                                                              // 2424
    return false;                                                                                                  // 2425
  }                                                                                                                // 2426
  return hash1 === hash2;                                                                                          // 2427
}                                                                                                                  // 2428
                                                                                                                   // 2429
var diffFilter = function arraysDiffFilter(context) {                                                              // 2430
  if (!context.leftIsArray) {                                                                                      // 2431
    return;                                                                                                        // 2432
  }                                                                                                                // 2433
                                                                                                                   // 2434
  var matchContext = {                                                                                             // 2435
    objectHash: context.options && context.options.objectHash,                                                     // 2436
    matchByPosition: context.options && context.options.matchByPosition                                            // 2437
  };                                                                                                               // 2438
  var commonHead = 0;                                                                                              // 2439
  var commonTail = 0;                                                                                              // 2440
  var index;                                                                                                       // 2441
  var index1;                                                                                                      // 2442
  var index2;                                                                                                      // 2443
  var array1 = context.left;                                                                                       // 2444
  var array2 = context.right;                                                                                      // 2445
  var len1 = array1.length;                                                                                        // 2446
  var len2 = array2.length;                                                                                        // 2447
                                                                                                                   // 2448
  var child;                                                                                                       // 2449
                                                                                                                   // 2450
  if (len1 > 0 && len2 > 0 && !matchContext.objectHash &&                                                          // 2451
    typeof matchContext.matchByPosition !== 'boolean') {                                                           // 2452
    matchContext.matchByPosition = !arraysHaveMatchByRef(array1, array2, len1, len2);                              // 2453
  }                                                                                                                // 2454
                                                                                                                   // 2455
  // separate common head                                                                                          // 2456
  while (commonHead < len1 && commonHead < len2 &&                                                                 // 2457
    matchItems(array1, array2, commonHead, commonHead, matchContext)) {                                            // 2458
    index = commonHead;                                                                                            // 2459
    child = new DiffContext(context.left[index], context.right[index]);                                            // 2460
    context.push(child, index);                                                                                    // 2461
    commonHead++;                                                                                                  // 2462
  }                                                                                                                // 2463
  // separate common tail                                                                                          // 2464
  while (commonTail + commonHead < len1 && commonTail + commonHead < len2 &&                                       // 2465
    matchItems(array1, array2, len1 - 1 - commonTail, len2 - 1 - commonTail, matchContext)) {                      // 2466
    index1 = len1 - 1 - commonTail;                                                                                // 2467
    index2 = len2 - 1 - commonTail;                                                                                // 2468
    child = new DiffContext(context.left[index1], context.right[index2]);                                          // 2469
    context.push(child, index2);                                                                                   // 2470
    commonTail++;                                                                                                  // 2471
  }                                                                                                                // 2472
  var result;                                                                                                      // 2473
  if (commonHead + commonTail === len1) {                                                                          // 2474
    if (len1 === len2) {                                                                                           // 2475
      // arrays are identical                                                                                      // 2476
      context.setResult(undefined).exit();                                                                         // 2477
      return;                                                                                                      // 2478
    }                                                                                                              // 2479
    // trivial case, a block (1 or more consecutive items) was added                                               // 2480
    result = result || {                                                                                           // 2481
      _t: 'a'                                                                                                      // 2482
    };                                                                                                             // 2483
    for (index = commonHead; index < len2 - commonTail; index++) {                                                 // 2484
      result[index] = [array2[index]];                                                                             // 2485
    }                                                                                                              // 2486
    context.setResult(result).exit();                                                                              // 2487
    return;                                                                                                        // 2488
  }                                                                                                                // 2489
  if (commonHead + commonTail === len2) {                                                                          // 2490
    // trivial case, a block (1 or more consecutive items) was removed                                             // 2491
    result = result || {                                                                                           // 2492
      _t: 'a'                                                                                                      // 2493
    };                                                                                                             // 2494
    for (index = commonHead; index < len1 - commonTail; index++) {                                                 // 2495
      result['_' + index] = [array1[index], 0, 0];                                                                 // 2496
    }                                                                                                              // 2497
    context.setResult(result).exit();                                                                              // 2498
    return;                                                                                                        // 2499
  }                                                                                                                // 2500
  // reset hash cache                                                                                              // 2501
  delete matchContext.hashCache1;                                                                                  // 2502
  delete matchContext.hashCache2;                                                                                  // 2503
                                                                                                                   // 2504
  // diff is not trivial, find the LCS (Longest Common Subsequence)                                                // 2505
  var trimmed1 = array1.slice(commonHead, len1 - commonTail);                                                      // 2506
  var trimmed2 = array2.slice(commonHead, len2 - commonTail);                                                      // 2507
  var seq = lcs.get(                                                                                               // 2508
    trimmed1, trimmed2,                                                                                            // 2509
    matchItems,                                                                                                    // 2510
    matchContext                                                                                                   // 2511
  );                                                                                                               // 2512
  var removedItems = [];                                                                                           // 2513
  result = result || {                                                                                             // 2514
    _t: 'a'                                                                                                        // 2515
  };                                                                                                               // 2516
  for (index = commonHead; index < len1 - commonTail; index++) {                                                   // 2517
    if (arrayIndexOf(seq.indices1, index - commonHead) < 0) {                                                      // 2518
      // removed                                                                                                   // 2519
      result['_' + index] = [array1[index], 0, 0];                                                                 // 2520
      removedItems.push(index);                                                                                    // 2521
    }                                                                                                              // 2522
  }                                                                                                                // 2523
                                                                                                                   // 2524
  var detectMove = true;                                                                                           // 2525
  if (context.options && context.options.arrays && context.options.arrays.detectMove === false) {                  // 2526
    detectMove = false;                                                                                            // 2527
  }                                                                                                                // 2528
  var includeValueOnMove = false;                                                                                  // 2529
  if (context.options && context.options.arrays && context.options.arrays.includeValueOnMove) {                    // 2530
    includeValueOnMove = true;                                                                                     // 2531
  }                                                                                                                // 2532
                                                                                                                   // 2533
  var removedItemsLength = removedItems.length;                                                                    // 2534
  for (index = commonHead; index < len2 - commonTail; index++) {                                                   // 2535
    var indexOnArray2 = arrayIndexOf(seq.indices2, index - commonHead);                                            // 2536
    if (indexOnArray2 < 0) {                                                                                       // 2537
      // added, try to match with a removed item and register as position move                                     // 2538
      var isMove = false;                                                                                          // 2539
      if (detectMove && removedItemsLength > 0) {                                                                  // 2540
        for (var removeItemIndex1 = 0; removeItemIndex1 < removedItemsLength; removeItemIndex1++) {                // 2541
          index1 = removedItems[removeItemIndex1];                                                                 // 2542
          if (matchItems(trimmed1, trimmed2, index1 - commonHead,                                                  // 2543
            index - commonHead, matchContext)) {                                                                   // 2544
            // store position move as: [originalValue, newPosition, ARRAY_MOVE]                                    // 2545
            result['_' + index1].splice(1, 2, index, ARRAY_MOVE);                                                  // 2546
            if (!includeValueOnMove) {                                                                             // 2547
              // don't include moved value on diff, to save bytes                                                  // 2548
              result['_' + index1][0] = '';                                                                        // 2549
            }                                                                                                      // 2550
                                                                                                                   // 2551
            index2 = index;                                                                                        // 2552
            child = new DiffContext(context.left[index1], context.right[index2]);                                  // 2553
            context.push(child, index2);                                                                           // 2554
            removedItems.splice(removeItemIndex1, 1);                                                              // 2555
            isMove = true;                                                                                         // 2556
            break;                                                                                                 // 2557
          }                                                                                                        // 2558
        }                                                                                                          // 2559
      }                                                                                                            // 2560
      if (!isMove) {                                                                                               // 2561
        // added                                                                                                   // 2562
        result[index] = [array2[index]];                                                                           // 2563
      }                                                                                                            // 2564
    } else {                                                                                                       // 2565
      // match, do inner diff                                                                                      // 2566
      index1 = seq.indices1[indexOnArray2] + commonHead;                                                           // 2567
      index2 = seq.indices2[indexOnArray2] + commonHead;                                                           // 2568
      child = new DiffContext(context.left[index1], context.right[index2]);                                        // 2569
      context.push(child, index2);                                                                                 // 2570
    }                                                                                                              // 2571
  }                                                                                                                // 2572
                                                                                                                   // 2573
  context.setResult(result).exit();                                                                                // 2574
                                                                                                                   // 2575
};                                                                                                                 // 2576
diffFilter.filterName = 'arrays';                                                                                  // 2577
                                                                                                                   // 2578
var compare = {                                                                                                    // 2579
  numerically: function(a, b) {                                                                                    // 2580
    return a - b;                                                                                                  // 2581
  },                                                                                                               // 2582
  numericallyBy: function(name) {                                                                                  // 2583
    return function(a, b) {                                                                                        // 2584
      return a[name] - b[name];                                                                                    // 2585
    };                                                                                                             // 2586
  }                                                                                                                // 2587
};                                                                                                                 // 2588
                                                                                                                   // 2589
var patchFilter = function nestedPatchFilter(context) {                                                            // 2590
  if (!context.nested) {                                                                                           // 2591
    return;                                                                                                        // 2592
  }                                                                                                                // 2593
  if (context.delta._t !== 'a') {                                                                                  // 2594
    return;                                                                                                        // 2595
  }                                                                                                                // 2596
  var index, index1;                                                                                               // 2597
                                                                                                                   // 2598
  var delta = context.delta;                                                                                       // 2599
  var array = context.left;                                                                                        // 2600
                                                                                                                   // 2601
  // first, separate removals, insertions and modifications                                                        // 2602
  var toRemove = [];                                                                                               // 2603
  var toInsert = [];                                                                                               // 2604
  var toModify = [];                                                                                               // 2605
  for (index in delta) {                                                                                           // 2606
    if (index !== '_t') {                                                                                          // 2607
      if (index[0] === '_') {                                                                                      // 2608
        // removed item from original array                                                                        // 2609
        if (delta[index][2] === 0 || delta[index][2] === ARRAY_MOVE) {                                             // 2610
          toRemove.push(parseInt(index.slice(1), 10));                                                             // 2611
        } else {                                                                                                   // 2612
          throw new Error('only removal or move can be applied at original array indices' +                        // 2613
            ', invalid diff type: ' + delta[index][2]);                                                            // 2614
        }                                                                                                          // 2615
      } else {                                                                                                     // 2616
        if (delta[index].length === 1) {                                                                           // 2617
          // added item at new array                                                                               // 2618
          toInsert.push({                                                                                          // 2619
            index: parseInt(index, 10),                                                                            // 2620
            value: delta[index][0]                                                                                 // 2621
          });                                                                                                      // 2622
        } else {                                                                                                   // 2623
          // modified item at new array                                                                            // 2624
          toModify.push({                                                                                          // 2625
            index: parseInt(index, 10),                                                                            // 2626
            delta: delta[index]                                                                                    // 2627
          });                                                                                                      // 2628
        }                                                                                                          // 2629
      }                                                                                                            // 2630
    }                                                                                                              // 2631
  }                                                                                                                // 2632
                                                                                                                   // 2633
  // remove items, in reverse order to avoid sawing our own floor                                                  // 2634
  toRemove = toRemove.sort(compare.numerically);                                                                   // 2635
  for (index = toRemove.length - 1; index >= 0; index--) {                                                         // 2636
    index1 = toRemove[index];                                                                                      // 2637
    var indexDiff = delta['_' + index1];                                                                           // 2638
    var removedValue = array.splice(index1, 1)[0];                                                                 // 2639
    if (indexDiff[2] === ARRAY_MOVE) {                                                                             // 2640
      // reinsert later                                                                                            // 2641
      toInsert.push({                                                                                              // 2642
        index: indexDiff[1],                                                                                       // 2643
        value: removedValue                                                                                        // 2644
      });                                                                                                          // 2645
    }                                                                                                              // 2646
  }                                                                                                                // 2647
                                                                                                                   // 2648
  // insert items, in reverse order to avoid moving our own floor                                                  // 2649
  toInsert = toInsert.sort(compare.numericallyBy('index'));                                                        // 2650
  var toInsertLength = toInsert.length;                                                                            // 2651
  for (index = 0; index < toInsertLength; index++) {                                                               // 2652
    var insertion = toInsert[index];                                                                               // 2653
    array.splice(insertion.index, 0, insertion.value);                                                             // 2654
  }                                                                                                                // 2655
                                                                                                                   // 2656
  // apply modifications                                                                                           // 2657
  var toModifyLength = toModify.length;                                                                            // 2658
  var child;                                                                                                       // 2659
  if (toModifyLength > 0) {                                                                                        // 2660
    for (index = 0; index < toModifyLength; index++) {                                                             // 2661
      var modification = toModify[index];                                                                          // 2662
      child = new PatchContext(context.left[modification.index], modification.delta);                              // 2663
      context.push(child, modification.index);                                                                     // 2664
    }                                                                                                              // 2665
  }                                                                                                                // 2666
                                                                                                                   // 2667
  if (!context.children) {                                                                                         // 2668
    context.setResult(context.left).exit();                                                                        // 2669
    return;                                                                                                        // 2670
  }                                                                                                                // 2671
  context.exit();                                                                                                  // 2672
};                                                                                                                 // 2673
patchFilter.filterName = 'arrays';                                                                                 // 2674
                                                                                                                   // 2675
var collectChildrenPatchFilter = function collectChildrenPatchFilter(context) {                                    // 2676
  if (!context || !context.children) {                                                                             // 2677
    return;                                                                                                        // 2678
  }                                                                                                                // 2679
  if (context.delta._t !== 'a') {                                                                                  // 2680
    return;                                                                                                        // 2681
  }                                                                                                                // 2682
  var length = context.children.length;                                                                            // 2683
  var child;                                                                                                       // 2684
  for (var index = 0; index < length; index++) {                                                                   // 2685
    child = context.children[index];                                                                               // 2686
    context.left[child.childName] = child.result;                                                                  // 2687
  }                                                                                                                // 2688
  context.setResult(context.left).exit();                                                                          // 2689
};                                                                                                                 // 2690
collectChildrenPatchFilter.filterName = 'arraysCollectChildren';                                                   // 2691
                                                                                                                   // 2692
var reverseFilter = function arraysReverseFilter(context) {                                                        // 2693
  if (!context.nested) {                                                                                           // 2694
    if (context.delta[2] === ARRAY_MOVE) {                                                                         // 2695
      context.newName = '_' + context.delta[1];                                                                    // 2696
      context.setResult([context.delta[0], parseInt(context.childName.substr(1), 10), ARRAY_MOVE]).exit();         // 2697
    }                                                                                                              // 2698
    return;                                                                                                        // 2699
  }                                                                                                                // 2700
  if (context.delta._t !== 'a') {                                                                                  // 2701
    return;                                                                                                        // 2702
  }                                                                                                                // 2703
  var name, child;                                                                                                 // 2704
  for (name in context.delta) {                                                                                    // 2705
    if (name === '_t') {                                                                                           // 2706
      continue;                                                                                                    // 2707
    }                                                                                                              // 2708
    child = new ReverseContext(context.delta[name]);                                                               // 2709
    context.push(child, name);                                                                                     // 2710
  }                                                                                                                // 2711
  context.exit();                                                                                                  // 2712
};                                                                                                                 // 2713
reverseFilter.filterName = 'arrays';                                                                               // 2714
                                                                                                                   // 2715
var reverseArrayDeltaIndex = function(delta, index, itemDelta) {                                                   // 2716
  if (typeof index === 'string' && index[0] === '_') {                                                             // 2717
    return parseInt(index.substr(1), 10);                                                                          // 2718
  } else if (isArray(itemDelta) && itemDelta[2] === 0) {                                                           // 2719
    return '_' + index;                                                                                            // 2720
  }                                                                                                                // 2721
                                                                                                                   // 2722
  var reverseIndex = +index;                                                                                       // 2723
  for (var deltaIndex in delta) {                                                                                  // 2724
    var deltaItem = delta[deltaIndex];                                                                             // 2725
    if (isArray(deltaItem)) {                                                                                      // 2726
      if (deltaItem[2] === ARRAY_MOVE) {                                                                           // 2727
        var moveFromIndex = parseInt(deltaIndex.substr(1), 10);                                                    // 2728
        var moveToIndex = deltaItem[1];                                                                            // 2729
        if (moveToIndex === +index) {                                                                              // 2730
          return moveFromIndex;                                                                                    // 2731
        }                                                                                                          // 2732
        if (moveFromIndex <= reverseIndex && moveToIndex > reverseIndex) {                                         // 2733
          reverseIndex++;                                                                                          // 2734
        } else if (moveFromIndex >= reverseIndex && moveToIndex < reverseIndex) {                                  // 2735
          reverseIndex--;                                                                                          // 2736
        }                                                                                                          // 2737
      } else if (deltaItem[2] === 0) {                                                                             // 2738
        var deleteIndex = parseInt(deltaIndex.substr(1), 10);                                                      // 2739
        if (deleteIndex <= reverseIndex) {                                                                         // 2740
          reverseIndex++;                                                                                          // 2741
        }                                                                                                          // 2742
      } else if (deltaItem.length === 1 && deltaIndex <= reverseIndex) {                                           // 2743
        reverseIndex--;                                                                                            // 2744
      }                                                                                                            // 2745
    }                                                                                                              // 2746
  }                                                                                                                // 2747
                                                                                                                   // 2748
  return reverseIndex;                                                                                             // 2749
};                                                                                                                 // 2750
                                                                                                                   // 2751
var collectChildrenReverseFilter = function collectChildrenReverseFilter(context) {                                // 2752
  if (!context || !context.children) {                                                                             // 2753
    return;                                                                                                        // 2754
  }                                                                                                                // 2755
  if (context.delta._t !== 'a') {                                                                                  // 2756
    return;                                                                                                        // 2757
  }                                                                                                                // 2758
  var length = context.children.length;                                                                            // 2759
  var child;                                                                                                       // 2760
  var delta = {                                                                                                    // 2761
    _t: 'a'                                                                                                        // 2762
  };                                                                                                               // 2763
                                                                                                                   // 2764
  for (var index = 0; index < length; index++) {                                                                   // 2765
    child = context.children[index];                                                                               // 2766
    var name = child.newName;                                                                                      // 2767
    if (typeof name === 'undefined') {                                                                             // 2768
      name = reverseArrayDeltaIndex(context.delta, child.childName, child.result);                                 // 2769
    }                                                                                                              // 2770
    if (delta[name] !== child.result) {                                                                            // 2771
      delta[name] = child.result;                                                                                  // 2772
    }                                                                                                              // 2773
  }                                                                                                                // 2774
  context.setResult(delta).exit();                                                                                 // 2775
};                                                                                                                 // 2776
collectChildrenReverseFilter.filterName = 'arraysCollectChildren';                                                 // 2777
                                                                                                                   // 2778
exports.diffFilter = diffFilter;                                                                                   // 2779
exports.patchFilter = patchFilter;                                                                                 // 2780
exports.collectChildrenPatchFilter = collectChildrenPatchFilter;                                                   // 2781
exports.reverseFilter = reverseFilter;                                                                             // 2782
exports.collectChildrenReverseFilter = collectChildrenReverseFilter;                                               // 2783
                                                                                                                   // 2784
},{"../contexts/diff":4,"../contexts/patch":5,"../contexts/reverse":6,"./lcs":12}],11:[function(require,module,exports){
var diffFilter = function datesDiffFilter(context) {                                                               // 2786
  if (context.left instanceof Date) {                                                                              // 2787
    if (context.right instanceof Date) {                                                                           // 2788
      if (context.left.getTime() !== context.right.getTime()) {                                                    // 2789
        context.setResult([context.left, context.right]);                                                          // 2790
      } else {                                                                                                     // 2791
        context.setResult(undefined);                                                                              // 2792
      }                                                                                                            // 2793
    } else {                                                                                                       // 2794
      context.setResult([context.left, context.right]);                                                            // 2795
    }                                                                                                              // 2796
    context.exit();                                                                                                // 2797
  } else if (context.right instanceof Date) {                                                                      // 2798
    context.setResult([context.left, context.right]).exit();                                                       // 2799
  }                                                                                                                // 2800
};                                                                                                                 // 2801
diffFilter.filterName = 'dates';                                                                                   // 2802
                                                                                                                   // 2803
exports.diffFilter = diffFilter;                                                                                   // 2804
                                                                                                                   // 2805
},{}],12:[function(require,module,exports){                                                                        // 2806
/*                                                                                                                 // 2807
                                                                                                                   // 2808
LCS implementation that supports arrays or strings                                                                 // 2809
                                                                                                                   // 2810
reference: http://en.wikipedia.org/wiki/Longest_common_subsequence_problem                                         // 2811
                                                                                                                   // 2812
*/                                                                                                                 // 2813
                                                                                                                   // 2814
var defaultMatch = function(array1, array2, index1, index2) {                                                      // 2815
  return array1[index1] === array2[index2];                                                                        // 2816
};                                                                                                                 // 2817
                                                                                                                   // 2818
var lengthMatrix = function(array1, array2, match, context) {                                                      // 2819
  var len1 = array1.length;                                                                                        // 2820
  var len2 = array2.length;                                                                                        // 2821
  var x, y;                                                                                                        // 2822
                                                                                                                   // 2823
  // initialize empty matrix of len1+1 x len2+1                                                                    // 2824
  var matrix = [len1 + 1];                                                                                         // 2825
  for (x = 0; x < len1 + 1; x++) {                                                                                 // 2826
    matrix[x] = [len2 + 1];                                                                                        // 2827
    for (y = 0; y < len2 + 1; y++) {                                                                               // 2828
      matrix[x][y] = 0;                                                                                            // 2829
    }                                                                                                              // 2830
  }                                                                                                                // 2831
  matrix.match = match;                                                                                            // 2832
  // save sequence lengths for each coordinate                                                                     // 2833
  for (x = 1; x < len1 + 1; x++) {                                                                                 // 2834
    for (y = 1; y < len2 + 1; y++) {                                                                               // 2835
      if (match(array1, array2, x - 1, y - 1, context)) {                                                          // 2836
        matrix[x][y] = matrix[x - 1][y - 1] + 1;                                                                   // 2837
      } else {                                                                                                     // 2838
        matrix[x][y] = Math.max(matrix[x - 1][y], matrix[x][y - 1]);                                               // 2839
      }                                                                                                            // 2840
    }                                                                                                              // 2841
  }                                                                                                                // 2842
  return matrix;                                                                                                   // 2843
};                                                                                                                 // 2844
                                                                                                                   // 2845
var backtrack = function(matrix, array1, array2, index1, index2, context) {                                        // 2846
  if (index1 === 0 || index2 === 0) {                                                                              // 2847
    return {                                                                                                       // 2848
      sequence: [],                                                                                                // 2849
      indices1: [],                                                                                                // 2850
      indices2: []                                                                                                 // 2851
    };                                                                                                             // 2852
  }                                                                                                                // 2853
                                                                                                                   // 2854
  if (matrix.match(array1, array2, index1 - 1, index2 - 1, context)) {                                             // 2855
    var subsequence = backtrack(matrix, array1, array2, index1 - 1, index2 - 1, context);                          // 2856
    subsequence.sequence.push(array1[index1 - 1]);                                                                 // 2857
    subsequence.indices1.push(index1 - 1);                                                                         // 2858
    subsequence.indices2.push(index2 - 1);                                                                         // 2859
    return subsequence;                                                                                            // 2860
  }                                                                                                                // 2861
                                                                                                                   // 2862
  if (matrix[index1][index2 - 1] > matrix[index1 - 1][index2]) {                                                   // 2863
    return backtrack(matrix, array1, array2, index1, index2 - 1, context);                                         // 2864
  } else {                                                                                                         // 2865
    return backtrack(matrix, array1, array2, index1 - 1, index2, context);                                         // 2866
  }                                                                                                                // 2867
};                                                                                                                 // 2868
                                                                                                                   // 2869
var get = function(array1, array2, match, context) {                                                               // 2870
  context = context || {};                                                                                         // 2871
  var matrix = lengthMatrix(array1, array2, match || defaultMatch, context);                                       // 2872
  var result = backtrack(matrix, array1, array2, array1.length, array2.length, context);                           // 2873
  if (typeof array1 === 'string' && typeof array2 === 'string') {                                                  // 2874
    result.sequence = result.sequence.join('');                                                                    // 2875
  }                                                                                                                // 2876
  return result;                                                                                                   // 2877
};                                                                                                                 // 2878
                                                                                                                   // 2879
exports.get = get;                                                                                                 // 2880
                                                                                                                   // 2881
},{}],13:[function(require,module,exports){                                                                        // 2882
var DiffContext = require('../contexts/diff').DiffContext;                                                         // 2883
var PatchContext = require('../contexts/patch').PatchContext;                                                      // 2884
var ReverseContext = require('../contexts/reverse').ReverseContext;                                                // 2885
                                                                                                                   // 2886
var collectChildrenDiffFilter = function collectChildrenDiffFilter(context) {                                      // 2887
  if (!context || !context.children) {                                                                             // 2888
    return;                                                                                                        // 2889
  }                                                                                                                // 2890
  var length = context.children.length;                                                                            // 2891
  var child;                                                                                                       // 2892
  var result = context.result;                                                                                     // 2893
  for (var index = 0; index < length; index++) {                                                                   // 2894
    child = context.children[index];                                                                               // 2895
    if (typeof child.result === 'undefined') {                                                                     // 2896
      continue;                                                                                                    // 2897
    }                                                                                                              // 2898
    result = result || {};                                                                                         // 2899
    result[child.childName] = child.result;                                                                        // 2900
  }                                                                                                                // 2901
  if (result && context.leftIsArray) {                                                                             // 2902
    result._t = 'a';                                                                                               // 2903
  }                                                                                                                // 2904
  context.setResult(result).exit();                                                                                // 2905
};                                                                                                                 // 2906
collectChildrenDiffFilter.filterName = 'collectChildren';                                                          // 2907
                                                                                                                   // 2908
var objectsDiffFilter = function objectsDiffFilter(context) {                                                      // 2909
  if (context.leftIsArray || context.leftType !== 'object') {                                                      // 2910
    return;                                                                                                        // 2911
  }                                                                                                                // 2912
                                                                                                                   // 2913
  var name, child;                                                                                                 // 2914
  for (name in context.left) {                                                                                     // 2915
    child = new DiffContext(context.left[name], context.right[name]);                                              // 2916
    context.push(child, name);                                                                                     // 2917
  }                                                                                                                // 2918
  for (name in context.right) {                                                                                    // 2919
    if (typeof context.left[name] === 'undefined') {                                                               // 2920
      child = new DiffContext(undefined, context.right[name]);                                                     // 2921
      context.push(child, name);                                                                                   // 2922
    }                                                                                                              // 2923
  }                                                                                                                // 2924
                                                                                                                   // 2925
  if (!context.children || context.children.length === 0) {                                                        // 2926
    context.setResult(undefined).exit();                                                                           // 2927
    return;                                                                                                        // 2928
  }                                                                                                                // 2929
  context.exit();                                                                                                  // 2930
};                                                                                                                 // 2931
objectsDiffFilter.filterName = 'objects';                                                                          // 2932
                                                                                                                   // 2933
var patchFilter = function nestedPatchFilter(context) {                                                            // 2934
  if (!context.nested) {                                                                                           // 2935
    return;                                                                                                        // 2936
  }                                                                                                                // 2937
  if (context.delta._t) {                                                                                          // 2938
    return;                                                                                                        // 2939
  }                                                                                                                // 2940
  var name, child;                                                                                                 // 2941
  for (name in context.delta) {                                                                                    // 2942
    child = new PatchContext(context.left[name], context.delta[name]);                                             // 2943
    context.push(child, name);                                                                                     // 2944
  }                                                                                                                // 2945
  context.exit();                                                                                                  // 2946
};                                                                                                                 // 2947
patchFilter.filterName = 'objects';                                                                                // 2948
                                                                                                                   // 2949
var collectChildrenPatchFilter = function collectChildrenPatchFilter(context) {                                    // 2950
  if (!context || !context.children) {                                                                             // 2951
    return;                                                                                                        // 2952
  }                                                                                                                // 2953
  if (context.delta._t) {                                                                                          // 2954
    return;                                                                                                        // 2955
  }                                                                                                                // 2956
  var length = context.children.length;                                                                            // 2957
  var child;                                                                                                       // 2958
  for (var index = 0; index < length; index++) {                                                                   // 2959
    child = context.children[index];                                                                               // 2960
    if (context.left.hasOwnProperty(child.childName) && child.result === undefined) {                              // 2961
      delete context.left[child.childName];                                                                        // 2962
    } else if (context.left[child.childName] !== child.result) {                                                   // 2963
      context.left[child.childName] = child.result;                                                                // 2964
    }                                                                                                              // 2965
  }                                                                                                                // 2966
  context.setResult(context.left).exit();                                                                          // 2967
};                                                                                                                 // 2968
collectChildrenPatchFilter.filterName = 'collectChildren';                                                         // 2969
                                                                                                                   // 2970
var reverseFilter = function nestedReverseFilter(context) {                                                        // 2971
  if (!context.nested) {                                                                                           // 2972
    return;                                                                                                        // 2973
  }                                                                                                                // 2974
  if (context.delta._t) {                                                                                          // 2975
    return;                                                                                                        // 2976
  }                                                                                                                // 2977
  var name, child;                                                                                                 // 2978
  for (name in context.delta) {                                                                                    // 2979
    child = new ReverseContext(context.delta[name]);                                                               // 2980
    context.push(child, name);                                                                                     // 2981
  }                                                                                                                // 2982
  context.exit();                                                                                                  // 2983
};                                                                                                                 // 2984
reverseFilter.filterName = 'objects';                                                                              // 2985
                                                                                                                   // 2986
var collectChildrenReverseFilter = function collectChildrenReverseFilter(context) {                                // 2987
  if (!context || !context.children) {                                                                             // 2988
    return;                                                                                                        // 2989
  }                                                                                                                // 2990
  if (context.delta._t) {                                                                                          // 2991
    return;                                                                                                        // 2992
  }                                                                                                                // 2993
  var length = context.children.length;                                                                            // 2994
  var child;                                                                                                       // 2995
  var delta = {};                                                                                                  // 2996
  for (var index = 0; index < length; index++) {                                                                   // 2997
    child = context.children[index];                                                                               // 2998
    if (delta[child.childName] !== child.result) {                                                                 // 2999
      delta[child.childName] = child.result;                                                                       // 3000
    }                                                                                                              // 3001
  }                                                                                                                // 3002
  context.setResult(delta).exit();                                                                                 // 3003
};                                                                                                                 // 3004
collectChildrenReverseFilter.filterName = 'collectChildren';                                                       // 3005
                                                                                                                   // 3006
exports.collectChildrenDiffFilter = collectChildrenDiffFilter;                                                     // 3007
exports.objectsDiffFilter = objectsDiffFilter;                                                                     // 3008
exports.patchFilter = patchFilter;                                                                                 // 3009
exports.collectChildrenPatchFilter = collectChildrenPatchFilter;                                                   // 3010
exports.reverseFilter = reverseFilter;                                                                             // 3011
exports.collectChildrenReverseFilter = collectChildrenReverseFilter;                                               // 3012
                                                                                                                   // 3013
},{"../contexts/diff":4,"../contexts/patch":5,"../contexts/reverse":6}],14:[function(require,module,exports){      // 3014
/* global diff_match_patch */                                                                                      // 3015
var TEXT_DIFF = 2;                                                                                                 // 3016
var DEFAULT_MIN_LENGTH = 60;                                                                                       // 3017
var cachedDiffPatch = null;                                                                                        // 3018
                                                                                                                   // 3019
var getDiffMatchPatch = function(required) {                                                                       // 3020
  /*jshint camelcase: false */                                                                                     // 3021
                                                                                                                   // 3022
  if (!cachedDiffPatch) {                                                                                          // 3023
    var instance;                                                                                                  // 3024
    if (typeof diff_match_patch !== 'undefined') {                                                                 // 3025
      // already loaded, probably a browser                                                                        // 3026
      instance = typeof diff_match_patch === 'function' ?                                                          // 3027
        new diff_match_patch() : new diff_match_patch.diff_match_patch();                                          // 3028
    } else if (typeof require === 'function') {                                                                    // 3029
      try {                                                                                                        // 3030
        var dmpModuleName = 'diff_match_patch_uncompressed';                                                       // 3031
        var dmp = require('../../public/external/' + dmpModuleName);                                               // 3032
        instance = new dmp.diff_match_patch();                                                                     // 3033
      } catch (err) {                                                                                              // 3034
        instance = null;                                                                                           // 3035
      }                                                                                                            // 3036
    }                                                                                                              // 3037
    if (!instance) {                                                                                               // 3038
      if (!required) {                                                                                             // 3039
        return null;                                                                                               // 3040
      }                                                                                                            // 3041
      var error = new Error('text diff_match_patch library not found');                                            // 3042
      error.diff_match_patch_not_found = true;                                                                     // 3043
      throw error;                                                                                                 // 3044
    }                                                                                                              // 3045
    cachedDiffPatch = {                                                                                            // 3046
      diff: function(txt1, txt2) {                                                                                 // 3047
        return instance.patch_toText(instance.patch_make(txt1, txt2));                                             // 3048
      },                                                                                                           // 3049
      patch: function(txt1, patch) {                                                                               // 3050
        var results = instance.patch_apply(instance.patch_fromText(patch), txt1);                                  // 3051
        for (var i = 0; i < results[1].length; i++) {                                                              // 3052
          if (!results[1][i]) {                                                                                    // 3053
            var error = new Error('text patch failed');                                                            // 3054
            error.textPatchFailed = true;                                                                          // 3055
          }                                                                                                        // 3056
        }                                                                                                          // 3057
        return results[0];                                                                                         // 3058
      }                                                                                                            // 3059
    };                                                                                                             // 3060
  }                                                                                                                // 3061
  return cachedDiffPatch;                                                                                          // 3062
};                                                                                                                 // 3063
                                                                                                                   // 3064
var diffFilter = function textsDiffFilter(context) {                                                               // 3065
  if (context.leftType !== 'string') {                                                                             // 3066
    return;                                                                                                        // 3067
  }                                                                                                                // 3068
  var minLength = (context.options && context.options.textDiff &&                                                  // 3069
    context.options.textDiff.minLength) || DEFAULT_MIN_LENGTH;                                                     // 3070
  if (context.left.length < minLength ||                                                                           // 3071
    context.right.length < minLength) {                                                                            // 3072
    context.setResult([context.left, context.right]).exit();                                                       // 3073
    return;                                                                                                        // 3074
  }                                                                                                                // 3075
  // large text, try to use a text-diff algorithm                                                                  // 3076
  var diffMatchPatch = getDiffMatchPatch();                                                                        // 3077
  if (!diffMatchPatch) {                                                                                           // 3078
    // diff-match-patch library not available, fallback to regular string replace                                  // 3079
    context.setResult([context.left, context.right]).exit();                                                       // 3080
    return;                                                                                                        // 3081
  }                                                                                                                // 3082
  var diff = diffMatchPatch.diff;                                                                                  // 3083
  context.setResult([diff(context.left, context.right), 0, TEXT_DIFF]).exit();                                     // 3084
};                                                                                                                 // 3085
diffFilter.filterName = 'texts';                                                                                   // 3086
                                                                                                                   // 3087
var patchFilter = function textsPatchFilter(context) {                                                             // 3088
  if (context.nested) {                                                                                            // 3089
    return;                                                                                                        // 3090
  }                                                                                                                // 3091
  if (context.delta[2] !== TEXT_DIFF) {                                                                            // 3092
    return;                                                                                                        // 3093
  }                                                                                                                // 3094
                                                                                                                   // 3095
  // text-diff, use a text-patch algorithm                                                                         // 3096
  var patch = getDiffMatchPatch(true).patch;                                                                       // 3097
  context.setResult(patch(context.left, context.delta[0])).exit();                                                 // 3098
};                                                                                                                 // 3099
patchFilter.filterName = 'texts';                                                                                  // 3100
                                                                                                                   // 3101
var textDeltaReverse = function(delta) {                                                                           // 3102
  var i, l, lines, line, lineTmp, header = null,                                                                   // 3103
    headerRegex = /^@@ +\-(\d+),(\d+) +\+(\d+),(\d+) +@@$/,                                                        // 3104
    lineHeader, lineAdd, lineRemove;                                                                               // 3105
  lines = delta.split('\n');                                                                                       // 3106
  for (i = 0, l = lines.length; i < l; i++) {                                                                      // 3107
    line = lines[i];                                                                                               // 3108
    var lineStart = line.slice(0, 1);                                                                              // 3109
    if (lineStart === '@') {                                                                                       // 3110
      header = headerRegex.exec(line);                                                                             // 3111
      lineHeader = i;                                                                                              // 3112
      lineAdd = null;                                                                                              // 3113
      lineRemove = null;                                                                                           // 3114
                                                                                                                   // 3115
      // fix header                                                                                                // 3116
      lines[lineHeader] = '@@ -' + header[3] + ',' + header[4] + ' +' + header[1] + ',' + header[2] + ' @@';       // 3117
    } else if (lineStart === '+') {                                                                                // 3118
      lineAdd = i;                                                                                                 // 3119
      lines[i] = '-' + lines[i].slice(1);                                                                          // 3120
      if (lines[i - 1].slice(0, 1) === '+') {                                                                      // 3121
        // swap lines to keep default order (-+)                                                                   // 3122
        lineTmp = lines[i];                                                                                        // 3123
        lines[i] = lines[i - 1];                                                                                   // 3124
        lines[i - 1] = lineTmp;                                                                                    // 3125
      }                                                                                                            // 3126
    } else if (lineStart === '-') {                                                                                // 3127
      lineRemove = i;                                                                                              // 3128
      lines[i] = '+' + lines[i].slice(1);                                                                          // 3129
    }                                                                                                              // 3130
  }                                                                                                                // 3131
  return lines.join('\n');                                                                                         // 3132
};                                                                                                                 // 3133
                                                                                                                   // 3134
var reverseFilter = function textsReverseFilter(context) {                                                         // 3135
  if (context.nested) {                                                                                            // 3136
    return;                                                                                                        // 3137
  }                                                                                                                // 3138
  if (context.delta[2] !== TEXT_DIFF) {                                                                            // 3139
    return;                                                                                                        // 3140
  }                                                                                                                // 3141
                                                                                                                   // 3142
  // text-diff, use a text-diff algorithm                                                                          // 3143
  context.setResult([textDeltaReverse(context.delta[0]), 0, TEXT_DIFF]).exit();                                    // 3144
};                                                                                                                 // 3145
reverseFilter.filterName = 'texts';                                                                                // 3146
                                                                                                                   // 3147
exports.diffFilter = diffFilter;                                                                                   // 3148
exports.patchFilter = patchFilter;                                                                                 // 3149
exports.reverseFilter = reverseFilter;                                                                             // 3150
                                                                                                                   // 3151
},{}],15:[function(require,module,exports){                                                                        // 3152
var isArray = (typeof Array.isArray === 'function') ?                                                              // 3153
  // use native function                                                                                           // 3154
  Array.isArray :                                                                                                  // 3155
  // use instanceof operator                                                                                       // 3156
  function(a) {                                                                                                    // 3157
    return a instanceof Array;                                                                                     // 3158
  };                                                                                                               // 3159
                                                                                                                   // 3160
var diffFilter = function trivialMatchesDiffFilter(context) {                                                      // 3161
  if (context.left === context.right) {                                                                            // 3162
    context.setResult(undefined).exit();                                                                           // 3163
    return;                                                                                                        // 3164
  }                                                                                                                // 3165
  if (typeof context.left === 'undefined') {                                                                       // 3166
    if (typeof context.right === 'function') {                                                                     // 3167
      throw new Error('functions are not supported');                                                              // 3168
    }                                                                                                              // 3169
    context.setResult([context.right]).exit();                                                                     // 3170
    return;                                                                                                        // 3171
  }                                                                                                                // 3172
  if (typeof context.right === 'undefined') {                                                                      // 3173
    context.setResult([context.left, 0, 0]).exit();                                                                // 3174
    return;                                                                                                        // 3175
  }                                                                                                                // 3176
  if (typeof context.left === 'function' || typeof context.right === 'function') {                                 // 3177
    throw new Error('functions are not supported');                                                                // 3178
  }                                                                                                                // 3179
  context.leftType = context.left === null ? 'null' : typeof context.left;                                         // 3180
  context.rightType = context.right === null ? 'null' : typeof context.right;                                      // 3181
  if (context.leftType !== context.rightType) {                                                                    // 3182
    context.setResult([context.left, context.right]).exit();                                                       // 3183
    return;                                                                                                        // 3184
  }                                                                                                                // 3185
  if (context.leftType === 'boolean' || context.leftType === 'number') {                                           // 3186
    context.setResult([context.left, context.right]).exit();                                                       // 3187
    return;                                                                                                        // 3188
  }                                                                                                                // 3189
  if (context.leftType === 'object') {                                                                             // 3190
    context.leftIsArray = isArray(context.left);                                                                   // 3191
  }                                                                                                                // 3192
  if (context.rightType === 'object') {                                                                            // 3193
    context.rightIsArray = isArray(context.right);                                                                 // 3194
  }                                                                                                                // 3195
  if (context.leftIsArray !== context.rightIsArray) {                                                              // 3196
    context.setResult([context.left, context.right]).exit();                                                       // 3197
    return;                                                                                                        // 3198
  }                                                                                                                // 3199
};                                                                                                                 // 3200
diffFilter.filterName = 'trivial';                                                                                 // 3201
                                                                                                                   // 3202
var patchFilter = function trivialMatchesPatchFilter(context) {                                                    // 3203
  if (typeof context.delta === 'undefined') {                                                                      // 3204
    context.setResult(context.left).exit();                                                                        // 3205
    return;                                                                                                        // 3206
  }                                                                                                                // 3207
  context.nested = !isArray(context.delta);                                                                        // 3208
  if (context.nested) {                                                                                            // 3209
    return;                                                                                                        // 3210
  }                                                                                                                // 3211
  if (context.delta.length === 1) {                                                                                // 3212
    context.setResult(context.delta[0]).exit();                                                                    // 3213
    return;                                                                                                        // 3214
  }                                                                                                                // 3215
  if (context.delta.length === 2) {                                                                                // 3216
    context.setResult(context.delta[1]).exit();                                                                    // 3217
    return;                                                                                                        // 3218
  }                                                                                                                // 3219
  if (context.delta.length === 3 && context.delta[2] === 0) {                                                      // 3220
    context.setResult(undefined).exit();                                                                           // 3221
    return;                                                                                                        // 3222
  }                                                                                                                // 3223
};                                                                                                                 // 3224
patchFilter.filterName = 'trivial';                                                                                // 3225
                                                                                                                   // 3226
var reverseFilter = function trivialReferseFilter(context) {                                                       // 3227
  if (typeof context.delta === 'undefined') {                                                                      // 3228
    context.setResult(context.delta).exit();                                                                       // 3229
    return;                                                                                                        // 3230
  }                                                                                                                // 3231
  context.nested = !isArray(context.delta);                                                                        // 3232
  if (context.nested) {                                                                                            // 3233
    return;                                                                                                        // 3234
  }                                                                                                                // 3235
  if (context.delta.length === 1) {                                                                                // 3236
    context.setResult([context.delta[0], 0, 0]).exit();                                                            // 3237
    return;                                                                                                        // 3238
  }                                                                                                                // 3239
  if (context.delta.length === 2) {                                                                                // 3240
    context.setResult([context.delta[1], context.delta[0]]).exit();                                                // 3241
    return;                                                                                                        // 3242
  }                                                                                                                // 3243
  if (context.delta.length === 3 && context.delta[2] === 0) {                                                      // 3244
    context.setResult([context.delta[0]]).exit();                                                                  // 3245
    return;                                                                                                        // 3246
  }                                                                                                                // 3247
};                                                                                                                 // 3248
reverseFilter.filterName = 'trivial';                                                                              // 3249
                                                                                                                   // 3250
exports.diffFilter = diffFilter;                                                                                   // 3251
exports.patchFilter = patchFilter;                                                                                 // 3252
exports.reverseFilter = reverseFilter;                                                                             // 3253
                                                                                                                   // 3254
},{}],16:[function(require,module,exports){                                                                        // 3255
                                                                                                                   // 3256
var environment = require('./environment');                                                                        // 3257
                                                                                                                   // 3258
var DiffPatcher = require('./diffpatcher').DiffPatcher;                                                            // 3259
exports.DiffPatcher = DiffPatcher;                                                                                 // 3260
                                                                                                                   // 3261
exports.create = function(options){                                                                                // 3262
	return new DiffPatcher(options);                                                                                  // 3263
};                                                                                                                 // 3264
                                                                                                                   // 3265
exports.dateReviver = require('./date-reviver');                                                                   // 3266
                                                                                                                   // 3267
var defaultInstance;                                                                                               // 3268
                                                                                                                   // 3269
exports.diff = function() {                                                                                        // 3270
	if (!defaultInstance) {                                                                                           // 3271
		defaultInstance = new DiffPatcher();                                                                             // 3272
	}                                                                                                                 // 3273
	return defaultInstance.diff.apply(defaultInstance, arguments);                                                    // 3274
};                                                                                                                 // 3275
                                                                                                                   // 3276
exports.patch = function() {                                                                                       // 3277
	if (!defaultInstance) {                                                                                           // 3278
		defaultInstance = new DiffPatcher();                                                                             // 3279
	}                                                                                                                 // 3280
	return defaultInstance.patch.apply(defaultInstance, arguments);                                                   // 3281
};                                                                                                                 // 3282
                                                                                                                   // 3283
exports.unpatch = function() {                                                                                     // 3284
	if (!defaultInstance) {                                                                                           // 3285
		defaultInstance = new DiffPatcher();                                                                             // 3286
	}                                                                                                                 // 3287
	return defaultInstance.unpatch.apply(defaultInstance, arguments);                                                 // 3288
};                                                                                                                 // 3289
                                                                                                                   // 3290
exports.reverse = function() {                                                                                     // 3291
	if (!defaultInstance) {                                                                                           // 3292
		defaultInstance = new DiffPatcher();                                                                             // 3293
	}                                                                                                                 // 3294
	return defaultInstance.reverse.apply(defaultInstance, arguments);                                                 // 3295
};                                                                                                                 // 3296
                                                                                                                   // 3297
if (environment.isBrowser) {                                                                                       // 3298
	exports.homepage = 'https://github.com/benjamine/jsondiffpatch';                                                  // 3299
	exports.version = '0.1.37';                                                                                       // 3300
} else {                                                                                                           // 3301
	var packageInfoModuleName = '../package.json';                                                                    // 3302
	var packageInfo = require(packageInfoModuleName);                                                                 // 3303
	exports.homepage = packageInfo.homepage;                                                                          // 3304
	exports.version = packageInfo.version;                                                                            // 3305
                                                                                                                   // 3306
	var formatterModuleName = './formatters';                                                                         // 3307
	var formatters = require(formatterModuleName);                                                                    // 3308
	exports.formatters = formatters;                                                                                  // 3309
	// shortcut for console                                                                                           // 3310
	exports.console = formatters.console;                                                                             // 3311
}                                                                                                                  // 3312
                                                                                                                   // 3313
},{"./date-reviver":7,"./diffpatcher":8,"./environment":9}],17:[function(require,module,exports){                  // 3314
var Pipe = function Pipe(name) {                                                                                   // 3315
  this.name = name;                                                                                                // 3316
  this.filters = [];                                                                                               // 3317
};                                                                                                                 // 3318
                                                                                                                   // 3319
Pipe.prototype.process = function(input) {                                                                         // 3320
  if (!this.processor) {                                                                                           // 3321
    throw new Error('add this pipe to a processor before using it');                                               // 3322
  }                                                                                                                // 3323
  var debug = this.debug;                                                                                          // 3324
  var length = this.filters.length;                                                                                // 3325
  var context = input;                                                                                             // 3326
  for (var index = 0; index < length; index++) {                                                                   // 3327
    var filter = this.filters[index];                                                                              // 3328
    if (debug) {                                                                                                   // 3329
      this.log('filter: ' + filter.filterName);                                                                    // 3330
    }                                                                                                              // 3331
    filter(context);                                                                                               // 3332
    if (typeof context === 'object' && context.exiting) {                                                          // 3333
      context.exiting = false;                                                                                     // 3334
      break;                                                                                                       // 3335
    }                                                                                                              // 3336
  }                                                                                                                // 3337
  if (!context.next && this.resultCheck) {                                                                         // 3338
    this.resultCheck(context);                                                                                     // 3339
  }                                                                                                                // 3340
};                                                                                                                 // 3341
                                                                                                                   // 3342
Pipe.prototype.log = function(msg) {                                                                               // 3343
  console.log('[jsondiffpatch] ' + this.name + ' pipe, ' + msg);                                                   // 3344
};                                                                                                                 // 3345
                                                                                                                   // 3346
Pipe.prototype.append = function() {                                                                               // 3347
  this.filters.push.apply(this.filters, arguments);                                                                // 3348
  return this;                                                                                                     // 3349
};                                                                                                                 // 3350
                                                                                                                   // 3351
Pipe.prototype.prepend = function() {                                                                              // 3352
  this.filters.unshift.apply(this.filters, arguments);                                                             // 3353
  return this;                                                                                                     // 3354
};                                                                                                                 // 3355
                                                                                                                   // 3356
Pipe.prototype.indexOf = function(filterName) {                                                                    // 3357
  if (!filterName) {                                                                                               // 3358
    throw new Error('a filter name is required');                                                                  // 3359
  }                                                                                                                // 3360
  for (var index = 0; index < this.filters.length; index++) {                                                      // 3361
    var filter = this.filters[index];                                                                              // 3362
    if (filter.filterName === filterName) {                                                                        // 3363
      return index;                                                                                                // 3364
    }                                                                                                              // 3365
  }                                                                                                                // 3366
  throw new Error('filter not found: ' + filterName);                                                              // 3367
};                                                                                                                 // 3368
                                                                                                                   // 3369
Pipe.prototype.list = function() {                                                                                 // 3370
  var names = [];                                                                                                  // 3371
  for (var index = 0; index < this.filters.length; index++) {                                                      // 3372
    var filter = this.filters[index];                                                                              // 3373
    names.push(filter.filterName);                                                                                 // 3374
  }                                                                                                                // 3375
  return names;                                                                                                    // 3376
};                                                                                                                 // 3377
                                                                                                                   // 3378
Pipe.prototype.after = function(filterName) {                                                                      // 3379
  var index = this.indexOf(filterName);                                                                            // 3380
  var params = Array.prototype.slice.call(arguments, 1);                                                           // 3381
  if (!params.length) {                                                                                            // 3382
    throw new Error('a filter is required');                                                                       // 3383
  }                                                                                                                // 3384
  params.unshift(index + 1, 0);                                                                                    // 3385
  Array.prototype.splice.apply(this.filters, params);                                                              // 3386
  return this;                                                                                                     // 3387
};                                                                                                                 // 3388
                                                                                                                   // 3389
Pipe.prototype.before = function(filterName) {                                                                     // 3390
  var index = this.indexOf(filterName);                                                                            // 3391
  var params = Array.prototype.slice.call(arguments, 1);                                                           // 3392
  if (!params.length) {                                                                                            // 3393
    throw new Error('a filter is required');                                                                       // 3394
  }                                                                                                                // 3395
  params.unshift(index, 0);                                                                                        // 3396
  Array.prototype.splice.apply(this.filters, params);                                                              // 3397
  return this;                                                                                                     // 3398
};                                                                                                                 // 3399
                                                                                                                   // 3400
Pipe.prototype.clear = function() {                                                                                // 3401
  this.filters.length = 0;                                                                                         // 3402
  return this;                                                                                                     // 3403
};                                                                                                                 // 3404
                                                                                                                   // 3405
Pipe.prototype.shouldHaveResult = function(should) {                                                               // 3406
  if (should === false) {                                                                                          // 3407
    this.resultCheck = null;                                                                                       // 3408
    return;                                                                                                        // 3409
  }                                                                                                                // 3410
  if (this.resultCheck) {                                                                                          // 3411
    return;                                                                                                        // 3412
  }                                                                                                                // 3413
  var pipe = this;                                                                                                 // 3414
  this.resultCheck = function(context) {                                                                           // 3415
    if (!context.hasResult) {                                                                                      // 3416
      console.log(context);                                                                                        // 3417
      var error = new Error(pipe.name + ' failed');                                                                // 3418
      error.noResult = true;                                                                                       // 3419
      throw error;                                                                                                 // 3420
    }                                                                                                              // 3421
  };                                                                                                               // 3422
  return this;                                                                                                     // 3423
};                                                                                                                 // 3424
                                                                                                                   // 3425
exports.Pipe = Pipe;                                                                                               // 3426
                                                                                                                   // 3427
},{}],18:[function(require,module,exports){                                                                        // 3428
                                                                                                                   // 3429
var Processor = function Processor(options){                                                                       // 3430
	this.selfOptions = options;                                                                                       // 3431
	this.pipes = {};                                                                                                  // 3432
};                                                                                                                 // 3433
                                                                                                                   // 3434
Processor.prototype.options = function(options) {                                                                  // 3435
	if (options) {                                                                                                    // 3436
		this.selfOptions = options;                                                                                      // 3437
	}                                                                                                                 // 3438
	return this.selfOptions;                                                                                          // 3439
};                                                                                                                 // 3440
                                                                                                                   // 3441
Processor.prototype.pipe = function(name, pipe) {                                                                  // 3442
	if (typeof name === 'string') {                                                                                   // 3443
		if (typeof pipe === 'undefined') {                                                                               // 3444
			return this.pipes[name];                                                                                        // 3445
		} else {                                                                                                         // 3446
			this.pipes[name] = pipe;                                                                                        // 3447
		}                                                                                                                // 3448
	}                                                                                                                 // 3449
	if (name && name.name) {                                                                                          // 3450
		pipe = name;                                                                                                     // 3451
		if (pipe.processor === this) { return pipe; }                                                                    // 3452
		this.pipes[pipe.name] = pipe;                                                                                    // 3453
	}                                                                                                                 // 3454
	pipe.processor = this;                                                                                            // 3455
	return pipe;                                                                                                      // 3456
};                                                                                                                 // 3457
                                                                                                                   // 3458
Processor.prototype.process = function(input, pipe) {                                                              // 3459
	var context = input;                                                                                              // 3460
	context.options = this.options();                                                                                 // 3461
	var nextPipe = pipe || input.pipe || 'default';                                                                   // 3462
	var lastPipe, lastContext;                                                                                        // 3463
	while (nextPipe) {                                                                                                // 3464
		if (typeof context.nextAfterChildren !== 'undefined') {                                                          // 3465
			// children processed and coming back to parent                                                                 // 3466
			context.next = context.nextAfterChildren;                                                                       // 3467
			context.nextAfterChildren = null;                                                                               // 3468
		}                                                                                                                // 3469
                                                                                                                   // 3470
		if (typeof nextPipe === 'string') {                                                                              // 3471
			nextPipe = this.pipe(nextPipe);                                                                                 // 3472
		}                                                                                                                // 3473
		nextPipe.process(context);                                                                                       // 3474
		lastContext = context;                                                                                           // 3475
		lastPipe = nextPipe;                                                                                             // 3476
		nextPipe = null;                                                                                                 // 3477
		if (context) {                                                                                                   // 3478
			if (context.next) {                                                                                             // 3479
				context = context.next;                                                                                        // 3480
				nextPipe = lastContext.nextPipe || context.pipe || lastPipe;                                                   // 3481
			}                                                                                                               // 3482
		}                                                                                                                // 3483
	}                                                                                                                 // 3484
	return context.hasResult ? context.result : undefined;                                                            // 3485
};                                                                                                                 // 3486
                                                                                                                   // 3487
exports.Processor = Processor;                                                                                     // 3488
                                                                                                                   // 3489
},{}]},{},[1])(1)                                                                                                  // 3490
});                                                                                                                // 3491
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9maWJlcmdsYXNzL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvbWFpbi1mdWxsLmpzIiwicHVibGljL2V4dGVybmFsL2RpZmZfbWF0Y2hfcGF0Y2hfdW5jb21wcmVzc2VkLmpzIiwic3JjL2NvbnRleHRzL2NvbnRleHQuanMiLCJzcmMvY29udGV4dHMvZGlmZi5qcyIsInNyYy9jb250ZXh0cy9wYXRjaC5qcyIsInNyYy9jb250ZXh0cy9yZXZlcnNlLmpzIiwic3JjL2RhdGUtcmV2aXZlci5qcyIsInNyYy9kaWZmcGF0Y2hlci5qcyIsInNyYy9lbnZpcm9ubWVudC5qcyIsInNyYy9maWx0ZXJzL2FycmF5cy5qcyIsInNyYy9maWx0ZXJzL2RhdGVzLmpzIiwic3JjL2ZpbHRlcnMvbGNzLmpzIiwic3JjL2ZpbHRlcnMvbmVzdGVkLmpzIiwic3JjL2ZpbHRlcnMvdGV4dHMuanMiLCJzcmMvZmlsdGVycy90cml2aWFsLmpzIiwic3JjL21haW4uanMiLCJzcmMvcGlwZS5qcyIsInNyYy9wcm9jZXNzb3IuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDam5FQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0RBO0FBQ0E7QUFDQTs7QUNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0YkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgZW52aXJvbm1lbnQgPSByZXF1aXJlKCcuL2Vudmlyb25tZW50Jyk7XG5cbmlmIChlbnZpcm9ubWVudC5pc0Jyb3dzZXIpIHtcbiAgLyogZ2xvYmFsIHdpbmRvdyAqL1xuICAvKiBqc2hpbnQgY2FtZWxjYXNlOiBmYWxzZSAqL1xuICB3aW5kb3cuZGlmZl9tYXRjaF9wYXRjaCA9IHJlcXVpcmUoJy4uL3B1YmxpYy9leHRlcm5hbC9kaWZmX21hdGNoX3BhdGNoX3VuY29tcHJlc3NlZCcpO1xuICAvKiBqc2hpbnQgY2FtZWxjYXNlOiB0cnVlICovXG59XG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9tYWluJyk7XG4iLCIvKipcbiAqIERpZmYgTWF0Y2ggYW5kIFBhdGNoXG4gKlxuICogQ29weXJpZ2h0IDIwMDYgR29vZ2xlIEluYy5cbiAqIGh0dHA6Ly9jb2RlLmdvb2dsZS5jb20vcC9nb29nbGUtZGlmZi1tYXRjaC1wYXRjaC9cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi8qKlxuICogQGZpbGVvdmVydmlldyBDb21wdXRlcyB0aGUgZGlmZmVyZW5jZSBiZXR3ZWVuIHR3byB0ZXh0cyB0byBjcmVhdGUgYSBwYXRjaC5cbiAqIEFwcGxpZXMgdGhlIHBhdGNoIG9udG8gYW5vdGhlciB0ZXh0LCBhbGxvd2luZyBmb3IgZXJyb3JzLlxuICogQGF1dGhvciBmcmFzZXJAZ29vZ2xlLmNvbSAoTmVpbCBGcmFzZXIpXG4gKi9cblxuLyoqXG4gKiBDbGFzcyBjb250YWluaW5nIHRoZSBkaWZmLCBtYXRjaCBhbmQgcGF0Y2ggbWV0aG9kcy5cbiAqIEBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBkaWZmX21hdGNoX3BhdGNoKCkge1xuXG4gIC8vIERlZmF1bHRzLlxuICAvLyBSZWRlZmluZSB0aGVzZSBpbiB5b3VyIHByb2dyYW0gdG8gb3ZlcnJpZGUgdGhlIGRlZmF1bHRzLlxuXG4gIC8vIE51bWJlciBvZiBzZWNvbmRzIHRvIG1hcCBhIGRpZmYgYmVmb3JlIGdpdmluZyB1cCAoMCBmb3IgaW5maW5pdHkpLlxuICB0aGlzLkRpZmZfVGltZW91dCA9IDEuMDtcbiAgLy8gQ29zdCBvZiBhbiBlbXB0eSBlZGl0IG9wZXJhdGlvbiBpbiB0ZXJtcyBvZiBlZGl0IGNoYXJhY3RlcnMuXG4gIHRoaXMuRGlmZl9FZGl0Q29zdCA9IDQ7XG4gIC8vIEF0IHdoYXQgcG9pbnQgaXMgbm8gbWF0Y2ggZGVjbGFyZWQgKDAuMCA9IHBlcmZlY3Rpb24sIDEuMCA9IHZlcnkgbG9vc2UpLlxuICB0aGlzLk1hdGNoX1RocmVzaG9sZCA9IDAuNTtcbiAgLy8gSG93IGZhciB0byBzZWFyY2ggZm9yIGEgbWF0Y2ggKDAgPSBleGFjdCBsb2NhdGlvbiwgMTAwMCsgPSBicm9hZCBtYXRjaCkuXG4gIC8vIEEgbWF0Y2ggdGhpcyBtYW55IGNoYXJhY3RlcnMgYXdheSBmcm9tIHRoZSBleHBlY3RlZCBsb2NhdGlvbiB3aWxsIGFkZFxuICAvLyAxLjAgdG8gdGhlIHNjb3JlICgwLjAgaXMgYSBwZXJmZWN0IG1hdGNoKS5cbiAgdGhpcy5NYXRjaF9EaXN0YW5jZSA9IDEwMDA7XG4gIC8vIFdoZW4gZGVsZXRpbmcgYSBsYXJnZSBibG9jayBvZiB0ZXh0IChvdmVyIH42NCBjaGFyYWN0ZXJzKSwgaG93IGNsb3NlIGRvZXNcbiAgLy8gdGhlIGNvbnRlbnRzIGhhdmUgdG8gbWF0Y2ggdGhlIGV4cGVjdGVkIGNvbnRlbnRzLiAoMC4wID0gcGVyZmVjdGlvbixcbiAgLy8gMS4wID0gdmVyeSBsb29zZSkuICBOb3RlIHRoYXQgTWF0Y2hfVGhyZXNob2xkIGNvbnRyb2xzIGhvdyBjbG9zZWx5IHRoZVxuICAvLyBlbmQgcG9pbnRzIG9mIGEgZGVsZXRlIG5lZWQgdG8gbWF0Y2guXG4gIHRoaXMuUGF0Y2hfRGVsZXRlVGhyZXNob2xkID0gMC41O1xuICAvLyBDaHVuayBzaXplIGZvciBjb250ZXh0IGxlbmd0aC5cbiAgdGhpcy5QYXRjaF9NYXJnaW4gPSA0O1xuXG4gIC8vIFRoZSBudW1iZXIgb2YgYml0cyBpbiBhbiBpbnQuXG4gIHRoaXMuTWF0Y2hfTWF4Qml0cyA9IDMyO1xufVxuXG5cbi8vICBESUZGIEZVTkNUSU9OU1xuXG5cbi8qKlxuICogVGhlIGRhdGEgc3RydWN0dXJlIHJlcHJlc2VudGluZyBhIGRpZmYgaXMgYW4gYXJyYXkgb2YgdHVwbGVzOlxuICogW1tESUZGX0RFTEVURSwgJ0hlbGxvJ10sIFtESUZGX0lOU0VSVCwgJ0dvb2RieWUnXSwgW0RJRkZfRVFVQUwsICcgd29ybGQuJ11dXG4gKiB3aGljaCBtZWFuczogZGVsZXRlICdIZWxsbycsIGFkZCAnR29vZGJ5ZScgYW5kIGtlZXAgJyB3b3JsZC4nXG4gKi9cbnZhciBESUZGX0RFTEVURSA9IC0xO1xudmFyIERJRkZfSU5TRVJUID0gMTtcbnZhciBESUZGX0VRVUFMID0gMDtcblxuLyoqIEB0eXBlZGVmIHshQXJyYXkuPG51bWJlcnxzdHJpbmc+fSAqL1xuZGlmZl9tYXRjaF9wYXRjaC5EaWZmO1xuXG5cbi8qKlxuICogRmluZCB0aGUgZGlmZmVyZW5jZXMgYmV0d2VlbiB0d28gdGV4dHMuICBTaW1wbGlmaWVzIHRoZSBwcm9ibGVtIGJ5IHN0cmlwcGluZ1xuICogYW55IGNvbW1vbiBwcmVmaXggb3Igc3VmZml4IG9mZiB0aGUgdGV4dHMgYmVmb3JlIGRpZmZpbmcuXG4gKiBAcGFyYW0ge3N0cmluZ30gdGV4dDEgT2xkIHN0cmluZyB0byBiZSBkaWZmZWQuXG4gKiBAcGFyYW0ge3N0cmluZ30gdGV4dDIgTmV3IHN0cmluZyB0byBiZSBkaWZmZWQuXG4gKiBAcGFyYW0ge2Jvb2xlYW49fSBvcHRfY2hlY2tsaW5lcyBPcHRpb25hbCBzcGVlZHVwIGZsYWcuIElmIHByZXNlbnQgYW5kIGZhbHNlLFxuICogICAgIHRoZW4gZG9uJ3QgcnVuIGEgbGluZS1sZXZlbCBkaWZmIGZpcnN0IHRvIGlkZW50aWZ5IHRoZSBjaGFuZ2VkIGFyZWFzLlxuICogICAgIERlZmF1bHRzIHRvIHRydWUsIHdoaWNoIGRvZXMgYSBmYXN0ZXIsIHNsaWdodGx5IGxlc3Mgb3B0aW1hbCBkaWZmLlxuICogQHBhcmFtIHtudW1iZXJ9IG9wdF9kZWFkbGluZSBPcHRpb25hbCB0aW1lIHdoZW4gdGhlIGRpZmYgc2hvdWxkIGJlIGNvbXBsZXRlXG4gKiAgICAgYnkuICBVc2VkIGludGVybmFsbHkgZm9yIHJlY3Vyc2l2ZSBjYWxscy4gIFVzZXJzIHNob3VsZCBzZXQgRGlmZlRpbWVvdXRcbiAqICAgICBpbnN0ZWFkLlxuICogQHJldHVybiB7IUFycmF5LjwhZGlmZl9tYXRjaF9wYXRjaC5EaWZmPn0gQXJyYXkgb2YgZGlmZiB0dXBsZXMuXG4gKi9cbmRpZmZfbWF0Y2hfcGF0Y2gucHJvdG90eXBlLmRpZmZfbWFpbiA9IGZ1bmN0aW9uKHRleHQxLCB0ZXh0Miwgb3B0X2NoZWNrbGluZXMsXG4gICAgb3B0X2RlYWRsaW5lKSB7XG4gIC8vIFNldCBhIGRlYWRsaW5lIGJ5IHdoaWNoIHRpbWUgdGhlIGRpZmYgbXVzdCBiZSBjb21wbGV0ZS5cbiAgaWYgKHR5cGVvZiBvcHRfZGVhZGxpbmUgPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBpZiAodGhpcy5EaWZmX1RpbWVvdXQgPD0gMCkge1xuICAgICAgb3B0X2RlYWRsaW5lID0gTnVtYmVyLk1BWF9WQUxVRTtcbiAgICB9IGVsc2Uge1xuICAgICAgb3B0X2RlYWRsaW5lID0gKG5ldyBEYXRlKS5nZXRUaW1lKCkgKyB0aGlzLkRpZmZfVGltZW91dCAqIDEwMDA7XG4gICAgfVxuICB9XG4gIHZhciBkZWFkbGluZSA9IG9wdF9kZWFkbGluZTtcblxuICAvLyBDaGVjayBmb3IgbnVsbCBpbnB1dHMuXG4gIGlmICh0ZXh0MSA9PSBudWxsIHx8IHRleHQyID09IG51bGwpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ051bGwgaW5wdXQuIChkaWZmX21haW4pJyk7XG4gIH1cblxuICAvLyBDaGVjayBmb3IgZXF1YWxpdHkgKHNwZWVkdXApLlxuICBpZiAodGV4dDEgPT0gdGV4dDIpIHtcbiAgICBpZiAodGV4dDEpIHtcbiAgICAgIHJldHVybiBbW0RJRkZfRVFVQUwsIHRleHQxXV07XG4gICAgfVxuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIGlmICh0eXBlb2Ygb3B0X2NoZWNrbGluZXMgPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBvcHRfY2hlY2tsaW5lcyA9IHRydWU7XG4gIH1cbiAgdmFyIGNoZWNrbGluZXMgPSBvcHRfY2hlY2tsaW5lcztcblxuICAvLyBUcmltIG9mZiBjb21tb24gcHJlZml4IChzcGVlZHVwKS5cbiAgdmFyIGNvbW1vbmxlbmd0aCA9IHRoaXMuZGlmZl9jb21tb25QcmVmaXgodGV4dDEsIHRleHQyKTtcbiAgdmFyIGNvbW1vbnByZWZpeCA9IHRleHQxLnN1YnN0cmluZygwLCBjb21tb25sZW5ndGgpO1xuICB0ZXh0MSA9IHRleHQxLnN1YnN0cmluZyhjb21tb25sZW5ndGgpO1xuICB0ZXh0MiA9IHRleHQyLnN1YnN0cmluZyhjb21tb25sZW5ndGgpO1xuXG4gIC8vIFRyaW0gb2ZmIGNvbW1vbiBzdWZmaXggKHNwZWVkdXApLlxuICBjb21tb25sZW5ndGggPSB0aGlzLmRpZmZfY29tbW9uU3VmZml4KHRleHQxLCB0ZXh0Mik7XG4gIHZhciBjb21tb25zdWZmaXggPSB0ZXh0MS5zdWJzdHJpbmcodGV4dDEubGVuZ3RoIC0gY29tbW9ubGVuZ3RoKTtcbiAgdGV4dDEgPSB0ZXh0MS5zdWJzdHJpbmcoMCwgdGV4dDEubGVuZ3RoIC0gY29tbW9ubGVuZ3RoKTtcbiAgdGV4dDIgPSB0ZXh0Mi5zdWJzdHJpbmcoMCwgdGV4dDIubGVuZ3RoIC0gY29tbW9ubGVuZ3RoKTtcblxuICAvLyBDb21wdXRlIHRoZSBkaWZmIG9uIHRoZSBtaWRkbGUgYmxvY2suXG4gIHZhciBkaWZmcyA9IHRoaXMuZGlmZl9jb21wdXRlXyh0ZXh0MSwgdGV4dDIsIGNoZWNrbGluZXMsIGRlYWRsaW5lKTtcblxuICAvLyBSZXN0b3JlIHRoZSBwcmVmaXggYW5kIHN1ZmZpeC5cbiAgaWYgKGNvbW1vbnByZWZpeCkge1xuICAgIGRpZmZzLnVuc2hpZnQoW0RJRkZfRVFVQUwsIGNvbW1vbnByZWZpeF0pO1xuICB9XG4gIGlmIChjb21tb25zdWZmaXgpIHtcbiAgICBkaWZmcy5wdXNoKFtESUZGX0VRVUFMLCBjb21tb25zdWZmaXhdKTtcbiAgfVxuICB0aGlzLmRpZmZfY2xlYW51cE1lcmdlKGRpZmZzKTtcbiAgcmV0dXJuIGRpZmZzO1xufTtcblxuXG4vKipcbiAqIEZpbmQgdGhlIGRpZmZlcmVuY2VzIGJldHdlZW4gdHdvIHRleHRzLiAgQXNzdW1lcyB0aGF0IHRoZSB0ZXh0cyBkbyBub3RcbiAqIGhhdmUgYW55IGNvbW1vbiBwcmVmaXggb3Igc3VmZml4LlxuICogQHBhcmFtIHtzdHJpbmd9IHRleHQxIE9sZCBzdHJpbmcgdG8gYmUgZGlmZmVkLlxuICogQHBhcmFtIHtzdHJpbmd9IHRleHQyIE5ldyBzdHJpbmcgdG8gYmUgZGlmZmVkLlxuICogQHBhcmFtIHtib29sZWFufSBjaGVja2xpbmVzIFNwZWVkdXAgZmxhZy4gIElmIGZhbHNlLCB0aGVuIGRvbid0IHJ1biBhXG4gKiAgICAgbGluZS1sZXZlbCBkaWZmIGZpcnN0IHRvIGlkZW50aWZ5IHRoZSBjaGFuZ2VkIGFyZWFzLlxuICogICAgIElmIHRydWUsIHRoZW4gcnVuIGEgZmFzdGVyLCBzbGlnaHRseSBsZXNzIG9wdGltYWwgZGlmZi5cbiAqIEBwYXJhbSB7bnVtYmVyfSBkZWFkbGluZSBUaW1lIHdoZW4gdGhlIGRpZmYgc2hvdWxkIGJlIGNvbXBsZXRlIGJ5LlxuICogQHJldHVybiB7IUFycmF5LjwhZGlmZl9tYXRjaF9wYXRjaC5EaWZmPn0gQXJyYXkgb2YgZGlmZiB0dXBsZXMuXG4gKiBAcHJpdmF0ZVxuICovXG5kaWZmX21hdGNoX3BhdGNoLnByb3RvdHlwZS5kaWZmX2NvbXB1dGVfID0gZnVuY3Rpb24odGV4dDEsIHRleHQyLCBjaGVja2xpbmVzLFxuICAgIGRlYWRsaW5lKSB7XG4gIHZhciBkaWZmcztcblxuICBpZiAoIXRleHQxKSB7XG4gICAgLy8gSnVzdCBhZGQgc29tZSB0ZXh0IChzcGVlZHVwKS5cbiAgICByZXR1cm4gW1tESUZGX0lOU0VSVCwgdGV4dDJdXTtcbiAgfVxuXG4gIGlmICghdGV4dDIpIHtcbiAgICAvLyBKdXN0IGRlbGV0ZSBzb21lIHRleHQgKHNwZWVkdXApLlxuICAgIHJldHVybiBbW0RJRkZfREVMRVRFLCB0ZXh0MV1dO1xuICB9XG5cbiAgdmFyIGxvbmd0ZXh0ID0gdGV4dDEubGVuZ3RoID4gdGV4dDIubGVuZ3RoID8gdGV4dDEgOiB0ZXh0MjtcbiAgdmFyIHNob3J0dGV4dCA9IHRleHQxLmxlbmd0aCA+IHRleHQyLmxlbmd0aCA/IHRleHQyIDogdGV4dDE7XG4gIHZhciBpID0gbG9uZ3RleHQuaW5kZXhPZihzaG9ydHRleHQpO1xuICBpZiAoaSAhPSAtMSkge1xuICAgIC8vIFNob3J0ZXIgdGV4dCBpcyBpbnNpZGUgdGhlIGxvbmdlciB0ZXh0IChzcGVlZHVwKS5cbiAgICBkaWZmcyA9IFtbRElGRl9JTlNFUlQsIGxvbmd0ZXh0LnN1YnN0cmluZygwLCBpKV0sXG4gICAgICAgICAgICAgW0RJRkZfRVFVQUwsIHNob3J0dGV4dF0sXG4gICAgICAgICAgICAgW0RJRkZfSU5TRVJULCBsb25ndGV4dC5zdWJzdHJpbmcoaSArIHNob3J0dGV4dC5sZW5ndGgpXV07XG4gICAgLy8gU3dhcCBpbnNlcnRpb25zIGZvciBkZWxldGlvbnMgaWYgZGlmZiBpcyByZXZlcnNlZC5cbiAgICBpZiAodGV4dDEubGVuZ3RoID4gdGV4dDIubGVuZ3RoKSB7XG4gICAgICBkaWZmc1swXVswXSA9IGRpZmZzWzJdWzBdID0gRElGRl9ERUxFVEU7XG4gICAgfVxuICAgIHJldHVybiBkaWZmcztcbiAgfVxuXG4gIGlmIChzaG9ydHRleHQubGVuZ3RoID09IDEpIHtcbiAgICAvLyBTaW5nbGUgY2hhcmFjdGVyIHN0cmluZy5cbiAgICAvLyBBZnRlciB0aGUgcHJldmlvdXMgc3BlZWR1cCwgdGhlIGNoYXJhY3RlciBjYW4ndCBiZSBhbiBlcXVhbGl0eS5cbiAgICByZXR1cm4gW1tESUZGX0RFTEVURSwgdGV4dDFdLCBbRElGRl9JTlNFUlQsIHRleHQyXV07XG4gIH1cbiAgbG9uZ3RleHQgPSBzaG9ydHRleHQgPSBudWxsOyAgLy8gR2FyYmFnZSBjb2xsZWN0LlxuXG4gIC8vIENoZWNrIHRvIHNlZSBpZiB0aGUgcHJvYmxlbSBjYW4gYmUgc3BsaXQgaW4gdHdvLlxuICB2YXIgaG0gPSB0aGlzLmRpZmZfaGFsZk1hdGNoXyh0ZXh0MSwgdGV4dDIpO1xuICBpZiAoaG0pIHtcbiAgICAvLyBBIGhhbGYtbWF0Y2ggd2FzIGZvdW5kLCBzb3J0IG91dCB0aGUgcmV0dXJuIGRhdGEuXG4gICAgdmFyIHRleHQxX2EgPSBobVswXTtcbiAgICB2YXIgdGV4dDFfYiA9IGhtWzFdO1xuICAgIHZhciB0ZXh0Ml9hID0gaG1bMl07XG4gICAgdmFyIHRleHQyX2IgPSBobVszXTtcbiAgICB2YXIgbWlkX2NvbW1vbiA9IGhtWzRdO1xuICAgIC8vIFNlbmQgYm90aCBwYWlycyBvZmYgZm9yIHNlcGFyYXRlIHByb2Nlc3NpbmcuXG4gICAgdmFyIGRpZmZzX2EgPSB0aGlzLmRpZmZfbWFpbih0ZXh0MV9hLCB0ZXh0Ml9hLCBjaGVja2xpbmVzLCBkZWFkbGluZSk7XG4gICAgdmFyIGRpZmZzX2IgPSB0aGlzLmRpZmZfbWFpbih0ZXh0MV9iLCB0ZXh0Ml9iLCBjaGVja2xpbmVzLCBkZWFkbGluZSk7XG4gICAgLy8gTWVyZ2UgdGhlIHJlc3VsdHMuXG4gICAgcmV0dXJuIGRpZmZzX2EuY29uY2F0KFtbRElGRl9FUVVBTCwgbWlkX2NvbW1vbl1dLCBkaWZmc19iKTtcbiAgfVxuXG4gIGlmIChjaGVja2xpbmVzICYmIHRleHQxLmxlbmd0aCA+IDEwMCAmJiB0ZXh0Mi5sZW5ndGggPiAxMDApIHtcbiAgICByZXR1cm4gdGhpcy5kaWZmX2xpbmVNb2RlXyh0ZXh0MSwgdGV4dDIsIGRlYWRsaW5lKTtcbiAgfVxuXG4gIHJldHVybiB0aGlzLmRpZmZfYmlzZWN0Xyh0ZXh0MSwgdGV4dDIsIGRlYWRsaW5lKTtcbn07XG5cblxuLyoqXG4gKiBEbyBhIHF1aWNrIGxpbmUtbGV2ZWwgZGlmZiBvbiBib3RoIHN0cmluZ3MsIHRoZW4gcmVkaWZmIHRoZSBwYXJ0cyBmb3JcbiAqIGdyZWF0ZXIgYWNjdXJhY3kuXG4gKiBUaGlzIHNwZWVkdXAgY2FuIHByb2R1Y2Ugbm9uLW1pbmltYWwgZGlmZnMuXG4gKiBAcGFyYW0ge3N0cmluZ30gdGV4dDEgT2xkIHN0cmluZyB0byBiZSBkaWZmZWQuXG4gKiBAcGFyYW0ge3N0cmluZ30gdGV4dDIgTmV3IHN0cmluZyB0byBiZSBkaWZmZWQuXG4gKiBAcGFyYW0ge251bWJlcn0gZGVhZGxpbmUgVGltZSB3aGVuIHRoZSBkaWZmIHNob3VsZCBiZSBjb21wbGV0ZSBieS5cbiAqIEByZXR1cm4geyFBcnJheS48IWRpZmZfbWF0Y2hfcGF0Y2guRGlmZj59IEFycmF5IG9mIGRpZmYgdHVwbGVzLlxuICogQHByaXZhdGVcbiAqL1xuZGlmZl9tYXRjaF9wYXRjaC5wcm90b3R5cGUuZGlmZl9saW5lTW9kZV8gPSBmdW5jdGlvbih0ZXh0MSwgdGV4dDIsIGRlYWRsaW5lKSB7XG4gIC8vIFNjYW4gdGhlIHRleHQgb24gYSBsaW5lLWJ5LWxpbmUgYmFzaXMgZmlyc3QuXG4gIHZhciBhID0gdGhpcy5kaWZmX2xpbmVzVG9DaGFyc18odGV4dDEsIHRleHQyKTtcbiAgdGV4dDEgPSAvKiogQHR5cGUge3N0cmluZ30gKi8oYVswXSk7XG4gIHRleHQyID0gLyoqIEB0eXBlIHtzdHJpbmd9ICovKGFbMV0pO1xuICB2YXIgbGluZWFycmF5ID0gLyoqIEB0eXBlIHshQXJyYXkuPHN0cmluZz59ICovKGFbMl0pO1xuXG4gIHZhciBkaWZmcyA9IHRoaXMuZGlmZl9iaXNlY3RfKHRleHQxLCB0ZXh0MiwgZGVhZGxpbmUpO1xuXG4gIC8vIENvbnZlcnQgdGhlIGRpZmYgYmFjayB0byBvcmlnaW5hbCB0ZXh0LlxuICB0aGlzLmRpZmZfY2hhcnNUb0xpbmVzXyhkaWZmcywgbGluZWFycmF5KTtcbiAgLy8gRWxpbWluYXRlIGZyZWFrIG1hdGNoZXMgKGUuZy4gYmxhbmsgbGluZXMpXG4gIHRoaXMuZGlmZl9jbGVhbnVwU2VtYW50aWMoZGlmZnMpO1xuXG4gIC8vIFJlZGlmZiBhbnkgcmVwbGFjZW1lbnQgYmxvY2tzLCB0aGlzIHRpbWUgY2hhcmFjdGVyLWJ5LWNoYXJhY3Rlci5cbiAgLy8gQWRkIGEgZHVtbXkgZW50cnkgYXQgdGhlIGVuZC5cbiAgZGlmZnMucHVzaChbRElGRl9FUVVBTCwgJyddKTtcbiAgdmFyIHBvaW50ZXIgPSAwO1xuICB2YXIgY291bnRfZGVsZXRlID0gMDtcbiAgdmFyIGNvdW50X2luc2VydCA9IDA7XG4gIHZhciB0ZXh0X2RlbGV0ZSA9ICcnO1xuICB2YXIgdGV4dF9pbnNlcnQgPSAnJztcbiAgd2hpbGUgKHBvaW50ZXIgPCBkaWZmcy5sZW5ndGgpIHtcbiAgICBzd2l0Y2ggKGRpZmZzW3BvaW50ZXJdWzBdKSB7XG4gICAgICBjYXNlIERJRkZfSU5TRVJUOlxuICAgICAgICBjb3VudF9pbnNlcnQrKztcbiAgICAgICAgdGV4dF9pbnNlcnQgKz0gZGlmZnNbcG9pbnRlcl1bMV07XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBESUZGX0RFTEVURTpcbiAgICAgICAgY291bnRfZGVsZXRlKys7XG4gICAgICAgIHRleHRfZGVsZXRlICs9IGRpZmZzW3BvaW50ZXJdWzFdO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgRElGRl9FUVVBTDpcbiAgICAgICAgLy8gVXBvbiByZWFjaGluZyBhbiBlcXVhbGl0eSwgY2hlY2sgZm9yIHByaW9yIHJlZHVuZGFuY2llcy5cbiAgICAgICAgaWYgKGNvdW50X2RlbGV0ZSA+PSAxICYmIGNvdW50X2luc2VydCA+PSAxKSB7XG4gICAgICAgICAgLy8gRGVsZXRlIHRoZSBvZmZlbmRpbmcgcmVjb3JkcyBhbmQgYWRkIHRoZSBtZXJnZWQgb25lcy5cbiAgICAgICAgICB2YXIgYSA9IHRoaXMuZGlmZl9tYWluKHRleHRfZGVsZXRlLCB0ZXh0X2luc2VydCwgZmFsc2UsIGRlYWRsaW5lKTtcbiAgICAgICAgICBkaWZmcy5zcGxpY2UocG9pbnRlciAtIGNvdW50X2RlbGV0ZSAtIGNvdW50X2luc2VydCxcbiAgICAgICAgICAgICAgICAgICAgICAgY291bnRfZGVsZXRlICsgY291bnRfaW5zZXJ0KTtcbiAgICAgICAgICBwb2ludGVyID0gcG9pbnRlciAtIGNvdW50X2RlbGV0ZSAtIGNvdW50X2luc2VydDtcbiAgICAgICAgICBmb3IgKHZhciBqID0gYS5sZW5ndGggLSAxOyBqID49IDA7IGotLSkge1xuICAgICAgICAgICAgZGlmZnMuc3BsaWNlKHBvaW50ZXIsIDAsIGFbal0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICBwb2ludGVyID0gcG9pbnRlciArIGEubGVuZ3RoO1xuICAgICAgICB9XG4gICAgICAgIGNvdW50X2luc2VydCA9IDA7XG4gICAgICAgIGNvdW50X2RlbGV0ZSA9IDA7XG4gICAgICAgIHRleHRfZGVsZXRlID0gJyc7XG4gICAgICAgIHRleHRfaW5zZXJ0ID0gJyc7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBwb2ludGVyKys7XG4gIH1cbiAgZGlmZnMucG9wKCk7ICAvLyBSZW1vdmUgdGhlIGR1bW15IGVudHJ5IGF0IHRoZSBlbmQuXG5cbiAgcmV0dXJuIGRpZmZzO1xufTtcblxuXG4vKipcbiAqIEZpbmQgdGhlICdtaWRkbGUgc25ha2UnIG9mIGEgZGlmZiwgc3BsaXQgdGhlIHByb2JsZW0gaW4gdHdvXG4gKiBhbmQgcmV0dXJuIHRoZSByZWN1cnNpdmVseSBjb25zdHJ1Y3RlZCBkaWZmLlxuICogU2VlIE15ZXJzIDE5ODYgcGFwZXI6IEFuIE8oTkQpIERpZmZlcmVuY2UgQWxnb3JpdGhtIGFuZCBJdHMgVmFyaWF0aW9ucy5cbiAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0MSBPbGQgc3RyaW5nIHRvIGJlIGRpZmZlZC5cbiAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0MiBOZXcgc3RyaW5nIHRvIGJlIGRpZmZlZC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBkZWFkbGluZSBUaW1lIGF0IHdoaWNoIHRvIGJhaWwgaWYgbm90IHlldCBjb21wbGV0ZS5cbiAqIEByZXR1cm4geyFBcnJheS48IWRpZmZfbWF0Y2hfcGF0Y2guRGlmZj59IEFycmF5IG9mIGRpZmYgdHVwbGVzLlxuICogQHByaXZhdGVcbiAqL1xuZGlmZl9tYXRjaF9wYXRjaC5wcm90b3R5cGUuZGlmZl9iaXNlY3RfID0gZnVuY3Rpb24odGV4dDEsIHRleHQyLCBkZWFkbGluZSkge1xuICAvLyBDYWNoZSB0aGUgdGV4dCBsZW5ndGhzIHRvIHByZXZlbnQgbXVsdGlwbGUgY2FsbHMuXG4gIHZhciB0ZXh0MV9sZW5ndGggPSB0ZXh0MS5sZW5ndGg7XG4gIHZhciB0ZXh0Ml9sZW5ndGggPSB0ZXh0Mi5sZW5ndGg7XG4gIHZhciBtYXhfZCA9IE1hdGguY2VpbCgodGV4dDFfbGVuZ3RoICsgdGV4dDJfbGVuZ3RoKSAvIDIpO1xuICB2YXIgdl9vZmZzZXQgPSBtYXhfZDtcbiAgdmFyIHZfbGVuZ3RoID0gMiAqIG1heF9kO1xuICB2YXIgdjEgPSBuZXcgQXJyYXkodl9sZW5ndGgpO1xuICB2YXIgdjIgPSBuZXcgQXJyYXkodl9sZW5ndGgpO1xuICAvLyBTZXR0aW5nIGFsbCBlbGVtZW50cyB0byAtMSBpcyBmYXN0ZXIgaW4gQ2hyb21lICYgRmlyZWZveCB0aGFuIG1peGluZ1xuICAvLyBpbnRlZ2VycyBhbmQgdW5kZWZpbmVkLlxuICBmb3IgKHZhciB4ID0gMDsgeCA8IHZfbGVuZ3RoOyB4KyspIHtcbiAgICB2MVt4XSA9IC0xO1xuICAgIHYyW3hdID0gLTE7XG4gIH1cbiAgdjFbdl9vZmZzZXQgKyAxXSA9IDA7XG4gIHYyW3Zfb2Zmc2V0ICsgMV0gPSAwO1xuICB2YXIgZGVsdGEgPSB0ZXh0MV9sZW5ndGggLSB0ZXh0Ml9sZW5ndGg7XG4gIC8vIElmIHRoZSB0b3RhbCBudW1iZXIgb2YgY2hhcmFjdGVycyBpcyBvZGQsIHRoZW4gdGhlIGZyb250IHBhdGggd2lsbCBjb2xsaWRlXG4gIC8vIHdpdGggdGhlIHJldmVyc2UgcGF0aC5cbiAgdmFyIGZyb250ID0gKGRlbHRhICUgMiAhPSAwKTtcbiAgLy8gT2Zmc2V0cyBmb3Igc3RhcnQgYW5kIGVuZCBvZiBrIGxvb3AuXG4gIC8vIFByZXZlbnRzIG1hcHBpbmcgb2Ygc3BhY2UgYmV5b25kIHRoZSBncmlkLlxuICB2YXIgazFzdGFydCA9IDA7XG4gIHZhciBrMWVuZCA9IDA7XG4gIHZhciBrMnN0YXJ0ID0gMDtcbiAgdmFyIGsyZW5kID0gMDtcbiAgZm9yICh2YXIgZCA9IDA7IGQgPCBtYXhfZDsgZCsrKSB7XG4gICAgLy8gQmFpbCBvdXQgaWYgZGVhZGxpbmUgaXMgcmVhY2hlZC5cbiAgICBpZiAoKG5ldyBEYXRlKCkpLmdldFRpbWUoKSA+IGRlYWRsaW5lKSB7XG4gICAgICBicmVhaztcbiAgICB9XG5cbiAgICAvLyBXYWxrIHRoZSBmcm9udCBwYXRoIG9uZSBzdGVwLlxuICAgIGZvciAodmFyIGsxID0gLWQgKyBrMXN0YXJ0OyBrMSA8PSBkIC0gazFlbmQ7IGsxICs9IDIpIHtcbiAgICAgIHZhciBrMV9vZmZzZXQgPSB2X29mZnNldCArIGsxO1xuICAgICAgdmFyIHgxO1xuICAgICAgaWYgKGsxID09IC1kIHx8IGsxICE9IGQgJiYgdjFbazFfb2Zmc2V0IC0gMV0gPCB2MVtrMV9vZmZzZXQgKyAxXSkge1xuICAgICAgICB4MSA9IHYxW2sxX29mZnNldCArIDFdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgeDEgPSB2MVtrMV9vZmZzZXQgLSAxXSArIDE7XG4gICAgICB9XG4gICAgICB2YXIgeTEgPSB4MSAtIGsxO1xuICAgICAgd2hpbGUgKHgxIDwgdGV4dDFfbGVuZ3RoICYmIHkxIDwgdGV4dDJfbGVuZ3RoICYmXG4gICAgICAgICAgICAgdGV4dDEuY2hhckF0KHgxKSA9PSB0ZXh0Mi5jaGFyQXQoeTEpKSB7XG4gICAgICAgIHgxKys7XG4gICAgICAgIHkxKys7XG4gICAgICB9XG4gICAgICB2MVtrMV9vZmZzZXRdID0geDE7XG4gICAgICBpZiAoeDEgPiB0ZXh0MV9sZW5ndGgpIHtcbiAgICAgICAgLy8gUmFuIG9mZiB0aGUgcmlnaHQgb2YgdGhlIGdyYXBoLlxuICAgICAgICBrMWVuZCArPSAyO1xuICAgICAgfSBlbHNlIGlmICh5MSA+IHRleHQyX2xlbmd0aCkge1xuICAgICAgICAvLyBSYW4gb2ZmIHRoZSBib3R0b20gb2YgdGhlIGdyYXBoLlxuICAgICAgICBrMXN0YXJ0ICs9IDI7XG4gICAgICB9IGVsc2UgaWYgKGZyb250KSB7XG4gICAgICAgIHZhciBrMl9vZmZzZXQgPSB2X29mZnNldCArIGRlbHRhIC0gazE7XG4gICAgICAgIGlmIChrMl9vZmZzZXQgPj0gMCAmJiBrMl9vZmZzZXQgPCB2X2xlbmd0aCAmJiB2MltrMl9vZmZzZXRdICE9IC0xKSB7XG4gICAgICAgICAgLy8gTWlycm9yIHgyIG9udG8gdG9wLWxlZnQgY29vcmRpbmF0ZSBzeXN0ZW0uXG4gICAgICAgICAgdmFyIHgyID0gdGV4dDFfbGVuZ3RoIC0gdjJbazJfb2Zmc2V0XTtcbiAgICAgICAgICBpZiAoeDEgPj0geDIpIHtcbiAgICAgICAgICAgIC8vIE92ZXJsYXAgZGV0ZWN0ZWQuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kaWZmX2Jpc2VjdFNwbGl0Xyh0ZXh0MSwgdGV4dDIsIHgxLCB5MSwgZGVhZGxpbmUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFdhbGsgdGhlIHJldmVyc2UgcGF0aCBvbmUgc3RlcC5cbiAgICBmb3IgKHZhciBrMiA9IC1kICsgazJzdGFydDsgazIgPD0gZCAtIGsyZW5kOyBrMiArPSAyKSB7XG4gICAgICB2YXIgazJfb2Zmc2V0ID0gdl9vZmZzZXQgKyBrMjtcbiAgICAgIHZhciB4MjtcbiAgICAgIGlmIChrMiA9PSAtZCB8fCBrMiAhPSBkICYmIHYyW2syX29mZnNldCAtIDFdIDwgdjJbazJfb2Zmc2V0ICsgMV0pIHtcbiAgICAgICAgeDIgPSB2MltrMl9vZmZzZXQgKyAxXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHgyID0gdjJbazJfb2Zmc2V0IC0gMV0gKyAxO1xuICAgICAgfVxuICAgICAgdmFyIHkyID0geDIgLSBrMjtcbiAgICAgIHdoaWxlICh4MiA8IHRleHQxX2xlbmd0aCAmJiB5MiA8IHRleHQyX2xlbmd0aCAmJlxuICAgICAgICAgICAgIHRleHQxLmNoYXJBdCh0ZXh0MV9sZW5ndGggLSB4MiAtIDEpID09XG4gICAgICAgICAgICAgdGV4dDIuY2hhckF0KHRleHQyX2xlbmd0aCAtIHkyIC0gMSkpIHtcbiAgICAgICAgeDIrKztcbiAgICAgICAgeTIrKztcbiAgICAgIH1cbiAgICAgIHYyW2syX29mZnNldF0gPSB4MjtcbiAgICAgIGlmICh4MiA+IHRleHQxX2xlbmd0aCkge1xuICAgICAgICAvLyBSYW4gb2ZmIHRoZSBsZWZ0IG9mIHRoZSBncmFwaC5cbiAgICAgICAgazJlbmQgKz0gMjtcbiAgICAgIH0gZWxzZSBpZiAoeTIgPiB0ZXh0Ml9sZW5ndGgpIHtcbiAgICAgICAgLy8gUmFuIG9mZiB0aGUgdG9wIG9mIHRoZSBncmFwaC5cbiAgICAgICAgazJzdGFydCArPSAyO1xuICAgICAgfSBlbHNlIGlmICghZnJvbnQpIHtcbiAgICAgICAgdmFyIGsxX29mZnNldCA9IHZfb2Zmc2V0ICsgZGVsdGEgLSBrMjtcbiAgICAgICAgaWYgKGsxX29mZnNldCA+PSAwICYmIGsxX29mZnNldCA8IHZfbGVuZ3RoICYmIHYxW2sxX29mZnNldF0gIT0gLTEpIHtcbiAgICAgICAgICB2YXIgeDEgPSB2MVtrMV9vZmZzZXRdO1xuICAgICAgICAgIHZhciB5MSA9IHZfb2Zmc2V0ICsgeDEgLSBrMV9vZmZzZXQ7XG4gICAgICAgICAgLy8gTWlycm9yIHgyIG9udG8gdG9wLWxlZnQgY29vcmRpbmF0ZSBzeXN0ZW0uXG4gICAgICAgICAgeDIgPSB0ZXh0MV9sZW5ndGggLSB4MjtcbiAgICAgICAgICBpZiAoeDEgPj0geDIpIHtcbiAgICAgICAgICAgIC8vIE92ZXJsYXAgZGV0ZWN0ZWQuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kaWZmX2Jpc2VjdFNwbGl0Xyh0ZXh0MSwgdGV4dDIsIHgxLCB5MSwgZGVhZGxpbmUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuICAvLyBEaWZmIHRvb2sgdG9vIGxvbmcgYW5kIGhpdCB0aGUgZGVhZGxpbmUgb3JcbiAgLy8gbnVtYmVyIG9mIGRpZmZzIGVxdWFscyBudW1iZXIgb2YgY2hhcmFjdGVycywgbm8gY29tbW9uYWxpdHkgYXQgYWxsLlxuICByZXR1cm4gW1tESUZGX0RFTEVURSwgdGV4dDFdLCBbRElGRl9JTlNFUlQsIHRleHQyXV07XG59O1xuXG5cbi8qKlxuICogR2l2ZW4gdGhlIGxvY2F0aW9uIG9mIHRoZSAnbWlkZGxlIHNuYWtlJywgc3BsaXQgdGhlIGRpZmYgaW4gdHdvIHBhcnRzXG4gKiBhbmQgcmVjdXJzZS5cbiAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0MSBPbGQgc3RyaW5nIHRvIGJlIGRpZmZlZC5cbiAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0MiBOZXcgc3RyaW5nIHRvIGJlIGRpZmZlZC5cbiAqIEBwYXJhbSB7bnVtYmVyfSB4IEluZGV4IG9mIHNwbGl0IHBvaW50IGluIHRleHQxLlxuICogQHBhcmFtIHtudW1iZXJ9IHkgSW5kZXggb2Ygc3BsaXQgcG9pbnQgaW4gdGV4dDIuXG4gKiBAcGFyYW0ge251bWJlcn0gZGVhZGxpbmUgVGltZSBhdCB3aGljaCB0byBiYWlsIGlmIG5vdCB5ZXQgY29tcGxldGUuXG4gKiBAcmV0dXJuIHshQXJyYXkuPCFkaWZmX21hdGNoX3BhdGNoLkRpZmY+fSBBcnJheSBvZiBkaWZmIHR1cGxlcy5cbiAqIEBwcml2YXRlXG4gKi9cbmRpZmZfbWF0Y2hfcGF0Y2gucHJvdG90eXBlLmRpZmZfYmlzZWN0U3BsaXRfID0gZnVuY3Rpb24odGV4dDEsIHRleHQyLCB4LCB5LFxuICAgIGRlYWRsaW5lKSB7XG4gIHZhciB0ZXh0MWEgPSB0ZXh0MS5zdWJzdHJpbmcoMCwgeCk7XG4gIHZhciB0ZXh0MmEgPSB0ZXh0Mi5zdWJzdHJpbmcoMCwgeSk7XG4gIHZhciB0ZXh0MWIgPSB0ZXh0MS5zdWJzdHJpbmcoeCk7XG4gIHZhciB0ZXh0MmIgPSB0ZXh0Mi5zdWJzdHJpbmcoeSk7XG5cbiAgLy8gQ29tcHV0ZSBib3RoIGRpZmZzIHNlcmlhbGx5LlxuICB2YXIgZGlmZnMgPSB0aGlzLmRpZmZfbWFpbih0ZXh0MWEsIHRleHQyYSwgZmFsc2UsIGRlYWRsaW5lKTtcbiAgdmFyIGRpZmZzYiA9IHRoaXMuZGlmZl9tYWluKHRleHQxYiwgdGV4dDJiLCBmYWxzZSwgZGVhZGxpbmUpO1xuXG4gIHJldHVybiBkaWZmcy5jb25jYXQoZGlmZnNiKTtcbn07XG5cblxuLyoqXG4gKiBTcGxpdCB0d28gdGV4dHMgaW50byBhbiBhcnJheSBvZiBzdHJpbmdzLiAgUmVkdWNlIHRoZSB0ZXh0cyB0byBhIHN0cmluZyBvZlxuICogaGFzaGVzIHdoZXJlIGVhY2ggVW5pY29kZSBjaGFyYWN0ZXIgcmVwcmVzZW50cyBvbmUgbGluZS5cbiAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0MSBGaXJzdCBzdHJpbmcuXG4gKiBAcGFyYW0ge3N0cmluZ30gdGV4dDIgU2Vjb25kIHN0cmluZy5cbiAqIEByZXR1cm4geyFBcnJheS48c3RyaW5nfCFBcnJheS48c3RyaW5nPj59IFRocmVlIGVsZW1lbnQgQXJyYXksIGNvbnRhaW5pbmcgdGhlXG4gKiAgICAgZW5jb2RlZCB0ZXh0MSwgdGhlIGVuY29kZWQgdGV4dDIgYW5kIHRoZSBhcnJheSBvZiB1bmlxdWUgc3RyaW5ncy4gIFRoZVxuICogICAgIHplcm90aCBlbGVtZW50IG9mIHRoZSBhcnJheSBvZiB1bmlxdWUgc3RyaW5ncyBpcyBpbnRlbnRpb25hbGx5IGJsYW5rLlxuICogQHByaXZhdGVcbiAqL1xuZGlmZl9tYXRjaF9wYXRjaC5wcm90b3R5cGUuZGlmZl9saW5lc1RvQ2hhcnNfID0gZnVuY3Rpb24odGV4dDEsIHRleHQyKSB7XG4gIHZhciBsaW5lQXJyYXkgPSBbXTsgIC8vIGUuZy4gbGluZUFycmF5WzRdID09ICdIZWxsb1xcbidcbiAgdmFyIGxpbmVIYXNoID0ge307ICAgLy8gZS5nLiBsaW5lSGFzaFsnSGVsbG9cXG4nXSA9PSA0XG5cbiAgLy8gJ1xceDAwJyBpcyBhIHZhbGlkIGNoYXJhY3RlciwgYnV0IHZhcmlvdXMgZGVidWdnZXJzIGRvbid0IGxpa2UgaXQuXG4gIC8vIFNvIHdlJ2xsIGluc2VydCBhIGp1bmsgZW50cnkgdG8gYXZvaWQgZ2VuZXJhdGluZyBhIG51bGwgY2hhcmFjdGVyLlxuICBsaW5lQXJyYXlbMF0gPSAnJztcblxuICAvKipcbiAgICogU3BsaXQgYSB0ZXh0IGludG8gYW4gYXJyYXkgb2Ygc3RyaW5ncy4gIFJlZHVjZSB0aGUgdGV4dHMgdG8gYSBzdHJpbmcgb2ZcbiAgICogaGFzaGVzIHdoZXJlIGVhY2ggVW5pY29kZSBjaGFyYWN0ZXIgcmVwcmVzZW50cyBvbmUgbGluZS5cbiAgICogTW9kaWZpZXMgbGluZWFycmF5IGFuZCBsaW5laGFzaCB0aHJvdWdoIGJlaW5nIGEgY2xvc3VyZS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IHRleHQgU3RyaW5nIHRvIGVuY29kZS5cbiAgICogQHJldHVybiB7c3RyaW5nfSBFbmNvZGVkIHN0cmluZy5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIGZ1bmN0aW9uIGRpZmZfbGluZXNUb0NoYXJzTXVuZ2VfKHRleHQpIHtcbiAgICB2YXIgY2hhcnMgPSAnJztcbiAgICAvLyBXYWxrIHRoZSB0ZXh0LCBwdWxsaW5nIG91dCBhIHN1YnN0cmluZyBmb3IgZWFjaCBsaW5lLlxuICAgIC8vIHRleHQuc3BsaXQoJ1xcbicpIHdvdWxkIHdvdWxkIHRlbXBvcmFyaWx5IGRvdWJsZSBvdXIgbWVtb3J5IGZvb3RwcmludC5cbiAgICAvLyBNb2RpZnlpbmcgdGV4dCB3b3VsZCBjcmVhdGUgbWFueSBsYXJnZSBzdHJpbmdzIHRvIGdhcmJhZ2UgY29sbGVjdC5cbiAgICB2YXIgbGluZVN0YXJ0ID0gMDtcbiAgICB2YXIgbGluZUVuZCA9IC0xO1xuICAgIC8vIEtlZXBpbmcgb3VyIG93biBsZW5ndGggdmFyaWFibGUgaXMgZmFzdGVyIHRoYW4gbG9va2luZyBpdCB1cC5cbiAgICB2YXIgbGluZUFycmF5TGVuZ3RoID0gbGluZUFycmF5Lmxlbmd0aDtcbiAgICB3aGlsZSAobGluZUVuZCA8IHRleHQubGVuZ3RoIC0gMSkge1xuICAgICAgbGluZUVuZCA9IHRleHQuaW5kZXhPZignXFxuJywgbGluZVN0YXJ0KTtcbiAgICAgIGlmIChsaW5lRW5kID09IC0xKSB7XG4gICAgICAgIGxpbmVFbmQgPSB0ZXh0Lmxlbmd0aCAtIDE7XG4gICAgICB9XG4gICAgICB2YXIgbGluZSA9IHRleHQuc3Vic3RyaW5nKGxpbmVTdGFydCwgbGluZUVuZCArIDEpO1xuICAgICAgbGluZVN0YXJ0ID0gbGluZUVuZCArIDE7XG5cbiAgICAgIGlmIChsaW5lSGFzaC5oYXNPd25Qcm9wZXJ0eSA/IGxpbmVIYXNoLmhhc093blByb3BlcnR5KGxpbmUpIDpcbiAgICAgICAgICAobGluZUhhc2hbbGluZV0gIT09IHVuZGVmaW5lZCkpIHtcbiAgICAgICAgY2hhcnMgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShsaW5lSGFzaFtsaW5lXSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjaGFycyArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGxpbmVBcnJheUxlbmd0aCk7XG4gICAgICAgIGxpbmVIYXNoW2xpbmVdID0gbGluZUFycmF5TGVuZ3RoO1xuICAgICAgICBsaW5lQXJyYXlbbGluZUFycmF5TGVuZ3RoKytdID0gbGluZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGNoYXJzO1xuICB9XG5cbiAgdmFyIGNoYXJzMSA9IGRpZmZfbGluZXNUb0NoYXJzTXVuZ2VfKHRleHQxKTtcbiAgdmFyIGNoYXJzMiA9IGRpZmZfbGluZXNUb0NoYXJzTXVuZ2VfKHRleHQyKTtcbiAgcmV0dXJuIFtjaGFyczEsIGNoYXJzMiwgbGluZUFycmF5XTtcbn07XG5cblxuLyoqXG4gKiBSZWh5ZHJhdGUgdGhlIHRleHQgaW4gYSBkaWZmIGZyb20gYSBzdHJpbmcgb2YgbGluZSBoYXNoZXMgdG8gcmVhbCBsaW5lcyBvZlxuICogdGV4dC5cbiAqIEBwYXJhbSB7IUFycmF5LjwhZGlmZl9tYXRjaF9wYXRjaC5EaWZmPn0gZGlmZnMgQXJyYXkgb2YgZGlmZiB0dXBsZXMuXG4gKiBAcGFyYW0geyFBcnJheS48c3RyaW5nPn0gbGluZUFycmF5IEFycmF5IG9mIHVuaXF1ZSBzdHJpbmdzLlxuICogQHByaXZhdGVcbiAqL1xuZGlmZl9tYXRjaF9wYXRjaC5wcm90b3R5cGUuZGlmZl9jaGFyc1RvTGluZXNfID0gZnVuY3Rpb24oZGlmZnMsIGxpbmVBcnJheSkge1xuICBmb3IgKHZhciB4ID0gMDsgeCA8IGRpZmZzLmxlbmd0aDsgeCsrKSB7XG4gICAgdmFyIGNoYXJzID0gZGlmZnNbeF1bMV07XG4gICAgdmFyIHRleHQgPSBbXTtcbiAgICBmb3IgKHZhciB5ID0gMDsgeSA8IGNoYXJzLmxlbmd0aDsgeSsrKSB7XG4gICAgICB0ZXh0W3ldID0gbGluZUFycmF5W2NoYXJzLmNoYXJDb2RlQXQoeSldO1xuICAgIH1cbiAgICBkaWZmc1t4XVsxXSA9IHRleHQuam9pbignJyk7XG4gIH1cbn07XG5cblxuLyoqXG4gKiBEZXRlcm1pbmUgdGhlIGNvbW1vbiBwcmVmaXggb2YgdHdvIHN0cmluZ3MuXG4gKiBAcGFyYW0ge3N0cmluZ30gdGV4dDEgRmlyc3Qgc3RyaW5nLlxuICogQHBhcmFtIHtzdHJpbmd9IHRleHQyIFNlY29uZCBzdHJpbmcuXG4gKiBAcmV0dXJuIHtudW1iZXJ9IFRoZSBudW1iZXIgb2YgY2hhcmFjdGVycyBjb21tb24gdG8gdGhlIHN0YXJ0IG9mIGVhY2hcbiAqICAgICBzdHJpbmcuXG4gKi9cbmRpZmZfbWF0Y2hfcGF0Y2gucHJvdG90eXBlLmRpZmZfY29tbW9uUHJlZml4ID0gZnVuY3Rpb24odGV4dDEsIHRleHQyKSB7XG4gIC8vIFF1aWNrIGNoZWNrIGZvciBjb21tb24gbnVsbCBjYXNlcy5cbiAgaWYgKCF0ZXh0MSB8fCAhdGV4dDIgfHwgdGV4dDEuY2hhckF0KDApICE9IHRleHQyLmNoYXJBdCgwKSkge1xuICAgIHJldHVybiAwO1xuICB9XG4gIC8vIEJpbmFyeSBzZWFyY2guXG4gIC8vIFBlcmZvcm1hbmNlIGFuYWx5c2lzOiBodHRwOi8vbmVpbC5mcmFzZXIubmFtZS9uZXdzLzIwMDcvMTAvMDkvXG4gIHZhciBwb2ludGVybWluID0gMDtcbiAgdmFyIHBvaW50ZXJtYXggPSBNYXRoLm1pbih0ZXh0MS5sZW5ndGgsIHRleHQyLmxlbmd0aCk7XG4gIHZhciBwb2ludGVybWlkID0gcG9pbnRlcm1heDtcbiAgdmFyIHBvaW50ZXJzdGFydCA9IDA7XG4gIHdoaWxlIChwb2ludGVybWluIDwgcG9pbnRlcm1pZCkge1xuICAgIGlmICh0ZXh0MS5zdWJzdHJpbmcocG9pbnRlcnN0YXJ0LCBwb2ludGVybWlkKSA9PVxuICAgICAgICB0ZXh0Mi5zdWJzdHJpbmcocG9pbnRlcnN0YXJ0LCBwb2ludGVybWlkKSkge1xuICAgICAgcG9pbnRlcm1pbiA9IHBvaW50ZXJtaWQ7XG4gICAgICBwb2ludGVyc3RhcnQgPSBwb2ludGVybWluO1xuICAgIH0gZWxzZSB7XG4gICAgICBwb2ludGVybWF4ID0gcG9pbnRlcm1pZDtcbiAgICB9XG4gICAgcG9pbnRlcm1pZCA9IE1hdGguZmxvb3IoKHBvaW50ZXJtYXggLSBwb2ludGVybWluKSAvIDIgKyBwb2ludGVybWluKTtcbiAgfVxuICByZXR1cm4gcG9pbnRlcm1pZDtcbn07XG5cblxuLyoqXG4gKiBEZXRlcm1pbmUgdGhlIGNvbW1vbiBzdWZmaXggb2YgdHdvIHN0cmluZ3MuXG4gKiBAcGFyYW0ge3N0cmluZ30gdGV4dDEgRmlyc3Qgc3RyaW5nLlxuICogQHBhcmFtIHtzdHJpbmd9IHRleHQyIFNlY29uZCBzdHJpbmcuXG4gKiBAcmV0dXJuIHtudW1iZXJ9IFRoZSBudW1iZXIgb2YgY2hhcmFjdGVycyBjb21tb24gdG8gdGhlIGVuZCBvZiBlYWNoIHN0cmluZy5cbiAqL1xuZGlmZl9tYXRjaF9wYXRjaC5wcm90b3R5cGUuZGlmZl9jb21tb25TdWZmaXggPSBmdW5jdGlvbih0ZXh0MSwgdGV4dDIpIHtcbiAgLy8gUXVpY2sgY2hlY2sgZm9yIGNvbW1vbiBudWxsIGNhc2VzLlxuICBpZiAoIXRleHQxIHx8ICF0ZXh0MiB8fFxuICAgICAgdGV4dDEuY2hhckF0KHRleHQxLmxlbmd0aCAtIDEpICE9IHRleHQyLmNoYXJBdCh0ZXh0Mi5sZW5ndGggLSAxKSkge1xuICAgIHJldHVybiAwO1xuICB9XG4gIC8vIEJpbmFyeSBzZWFyY2guXG4gIC8vIFBlcmZvcm1hbmNlIGFuYWx5c2lzOiBodHRwOi8vbmVpbC5mcmFzZXIubmFtZS9uZXdzLzIwMDcvMTAvMDkvXG4gIHZhciBwb2ludGVybWluID0gMDtcbiAgdmFyIHBvaW50ZXJtYXggPSBNYXRoLm1pbih0ZXh0MS5sZW5ndGgsIHRleHQyLmxlbmd0aCk7XG4gIHZhciBwb2ludGVybWlkID0gcG9pbnRlcm1heDtcbiAgdmFyIHBvaW50ZXJlbmQgPSAwO1xuICB3aGlsZSAocG9pbnRlcm1pbiA8IHBvaW50ZXJtaWQpIHtcbiAgICBpZiAodGV4dDEuc3Vic3RyaW5nKHRleHQxLmxlbmd0aCAtIHBvaW50ZXJtaWQsIHRleHQxLmxlbmd0aCAtIHBvaW50ZXJlbmQpID09XG4gICAgICAgIHRleHQyLnN1YnN0cmluZyh0ZXh0Mi5sZW5ndGggLSBwb2ludGVybWlkLCB0ZXh0Mi5sZW5ndGggLSBwb2ludGVyZW5kKSkge1xuICAgICAgcG9pbnRlcm1pbiA9IHBvaW50ZXJtaWQ7XG4gICAgICBwb2ludGVyZW5kID0gcG9pbnRlcm1pbjtcbiAgICB9IGVsc2Uge1xuICAgICAgcG9pbnRlcm1heCA9IHBvaW50ZXJtaWQ7XG4gICAgfVxuICAgIHBvaW50ZXJtaWQgPSBNYXRoLmZsb29yKChwb2ludGVybWF4IC0gcG9pbnRlcm1pbikgLyAyICsgcG9pbnRlcm1pbik7XG4gIH1cbiAgcmV0dXJuIHBvaW50ZXJtaWQ7XG59O1xuXG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIHRoZSBzdWZmaXggb2Ygb25lIHN0cmluZyBpcyB0aGUgcHJlZml4IG9mIGFub3RoZXIuXG4gKiBAcGFyYW0ge3N0cmluZ30gdGV4dDEgRmlyc3Qgc3RyaW5nLlxuICogQHBhcmFtIHtzdHJpbmd9IHRleHQyIFNlY29uZCBzdHJpbmcuXG4gKiBAcmV0dXJuIHtudW1iZXJ9IFRoZSBudW1iZXIgb2YgY2hhcmFjdGVycyBjb21tb24gdG8gdGhlIGVuZCBvZiB0aGUgZmlyc3RcbiAqICAgICBzdHJpbmcgYW5kIHRoZSBzdGFydCBvZiB0aGUgc2Vjb25kIHN0cmluZy5cbiAqIEBwcml2YXRlXG4gKi9cbmRpZmZfbWF0Y2hfcGF0Y2gucHJvdG90eXBlLmRpZmZfY29tbW9uT3ZlcmxhcF8gPSBmdW5jdGlvbih0ZXh0MSwgdGV4dDIpIHtcbiAgLy8gQ2FjaGUgdGhlIHRleHQgbGVuZ3RocyB0byBwcmV2ZW50IG11bHRpcGxlIGNhbGxzLlxuICB2YXIgdGV4dDFfbGVuZ3RoID0gdGV4dDEubGVuZ3RoO1xuICB2YXIgdGV4dDJfbGVuZ3RoID0gdGV4dDIubGVuZ3RoO1xuICAvLyBFbGltaW5hdGUgdGhlIG51bGwgY2FzZS5cbiAgaWYgKHRleHQxX2xlbmd0aCA9PSAwIHx8IHRleHQyX2xlbmd0aCA9PSAwKSB7XG4gICAgcmV0dXJuIDA7XG4gIH1cbiAgLy8gVHJ1bmNhdGUgdGhlIGxvbmdlciBzdHJpbmcuXG4gIGlmICh0ZXh0MV9sZW5ndGggPiB0ZXh0Ml9sZW5ndGgpIHtcbiAgICB0ZXh0MSA9IHRleHQxLnN1YnN0cmluZyh0ZXh0MV9sZW5ndGggLSB0ZXh0Ml9sZW5ndGgpO1xuICB9IGVsc2UgaWYgKHRleHQxX2xlbmd0aCA8IHRleHQyX2xlbmd0aCkge1xuICAgIHRleHQyID0gdGV4dDIuc3Vic3RyaW5nKDAsIHRleHQxX2xlbmd0aCk7XG4gIH1cbiAgdmFyIHRleHRfbGVuZ3RoID0gTWF0aC5taW4odGV4dDFfbGVuZ3RoLCB0ZXh0Ml9sZW5ndGgpO1xuICAvLyBRdWljayBjaGVjayBmb3IgdGhlIHdvcnN0IGNhc2UuXG4gIGlmICh0ZXh0MSA9PSB0ZXh0Mikge1xuICAgIHJldHVybiB0ZXh0X2xlbmd0aDtcbiAgfVxuXG4gIC8vIFN0YXJ0IGJ5IGxvb2tpbmcgZm9yIGEgc2luZ2xlIGNoYXJhY3RlciBtYXRjaFxuICAvLyBhbmQgaW5jcmVhc2UgbGVuZ3RoIHVudGlsIG5vIG1hdGNoIGlzIGZvdW5kLlxuICAvLyBQZXJmb3JtYW5jZSBhbmFseXNpczogaHR0cDovL25laWwuZnJhc2VyLm5hbWUvbmV3cy8yMDEwLzExLzA0L1xuICB2YXIgYmVzdCA9IDA7XG4gIHZhciBsZW5ndGggPSAxO1xuICB3aGlsZSAodHJ1ZSkge1xuICAgIHZhciBwYXR0ZXJuID0gdGV4dDEuc3Vic3RyaW5nKHRleHRfbGVuZ3RoIC0gbGVuZ3RoKTtcbiAgICB2YXIgZm91bmQgPSB0ZXh0Mi5pbmRleE9mKHBhdHRlcm4pO1xuICAgIGlmIChmb3VuZCA9PSAtMSkge1xuICAgICAgcmV0dXJuIGJlc3Q7XG4gICAgfVxuICAgIGxlbmd0aCArPSBmb3VuZDtcbiAgICBpZiAoZm91bmQgPT0gMCB8fCB0ZXh0MS5zdWJzdHJpbmcodGV4dF9sZW5ndGggLSBsZW5ndGgpID09XG4gICAgICAgIHRleHQyLnN1YnN0cmluZygwLCBsZW5ndGgpKSB7XG4gICAgICBiZXN0ID0gbGVuZ3RoO1xuICAgICAgbGVuZ3RoKys7XG4gICAgfVxuICB9XG59O1xuXG5cbi8qKlxuICogRG8gdGhlIHR3byB0ZXh0cyBzaGFyZSBhIHN1YnN0cmluZyB3aGljaCBpcyBhdCBsZWFzdCBoYWxmIHRoZSBsZW5ndGggb2YgdGhlXG4gKiBsb25nZXIgdGV4dD9cbiAqIFRoaXMgc3BlZWR1cCBjYW4gcHJvZHVjZSBub24tbWluaW1hbCBkaWZmcy5cbiAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0MSBGaXJzdCBzdHJpbmcuXG4gKiBAcGFyYW0ge3N0cmluZ30gdGV4dDIgU2Vjb25kIHN0cmluZy5cbiAqIEByZXR1cm4ge0FycmF5LjxzdHJpbmc+fSBGaXZlIGVsZW1lbnQgQXJyYXksIGNvbnRhaW5pbmcgdGhlIHByZWZpeCBvZlxuICogICAgIHRleHQxLCB0aGUgc3VmZml4IG9mIHRleHQxLCB0aGUgcHJlZml4IG9mIHRleHQyLCB0aGUgc3VmZml4IG9mXG4gKiAgICAgdGV4dDIgYW5kIHRoZSBjb21tb24gbWlkZGxlLiAgT3IgbnVsbCBpZiB0aGVyZSB3YXMgbm8gbWF0Y2guXG4gKiBAcHJpdmF0ZVxuICovXG5kaWZmX21hdGNoX3BhdGNoLnByb3RvdHlwZS5kaWZmX2hhbGZNYXRjaF8gPSBmdW5jdGlvbih0ZXh0MSwgdGV4dDIpIHtcbiAgaWYgKHRoaXMuRGlmZl9UaW1lb3V0IDw9IDApIHtcbiAgICAvLyBEb24ndCByaXNrIHJldHVybmluZyBhIG5vbi1vcHRpbWFsIGRpZmYgaWYgd2UgaGF2ZSB1bmxpbWl0ZWQgdGltZS5cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICB2YXIgbG9uZ3RleHQgPSB0ZXh0MS5sZW5ndGggPiB0ZXh0Mi5sZW5ndGggPyB0ZXh0MSA6IHRleHQyO1xuICB2YXIgc2hvcnR0ZXh0ID0gdGV4dDEubGVuZ3RoID4gdGV4dDIubGVuZ3RoID8gdGV4dDIgOiB0ZXh0MTtcbiAgaWYgKGxvbmd0ZXh0Lmxlbmd0aCA8IDQgfHwgc2hvcnR0ZXh0Lmxlbmd0aCAqIDIgPCBsb25ndGV4dC5sZW5ndGgpIHtcbiAgICByZXR1cm4gbnVsbDsgIC8vIFBvaW50bGVzcy5cbiAgfVxuICB2YXIgZG1wID0gdGhpczsgIC8vICd0aGlzJyBiZWNvbWVzICd3aW5kb3cnIGluIGEgY2xvc3VyZS5cblxuICAvKipcbiAgICogRG9lcyBhIHN1YnN0cmluZyBvZiBzaG9ydHRleHQgZXhpc3Qgd2l0aGluIGxvbmd0ZXh0IHN1Y2ggdGhhdCB0aGUgc3Vic3RyaW5nXG4gICAqIGlzIGF0IGxlYXN0IGhhbGYgdGhlIGxlbmd0aCBvZiBsb25ndGV4dD9cbiAgICogQ2xvc3VyZSwgYnV0IGRvZXMgbm90IHJlZmVyZW5jZSBhbnkgZXh0ZXJuYWwgdmFyaWFibGVzLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gbG9uZ3RleHQgTG9uZ2VyIHN0cmluZy5cbiAgICogQHBhcmFtIHtzdHJpbmd9IHNob3J0dGV4dCBTaG9ydGVyIHN0cmluZy5cbiAgICogQHBhcmFtIHtudW1iZXJ9IGkgU3RhcnQgaW5kZXggb2YgcXVhcnRlciBsZW5ndGggc3Vic3RyaW5nIHdpdGhpbiBsb25ndGV4dC5cbiAgICogQHJldHVybiB7QXJyYXkuPHN0cmluZz59IEZpdmUgZWxlbWVudCBBcnJheSwgY29udGFpbmluZyB0aGUgcHJlZml4IG9mXG4gICAqICAgICBsb25ndGV4dCwgdGhlIHN1ZmZpeCBvZiBsb25ndGV4dCwgdGhlIHByZWZpeCBvZiBzaG9ydHRleHQsIHRoZSBzdWZmaXhcbiAgICogICAgIG9mIHNob3J0dGV4dCBhbmQgdGhlIGNvbW1vbiBtaWRkbGUuICBPciBudWxsIGlmIHRoZXJlIHdhcyBubyBtYXRjaC5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIGZ1bmN0aW9uIGRpZmZfaGFsZk1hdGNoSV8obG9uZ3RleHQsIHNob3J0dGV4dCwgaSkge1xuICAgIC8vIFN0YXJ0IHdpdGggYSAxLzQgbGVuZ3RoIHN1YnN0cmluZyBhdCBwb3NpdGlvbiBpIGFzIGEgc2VlZC5cbiAgICB2YXIgc2VlZCA9IGxvbmd0ZXh0LnN1YnN0cmluZyhpLCBpICsgTWF0aC5mbG9vcihsb25ndGV4dC5sZW5ndGggLyA0KSk7XG4gICAgdmFyIGogPSAtMTtcbiAgICB2YXIgYmVzdF9jb21tb24gPSAnJztcbiAgICB2YXIgYmVzdF9sb25ndGV4dF9hLCBiZXN0X2xvbmd0ZXh0X2IsIGJlc3Rfc2hvcnR0ZXh0X2EsIGJlc3Rfc2hvcnR0ZXh0X2I7XG4gICAgd2hpbGUgKChqID0gc2hvcnR0ZXh0LmluZGV4T2Yoc2VlZCwgaiArIDEpKSAhPSAtMSkge1xuICAgICAgdmFyIHByZWZpeExlbmd0aCA9IGRtcC5kaWZmX2NvbW1vblByZWZpeChsb25ndGV4dC5zdWJzdHJpbmcoaSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNob3J0dGV4dC5zdWJzdHJpbmcoaikpO1xuICAgICAgdmFyIHN1ZmZpeExlbmd0aCA9IGRtcC5kaWZmX2NvbW1vblN1ZmZpeChsb25ndGV4dC5zdWJzdHJpbmcoMCwgaSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNob3J0dGV4dC5zdWJzdHJpbmcoMCwgaikpO1xuICAgICAgaWYgKGJlc3RfY29tbW9uLmxlbmd0aCA8IHN1ZmZpeExlbmd0aCArIHByZWZpeExlbmd0aCkge1xuICAgICAgICBiZXN0X2NvbW1vbiA9IHNob3J0dGV4dC5zdWJzdHJpbmcoaiAtIHN1ZmZpeExlbmd0aCwgaikgK1xuICAgICAgICAgICAgc2hvcnR0ZXh0LnN1YnN0cmluZyhqLCBqICsgcHJlZml4TGVuZ3RoKTtcbiAgICAgICAgYmVzdF9sb25ndGV4dF9hID0gbG9uZ3RleHQuc3Vic3RyaW5nKDAsIGkgLSBzdWZmaXhMZW5ndGgpO1xuICAgICAgICBiZXN0X2xvbmd0ZXh0X2IgPSBsb25ndGV4dC5zdWJzdHJpbmcoaSArIHByZWZpeExlbmd0aCk7XG4gICAgICAgIGJlc3Rfc2hvcnR0ZXh0X2EgPSBzaG9ydHRleHQuc3Vic3RyaW5nKDAsIGogLSBzdWZmaXhMZW5ndGgpO1xuICAgICAgICBiZXN0X3Nob3J0dGV4dF9iID0gc2hvcnR0ZXh0LnN1YnN0cmluZyhqICsgcHJlZml4TGVuZ3RoKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGJlc3RfY29tbW9uLmxlbmd0aCAqIDIgPj0gbG9uZ3RleHQubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gW2Jlc3RfbG9uZ3RleHRfYSwgYmVzdF9sb25ndGV4dF9iLFxuICAgICAgICAgICAgICBiZXN0X3Nob3J0dGV4dF9hLCBiZXN0X3Nob3J0dGV4dF9iLCBiZXN0X2NvbW1vbl07XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfVxuXG4gIC8vIEZpcnN0IGNoZWNrIGlmIHRoZSBzZWNvbmQgcXVhcnRlciBpcyB0aGUgc2VlZCBmb3IgYSBoYWxmLW1hdGNoLlxuICB2YXIgaG0xID0gZGlmZl9oYWxmTWF0Y2hJXyhsb25ndGV4dCwgc2hvcnR0ZXh0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBNYXRoLmNlaWwobG9uZ3RleHQubGVuZ3RoIC8gNCkpO1xuICAvLyBDaGVjayBhZ2FpbiBiYXNlZCBvbiB0aGUgdGhpcmQgcXVhcnRlci5cbiAgdmFyIGhtMiA9IGRpZmZfaGFsZk1hdGNoSV8obG9uZ3RleHQsIHNob3J0dGV4dCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTWF0aC5jZWlsKGxvbmd0ZXh0Lmxlbmd0aCAvIDIpKTtcbiAgdmFyIGhtO1xuICBpZiAoIWhtMSAmJiAhaG0yKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH0gZWxzZSBpZiAoIWhtMikge1xuICAgIGhtID0gaG0xO1xuICB9IGVsc2UgaWYgKCFobTEpIHtcbiAgICBobSA9IGhtMjtcbiAgfSBlbHNlIHtcbiAgICAvLyBCb3RoIG1hdGNoZWQuICBTZWxlY3QgdGhlIGxvbmdlc3QuXG4gICAgaG0gPSBobTFbNF0ubGVuZ3RoID4gaG0yWzRdLmxlbmd0aCA/IGhtMSA6IGhtMjtcbiAgfVxuXG4gIC8vIEEgaGFsZi1tYXRjaCB3YXMgZm91bmQsIHNvcnQgb3V0IHRoZSByZXR1cm4gZGF0YS5cbiAgdmFyIHRleHQxX2EsIHRleHQxX2IsIHRleHQyX2EsIHRleHQyX2I7XG4gIGlmICh0ZXh0MS5sZW5ndGggPiB0ZXh0Mi5sZW5ndGgpIHtcbiAgICB0ZXh0MV9hID0gaG1bMF07XG4gICAgdGV4dDFfYiA9IGhtWzFdO1xuICAgIHRleHQyX2EgPSBobVsyXTtcbiAgICB0ZXh0Ml9iID0gaG1bM107XG4gIH0gZWxzZSB7XG4gICAgdGV4dDJfYSA9IGhtWzBdO1xuICAgIHRleHQyX2IgPSBobVsxXTtcbiAgICB0ZXh0MV9hID0gaG1bMl07XG4gICAgdGV4dDFfYiA9IGhtWzNdO1xuICB9XG4gIHZhciBtaWRfY29tbW9uID0gaG1bNF07XG4gIHJldHVybiBbdGV4dDFfYSwgdGV4dDFfYiwgdGV4dDJfYSwgdGV4dDJfYiwgbWlkX2NvbW1vbl07XG59O1xuXG5cbi8qKlxuICogUmVkdWNlIHRoZSBudW1iZXIgb2YgZWRpdHMgYnkgZWxpbWluYXRpbmcgc2VtYW50aWNhbGx5IHRyaXZpYWwgZXF1YWxpdGllcy5cbiAqIEBwYXJhbSB7IUFycmF5LjwhZGlmZl9tYXRjaF9wYXRjaC5EaWZmPn0gZGlmZnMgQXJyYXkgb2YgZGlmZiB0dXBsZXMuXG4gKi9cbmRpZmZfbWF0Y2hfcGF0Y2gucHJvdG90eXBlLmRpZmZfY2xlYW51cFNlbWFudGljID0gZnVuY3Rpb24oZGlmZnMpIHtcbiAgdmFyIGNoYW5nZXMgPSBmYWxzZTtcbiAgdmFyIGVxdWFsaXRpZXMgPSBbXTsgIC8vIFN0YWNrIG9mIGluZGljZXMgd2hlcmUgZXF1YWxpdGllcyBhcmUgZm91bmQuXG4gIHZhciBlcXVhbGl0aWVzTGVuZ3RoID0gMDsgIC8vIEtlZXBpbmcgb3VyIG93biBsZW5ndGggdmFyIGlzIGZhc3RlciBpbiBKUy5cbiAgLyoqIEB0eXBlIHs/c3RyaW5nfSAqL1xuICB2YXIgbGFzdGVxdWFsaXR5ID0gbnVsbDsgIC8vIEFsd2F5cyBlcXVhbCB0byBlcXVhbGl0aWVzW2VxdWFsaXRpZXNMZW5ndGgtMV1bMV1cbiAgdmFyIHBvaW50ZXIgPSAwOyAgLy8gSW5kZXggb2YgY3VycmVudCBwb3NpdGlvbi5cbiAgLy8gTnVtYmVyIG9mIGNoYXJhY3RlcnMgdGhhdCBjaGFuZ2VkIHByaW9yIHRvIHRoZSBlcXVhbGl0eS5cbiAgdmFyIGxlbmd0aF9pbnNlcnRpb25zMSA9IDA7XG4gIHZhciBsZW5ndGhfZGVsZXRpb25zMSA9IDA7XG4gIC8vIE51bWJlciBvZiBjaGFyYWN0ZXJzIHRoYXQgY2hhbmdlZCBhZnRlciB0aGUgZXF1YWxpdHkuXG4gIHZhciBsZW5ndGhfaW5zZXJ0aW9uczIgPSAwO1xuICB2YXIgbGVuZ3RoX2RlbGV0aW9uczIgPSAwO1xuICB3aGlsZSAocG9pbnRlciA8IGRpZmZzLmxlbmd0aCkge1xuICAgIGlmIChkaWZmc1twb2ludGVyXVswXSA9PSBESUZGX0VRVUFMKSB7ICAvLyBFcXVhbGl0eSBmb3VuZC5cbiAgICAgIGVxdWFsaXRpZXNbZXF1YWxpdGllc0xlbmd0aCsrXSA9IHBvaW50ZXI7XG4gICAgICBsZW5ndGhfaW5zZXJ0aW9uczEgPSBsZW5ndGhfaW5zZXJ0aW9uczI7XG4gICAgICBsZW5ndGhfZGVsZXRpb25zMSA9IGxlbmd0aF9kZWxldGlvbnMyO1xuICAgICAgbGVuZ3RoX2luc2VydGlvbnMyID0gMDtcbiAgICAgIGxlbmd0aF9kZWxldGlvbnMyID0gMDtcbiAgICAgIGxhc3RlcXVhbGl0eSA9IC8qKiBAdHlwZSB7c3RyaW5nfSAqLyhkaWZmc1twb2ludGVyXVsxXSk7XG4gICAgfSBlbHNlIHsgIC8vIEFuIGluc2VydGlvbiBvciBkZWxldGlvbi5cbiAgICAgIGlmIChkaWZmc1twb2ludGVyXVswXSA9PSBESUZGX0lOU0VSVCkge1xuICAgICAgICBsZW5ndGhfaW5zZXJ0aW9uczIgKz0gZGlmZnNbcG9pbnRlcl1bMV0ubGVuZ3RoO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGVuZ3RoX2RlbGV0aW9uczIgKz0gZGlmZnNbcG9pbnRlcl1bMV0ubGVuZ3RoO1xuICAgICAgfVxuICAgICAgLy8gRWxpbWluYXRlIGFuIGVxdWFsaXR5IHRoYXQgaXMgc21hbGxlciBvciBlcXVhbCB0byB0aGUgZWRpdHMgb24gYm90aFxuICAgICAgLy8gc2lkZXMgb2YgaXQuXG4gICAgICBpZiAobGFzdGVxdWFsaXR5ICE9PSBudWxsICYmIChsYXN0ZXF1YWxpdHkubGVuZ3RoIDw9XG4gICAgICAgICAgTWF0aC5tYXgobGVuZ3RoX2luc2VydGlvbnMxLCBsZW5ndGhfZGVsZXRpb25zMSkpICYmXG4gICAgICAgICAgKGxhc3RlcXVhbGl0eS5sZW5ndGggPD0gTWF0aC5tYXgobGVuZ3RoX2luc2VydGlvbnMyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlbmd0aF9kZWxldGlvbnMyKSkpIHtcbiAgICAgICAgLy8gRHVwbGljYXRlIHJlY29yZC5cbiAgICAgICAgZGlmZnMuc3BsaWNlKGVxdWFsaXRpZXNbZXF1YWxpdGllc0xlbmd0aCAtIDFdLCAwLFxuICAgICAgICAgICAgICAgICAgICAgW0RJRkZfREVMRVRFLCBsYXN0ZXF1YWxpdHldKTtcbiAgICAgICAgLy8gQ2hhbmdlIHNlY29uZCBjb3B5IHRvIGluc2VydC5cbiAgICAgICAgZGlmZnNbZXF1YWxpdGllc1tlcXVhbGl0aWVzTGVuZ3RoIC0gMV0gKyAxXVswXSA9IERJRkZfSU5TRVJUO1xuICAgICAgICAvLyBUaHJvdyBhd2F5IHRoZSBlcXVhbGl0eSB3ZSBqdXN0IGRlbGV0ZWQuXG4gICAgICAgIGVxdWFsaXRpZXNMZW5ndGgtLTtcbiAgICAgICAgLy8gVGhyb3cgYXdheSB0aGUgcHJldmlvdXMgZXF1YWxpdHkgKGl0IG5lZWRzIHRvIGJlIHJlZXZhbHVhdGVkKS5cbiAgICAgICAgZXF1YWxpdGllc0xlbmd0aC0tO1xuICAgICAgICBwb2ludGVyID0gZXF1YWxpdGllc0xlbmd0aCA+IDAgPyBlcXVhbGl0aWVzW2VxdWFsaXRpZXNMZW5ndGggLSAxXSA6IC0xO1xuICAgICAgICBsZW5ndGhfaW5zZXJ0aW9uczEgPSAwOyAgLy8gUmVzZXQgdGhlIGNvdW50ZXJzLlxuICAgICAgICBsZW5ndGhfZGVsZXRpb25zMSA9IDA7XG4gICAgICAgIGxlbmd0aF9pbnNlcnRpb25zMiA9IDA7XG4gICAgICAgIGxlbmd0aF9kZWxldGlvbnMyID0gMDtcbiAgICAgICAgbGFzdGVxdWFsaXR5ID0gbnVsbDtcbiAgICAgICAgY2hhbmdlcyA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuICAgIHBvaW50ZXIrKztcbiAgfVxuXG4gIC8vIE5vcm1hbGl6ZSB0aGUgZGlmZi5cbiAgaWYgKGNoYW5nZXMpIHtcbiAgICB0aGlzLmRpZmZfY2xlYW51cE1lcmdlKGRpZmZzKTtcbiAgfVxuICB0aGlzLmRpZmZfY2xlYW51cFNlbWFudGljTG9zc2xlc3MoZGlmZnMpO1xuXG4gIC8vIEZpbmQgYW55IG92ZXJsYXBzIGJldHdlZW4gZGVsZXRpb25zIGFuZCBpbnNlcnRpb25zLlxuICAvLyBlLmc6IDxkZWw+YWJjeHh4PC9kZWw+PGlucz54eHhkZWY8L2lucz5cbiAgLy8gICAtPiA8ZGVsPmFiYzwvZGVsPnh4eDxpbnM+ZGVmPC9pbnM+XG4gIC8vIE9ubHkgZXh0cmFjdCBhbiBvdmVybGFwIGlmIGl0IGlzIGFzIGJpZyBhcyB0aGUgZWRpdCBhaGVhZCBvciBiZWhpbmQgaXQuXG4gIHBvaW50ZXIgPSAxO1xuICB3aGlsZSAocG9pbnRlciA8IGRpZmZzLmxlbmd0aCkge1xuICAgIGlmIChkaWZmc1twb2ludGVyIC0gMV1bMF0gPT0gRElGRl9ERUxFVEUgJiZcbiAgICAgICAgZGlmZnNbcG9pbnRlcl1bMF0gPT0gRElGRl9JTlNFUlQpIHtcbiAgICAgIHZhciBkZWxldGlvbiA9IC8qKiBAdHlwZSB7c3RyaW5nfSAqLyhkaWZmc1twb2ludGVyIC0gMV1bMV0pO1xuICAgICAgdmFyIGluc2VydGlvbiA9IC8qKiBAdHlwZSB7c3RyaW5nfSAqLyhkaWZmc1twb2ludGVyXVsxXSk7XG4gICAgICB2YXIgb3ZlcmxhcF9sZW5ndGggPSB0aGlzLmRpZmZfY29tbW9uT3ZlcmxhcF8oZGVsZXRpb24sIGluc2VydGlvbik7XG4gICAgICBpZiAob3ZlcmxhcF9sZW5ndGggPj0gZGVsZXRpb24ubGVuZ3RoIC8gMiB8fFxuICAgICAgICAgIG92ZXJsYXBfbGVuZ3RoID49IGluc2VydGlvbi5sZW5ndGggLyAyKSB7XG4gICAgICAgIC8vIE92ZXJsYXAgZm91bmQuICBJbnNlcnQgYW4gZXF1YWxpdHkgYW5kIHRyaW0gdGhlIHN1cnJvdW5kaW5nIGVkaXRzLlxuICAgICAgICBkaWZmcy5zcGxpY2UocG9pbnRlciwgMCxcbiAgICAgICAgICAgIFtESUZGX0VRVUFMLCBpbnNlcnRpb24uc3Vic3RyaW5nKDAsIG92ZXJsYXBfbGVuZ3RoKV0pO1xuICAgICAgICBkaWZmc1twb2ludGVyIC0gMV1bMV0gPVxuICAgICAgICAgICAgZGVsZXRpb24uc3Vic3RyaW5nKDAsIGRlbGV0aW9uLmxlbmd0aCAtIG92ZXJsYXBfbGVuZ3RoKTtcbiAgICAgICAgZGlmZnNbcG9pbnRlciArIDFdWzFdID0gaW5zZXJ0aW9uLnN1YnN0cmluZyhvdmVybGFwX2xlbmd0aCk7XG4gICAgICAgIHBvaW50ZXIrKztcbiAgICAgIH1cbiAgICAgIHBvaW50ZXIrKztcbiAgICB9XG4gICAgcG9pbnRlcisrO1xuICB9XG59O1xuXG5cbi8qKlxuICogTG9vayBmb3Igc2luZ2xlIGVkaXRzIHN1cnJvdW5kZWQgb24gYm90aCBzaWRlcyBieSBlcXVhbGl0aWVzXG4gKiB3aGljaCBjYW4gYmUgc2hpZnRlZCBzaWRld2F5cyB0byBhbGlnbiB0aGUgZWRpdCB0byBhIHdvcmQgYm91bmRhcnkuXG4gKiBlLmc6IFRoZSBjPGlucz5hdCBjPC9pbnM+YW1lLiAtPiBUaGUgPGlucz5jYXQgPC9pbnM+Y2FtZS5cbiAqIEBwYXJhbSB7IUFycmF5LjwhZGlmZl9tYXRjaF9wYXRjaC5EaWZmPn0gZGlmZnMgQXJyYXkgb2YgZGlmZiB0dXBsZXMuXG4gKi9cbmRpZmZfbWF0Y2hfcGF0Y2gucHJvdG90eXBlLmRpZmZfY2xlYW51cFNlbWFudGljTG9zc2xlc3MgPSBmdW5jdGlvbihkaWZmcykge1xuICAvLyBEZWZpbmUgc29tZSByZWdleCBwYXR0ZXJucyBmb3IgbWF0Y2hpbmcgYm91bmRhcmllcy5cbiAgdmFyIHB1bmN0dWF0aW9uID0gL1teYS16QS1aMC05XS87XG4gIHZhciB3aGl0ZXNwYWNlID0gL1xccy87XG4gIHZhciBsaW5lYnJlYWsgPSAvW1xcclxcbl0vO1xuICB2YXIgYmxhbmtsaW5lRW5kID0gL1xcblxccj9cXG4kLztcbiAgdmFyIGJsYW5rbGluZVN0YXJ0ID0gL15cXHI/XFxuXFxyP1xcbi87XG5cbiAgLyoqXG4gICAqIEdpdmVuIHR3byBzdHJpbmdzLCBjb21wdXRlIGEgc2NvcmUgcmVwcmVzZW50aW5nIHdoZXRoZXIgdGhlIGludGVybmFsXG4gICAqIGJvdW5kYXJ5IGZhbGxzIG9uIGxvZ2ljYWwgYm91bmRhcmllcy5cbiAgICogU2NvcmVzIHJhbmdlIGZyb20gNSAoYmVzdCkgdG8gMCAod29yc3QpLlxuICAgKiBDbG9zdXJlLCBtYWtlcyByZWZlcmVuY2UgdG8gcmVnZXggcGF0dGVybnMgZGVmaW5lZCBhYm92ZS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9uZSBGaXJzdCBzdHJpbmcuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0d28gU2Vjb25kIHN0cmluZy5cbiAgICogQHJldHVybiB7bnVtYmVyfSBUaGUgc2NvcmUuXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBmdW5jdGlvbiBkaWZmX2NsZWFudXBTZW1hbnRpY1Njb3JlXyhvbmUsIHR3bykge1xuICAgIGlmICghb25lIHx8ICF0d28pIHtcbiAgICAgIC8vIEVkZ2VzIGFyZSB0aGUgYmVzdC5cbiAgICAgIHJldHVybiA1O1xuICAgIH1cblxuICAgIC8vIEVhY2ggcG9ydCBvZiB0aGlzIGZ1bmN0aW9uIGJlaGF2ZXMgc2xpZ2h0bHkgZGlmZmVyZW50bHkgZHVlIHRvXG4gICAgLy8gc3VidGxlIGRpZmZlcmVuY2VzIGluIGVhY2ggbGFuZ3VhZ2UncyBkZWZpbml0aW9uIG9mIHRoaW5ncyBsaWtlXG4gICAgLy8gJ3doaXRlc3BhY2UnLiAgU2luY2UgdGhpcyBmdW5jdGlvbidzIHB1cnBvc2UgaXMgbGFyZ2VseSBjb3NtZXRpYyxcbiAgICAvLyB0aGUgY2hvaWNlIGhhcyBiZWVuIG1hZGUgdG8gdXNlIGVhY2ggbGFuZ3VhZ2UncyBuYXRpdmUgZmVhdHVyZXNcbiAgICAvLyByYXRoZXIgdGhhbiBmb3JjZSB0b3RhbCBjb25mb3JtaXR5LlxuICAgIHZhciBzY29yZSA9IDA7XG4gICAgLy8gT25lIHBvaW50IGZvciBub24tYWxwaGFudW1lcmljLlxuICAgIGlmIChvbmUuY2hhckF0KG9uZS5sZW5ndGggLSAxKS5tYXRjaChwdW5jdHVhdGlvbikgfHxcbiAgICAgICAgdHdvLmNoYXJBdCgwKS5tYXRjaChwdW5jdHVhdGlvbikpIHtcbiAgICAgIHNjb3JlKys7XG4gICAgICAvLyBUd28gcG9pbnRzIGZvciB3aGl0ZXNwYWNlLlxuICAgICAgaWYgKG9uZS5jaGFyQXQob25lLmxlbmd0aCAtIDEpLm1hdGNoKHdoaXRlc3BhY2UpIHx8XG4gICAgICAgICAgdHdvLmNoYXJBdCgwKS5tYXRjaCh3aGl0ZXNwYWNlKSkge1xuICAgICAgICBzY29yZSsrO1xuICAgICAgICAvLyBUaHJlZSBwb2ludHMgZm9yIGxpbmUgYnJlYWtzLlxuICAgICAgICBpZiAob25lLmNoYXJBdChvbmUubGVuZ3RoIC0gMSkubWF0Y2gobGluZWJyZWFrKSB8fFxuICAgICAgICAgICAgdHdvLmNoYXJBdCgwKS5tYXRjaChsaW5lYnJlYWspKSB7XG4gICAgICAgICAgc2NvcmUrKztcbiAgICAgICAgICAvLyBGb3VyIHBvaW50cyBmb3IgYmxhbmsgbGluZXMuXG4gICAgICAgICAgaWYgKG9uZS5tYXRjaChibGFua2xpbmVFbmQpIHx8IHR3by5tYXRjaChibGFua2xpbmVTdGFydCkpIHtcbiAgICAgICAgICAgIHNjb3JlKys7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBzY29yZTtcbiAgfVxuXG4gIHZhciBwb2ludGVyID0gMTtcbiAgLy8gSW50ZW50aW9uYWxseSBpZ25vcmUgdGhlIGZpcnN0IGFuZCBsYXN0IGVsZW1lbnQgKGRvbid0IG5lZWQgY2hlY2tpbmcpLlxuICB3aGlsZSAocG9pbnRlciA8IGRpZmZzLmxlbmd0aCAtIDEpIHtcbiAgICBpZiAoZGlmZnNbcG9pbnRlciAtIDFdWzBdID09IERJRkZfRVFVQUwgJiZcbiAgICAgICAgZGlmZnNbcG9pbnRlciArIDFdWzBdID09IERJRkZfRVFVQUwpIHtcbiAgICAgIC8vIFRoaXMgaXMgYSBzaW5nbGUgZWRpdCBzdXJyb3VuZGVkIGJ5IGVxdWFsaXRpZXMuXG4gICAgICB2YXIgZXF1YWxpdHkxID0gLyoqIEB0eXBlIHtzdHJpbmd9ICovKGRpZmZzW3BvaW50ZXIgLSAxXVsxXSk7XG4gICAgICB2YXIgZWRpdCA9IC8qKiBAdHlwZSB7c3RyaW5nfSAqLyhkaWZmc1twb2ludGVyXVsxXSk7XG4gICAgICB2YXIgZXF1YWxpdHkyID0gLyoqIEB0eXBlIHtzdHJpbmd9ICovKGRpZmZzW3BvaW50ZXIgKyAxXVsxXSk7XG5cbiAgICAgIC8vIEZpcnN0LCBzaGlmdCB0aGUgZWRpdCBhcyBmYXIgbGVmdCBhcyBwb3NzaWJsZS5cbiAgICAgIHZhciBjb21tb25PZmZzZXQgPSB0aGlzLmRpZmZfY29tbW9uU3VmZml4KGVxdWFsaXR5MSwgZWRpdCk7XG4gICAgICBpZiAoY29tbW9uT2Zmc2V0KSB7XG4gICAgICAgIHZhciBjb21tb25TdHJpbmcgPSBlZGl0LnN1YnN0cmluZyhlZGl0Lmxlbmd0aCAtIGNvbW1vbk9mZnNldCk7XG4gICAgICAgIGVxdWFsaXR5MSA9IGVxdWFsaXR5MS5zdWJzdHJpbmcoMCwgZXF1YWxpdHkxLmxlbmd0aCAtIGNvbW1vbk9mZnNldCk7XG4gICAgICAgIGVkaXQgPSBjb21tb25TdHJpbmcgKyBlZGl0LnN1YnN0cmluZygwLCBlZGl0Lmxlbmd0aCAtIGNvbW1vbk9mZnNldCk7XG4gICAgICAgIGVxdWFsaXR5MiA9IGNvbW1vblN0cmluZyArIGVxdWFsaXR5MjtcbiAgICAgIH1cblxuICAgICAgLy8gU2Vjb25kLCBzdGVwIGNoYXJhY3RlciBieSBjaGFyYWN0ZXIgcmlnaHQsIGxvb2tpbmcgZm9yIHRoZSBiZXN0IGZpdC5cbiAgICAgIHZhciBiZXN0RXF1YWxpdHkxID0gZXF1YWxpdHkxO1xuICAgICAgdmFyIGJlc3RFZGl0ID0gZWRpdDtcbiAgICAgIHZhciBiZXN0RXF1YWxpdHkyID0gZXF1YWxpdHkyO1xuICAgICAgdmFyIGJlc3RTY29yZSA9IGRpZmZfY2xlYW51cFNlbWFudGljU2NvcmVfKGVxdWFsaXR5MSwgZWRpdCkgK1xuICAgICAgICAgIGRpZmZfY2xlYW51cFNlbWFudGljU2NvcmVfKGVkaXQsIGVxdWFsaXR5Mik7XG4gICAgICB3aGlsZSAoZWRpdC5jaGFyQXQoMCkgPT09IGVxdWFsaXR5Mi5jaGFyQXQoMCkpIHtcbiAgICAgICAgZXF1YWxpdHkxICs9IGVkaXQuY2hhckF0KDApO1xuICAgICAgICBlZGl0ID0gZWRpdC5zdWJzdHJpbmcoMSkgKyBlcXVhbGl0eTIuY2hhckF0KDApO1xuICAgICAgICBlcXVhbGl0eTIgPSBlcXVhbGl0eTIuc3Vic3RyaW5nKDEpO1xuICAgICAgICB2YXIgc2NvcmUgPSBkaWZmX2NsZWFudXBTZW1hbnRpY1Njb3JlXyhlcXVhbGl0eTEsIGVkaXQpICtcbiAgICAgICAgICAgIGRpZmZfY2xlYW51cFNlbWFudGljU2NvcmVfKGVkaXQsIGVxdWFsaXR5Mik7XG4gICAgICAgIC8vIFRoZSA+PSBlbmNvdXJhZ2VzIHRyYWlsaW5nIHJhdGhlciB0aGFuIGxlYWRpbmcgd2hpdGVzcGFjZSBvbiBlZGl0cy5cbiAgICAgICAgaWYgKHNjb3JlID49IGJlc3RTY29yZSkge1xuICAgICAgICAgIGJlc3RTY29yZSA9IHNjb3JlO1xuICAgICAgICAgIGJlc3RFcXVhbGl0eTEgPSBlcXVhbGl0eTE7XG4gICAgICAgICAgYmVzdEVkaXQgPSBlZGl0O1xuICAgICAgICAgIGJlc3RFcXVhbGl0eTIgPSBlcXVhbGl0eTI7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGRpZmZzW3BvaW50ZXIgLSAxXVsxXSAhPSBiZXN0RXF1YWxpdHkxKSB7XG4gICAgICAgIC8vIFdlIGhhdmUgYW4gaW1wcm92ZW1lbnQsIHNhdmUgaXQgYmFjayB0byB0aGUgZGlmZi5cbiAgICAgICAgaWYgKGJlc3RFcXVhbGl0eTEpIHtcbiAgICAgICAgICBkaWZmc1twb2ludGVyIC0gMV1bMV0gPSBiZXN0RXF1YWxpdHkxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGRpZmZzLnNwbGljZShwb2ludGVyIC0gMSwgMSk7XG4gICAgICAgICAgcG9pbnRlci0tO1xuICAgICAgICB9XG4gICAgICAgIGRpZmZzW3BvaW50ZXJdWzFdID0gYmVzdEVkaXQ7XG4gICAgICAgIGlmIChiZXN0RXF1YWxpdHkyKSB7XG4gICAgICAgICAgZGlmZnNbcG9pbnRlciArIDFdWzFdID0gYmVzdEVxdWFsaXR5MjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkaWZmcy5zcGxpY2UocG9pbnRlciArIDEsIDEpO1xuICAgICAgICAgIHBvaW50ZXItLTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBwb2ludGVyKys7XG4gIH1cbn07XG5cblxuLyoqXG4gKiBSZWR1Y2UgdGhlIG51bWJlciBvZiBlZGl0cyBieSBlbGltaW5hdGluZyBvcGVyYXRpb25hbGx5IHRyaXZpYWwgZXF1YWxpdGllcy5cbiAqIEBwYXJhbSB7IUFycmF5LjwhZGlmZl9tYXRjaF9wYXRjaC5EaWZmPn0gZGlmZnMgQXJyYXkgb2YgZGlmZiB0dXBsZXMuXG4gKi9cbmRpZmZfbWF0Y2hfcGF0Y2gucHJvdG90eXBlLmRpZmZfY2xlYW51cEVmZmljaWVuY3kgPSBmdW5jdGlvbihkaWZmcykge1xuICB2YXIgY2hhbmdlcyA9IGZhbHNlO1xuICB2YXIgZXF1YWxpdGllcyA9IFtdOyAgLy8gU3RhY2sgb2YgaW5kaWNlcyB3aGVyZSBlcXVhbGl0aWVzIGFyZSBmb3VuZC5cbiAgdmFyIGVxdWFsaXRpZXNMZW5ndGggPSAwOyAgLy8gS2VlcGluZyBvdXIgb3duIGxlbmd0aCB2YXIgaXMgZmFzdGVyIGluIEpTLlxuICB2YXIgbGFzdGVxdWFsaXR5ID0gJyc7ICAvLyBBbHdheXMgZXF1YWwgdG8gZXF1YWxpdGllc1tlcXVhbGl0aWVzTGVuZ3RoLTFdWzFdXG4gIHZhciBwb2ludGVyID0gMDsgIC8vIEluZGV4IG9mIGN1cnJlbnQgcG9zaXRpb24uXG4gIC8vIElzIHRoZXJlIGFuIGluc2VydGlvbiBvcGVyYXRpb24gYmVmb3JlIHRoZSBsYXN0IGVxdWFsaXR5LlxuICB2YXIgcHJlX2lucyA9IGZhbHNlO1xuICAvLyBJcyB0aGVyZSBhIGRlbGV0aW9uIG9wZXJhdGlvbiBiZWZvcmUgdGhlIGxhc3QgZXF1YWxpdHkuXG4gIHZhciBwcmVfZGVsID0gZmFsc2U7XG4gIC8vIElzIHRoZXJlIGFuIGluc2VydGlvbiBvcGVyYXRpb24gYWZ0ZXIgdGhlIGxhc3QgZXF1YWxpdHkuXG4gIHZhciBwb3N0X2lucyA9IGZhbHNlO1xuICAvLyBJcyB0aGVyZSBhIGRlbGV0aW9uIG9wZXJhdGlvbiBhZnRlciB0aGUgbGFzdCBlcXVhbGl0eS5cbiAgdmFyIHBvc3RfZGVsID0gZmFsc2U7XG4gIHdoaWxlIChwb2ludGVyIDwgZGlmZnMubGVuZ3RoKSB7XG4gICAgaWYgKGRpZmZzW3BvaW50ZXJdWzBdID09IERJRkZfRVFVQUwpIHsgIC8vIEVxdWFsaXR5IGZvdW5kLlxuICAgICAgaWYgKGRpZmZzW3BvaW50ZXJdWzFdLmxlbmd0aCA8IHRoaXMuRGlmZl9FZGl0Q29zdCAmJlxuICAgICAgICAgIChwb3N0X2lucyB8fCBwb3N0X2RlbCkpIHtcbiAgICAgICAgLy8gQ2FuZGlkYXRlIGZvdW5kLlxuICAgICAgICBlcXVhbGl0aWVzW2VxdWFsaXRpZXNMZW5ndGgrK10gPSBwb2ludGVyO1xuICAgICAgICBwcmVfaW5zID0gcG9zdF9pbnM7XG4gICAgICAgIHByZV9kZWwgPSBwb3N0X2RlbDtcbiAgICAgICAgbGFzdGVxdWFsaXR5ID0gZGlmZnNbcG9pbnRlcl1bMV07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBOb3QgYSBjYW5kaWRhdGUsIGFuZCBjYW4gbmV2ZXIgYmVjb21lIG9uZS5cbiAgICAgICAgZXF1YWxpdGllc0xlbmd0aCA9IDA7XG4gICAgICAgIGxhc3RlcXVhbGl0eSA9ICcnO1xuICAgICAgfVxuICAgICAgcG9zdF9pbnMgPSBwb3N0X2RlbCA9IGZhbHNlO1xuICAgIH0gZWxzZSB7ICAvLyBBbiBpbnNlcnRpb24gb3IgZGVsZXRpb24uXG4gICAgICBpZiAoZGlmZnNbcG9pbnRlcl1bMF0gPT0gRElGRl9ERUxFVEUpIHtcbiAgICAgICAgcG9zdF9kZWwgPSB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcG9zdF9pbnMgPSB0cnVlO1xuICAgICAgfVxuICAgICAgLypcbiAgICAgICAqIEZpdmUgdHlwZXMgdG8gYmUgc3BsaXQ6XG4gICAgICAgKiA8aW5zPkE8L2lucz48ZGVsPkI8L2RlbD5YWTxpbnM+QzwvaW5zPjxkZWw+RDwvZGVsPlxuICAgICAgICogPGlucz5BPC9pbnM+WDxpbnM+QzwvaW5zPjxkZWw+RDwvZGVsPlxuICAgICAgICogPGlucz5BPC9pbnM+PGRlbD5CPC9kZWw+WDxpbnM+QzwvaW5zPlxuICAgICAgICogPGlucz5BPC9kZWw+WDxpbnM+QzwvaW5zPjxkZWw+RDwvZGVsPlxuICAgICAgICogPGlucz5BPC9pbnM+PGRlbD5CPC9kZWw+WDxkZWw+QzwvZGVsPlxuICAgICAgICovXG4gICAgICBpZiAobGFzdGVxdWFsaXR5ICYmICgocHJlX2lucyAmJiBwcmVfZGVsICYmIHBvc3RfaW5zICYmIHBvc3RfZGVsKSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgKChsYXN0ZXF1YWxpdHkubGVuZ3RoIDwgdGhpcy5EaWZmX0VkaXRDb3N0IC8gMikgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAocHJlX2lucyArIHByZV9kZWwgKyBwb3N0X2lucyArIHBvc3RfZGVsKSA9PSAzKSkpIHtcbiAgICAgICAgLy8gRHVwbGljYXRlIHJlY29yZC5cbiAgICAgICAgZGlmZnMuc3BsaWNlKGVxdWFsaXRpZXNbZXF1YWxpdGllc0xlbmd0aCAtIDFdLCAwLFxuICAgICAgICAgICAgICAgICAgICAgW0RJRkZfREVMRVRFLCBsYXN0ZXF1YWxpdHldKTtcbiAgICAgICAgLy8gQ2hhbmdlIHNlY29uZCBjb3B5IHRvIGluc2VydC5cbiAgICAgICAgZGlmZnNbZXF1YWxpdGllc1tlcXVhbGl0aWVzTGVuZ3RoIC0gMV0gKyAxXVswXSA9IERJRkZfSU5TRVJUO1xuICAgICAgICBlcXVhbGl0aWVzTGVuZ3RoLS07ICAvLyBUaHJvdyBhd2F5IHRoZSBlcXVhbGl0eSB3ZSBqdXN0IGRlbGV0ZWQ7XG4gICAgICAgIGxhc3RlcXVhbGl0eSA9ICcnO1xuICAgICAgICBpZiAocHJlX2lucyAmJiBwcmVfZGVsKSB7XG4gICAgICAgICAgLy8gTm8gY2hhbmdlcyBtYWRlIHdoaWNoIGNvdWxkIGFmZmVjdCBwcmV2aW91cyBlbnRyeSwga2VlcCBnb2luZy5cbiAgICAgICAgICBwb3N0X2lucyA9IHBvc3RfZGVsID0gdHJ1ZTtcbiAgICAgICAgICBlcXVhbGl0aWVzTGVuZ3RoID0gMDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBlcXVhbGl0aWVzTGVuZ3RoLS07ICAvLyBUaHJvdyBhd2F5IHRoZSBwcmV2aW91cyBlcXVhbGl0eS5cbiAgICAgICAgICBwb2ludGVyID0gZXF1YWxpdGllc0xlbmd0aCA+IDAgP1xuICAgICAgICAgICAgICBlcXVhbGl0aWVzW2VxdWFsaXRpZXNMZW5ndGggLSAxXSA6IC0xO1xuICAgICAgICAgIHBvc3RfaW5zID0gcG9zdF9kZWwgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBjaGFuZ2VzID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcG9pbnRlcisrO1xuICB9XG5cbiAgaWYgKGNoYW5nZXMpIHtcbiAgICB0aGlzLmRpZmZfY2xlYW51cE1lcmdlKGRpZmZzKTtcbiAgfVxufTtcblxuXG4vKipcbiAqIFJlb3JkZXIgYW5kIG1lcmdlIGxpa2UgZWRpdCBzZWN0aW9ucy4gIE1lcmdlIGVxdWFsaXRpZXMuXG4gKiBBbnkgZWRpdCBzZWN0aW9uIGNhbiBtb3ZlIGFzIGxvbmcgYXMgaXQgZG9lc24ndCBjcm9zcyBhbiBlcXVhbGl0eS5cbiAqIEBwYXJhbSB7IUFycmF5LjwhZGlmZl9tYXRjaF9wYXRjaC5EaWZmPn0gZGlmZnMgQXJyYXkgb2YgZGlmZiB0dXBsZXMuXG4gKi9cbmRpZmZfbWF0Y2hfcGF0Y2gucHJvdG90eXBlLmRpZmZfY2xlYW51cE1lcmdlID0gZnVuY3Rpb24oZGlmZnMpIHtcbiAgZGlmZnMucHVzaChbRElGRl9FUVVBTCwgJyddKTsgIC8vIEFkZCBhIGR1bW15IGVudHJ5IGF0IHRoZSBlbmQuXG4gIHZhciBwb2ludGVyID0gMDtcbiAgdmFyIGNvdW50X2RlbGV0ZSA9IDA7XG4gIHZhciBjb3VudF9pbnNlcnQgPSAwO1xuICB2YXIgdGV4dF9kZWxldGUgPSAnJztcbiAgdmFyIHRleHRfaW5zZXJ0ID0gJyc7XG4gIHZhciBjb21tb25sZW5ndGg7XG4gIHdoaWxlIChwb2ludGVyIDwgZGlmZnMubGVuZ3RoKSB7XG4gICAgc3dpdGNoIChkaWZmc1twb2ludGVyXVswXSkge1xuICAgICAgY2FzZSBESUZGX0lOU0VSVDpcbiAgICAgICAgY291bnRfaW5zZXJ0Kys7XG4gICAgICAgIHRleHRfaW5zZXJ0ICs9IGRpZmZzW3BvaW50ZXJdWzFdO1xuICAgICAgICBwb2ludGVyKys7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBESUZGX0RFTEVURTpcbiAgICAgICAgY291bnRfZGVsZXRlKys7XG4gICAgICAgIHRleHRfZGVsZXRlICs9IGRpZmZzW3BvaW50ZXJdWzFdO1xuICAgICAgICBwb2ludGVyKys7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBESUZGX0VRVUFMOlxuICAgICAgICAvLyBVcG9uIHJlYWNoaW5nIGFuIGVxdWFsaXR5LCBjaGVjayBmb3IgcHJpb3IgcmVkdW5kYW5jaWVzLlxuICAgICAgICBpZiAoY291bnRfZGVsZXRlICsgY291bnRfaW5zZXJ0ID4gMSkge1xuICAgICAgICAgIGlmIChjb3VudF9kZWxldGUgIT09IDAgJiYgY291bnRfaW5zZXJ0ICE9PSAwKSB7XG4gICAgICAgICAgICAvLyBGYWN0b3Igb3V0IGFueSBjb21tb24gcHJlZml4aWVzLlxuICAgICAgICAgICAgY29tbW9ubGVuZ3RoID0gdGhpcy5kaWZmX2NvbW1vblByZWZpeCh0ZXh0X2luc2VydCwgdGV4dF9kZWxldGUpO1xuICAgICAgICAgICAgaWYgKGNvbW1vbmxlbmd0aCAhPT0gMCkge1xuICAgICAgICAgICAgICBpZiAoKHBvaW50ZXIgLSBjb3VudF9kZWxldGUgLSBjb3VudF9pbnNlcnQpID4gMCAmJlxuICAgICAgICAgICAgICAgICAgZGlmZnNbcG9pbnRlciAtIGNvdW50X2RlbGV0ZSAtIGNvdW50X2luc2VydCAtIDFdWzBdID09XG4gICAgICAgICAgICAgICAgICBESUZGX0VRVUFMKSB7XG4gICAgICAgICAgICAgICAgZGlmZnNbcG9pbnRlciAtIGNvdW50X2RlbGV0ZSAtIGNvdW50X2luc2VydCAtIDFdWzFdICs9XG4gICAgICAgICAgICAgICAgICAgIHRleHRfaW5zZXJ0LnN1YnN0cmluZygwLCBjb21tb25sZW5ndGgpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGRpZmZzLnNwbGljZSgwLCAwLCBbRElGRl9FUVVBTCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHRfaW5zZXJ0LnN1YnN0cmluZygwLCBjb21tb25sZW5ndGgpXSk7XG4gICAgICAgICAgICAgICAgcG9pbnRlcisrO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHRleHRfaW5zZXJ0ID0gdGV4dF9pbnNlcnQuc3Vic3RyaW5nKGNvbW1vbmxlbmd0aCk7XG4gICAgICAgICAgICAgIHRleHRfZGVsZXRlID0gdGV4dF9kZWxldGUuc3Vic3RyaW5nKGNvbW1vbmxlbmd0aCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBGYWN0b3Igb3V0IGFueSBjb21tb24gc3VmZml4aWVzLlxuICAgICAgICAgICAgY29tbW9ubGVuZ3RoID0gdGhpcy5kaWZmX2NvbW1vblN1ZmZpeCh0ZXh0X2luc2VydCwgdGV4dF9kZWxldGUpO1xuICAgICAgICAgICAgaWYgKGNvbW1vbmxlbmd0aCAhPT0gMCkge1xuICAgICAgICAgICAgICBkaWZmc1twb2ludGVyXVsxXSA9IHRleHRfaW5zZXJ0LnN1YnN0cmluZyh0ZXh0X2luc2VydC5sZW5ndGggLVxuICAgICAgICAgICAgICAgICAgY29tbW9ubGVuZ3RoKSArIGRpZmZzW3BvaW50ZXJdWzFdO1xuICAgICAgICAgICAgICB0ZXh0X2luc2VydCA9IHRleHRfaW5zZXJ0LnN1YnN0cmluZygwLCB0ZXh0X2luc2VydC5sZW5ndGggLVxuICAgICAgICAgICAgICAgICAgY29tbW9ubGVuZ3RoKTtcbiAgICAgICAgICAgICAgdGV4dF9kZWxldGUgPSB0ZXh0X2RlbGV0ZS5zdWJzdHJpbmcoMCwgdGV4dF9kZWxldGUubGVuZ3RoIC1cbiAgICAgICAgICAgICAgICAgIGNvbW1vbmxlbmd0aCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIERlbGV0ZSB0aGUgb2ZmZW5kaW5nIHJlY29yZHMgYW5kIGFkZCB0aGUgbWVyZ2VkIG9uZXMuXG4gICAgICAgICAgaWYgKGNvdW50X2RlbGV0ZSA9PT0gMCkge1xuICAgICAgICAgICAgZGlmZnMuc3BsaWNlKHBvaW50ZXIgLSBjb3VudF9kZWxldGUgLSBjb3VudF9pbnNlcnQsXG4gICAgICAgICAgICAgICAgY291bnRfZGVsZXRlICsgY291bnRfaW5zZXJ0LCBbRElGRl9JTlNFUlQsIHRleHRfaW5zZXJ0XSk7XG4gICAgICAgICAgfSBlbHNlIGlmIChjb3VudF9pbnNlcnQgPT09IDApIHtcbiAgICAgICAgICAgIGRpZmZzLnNwbGljZShwb2ludGVyIC0gY291bnRfZGVsZXRlIC0gY291bnRfaW5zZXJ0LFxuICAgICAgICAgICAgICAgIGNvdW50X2RlbGV0ZSArIGNvdW50X2luc2VydCwgW0RJRkZfREVMRVRFLCB0ZXh0X2RlbGV0ZV0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkaWZmcy5zcGxpY2UocG9pbnRlciAtIGNvdW50X2RlbGV0ZSAtIGNvdW50X2luc2VydCxcbiAgICAgICAgICAgICAgICBjb3VudF9kZWxldGUgKyBjb3VudF9pbnNlcnQsIFtESUZGX0RFTEVURSwgdGV4dF9kZWxldGVdLFxuICAgICAgICAgICAgICAgIFtESUZGX0lOU0VSVCwgdGV4dF9pbnNlcnRdKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcG9pbnRlciA9IHBvaW50ZXIgLSBjb3VudF9kZWxldGUgLSBjb3VudF9pbnNlcnQgK1xuICAgICAgICAgICAgICAgICAgICAoY291bnRfZGVsZXRlID8gMSA6IDApICsgKGNvdW50X2luc2VydCA/IDEgOiAwKSArIDE7XG4gICAgICAgIH0gZWxzZSBpZiAocG9pbnRlciAhPT0gMCAmJiBkaWZmc1twb2ludGVyIC0gMV1bMF0gPT0gRElGRl9FUVVBTCkge1xuICAgICAgICAgIC8vIE1lcmdlIHRoaXMgZXF1YWxpdHkgd2l0aCB0aGUgcHJldmlvdXMgb25lLlxuICAgICAgICAgIGRpZmZzW3BvaW50ZXIgLSAxXVsxXSArPSBkaWZmc1twb2ludGVyXVsxXTtcbiAgICAgICAgICBkaWZmcy5zcGxpY2UocG9pbnRlciwgMSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcG9pbnRlcisrO1xuICAgICAgICB9XG4gICAgICAgIGNvdW50X2luc2VydCA9IDA7XG4gICAgICAgIGNvdW50X2RlbGV0ZSA9IDA7XG4gICAgICAgIHRleHRfZGVsZXRlID0gJyc7XG4gICAgICAgIHRleHRfaW5zZXJ0ID0gJyc7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICBpZiAoZGlmZnNbZGlmZnMubGVuZ3RoIC0gMV1bMV0gPT09ICcnKSB7XG4gICAgZGlmZnMucG9wKCk7ICAvLyBSZW1vdmUgdGhlIGR1bW15IGVudHJ5IGF0IHRoZSBlbmQuXG4gIH1cblxuICAvLyBTZWNvbmQgcGFzczogbG9vayBmb3Igc2luZ2xlIGVkaXRzIHN1cnJvdW5kZWQgb24gYm90aCBzaWRlcyBieSBlcXVhbGl0aWVzXG4gIC8vIHdoaWNoIGNhbiBiZSBzaGlmdGVkIHNpZGV3YXlzIHRvIGVsaW1pbmF0ZSBhbiBlcXVhbGl0eS5cbiAgLy8gZS5nOiBBPGlucz5CQTwvaW5zPkMgLT4gPGlucz5BQjwvaW5zPkFDXG4gIHZhciBjaGFuZ2VzID0gZmFsc2U7XG4gIHBvaW50ZXIgPSAxO1xuICAvLyBJbnRlbnRpb25hbGx5IGlnbm9yZSB0aGUgZmlyc3QgYW5kIGxhc3QgZWxlbWVudCAoZG9uJ3QgbmVlZCBjaGVja2luZykuXG4gIHdoaWxlIChwb2ludGVyIDwgZGlmZnMubGVuZ3RoIC0gMSkge1xuICAgIGlmIChkaWZmc1twb2ludGVyIC0gMV1bMF0gPT0gRElGRl9FUVVBTCAmJlxuICAgICAgICBkaWZmc1twb2ludGVyICsgMV1bMF0gPT0gRElGRl9FUVVBTCkge1xuICAgICAgLy8gVGhpcyBpcyBhIHNpbmdsZSBlZGl0IHN1cnJvdW5kZWQgYnkgZXF1YWxpdGllcy5cbiAgICAgIGlmIChkaWZmc1twb2ludGVyXVsxXS5zdWJzdHJpbmcoZGlmZnNbcG9pbnRlcl1bMV0ubGVuZ3RoIC1cbiAgICAgICAgICBkaWZmc1twb2ludGVyIC0gMV1bMV0ubGVuZ3RoKSA9PSBkaWZmc1twb2ludGVyIC0gMV1bMV0pIHtcbiAgICAgICAgLy8gU2hpZnQgdGhlIGVkaXQgb3ZlciB0aGUgcHJldmlvdXMgZXF1YWxpdHkuXG4gICAgICAgIGRpZmZzW3BvaW50ZXJdWzFdID0gZGlmZnNbcG9pbnRlciAtIDFdWzFdICtcbiAgICAgICAgICAgIGRpZmZzW3BvaW50ZXJdWzFdLnN1YnN0cmluZygwLCBkaWZmc1twb2ludGVyXVsxXS5sZW5ndGggLVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpZmZzW3BvaW50ZXIgLSAxXVsxXS5sZW5ndGgpO1xuICAgICAgICBkaWZmc1twb2ludGVyICsgMV1bMV0gPSBkaWZmc1twb2ludGVyIC0gMV1bMV0gKyBkaWZmc1twb2ludGVyICsgMV1bMV07XG4gICAgICAgIGRpZmZzLnNwbGljZShwb2ludGVyIC0gMSwgMSk7XG4gICAgICAgIGNoYW5nZXMgPSB0cnVlO1xuICAgICAgfSBlbHNlIGlmIChkaWZmc1twb2ludGVyXVsxXS5zdWJzdHJpbmcoMCwgZGlmZnNbcG9pbnRlciArIDFdWzFdLmxlbmd0aCkgPT1cbiAgICAgICAgICBkaWZmc1twb2ludGVyICsgMV1bMV0pIHtcbiAgICAgICAgLy8gU2hpZnQgdGhlIGVkaXQgb3ZlciB0aGUgbmV4dCBlcXVhbGl0eS5cbiAgICAgICAgZGlmZnNbcG9pbnRlciAtIDFdWzFdICs9IGRpZmZzW3BvaW50ZXIgKyAxXVsxXTtcbiAgICAgICAgZGlmZnNbcG9pbnRlcl1bMV0gPVxuICAgICAgICAgICAgZGlmZnNbcG9pbnRlcl1bMV0uc3Vic3RyaW5nKGRpZmZzW3BvaW50ZXIgKyAxXVsxXS5sZW5ndGgpICtcbiAgICAgICAgICAgIGRpZmZzW3BvaW50ZXIgKyAxXVsxXTtcbiAgICAgICAgZGlmZnMuc3BsaWNlKHBvaW50ZXIgKyAxLCAxKTtcbiAgICAgICAgY2hhbmdlcyA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuICAgIHBvaW50ZXIrKztcbiAgfVxuICAvLyBJZiBzaGlmdHMgd2VyZSBtYWRlLCB0aGUgZGlmZiBuZWVkcyByZW9yZGVyaW5nIGFuZCBhbm90aGVyIHNoaWZ0IHN3ZWVwLlxuICBpZiAoY2hhbmdlcykge1xuICAgIHRoaXMuZGlmZl9jbGVhbnVwTWVyZ2UoZGlmZnMpO1xuICB9XG59O1xuXG5cbi8qKlxuICogbG9jIGlzIGEgbG9jYXRpb24gaW4gdGV4dDEsIGNvbXB1dGUgYW5kIHJldHVybiB0aGUgZXF1aXZhbGVudCBsb2NhdGlvbiBpblxuICogdGV4dDIuXG4gKiBlLmcuICdUaGUgY2F0JyB2cyAnVGhlIGJpZyBjYXQnLCAxLT4xLCA1LT44XG4gKiBAcGFyYW0geyFBcnJheS48IWRpZmZfbWF0Y2hfcGF0Y2guRGlmZj59IGRpZmZzIEFycmF5IG9mIGRpZmYgdHVwbGVzLlxuICogQHBhcmFtIHtudW1iZXJ9IGxvYyBMb2NhdGlvbiB3aXRoaW4gdGV4dDEuXG4gKiBAcmV0dXJuIHtudW1iZXJ9IExvY2F0aW9uIHdpdGhpbiB0ZXh0Mi5cbiAqL1xuZGlmZl9tYXRjaF9wYXRjaC5wcm90b3R5cGUuZGlmZl94SW5kZXggPSBmdW5jdGlvbihkaWZmcywgbG9jKSB7XG4gIHZhciBjaGFyczEgPSAwO1xuICB2YXIgY2hhcnMyID0gMDtcbiAgdmFyIGxhc3RfY2hhcnMxID0gMDtcbiAgdmFyIGxhc3RfY2hhcnMyID0gMDtcbiAgdmFyIHg7XG4gIGZvciAoeCA9IDA7IHggPCBkaWZmcy5sZW5ndGg7IHgrKykge1xuICAgIGlmIChkaWZmc1t4XVswXSAhPT0gRElGRl9JTlNFUlQpIHsgIC8vIEVxdWFsaXR5IG9yIGRlbGV0aW9uLlxuICAgICAgY2hhcnMxICs9IGRpZmZzW3hdWzFdLmxlbmd0aDtcbiAgICB9XG4gICAgaWYgKGRpZmZzW3hdWzBdICE9PSBESUZGX0RFTEVURSkgeyAgLy8gRXF1YWxpdHkgb3IgaW5zZXJ0aW9uLlxuICAgICAgY2hhcnMyICs9IGRpZmZzW3hdWzFdLmxlbmd0aDtcbiAgICB9XG4gICAgaWYgKGNoYXJzMSA+IGxvYykgeyAgLy8gT3ZlcnNob3QgdGhlIGxvY2F0aW9uLlxuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGxhc3RfY2hhcnMxID0gY2hhcnMxO1xuICAgIGxhc3RfY2hhcnMyID0gY2hhcnMyO1xuICB9XG4gIC8vIFdhcyB0aGUgbG9jYXRpb24gd2FzIGRlbGV0ZWQ/XG4gIGlmIChkaWZmcy5sZW5ndGggIT0geCAmJiBkaWZmc1t4XVswXSA9PT0gRElGRl9ERUxFVEUpIHtcbiAgICByZXR1cm4gbGFzdF9jaGFyczI7XG4gIH1cbiAgLy8gQWRkIHRoZSByZW1haW5pbmcgY2hhcmFjdGVyIGxlbmd0aC5cbiAgcmV0dXJuIGxhc3RfY2hhcnMyICsgKGxvYyAtIGxhc3RfY2hhcnMxKTtcbn07XG5cblxuLyoqXG4gKiBDb252ZXJ0IGEgZGlmZiBhcnJheSBpbnRvIGEgcHJldHR5IEhUTUwgcmVwb3J0LlxuICogQHBhcmFtIHshQXJyYXkuPCFkaWZmX21hdGNoX3BhdGNoLkRpZmY+fSBkaWZmcyBBcnJheSBvZiBkaWZmIHR1cGxlcy5cbiAqIEByZXR1cm4ge3N0cmluZ30gSFRNTCByZXByZXNlbnRhdGlvbi5cbiAqL1xuZGlmZl9tYXRjaF9wYXRjaC5wcm90b3R5cGUuZGlmZl9wcmV0dHlIdG1sID0gZnVuY3Rpb24oZGlmZnMpIHtcbiAgdmFyIGh0bWwgPSBbXTtcbiAgdmFyIGkgPSAwO1xuICB2YXIgcGF0dGVybl9hbXAgPSAvJi9nO1xuICB2YXIgcGF0dGVybl9sdCA9IC88L2c7XG4gIHZhciBwYXR0ZXJuX2d0ID0gLz4vZztcbiAgdmFyIHBhdHRlcm5fcGFyYSA9IC9cXG4vZztcbiAgZm9yICh2YXIgeCA9IDA7IHggPCBkaWZmcy5sZW5ndGg7IHgrKykge1xuICAgIHZhciBvcCA9IGRpZmZzW3hdWzBdOyAgICAvLyBPcGVyYXRpb24gKGluc2VydCwgZGVsZXRlLCBlcXVhbClcbiAgICB2YXIgZGF0YSA9IGRpZmZzW3hdWzFdOyAgLy8gVGV4dCBvZiBjaGFuZ2UuXG4gICAgdmFyIHRleHQgPSBkYXRhLnJlcGxhY2UocGF0dGVybl9hbXAsICcmYW1wOycpLnJlcGxhY2UocGF0dGVybl9sdCwgJyZsdDsnKVxuICAgICAgICAucmVwbGFjZShwYXR0ZXJuX2d0LCAnJmd0OycpLnJlcGxhY2UocGF0dGVybl9wYXJhLCAnJnBhcmE7PGJyPicpO1xuICAgIHN3aXRjaCAob3ApIHtcbiAgICAgIGNhc2UgRElGRl9JTlNFUlQ6XG4gICAgICAgIGh0bWxbeF0gPSAnPGlucyBzdHlsZT1cImJhY2tncm91bmQ6I2U2ZmZlNjtcIj4nICsgdGV4dCArICc8L2lucz4nO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgRElGRl9ERUxFVEU6XG4gICAgICAgIGh0bWxbeF0gPSAnPGRlbCBzdHlsZT1cImJhY2tncm91bmQ6I2ZmZTZlNjtcIj4nICsgdGV4dCArICc8L2RlbD4nO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgRElGRl9FUVVBTDpcbiAgICAgICAgaHRtbFt4XSA9ICc8c3Bhbj4nICsgdGV4dCArICc8L3NwYW4+JztcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGlmIChvcCAhPT0gRElGRl9ERUxFVEUpIHtcbiAgICAgIGkgKz0gZGF0YS5sZW5ndGg7XG4gICAgfVxuICB9XG4gIHJldHVybiBodG1sLmpvaW4oJycpO1xufTtcblxuXG4vKipcbiAqIENvbXB1dGUgYW5kIHJldHVybiB0aGUgc291cmNlIHRleHQgKGFsbCBlcXVhbGl0aWVzIGFuZCBkZWxldGlvbnMpLlxuICogQHBhcmFtIHshQXJyYXkuPCFkaWZmX21hdGNoX3BhdGNoLkRpZmY+fSBkaWZmcyBBcnJheSBvZiBkaWZmIHR1cGxlcy5cbiAqIEByZXR1cm4ge3N0cmluZ30gU291cmNlIHRleHQuXG4gKi9cbmRpZmZfbWF0Y2hfcGF0Y2gucHJvdG90eXBlLmRpZmZfdGV4dDEgPSBmdW5jdGlvbihkaWZmcykge1xuICB2YXIgdGV4dCA9IFtdO1xuICBmb3IgKHZhciB4ID0gMDsgeCA8IGRpZmZzLmxlbmd0aDsgeCsrKSB7XG4gICAgaWYgKGRpZmZzW3hdWzBdICE9PSBESUZGX0lOU0VSVCkge1xuICAgICAgdGV4dFt4XSA9IGRpZmZzW3hdWzFdO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdGV4dC5qb2luKCcnKTtcbn07XG5cblxuLyoqXG4gKiBDb21wdXRlIGFuZCByZXR1cm4gdGhlIGRlc3RpbmF0aW9uIHRleHQgKGFsbCBlcXVhbGl0aWVzIGFuZCBpbnNlcnRpb25zKS5cbiAqIEBwYXJhbSB7IUFycmF5LjwhZGlmZl9tYXRjaF9wYXRjaC5EaWZmPn0gZGlmZnMgQXJyYXkgb2YgZGlmZiB0dXBsZXMuXG4gKiBAcmV0dXJuIHtzdHJpbmd9IERlc3RpbmF0aW9uIHRleHQuXG4gKi9cbmRpZmZfbWF0Y2hfcGF0Y2gucHJvdG90eXBlLmRpZmZfdGV4dDIgPSBmdW5jdGlvbihkaWZmcykge1xuICB2YXIgdGV4dCA9IFtdO1xuICBmb3IgKHZhciB4ID0gMDsgeCA8IGRpZmZzLmxlbmd0aDsgeCsrKSB7XG4gICAgaWYgKGRpZmZzW3hdWzBdICE9PSBESUZGX0RFTEVURSkge1xuICAgICAgdGV4dFt4XSA9IGRpZmZzW3hdWzFdO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdGV4dC5qb2luKCcnKTtcbn07XG5cblxuLyoqXG4gKiBDb21wdXRlIHRoZSBMZXZlbnNodGVpbiBkaXN0YW5jZTsgdGhlIG51bWJlciBvZiBpbnNlcnRlZCwgZGVsZXRlZCBvclxuICogc3Vic3RpdHV0ZWQgY2hhcmFjdGVycy5cbiAqIEBwYXJhbSB7IUFycmF5LjwhZGlmZl9tYXRjaF9wYXRjaC5EaWZmPn0gZGlmZnMgQXJyYXkgb2YgZGlmZiB0dXBsZXMuXG4gKiBAcmV0dXJuIHtudW1iZXJ9IE51bWJlciBvZiBjaGFuZ2VzLlxuICovXG5kaWZmX21hdGNoX3BhdGNoLnByb3RvdHlwZS5kaWZmX2xldmVuc2h0ZWluID0gZnVuY3Rpb24oZGlmZnMpIHtcbiAgdmFyIGxldmVuc2h0ZWluID0gMDtcbiAgdmFyIGluc2VydGlvbnMgPSAwO1xuICB2YXIgZGVsZXRpb25zID0gMDtcbiAgZm9yICh2YXIgeCA9IDA7IHggPCBkaWZmcy5sZW5ndGg7IHgrKykge1xuICAgIHZhciBvcCA9IGRpZmZzW3hdWzBdO1xuICAgIHZhciBkYXRhID0gZGlmZnNbeF1bMV07XG4gICAgc3dpdGNoIChvcCkge1xuICAgICAgY2FzZSBESUZGX0lOU0VSVDpcbiAgICAgICAgaW5zZXJ0aW9ucyArPSBkYXRhLmxlbmd0aDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIERJRkZfREVMRVRFOlxuICAgICAgICBkZWxldGlvbnMgKz0gZGF0YS5sZW5ndGg7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBESUZGX0VRVUFMOlxuICAgICAgICAvLyBBIGRlbGV0aW9uIGFuZCBhbiBpbnNlcnRpb24gaXMgb25lIHN1YnN0aXR1dGlvbi5cbiAgICAgICAgbGV2ZW5zaHRlaW4gKz0gTWF0aC5tYXgoaW5zZXJ0aW9ucywgZGVsZXRpb25zKTtcbiAgICAgICAgaW5zZXJ0aW9ucyA9IDA7XG4gICAgICAgIGRlbGV0aW9ucyA9IDA7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICBsZXZlbnNodGVpbiArPSBNYXRoLm1heChpbnNlcnRpb25zLCBkZWxldGlvbnMpO1xuICByZXR1cm4gbGV2ZW5zaHRlaW47XG59O1xuXG5cbi8qKlxuICogQ3J1c2ggdGhlIGRpZmYgaW50byBhbiBlbmNvZGVkIHN0cmluZyB3aGljaCBkZXNjcmliZXMgdGhlIG9wZXJhdGlvbnNcbiAqIHJlcXVpcmVkIHRvIHRyYW5zZm9ybSB0ZXh0MSBpbnRvIHRleHQyLlxuICogRS5nLiA9M1xcdC0yXFx0K2luZyAgLT4gS2VlcCAzIGNoYXJzLCBkZWxldGUgMiBjaGFycywgaW5zZXJ0ICdpbmcnLlxuICogT3BlcmF0aW9ucyBhcmUgdGFiLXNlcGFyYXRlZC4gIEluc2VydGVkIHRleHQgaXMgZXNjYXBlZCB1c2luZyAleHggbm90YXRpb24uXG4gKiBAcGFyYW0geyFBcnJheS48IWRpZmZfbWF0Y2hfcGF0Y2guRGlmZj59IGRpZmZzIEFycmF5IG9mIGRpZmYgdHVwbGVzLlxuICogQHJldHVybiB7c3RyaW5nfSBEZWx0YSB0ZXh0LlxuICovXG5kaWZmX21hdGNoX3BhdGNoLnByb3RvdHlwZS5kaWZmX3RvRGVsdGEgPSBmdW5jdGlvbihkaWZmcykge1xuICB2YXIgdGV4dCA9IFtdO1xuICBmb3IgKHZhciB4ID0gMDsgeCA8IGRpZmZzLmxlbmd0aDsgeCsrKSB7XG4gICAgc3dpdGNoIChkaWZmc1t4XVswXSkge1xuICAgICAgY2FzZSBESUZGX0lOU0VSVDpcbiAgICAgICAgdGV4dFt4XSA9ICcrJyArIGVuY29kZVVSSShkaWZmc1t4XVsxXSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBESUZGX0RFTEVURTpcbiAgICAgICAgdGV4dFt4XSA9ICctJyArIGRpZmZzW3hdWzFdLmxlbmd0aDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIERJRkZfRVFVQUw6XG4gICAgICAgIHRleHRbeF0gPSAnPScgKyBkaWZmc1t4XVsxXS5sZW5ndGg7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdGV4dC5qb2luKCdcXHQnKS5yZXBsYWNlKC8lMjAvZywgJyAnKTtcbn07XG5cblxuLyoqXG4gKiBHaXZlbiB0aGUgb3JpZ2luYWwgdGV4dDEsIGFuZCBhbiBlbmNvZGVkIHN0cmluZyB3aGljaCBkZXNjcmliZXMgdGhlXG4gKiBvcGVyYXRpb25zIHJlcXVpcmVkIHRvIHRyYW5zZm9ybSB0ZXh0MSBpbnRvIHRleHQyLCBjb21wdXRlIHRoZSBmdWxsIGRpZmYuXG4gKiBAcGFyYW0ge3N0cmluZ30gdGV4dDEgU291cmNlIHN0cmluZyBmb3IgdGhlIGRpZmYuXG4gKiBAcGFyYW0ge3N0cmluZ30gZGVsdGEgRGVsdGEgdGV4dC5cbiAqIEByZXR1cm4geyFBcnJheS48IWRpZmZfbWF0Y2hfcGF0Y2guRGlmZj59IEFycmF5IG9mIGRpZmYgdHVwbGVzLlxuICogQHRocm93cyB7IUVycm9yfSBJZiBpbnZhbGlkIGlucHV0LlxuICovXG5kaWZmX21hdGNoX3BhdGNoLnByb3RvdHlwZS5kaWZmX2Zyb21EZWx0YSA9IGZ1bmN0aW9uKHRleHQxLCBkZWx0YSkge1xuICB2YXIgZGlmZnMgPSBbXTtcbiAgdmFyIGRpZmZzTGVuZ3RoID0gMDsgIC8vIEtlZXBpbmcgb3VyIG93biBsZW5ndGggdmFyIGlzIGZhc3RlciBpbiBKUy5cbiAgdmFyIHBvaW50ZXIgPSAwOyAgLy8gQ3Vyc29yIGluIHRleHQxXG4gIHZhciB0b2tlbnMgPSBkZWx0YS5zcGxpdCgvXFx0L2cpO1xuICBmb3IgKHZhciB4ID0gMDsgeCA8IHRva2Vucy5sZW5ndGg7IHgrKykge1xuICAgIC8vIEVhY2ggdG9rZW4gYmVnaW5zIHdpdGggYSBvbmUgY2hhcmFjdGVyIHBhcmFtZXRlciB3aGljaCBzcGVjaWZpZXMgdGhlXG4gICAgLy8gb3BlcmF0aW9uIG9mIHRoaXMgdG9rZW4gKGRlbGV0ZSwgaW5zZXJ0LCBlcXVhbGl0eSkuXG4gICAgdmFyIHBhcmFtID0gdG9rZW5zW3hdLnN1YnN0cmluZygxKTtcbiAgICBzd2l0Y2ggKHRva2Vuc1t4XS5jaGFyQXQoMCkpIHtcbiAgICAgIGNhc2UgJysnOlxuICAgICAgICB0cnkge1xuICAgICAgICAgIGRpZmZzW2RpZmZzTGVuZ3RoKytdID0gW0RJRkZfSU5TRVJULCBkZWNvZGVVUkkocGFyYW0pXTtcbiAgICAgICAgfSBjYXRjaCAoZXgpIHtcbiAgICAgICAgICAvLyBNYWxmb3JtZWQgVVJJIHNlcXVlbmNlLlxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSWxsZWdhbCBlc2NhcGUgaW4gZGlmZl9mcm9tRGVsdGE6ICcgKyBwYXJhbSk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICctJzpcbiAgICAgICAgLy8gRmFsbCB0aHJvdWdoLlxuICAgICAgY2FzZSAnPSc6XG4gICAgICAgIHZhciBuID0gcGFyc2VJbnQocGFyYW0sIDEwKTtcbiAgICAgICAgaWYgKGlzTmFOKG4pIHx8IG4gPCAwKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIG51bWJlciBpbiBkaWZmX2Zyb21EZWx0YTogJyArIHBhcmFtKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgdGV4dCA9IHRleHQxLnN1YnN0cmluZyhwb2ludGVyLCBwb2ludGVyICs9IG4pO1xuICAgICAgICBpZiAodG9rZW5zW3hdLmNoYXJBdCgwKSA9PSAnPScpIHtcbiAgICAgICAgICBkaWZmc1tkaWZmc0xlbmd0aCsrXSA9IFtESUZGX0VRVUFMLCB0ZXh0XTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkaWZmc1tkaWZmc0xlbmd0aCsrXSA9IFtESUZGX0RFTEVURSwgdGV4dF07XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICAvLyBCbGFuayB0b2tlbnMgYXJlIG9rIChmcm9tIGEgdHJhaWxpbmcgXFx0KS5cbiAgICAgICAgLy8gQW55dGhpbmcgZWxzZSBpcyBhbiBlcnJvci5cbiAgICAgICAgaWYgKHRva2Vuc1t4XSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBkaWZmIG9wZXJhdGlvbiBpbiBkaWZmX2Zyb21EZWx0YTogJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRva2Vuc1t4XSk7XG4gICAgICAgIH1cbiAgICB9XG4gIH1cbiAgaWYgKHBvaW50ZXIgIT0gdGV4dDEubGVuZ3RoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdEZWx0YSBsZW5ndGggKCcgKyBwb2ludGVyICtcbiAgICAgICAgJykgZG9lcyBub3QgZXF1YWwgc291cmNlIHRleHQgbGVuZ3RoICgnICsgdGV4dDEubGVuZ3RoICsgJykuJyk7XG4gIH1cbiAgcmV0dXJuIGRpZmZzO1xufTtcblxuXG4vLyAgTUFUQ0ggRlVOQ1RJT05TXG5cblxuLyoqXG4gKiBMb2NhdGUgdGhlIGJlc3QgaW5zdGFuY2Ugb2YgJ3BhdHRlcm4nIGluICd0ZXh0JyBuZWFyICdsb2MnLlxuICogQHBhcmFtIHtzdHJpbmd9IHRleHQgVGhlIHRleHQgdG8gc2VhcmNoLlxuICogQHBhcmFtIHtzdHJpbmd9IHBhdHRlcm4gVGhlIHBhdHRlcm4gdG8gc2VhcmNoIGZvci5cbiAqIEBwYXJhbSB7bnVtYmVyfSBsb2MgVGhlIGxvY2F0aW9uIHRvIHNlYXJjaCBhcm91bmQuXG4gKiBAcmV0dXJuIHtudW1iZXJ9IEJlc3QgbWF0Y2ggaW5kZXggb3IgLTEuXG4gKi9cbmRpZmZfbWF0Y2hfcGF0Y2gucHJvdG90eXBlLm1hdGNoX21haW4gPSBmdW5jdGlvbih0ZXh0LCBwYXR0ZXJuLCBsb2MpIHtcbiAgLy8gQ2hlY2sgZm9yIG51bGwgaW5wdXRzLlxuICBpZiAodGV4dCA9PSBudWxsIHx8IHBhdHRlcm4gPT0gbnVsbCB8fCBsb2MgPT0gbnVsbCkge1xuICAgIHRocm93IG5ldyBFcnJvcignTnVsbCBpbnB1dC4gKG1hdGNoX21haW4pJyk7XG4gIH1cblxuICBsb2MgPSBNYXRoLm1heCgwLCBNYXRoLm1pbihsb2MsIHRleHQubGVuZ3RoKSk7XG4gIGlmICh0ZXh0ID09IHBhdHRlcm4pIHtcbiAgICAvLyBTaG9ydGN1dCAocG90ZW50aWFsbHkgbm90IGd1YXJhbnRlZWQgYnkgdGhlIGFsZ29yaXRobSlcbiAgICByZXR1cm4gMDtcbiAgfSBlbHNlIGlmICghdGV4dC5sZW5ndGgpIHtcbiAgICAvLyBOb3RoaW5nIHRvIG1hdGNoLlxuICAgIHJldHVybiAtMTtcbiAgfSBlbHNlIGlmICh0ZXh0LnN1YnN0cmluZyhsb2MsIGxvYyArIHBhdHRlcm4ubGVuZ3RoKSA9PSBwYXR0ZXJuKSB7XG4gICAgLy8gUGVyZmVjdCBtYXRjaCBhdCB0aGUgcGVyZmVjdCBzcG90ISAgKEluY2x1ZGVzIGNhc2Ugb2YgbnVsbCBwYXR0ZXJuKVxuICAgIHJldHVybiBsb2M7XG4gIH0gZWxzZSB7XG4gICAgLy8gRG8gYSBmdXp6eSBjb21wYXJlLlxuICAgIHJldHVybiB0aGlzLm1hdGNoX2JpdGFwXyh0ZXh0LCBwYXR0ZXJuLCBsb2MpO1xuICB9XG59O1xuXG5cbi8qKlxuICogTG9jYXRlIHRoZSBiZXN0IGluc3RhbmNlIG9mICdwYXR0ZXJuJyBpbiAndGV4dCcgbmVhciAnbG9jJyB1c2luZyB0aGVcbiAqIEJpdGFwIGFsZ29yaXRobS5cbiAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0IFRoZSB0ZXh0IHRvIHNlYXJjaC5cbiAqIEBwYXJhbSB7c3RyaW5nfSBwYXR0ZXJuIFRoZSBwYXR0ZXJuIHRvIHNlYXJjaCBmb3IuXG4gKiBAcGFyYW0ge251bWJlcn0gbG9jIFRoZSBsb2NhdGlvbiB0byBzZWFyY2ggYXJvdW5kLlxuICogQHJldHVybiB7bnVtYmVyfSBCZXN0IG1hdGNoIGluZGV4IG9yIC0xLlxuICogQHByaXZhdGVcbiAqL1xuZGlmZl9tYXRjaF9wYXRjaC5wcm90b3R5cGUubWF0Y2hfYml0YXBfID0gZnVuY3Rpb24odGV4dCwgcGF0dGVybiwgbG9jKSB7XG4gIGlmIChwYXR0ZXJuLmxlbmd0aCA+IHRoaXMuTWF0Y2hfTWF4Qml0cykge1xuICAgIHRocm93IG5ldyBFcnJvcignUGF0dGVybiB0b28gbG9uZyBmb3IgdGhpcyBicm93c2VyLicpO1xuICB9XG5cbiAgLy8gSW5pdGlhbGlzZSB0aGUgYWxwaGFiZXQuXG4gIHZhciBzID0gdGhpcy5tYXRjaF9hbHBoYWJldF8ocGF0dGVybik7XG5cbiAgdmFyIGRtcCA9IHRoaXM7ICAvLyAndGhpcycgYmVjb21lcyAnd2luZG93JyBpbiBhIGNsb3N1cmUuXG5cbiAgLyoqXG4gICAqIENvbXB1dGUgYW5kIHJldHVybiB0aGUgc2NvcmUgZm9yIGEgbWF0Y2ggd2l0aCBlIGVycm9ycyBhbmQgeCBsb2NhdGlvbi5cbiAgICogQWNjZXNzZXMgbG9jIGFuZCBwYXR0ZXJuIHRocm91Z2ggYmVpbmcgYSBjbG9zdXJlLlxuICAgKiBAcGFyYW0ge251bWJlcn0gZSBOdW1iZXIgb2YgZXJyb3JzIGluIG1hdGNoLlxuICAgKiBAcGFyYW0ge251bWJlcn0geCBMb2NhdGlvbiBvZiBtYXRjaC5cbiAgICogQHJldHVybiB7bnVtYmVyfSBPdmVyYWxsIHNjb3JlIGZvciBtYXRjaCAoMC4wID0gZ29vZCwgMS4wID0gYmFkKS5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIGZ1bmN0aW9uIG1hdGNoX2JpdGFwU2NvcmVfKGUsIHgpIHtcbiAgICB2YXIgYWNjdXJhY3kgPSBlIC8gcGF0dGVybi5sZW5ndGg7XG4gICAgdmFyIHByb3hpbWl0eSA9IE1hdGguYWJzKGxvYyAtIHgpO1xuICAgIGlmICghZG1wLk1hdGNoX0Rpc3RhbmNlKSB7XG4gICAgICAvLyBEb2RnZSBkaXZpZGUgYnkgemVybyBlcnJvci5cbiAgICAgIHJldHVybiBwcm94aW1pdHkgPyAxLjAgOiBhY2N1cmFjeTtcbiAgICB9XG4gICAgcmV0dXJuIGFjY3VyYWN5ICsgKHByb3hpbWl0eSAvIGRtcC5NYXRjaF9EaXN0YW5jZSk7XG4gIH1cblxuICAvLyBIaWdoZXN0IHNjb3JlIGJleW9uZCB3aGljaCB3ZSBnaXZlIHVwLlxuICB2YXIgc2NvcmVfdGhyZXNob2xkID0gdGhpcy5NYXRjaF9UaHJlc2hvbGQ7XG4gIC8vIElzIHRoZXJlIGEgbmVhcmJ5IGV4YWN0IG1hdGNoPyAoc3BlZWR1cClcbiAgdmFyIGJlc3RfbG9jID0gdGV4dC5pbmRleE9mKHBhdHRlcm4sIGxvYyk7XG4gIGlmIChiZXN0X2xvYyAhPSAtMSkge1xuICAgIHNjb3JlX3RocmVzaG9sZCA9IE1hdGgubWluKG1hdGNoX2JpdGFwU2NvcmVfKDAsIGJlc3RfbG9jKSwgc2NvcmVfdGhyZXNob2xkKTtcbiAgICAvLyBXaGF0IGFib3V0IGluIHRoZSBvdGhlciBkaXJlY3Rpb24/IChzcGVlZHVwKVxuICAgIGJlc3RfbG9jID0gdGV4dC5sYXN0SW5kZXhPZihwYXR0ZXJuLCBsb2MgKyBwYXR0ZXJuLmxlbmd0aCk7XG4gICAgaWYgKGJlc3RfbG9jICE9IC0xKSB7XG4gICAgICBzY29yZV90aHJlc2hvbGQgPVxuICAgICAgICAgIE1hdGgubWluKG1hdGNoX2JpdGFwU2NvcmVfKDAsIGJlc3RfbG9jKSwgc2NvcmVfdGhyZXNob2xkKTtcbiAgICB9XG4gIH1cblxuICAvLyBJbml0aWFsaXNlIHRoZSBiaXQgYXJyYXlzLlxuICB2YXIgbWF0Y2htYXNrID0gMSA8PCAocGF0dGVybi5sZW5ndGggLSAxKTtcbiAgYmVzdF9sb2MgPSAtMTtcblxuICB2YXIgYmluX21pbiwgYmluX21pZDtcbiAgdmFyIGJpbl9tYXggPSBwYXR0ZXJuLmxlbmd0aCArIHRleHQubGVuZ3RoO1xuICB2YXIgbGFzdF9yZDtcbiAgZm9yICh2YXIgZCA9IDA7IGQgPCBwYXR0ZXJuLmxlbmd0aDsgZCsrKSB7XG4gICAgLy8gU2NhbiBmb3IgdGhlIGJlc3QgbWF0Y2g7IGVhY2ggaXRlcmF0aW9uIGFsbG93cyBmb3Igb25lIG1vcmUgZXJyb3IuXG4gICAgLy8gUnVuIGEgYmluYXJ5IHNlYXJjaCB0byBkZXRlcm1pbmUgaG93IGZhciBmcm9tICdsb2MnIHdlIGNhbiBzdHJheSBhdCB0aGlzXG4gICAgLy8gZXJyb3IgbGV2ZWwuXG4gICAgYmluX21pbiA9IDA7XG4gICAgYmluX21pZCA9IGJpbl9tYXg7XG4gICAgd2hpbGUgKGJpbl9taW4gPCBiaW5fbWlkKSB7XG4gICAgICBpZiAobWF0Y2hfYml0YXBTY29yZV8oZCwgbG9jICsgYmluX21pZCkgPD0gc2NvcmVfdGhyZXNob2xkKSB7XG4gICAgICAgIGJpbl9taW4gPSBiaW5fbWlkO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYmluX21heCA9IGJpbl9taWQ7XG4gICAgICB9XG4gICAgICBiaW5fbWlkID0gTWF0aC5mbG9vcigoYmluX21heCAtIGJpbl9taW4pIC8gMiArIGJpbl9taW4pO1xuICAgIH1cbiAgICAvLyBVc2UgdGhlIHJlc3VsdCBmcm9tIHRoaXMgaXRlcmF0aW9uIGFzIHRoZSBtYXhpbXVtIGZvciB0aGUgbmV4dC5cbiAgICBiaW5fbWF4ID0gYmluX21pZDtcbiAgICB2YXIgc3RhcnQgPSBNYXRoLm1heCgxLCBsb2MgLSBiaW5fbWlkICsgMSk7XG4gICAgdmFyIGZpbmlzaCA9IE1hdGgubWluKGxvYyArIGJpbl9taWQsIHRleHQubGVuZ3RoKSArIHBhdHRlcm4ubGVuZ3RoO1xuXG4gICAgdmFyIHJkID0gQXJyYXkoZmluaXNoICsgMik7XG4gICAgcmRbZmluaXNoICsgMV0gPSAoMSA8PCBkKSAtIDE7XG4gICAgZm9yICh2YXIgaiA9IGZpbmlzaDsgaiA+PSBzdGFydDsgai0tKSB7XG4gICAgICAvLyBUaGUgYWxwaGFiZXQgKHMpIGlzIGEgc3BhcnNlIGhhc2gsIHNvIHRoZSBmb2xsb3dpbmcgbGluZSBnZW5lcmF0ZXNcbiAgICAgIC8vIHdhcm5pbmdzLlxuICAgICAgdmFyIGNoYXJNYXRjaCA9IHNbdGV4dC5jaGFyQXQoaiAtIDEpXTtcbiAgICAgIGlmIChkID09PSAwKSB7ICAvLyBGaXJzdCBwYXNzOiBleGFjdCBtYXRjaC5cbiAgICAgICAgcmRbal0gPSAoKHJkW2ogKyAxXSA8PCAxKSB8IDEpICYgY2hhck1hdGNoO1xuICAgICAgfSBlbHNlIHsgIC8vIFN1YnNlcXVlbnQgcGFzc2VzOiBmdXp6eSBtYXRjaC5cbiAgICAgICAgcmRbal0gPSAoKHJkW2ogKyAxXSA8PCAxKSB8IDEpICYgY2hhck1hdGNoIHxcbiAgICAgICAgICAgICAgICAoKChsYXN0X3JkW2ogKyAxXSB8IGxhc3RfcmRbal0pIDw8IDEpIHwgMSkgfFxuICAgICAgICAgICAgICAgIGxhc3RfcmRbaiArIDFdO1xuICAgICAgfVxuICAgICAgaWYgKHJkW2pdICYgbWF0Y2htYXNrKSB7XG4gICAgICAgIHZhciBzY29yZSA9IG1hdGNoX2JpdGFwU2NvcmVfKGQsIGogLSAxKTtcbiAgICAgICAgLy8gVGhpcyBtYXRjaCB3aWxsIGFsbW9zdCBjZXJ0YWlubHkgYmUgYmV0dGVyIHRoYW4gYW55IGV4aXN0aW5nIG1hdGNoLlxuICAgICAgICAvLyBCdXQgY2hlY2sgYW55d2F5LlxuICAgICAgICBpZiAoc2NvcmUgPD0gc2NvcmVfdGhyZXNob2xkKSB7XG4gICAgICAgICAgLy8gVG9sZCB5b3Ugc28uXG4gICAgICAgICAgc2NvcmVfdGhyZXNob2xkID0gc2NvcmU7XG4gICAgICAgICAgYmVzdF9sb2MgPSBqIC0gMTtcbiAgICAgICAgICBpZiAoYmVzdF9sb2MgPiBsb2MpIHtcbiAgICAgICAgICAgIC8vIFdoZW4gcGFzc2luZyBsb2MsIGRvbid0IGV4Y2VlZCBvdXIgY3VycmVudCBkaXN0YW5jZSBmcm9tIGxvYy5cbiAgICAgICAgICAgIHN0YXJ0ID0gTWF0aC5tYXgoMSwgMiAqIGxvYyAtIGJlc3RfbG9jKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gQWxyZWFkeSBwYXNzZWQgbG9jLCBkb3duaGlsbCBmcm9tIGhlcmUgb24gaW4uXG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgLy8gTm8gaG9wZSBmb3IgYSAoYmV0dGVyKSBtYXRjaCBhdCBncmVhdGVyIGVycm9yIGxldmVscy5cbiAgICBpZiAobWF0Y2hfYml0YXBTY29yZV8oZCArIDEsIGxvYykgPiBzY29yZV90aHJlc2hvbGQpIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBsYXN0X3JkID0gcmQ7XG4gIH1cbiAgcmV0dXJuIGJlc3RfbG9jO1xufTtcblxuXG4vKipcbiAqIEluaXRpYWxpc2UgdGhlIGFscGhhYmV0IGZvciB0aGUgQml0YXAgYWxnb3JpdGhtLlxuICogQHBhcmFtIHtzdHJpbmd9IHBhdHRlcm4gVGhlIHRleHQgdG8gZW5jb2RlLlxuICogQHJldHVybiB7IU9iamVjdH0gSGFzaCBvZiBjaGFyYWN0ZXIgbG9jYXRpb25zLlxuICogQHByaXZhdGVcbiAqL1xuZGlmZl9tYXRjaF9wYXRjaC5wcm90b3R5cGUubWF0Y2hfYWxwaGFiZXRfID0gZnVuY3Rpb24ocGF0dGVybikge1xuICB2YXIgcyA9IHt9O1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHBhdHRlcm4ubGVuZ3RoOyBpKyspIHtcbiAgICBzW3BhdHRlcm4uY2hhckF0KGkpXSA9IDA7XG4gIH1cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBwYXR0ZXJuLmxlbmd0aDsgaSsrKSB7XG4gICAgc1twYXR0ZXJuLmNoYXJBdChpKV0gfD0gMSA8PCAocGF0dGVybi5sZW5ndGggLSBpIC0gMSk7XG4gIH1cbiAgcmV0dXJuIHM7XG59O1xuXG5cbi8vICBQQVRDSCBGVU5DVElPTlNcblxuXG4vKipcbiAqIEluY3JlYXNlIHRoZSBjb250ZXh0IHVudGlsIGl0IGlzIHVuaXF1ZSxcbiAqIGJ1dCBkb24ndCBsZXQgdGhlIHBhdHRlcm4gZXhwYW5kIGJleW9uZCBNYXRjaF9NYXhCaXRzLlxuICogQHBhcmFtIHshZGlmZl9tYXRjaF9wYXRjaC5wYXRjaF9vYmp9IHBhdGNoIFRoZSBwYXRjaCB0byBncm93LlxuICogQHBhcmFtIHtzdHJpbmd9IHRleHQgU291cmNlIHRleHQuXG4gKiBAcHJpdmF0ZVxuICovXG5kaWZmX21hdGNoX3BhdGNoLnByb3RvdHlwZS5wYXRjaF9hZGRDb250ZXh0XyA9IGZ1bmN0aW9uKHBhdGNoLCB0ZXh0KSB7XG4gIGlmICh0ZXh0Lmxlbmd0aCA9PSAwKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciBwYXR0ZXJuID0gdGV4dC5zdWJzdHJpbmcocGF0Y2guc3RhcnQyLCBwYXRjaC5zdGFydDIgKyBwYXRjaC5sZW5ndGgxKTtcbiAgdmFyIHBhZGRpbmcgPSAwO1xuXG4gIC8vIExvb2sgZm9yIHRoZSBmaXJzdCBhbmQgbGFzdCBtYXRjaGVzIG9mIHBhdHRlcm4gaW4gdGV4dC4gIElmIHR3byBkaWZmZXJlbnRcbiAgLy8gbWF0Y2hlcyBhcmUgZm91bmQsIGluY3JlYXNlIHRoZSBwYXR0ZXJuIGxlbmd0aC5cbiAgd2hpbGUgKHRleHQuaW5kZXhPZihwYXR0ZXJuKSAhPSB0ZXh0Lmxhc3RJbmRleE9mKHBhdHRlcm4pICYmXG4gICAgICAgICBwYXR0ZXJuLmxlbmd0aCA8IHRoaXMuTWF0Y2hfTWF4Qml0cyAtIHRoaXMuUGF0Y2hfTWFyZ2luIC1cbiAgICAgICAgIHRoaXMuUGF0Y2hfTWFyZ2luKSB7XG4gICAgcGFkZGluZyArPSB0aGlzLlBhdGNoX01hcmdpbjtcbiAgICBwYXR0ZXJuID0gdGV4dC5zdWJzdHJpbmcocGF0Y2guc3RhcnQyIC0gcGFkZGluZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGF0Y2guc3RhcnQyICsgcGF0Y2gubGVuZ3RoMSArIHBhZGRpbmcpO1xuICB9XG4gIC8vIEFkZCBvbmUgY2h1bmsgZm9yIGdvb2QgbHVjay5cbiAgcGFkZGluZyArPSB0aGlzLlBhdGNoX01hcmdpbjtcblxuICAvLyBBZGQgdGhlIHByZWZpeC5cbiAgdmFyIHByZWZpeCA9IHRleHQuc3Vic3RyaW5nKHBhdGNoLnN0YXJ0MiAtIHBhZGRpbmcsIHBhdGNoLnN0YXJ0Mik7XG4gIGlmIChwcmVmaXgpIHtcbiAgICBwYXRjaC5kaWZmcy51bnNoaWZ0KFtESUZGX0VRVUFMLCBwcmVmaXhdKTtcbiAgfVxuICAvLyBBZGQgdGhlIHN1ZmZpeC5cbiAgdmFyIHN1ZmZpeCA9IHRleHQuc3Vic3RyaW5nKHBhdGNoLnN0YXJ0MiArIHBhdGNoLmxlbmd0aDEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXRjaC5zdGFydDIgKyBwYXRjaC5sZW5ndGgxICsgcGFkZGluZyk7XG4gIGlmIChzdWZmaXgpIHtcbiAgICBwYXRjaC5kaWZmcy5wdXNoKFtESUZGX0VRVUFMLCBzdWZmaXhdKTtcbiAgfVxuXG4gIC8vIFJvbGwgYmFjayB0aGUgc3RhcnQgcG9pbnRzLlxuICBwYXRjaC5zdGFydDEgLT0gcHJlZml4Lmxlbmd0aDtcbiAgcGF0Y2guc3RhcnQyIC09IHByZWZpeC5sZW5ndGg7XG4gIC8vIEV4dGVuZCB0aGUgbGVuZ3Rocy5cbiAgcGF0Y2gubGVuZ3RoMSArPSBwcmVmaXgubGVuZ3RoICsgc3VmZml4Lmxlbmd0aDtcbiAgcGF0Y2gubGVuZ3RoMiArPSBwcmVmaXgubGVuZ3RoICsgc3VmZml4Lmxlbmd0aDtcbn07XG5cblxuLyoqXG4gKiBDb21wdXRlIGEgbGlzdCBvZiBwYXRjaGVzIHRvIHR1cm4gdGV4dDEgaW50byB0ZXh0Mi5cbiAqIFVzZSBkaWZmcyBpZiBwcm92aWRlZCwgb3RoZXJ3aXNlIGNvbXB1dGUgaXQgb3Vyc2VsdmVzLlxuICogVGhlcmUgYXJlIGZvdXIgd2F5cyB0byBjYWxsIHRoaXMgZnVuY3Rpb24sIGRlcGVuZGluZyBvbiB3aGF0IGRhdGEgaXNcbiAqIGF2YWlsYWJsZSB0byB0aGUgY2FsbGVyOlxuICogTWV0aG9kIDE6XG4gKiBhID0gdGV4dDEsIGIgPSB0ZXh0MlxuICogTWV0aG9kIDI6XG4gKiBhID0gZGlmZnNcbiAqIE1ldGhvZCAzIChvcHRpbWFsKTpcbiAqIGEgPSB0ZXh0MSwgYiA9IGRpZmZzXG4gKiBNZXRob2QgNCAoZGVwcmVjYXRlZCwgdXNlIG1ldGhvZCAzKTpcbiAqIGEgPSB0ZXh0MSwgYiA9IHRleHQyLCBjID0gZGlmZnNcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ3whQXJyYXkuPCFkaWZmX21hdGNoX3BhdGNoLkRpZmY+fSBhIHRleHQxIChtZXRob2RzIDEsMyw0KSBvclxuICogQXJyYXkgb2YgZGlmZiB0dXBsZXMgZm9yIHRleHQxIHRvIHRleHQyIChtZXRob2QgMikuXG4gKiBAcGFyYW0ge3N0cmluZ3whQXJyYXkuPCFkaWZmX21hdGNoX3BhdGNoLkRpZmY+fSBvcHRfYiB0ZXh0MiAobWV0aG9kcyAxLDQpIG9yXG4gKiBBcnJheSBvZiBkaWZmIHR1cGxlcyBmb3IgdGV4dDEgdG8gdGV4dDIgKG1ldGhvZCAzKSBvciB1bmRlZmluZWQgKG1ldGhvZCAyKS5cbiAqIEBwYXJhbSB7c3RyaW5nfCFBcnJheS48IWRpZmZfbWF0Y2hfcGF0Y2guRGlmZj59IG9wdF9jIEFycmF5IG9mIGRpZmYgdHVwbGVzXG4gKiBmb3IgdGV4dDEgdG8gdGV4dDIgKG1ldGhvZCA0KSBvciB1bmRlZmluZWQgKG1ldGhvZHMgMSwyLDMpLlxuICogQHJldHVybiB7IUFycmF5LjwhZGlmZl9tYXRjaF9wYXRjaC5wYXRjaF9vYmo+fSBBcnJheSBvZiBwYXRjaCBvYmplY3RzLlxuICovXG5kaWZmX21hdGNoX3BhdGNoLnByb3RvdHlwZS5wYXRjaF9tYWtlID0gZnVuY3Rpb24oYSwgb3B0X2IsIG9wdF9jKSB7XG4gIHZhciB0ZXh0MSwgZGlmZnM7XG4gIGlmICh0eXBlb2YgYSA9PSAnc3RyaW5nJyAmJiB0eXBlb2Ygb3B0X2IgPT0gJ3N0cmluZycgJiZcbiAgICAgIHR5cGVvZiBvcHRfYyA9PSAndW5kZWZpbmVkJykge1xuICAgIC8vIE1ldGhvZCAxOiB0ZXh0MSwgdGV4dDJcbiAgICAvLyBDb21wdXRlIGRpZmZzIGZyb20gdGV4dDEgYW5kIHRleHQyLlxuICAgIHRleHQxID0gLyoqIEB0eXBlIHtzdHJpbmd9ICovKGEpO1xuICAgIGRpZmZzID0gdGhpcy5kaWZmX21haW4odGV4dDEsIC8qKiBAdHlwZSB7c3RyaW5nfSAqLyhvcHRfYiksIHRydWUpO1xuICAgIGlmIChkaWZmcy5sZW5ndGggPiAyKSB7XG4gICAgICB0aGlzLmRpZmZfY2xlYW51cFNlbWFudGljKGRpZmZzKTtcbiAgICAgIHRoaXMuZGlmZl9jbGVhbnVwRWZmaWNpZW5jeShkaWZmcyk7XG4gICAgfVxuICB9IGVsc2UgaWYgKGEgJiYgdHlwZW9mIGEgPT0gJ29iamVjdCcgJiYgdHlwZW9mIG9wdF9iID09ICd1bmRlZmluZWQnICYmXG4gICAgICB0eXBlb2Ygb3B0X2MgPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAvLyBNZXRob2QgMjogZGlmZnNcbiAgICAvLyBDb21wdXRlIHRleHQxIGZyb20gZGlmZnMuXG4gICAgZGlmZnMgPSAvKiogQHR5cGUgeyFBcnJheS48IWRpZmZfbWF0Y2hfcGF0Y2guRGlmZj59ICovKGEpO1xuICAgIHRleHQxID0gdGhpcy5kaWZmX3RleHQxKGRpZmZzKTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgYSA9PSAnc3RyaW5nJyAmJiBvcHRfYiAmJiB0eXBlb2Ygb3B0X2IgPT0gJ29iamVjdCcgJiZcbiAgICAgIHR5cGVvZiBvcHRfYyA9PSAndW5kZWZpbmVkJykge1xuICAgIC8vIE1ldGhvZCAzOiB0ZXh0MSwgZGlmZnNcbiAgICB0ZXh0MSA9IC8qKiBAdHlwZSB7c3RyaW5nfSAqLyhhKTtcbiAgICBkaWZmcyA9IC8qKiBAdHlwZSB7IUFycmF5LjwhZGlmZl9tYXRjaF9wYXRjaC5EaWZmPn0gKi8ob3B0X2IpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBhID09ICdzdHJpbmcnICYmIHR5cGVvZiBvcHRfYiA9PSAnc3RyaW5nJyAmJlxuICAgICAgb3B0X2MgJiYgdHlwZW9mIG9wdF9jID09ICdvYmplY3QnKSB7XG4gICAgLy8gTWV0aG9kIDQ6IHRleHQxLCB0ZXh0MiwgZGlmZnNcbiAgICAvLyB0ZXh0MiBpcyBub3QgdXNlZC5cbiAgICB0ZXh0MSA9IC8qKiBAdHlwZSB7c3RyaW5nfSAqLyhhKTtcbiAgICBkaWZmcyA9IC8qKiBAdHlwZSB7IUFycmF5LjwhZGlmZl9tYXRjaF9wYXRjaC5EaWZmPn0gKi8ob3B0X2MpO1xuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBFcnJvcignVW5rbm93biBjYWxsIGZvcm1hdCB0byBwYXRjaF9tYWtlLicpO1xuICB9XG5cbiAgaWYgKGRpZmZzLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBbXTsgIC8vIEdldCByaWQgb2YgdGhlIG51bGwgY2FzZS5cbiAgfVxuICB2YXIgcGF0Y2hlcyA9IFtdO1xuICB2YXIgcGF0Y2ggPSBuZXcgZGlmZl9tYXRjaF9wYXRjaC5wYXRjaF9vYmooKTtcbiAgdmFyIHBhdGNoRGlmZkxlbmd0aCA9IDA7ICAvLyBLZWVwaW5nIG91ciBvd24gbGVuZ3RoIHZhciBpcyBmYXN0ZXIgaW4gSlMuXG4gIHZhciBjaGFyX2NvdW50MSA9IDA7ICAvLyBOdW1iZXIgb2YgY2hhcmFjdGVycyBpbnRvIHRoZSB0ZXh0MSBzdHJpbmcuXG4gIHZhciBjaGFyX2NvdW50MiA9IDA7ICAvLyBOdW1iZXIgb2YgY2hhcmFjdGVycyBpbnRvIHRoZSB0ZXh0MiBzdHJpbmcuXG4gIC8vIFN0YXJ0IHdpdGggdGV4dDEgKHByZXBhdGNoX3RleHQpIGFuZCBhcHBseSB0aGUgZGlmZnMgdW50aWwgd2UgYXJyaXZlIGF0XG4gIC8vIHRleHQyIChwb3N0cGF0Y2hfdGV4dCkuICBXZSByZWNyZWF0ZSB0aGUgcGF0Y2hlcyBvbmUgYnkgb25lIHRvIGRldGVybWluZVxuICAvLyBjb250ZXh0IGluZm8uXG4gIHZhciBwcmVwYXRjaF90ZXh0ID0gdGV4dDE7XG4gIHZhciBwb3N0cGF0Y2hfdGV4dCA9IHRleHQxO1xuICBmb3IgKHZhciB4ID0gMDsgeCA8IGRpZmZzLmxlbmd0aDsgeCsrKSB7XG4gICAgdmFyIGRpZmZfdHlwZSA9IGRpZmZzW3hdWzBdO1xuICAgIHZhciBkaWZmX3RleHQgPSBkaWZmc1t4XVsxXTtcblxuICAgIGlmICghcGF0Y2hEaWZmTGVuZ3RoICYmIGRpZmZfdHlwZSAhPT0gRElGRl9FUVVBTCkge1xuICAgICAgLy8gQSBuZXcgcGF0Y2ggc3RhcnRzIGhlcmUuXG4gICAgICBwYXRjaC5zdGFydDEgPSBjaGFyX2NvdW50MTtcbiAgICAgIHBhdGNoLnN0YXJ0MiA9IGNoYXJfY291bnQyO1xuICAgIH1cblxuICAgIHN3aXRjaCAoZGlmZl90eXBlKSB7XG4gICAgICBjYXNlIERJRkZfSU5TRVJUOlxuICAgICAgICBwYXRjaC5kaWZmc1twYXRjaERpZmZMZW5ndGgrK10gPSBkaWZmc1t4XTtcbiAgICAgICAgcGF0Y2gubGVuZ3RoMiArPSBkaWZmX3RleHQubGVuZ3RoO1xuICAgICAgICBwb3N0cGF0Y2hfdGV4dCA9IHBvc3RwYXRjaF90ZXh0LnN1YnN0cmluZygwLCBjaGFyX2NvdW50MikgKyBkaWZmX3RleHQgK1xuICAgICAgICAgICAgICAgICAgICAgICAgIHBvc3RwYXRjaF90ZXh0LnN1YnN0cmluZyhjaGFyX2NvdW50Mik7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBESUZGX0RFTEVURTpcbiAgICAgICAgcGF0Y2gubGVuZ3RoMSArPSBkaWZmX3RleHQubGVuZ3RoO1xuICAgICAgICBwYXRjaC5kaWZmc1twYXRjaERpZmZMZW5ndGgrK10gPSBkaWZmc1t4XTtcbiAgICAgICAgcG9zdHBhdGNoX3RleHQgPSBwb3N0cGF0Y2hfdGV4dC5zdWJzdHJpbmcoMCwgY2hhcl9jb3VudDIpICtcbiAgICAgICAgICAgICAgICAgICAgICAgICBwb3N0cGF0Y2hfdGV4dC5zdWJzdHJpbmcoY2hhcl9jb3VudDIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaWZmX3RleHQubGVuZ3RoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIERJRkZfRVFVQUw6XG4gICAgICAgIGlmIChkaWZmX3RleHQubGVuZ3RoIDw9IDIgKiB0aGlzLlBhdGNoX01hcmdpbiAmJlxuICAgICAgICAgICAgcGF0Y2hEaWZmTGVuZ3RoICYmIGRpZmZzLmxlbmd0aCAhPSB4ICsgMSkge1xuICAgICAgICAgIC8vIFNtYWxsIGVxdWFsaXR5IGluc2lkZSBhIHBhdGNoLlxuICAgICAgICAgIHBhdGNoLmRpZmZzW3BhdGNoRGlmZkxlbmd0aCsrXSA9IGRpZmZzW3hdO1xuICAgICAgICAgIHBhdGNoLmxlbmd0aDEgKz0gZGlmZl90ZXh0Lmxlbmd0aDtcbiAgICAgICAgICBwYXRjaC5sZW5ndGgyICs9IGRpZmZfdGV4dC5sZW5ndGg7XG4gICAgICAgIH0gZWxzZSBpZiAoZGlmZl90ZXh0Lmxlbmd0aCA+PSAyICogdGhpcy5QYXRjaF9NYXJnaW4pIHtcbiAgICAgICAgICAvLyBUaW1lIGZvciBhIG5ldyBwYXRjaC5cbiAgICAgICAgICBpZiAocGF0Y2hEaWZmTGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLnBhdGNoX2FkZENvbnRleHRfKHBhdGNoLCBwcmVwYXRjaF90ZXh0KTtcbiAgICAgICAgICAgIHBhdGNoZXMucHVzaChwYXRjaCk7XG4gICAgICAgICAgICBwYXRjaCA9IG5ldyBkaWZmX21hdGNoX3BhdGNoLnBhdGNoX29iaigpO1xuICAgICAgICAgICAgcGF0Y2hEaWZmTGVuZ3RoID0gMDtcbiAgICAgICAgICAgIC8vIFVubGlrZSBVbmlkaWZmLCBvdXIgcGF0Y2ggbGlzdHMgaGF2ZSBhIHJvbGxpbmcgY29udGV4dC5cbiAgICAgICAgICAgIC8vIGh0dHA6Ly9jb2RlLmdvb2dsZS5jb20vcC9nb29nbGUtZGlmZi1tYXRjaC1wYXRjaC93aWtpL1VuaWRpZmZcbiAgICAgICAgICAgIC8vIFVwZGF0ZSBwcmVwYXRjaCB0ZXh0ICYgcG9zIHRvIHJlZmxlY3QgdGhlIGFwcGxpY2F0aW9uIG9mIHRoZVxuICAgICAgICAgICAgLy8ganVzdCBjb21wbGV0ZWQgcGF0Y2guXG4gICAgICAgICAgICBwcmVwYXRjaF90ZXh0ID0gcG9zdHBhdGNoX3RleHQ7XG4gICAgICAgICAgICBjaGFyX2NvdW50MSA9IGNoYXJfY291bnQyO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICAvLyBVcGRhdGUgdGhlIGN1cnJlbnQgY2hhcmFjdGVyIGNvdW50LlxuICAgIGlmIChkaWZmX3R5cGUgIT09IERJRkZfSU5TRVJUKSB7XG4gICAgICBjaGFyX2NvdW50MSArPSBkaWZmX3RleHQubGVuZ3RoO1xuICAgIH1cbiAgICBpZiAoZGlmZl90eXBlICE9PSBESUZGX0RFTEVURSkge1xuICAgICAgY2hhcl9jb3VudDIgKz0gZGlmZl90ZXh0Lmxlbmd0aDtcbiAgICB9XG4gIH1cbiAgLy8gUGljayB1cCB0aGUgbGVmdG92ZXIgcGF0Y2ggaWYgbm90IGVtcHR5LlxuICBpZiAocGF0Y2hEaWZmTGVuZ3RoKSB7XG4gICAgdGhpcy5wYXRjaF9hZGRDb250ZXh0XyhwYXRjaCwgcHJlcGF0Y2hfdGV4dCk7XG4gICAgcGF0Y2hlcy5wdXNoKHBhdGNoKTtcbiAgfVxuXG4gIHJldHVybiBwYXRjaGVzO1xufTtcblxuXG4vKipcbiAqIEdpdmVuIGFuIGFycmF5IG9mIHBhdGNoZXMsIHJldHVybiBhbm90aGVyIGFycmF5IHRoYXQgaXMgaWRlbnRpY2FsLlxuICogQHBhcmFtIHshQXJyYXkuPCFkaWZmX21hdGNoX3BhdGNoLnBhdGNoX29iaj59IHBhdGNoZXMgQXJyYXkgb2YgcGF0Y2ggb2JqZWN0cy5cbiAqIEByZXR1cm4geyFBcnJheS48IWRpZmZfbWF0Y2hfcGF0Y2gucGF0Y2hfb2JqPn0gQXJyYXkgb2YgcGF0Y2ggb2JqZWN0cy5cbiAqL1xuZGlmZl9tYXRjaF9wYXRjaC5wcm90b3R5cGUucGF0Y2hfZGVlcENvcHkgPSBmdW5jdGlvbihwYXRjaGVzKSB7XG4gIC8vIE1ha2luZyBkZWVwIGNvcGllcyBpcyBoYXJkIGluIEphdmFTY3JpcHQuXG4gIHZhciBwYXRjaGVzQ29weSA9IFtdO1xuICBmb3IgKHZhciB4ID0gMDsgeCA8IHBhdGNoZXMubGVuZ3RoOyB4KyspIHtcbiAgICB2YXIgcGF0Y2ggPSBwYXRjaGVzW3hdO1xuICAgIHZhciBwYXRjaENvcHkgPSBuZXcgZGlmZl9tYXRjaF9wYXRjaC5wYXRjaF9vYmooKTtcbiAgICBwYXRjaENvcHkuZGlmZnMgPSBbXTtcbiAgICBmb3IgKHZhciB5ID0gMDsgeSA8IHBhdGNoLmRpZmZzLmxlbmd0aDsgeSsrKSB7XG4gICAgICBwYXRjaENvcHkuZGlmZnNbeV0gPSBwYXRjaC5kaWZmc1t5XS5zbGljZSgpO1xuICAgIH1cbiAgICBwYXRjaENvcHkuc3RhcnQxID0gcGF0Y2guc3RhcnQxO1xuICAgIHBhdGNoQ29weS5zdGFydDIgPSBwYXRjaC5zdGFydDI7XG4gICAgcGF0Y2hDb3B5Lmxlbmd0aDEgPSBwYXRjaC5sZW5ndGgxO1xuICAgIHBhdGNoQ29weS5sZW5ndGgyID0gcGF0Y2gubGVuZ3RoMjtcbiAgICBwYXRjaGVzQ29weVt4XSA9IHBhdGNoQ29weTtcbiAgfVxuICByZXR1cm4gcGF0Y2hlc0NvcHk7XG59O1xuXG5cbi8qKlxuICogTWVyZ2UgYSBzZXQgb2YgcGF0Y2hlcyBvbnRvIHRoZSB0ZXh0LiAgUmV0dXJuIGEgcGF0Y2hlZCB0ZXh0LCBhcyB3ZWxsXG4gKiBhcyBhIGxpc3Qgb2YgdHJ1ZS9mYWxzZSB2YWx1ZXMgaW5kaWNhdGluZyB3aGljaCBwYXRjaGVzIHdlcmUgYXBwbGllZC5cbiAqIEBwYXJhbSB7IUFycmF5LjwhZGlmZl9tYXRjaF9wYXRjaC5wYXRjaF9vYmo+fSBwYXRjaGVzIEFycmF5IG9mIHBhdGNoIG9iamVjdHMuXG4gKiBAcGFyYW0ge3N0cmluZ30gdGV4dCBPbGQgdGV4dC5cbiAqIEByZXR1cm4geyFBcnJheS48c3RyaW5nfCFBcnJheS48Ym9vbGVhbj4+fSBUd28gZWxlbWVudCBBcnJheSwgY29udGFpbmluZyB0aGVcbiAqICAgICAgbmV3IHRleHQgYW5kIGFuIGFycmF5IG9mIGJvb2xlYW4gdmFsdWVzLlxuICovXG5kaWZmX21hdGNoX3BhdGNoLnByb3RvdHlwZS5wYXRjaF9hcHBseSA9IGZ1bmN0aW9uKHBhdGNoZXMsIHRleHQpIHtcbiAgaWYgKHBhdGNoZXMubGVuZ3RoID09IDApIHtcbiAgICByZXR1cm4gW3RleHQsIFtdXTtcbiAgfVxuXG4gIC8vIERlZXAgY29weSB0aGUgcGF0Y2hlcyBzbyB0aGF0IG5vIGNoYW5nZXMgYXJlIG1hZGUgdG8gb3JpZ2luYWxzLlxuICBwYXRjaGVzID0gdGhpcy5wYXRjaF9kZWVwQ29weShwYXRjaGVzKTtcblxuICB2YXIgbnVsbFBhZGRpbmcgPSB0aGlzLnBhdGNoX2FkZFBhZGRpbmcocGF0Y2hlcyk7XG4gIHRleHQgPSBudWxsUGFkZGluZyArIHRleHQgKyBudWxsUGFkZGluZztcblxuICB0aGlzLnBhdGNoX3NwbGl0TWF4KHBhdGNoZXMpO1xuICAvLyBkZWx0YSBrZWVwcyB0cmFjayBvZiB0aGUgb2Zmc2V0IGJldHdlZW4gdGhlIGV4cGVjdGVkIGFuZCBhY3R1YWwgbG9jYXRpb25cbiAgLy8gb2YgdGhlIHByZXZpb3VzIHBhdGNoLiAgSWYgdGhlcmUgYXJlIHBhdGNoZXMgZXhwZWN0ZWQgYXQgcG9zaXRpb25zIDEwIGFuZFxuICAvLyAyMCwgYnV0IHRoZSBmaXJzdCBwYXRjaCB3YXMgZm91bmQgYXQgMTIsIGRlbHRhIGlzIDIgYW5kIHRoZSBzZWNvbmQgcGF0Y2hcbiAgLy8gaGFzIGFuIGVmZmVjdGl2ZSBleHBlY3RlZCBwb3NpdGlvbiBvZiAyMi5cbiAgdmFyIGRlbHRhID0gMDtcbiAgdmFyIHJlc3VsdHMgPSBbXTtcbiAgZm9yICh2YXIgeCA9IDA7IHggPCBwYXRjaGVzLmxlbmd0aDsgeCsrKSB7XG4gICAgdmFyIGV4cGVjdGVkX2xvYyA9IHBhdGNoZXNbeF0uc3RhcnQyICsgZGVsdGE7XG4gICAgdmFyIHRleHQxID0gdGhpcy5kaWZmX3RleHQxKHBhdGNoZXNbeF0uZGlmZnMpO1xuICAgIHZhciBzdGFydF9sb2M7XG4gICAgdmFyIGVuZF9sb2MgPSAtMTtcbiAgICBpZiAodGV4dDEubGVuZ3RoID4gdGhpcy5NYXRjaF9NYXhCaXRzKSB7XG4gICAgICAvLyBwYXRjaF9zcGxpdE1heCB3aWxsIG9ubHkgcHJvdmlkZSBhbiBvdmVyc2l6ZWQgcGF0dGVybiBpbiB0aGUgY2FzZSBvZlxuICAgICAgLy8gYSBtb25zdGVyIGRlbGV0ZS5cbiAgICAgIHN0YXJ0X2xvYyA9IHRoaXMubWF0Y2hfbWFpbih0ZXh0LCB0ZXh0MS5zdWJzdHJpbmcoMCwgdGhpcy5NYXRjaF9NYXhCaXRzKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHBlY3RlZF9sb2MpO1xuICAgICAgaWYgKHN0YXJ0X2xvYyAhPSAtMSkge1xuICAgICAgICBlbmRfbG9jID0gdGhpcy5tYXRjaF9tYWluKHRleHQsXG4gICAgICAgICAgICB0ZXh0MS5zdWJzdHJpbmcodGV4dDEubGVuZ3RoIC0gdGhpcy5NYXRjaF9NYXhCaXRzKSxcbiAgICAgICAgICAgIGV4cGVjdGVkX2xvYyArIHRleHQxLmxlbmd0aCAtIHRoaXMuTWF0Y2hfTWF4Qml0cyk7XG4gICAgICAgIGlmIChlbmRfbG9jID09IC0xIHx8IHN0YXJ0X2xvYyA+PSBlbmRfbG9jKSB7XG4gICAgICAgICAgLy8gQ2FuJ3QgZmluZCB2YWxpZCB0cmFpbGluZyBjb250ZXh0LiAgRHJvcCB0aGlzIHBhdGNoLlxuICAgICAgICAgIHN0YXJ0X2xvYyA9IC0xO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0YXJ0X2xvYyA9IHRoaXMubWF0Y2hfbWFpbih0ZXh0LCB0ZXh0MSwgZXhwZWN0ZWRfbG9jKTtcbiAgICB9XG4gICAgaWYgKHN0YXJ0X2xvYyA9PSAtMSkge1xuICAgICAgLy8gTm8gbWF0Y2ggZm91bmQuICA6KFxuICAgICAgcmVzdWx0c1t4XSA9IGZhbHNlO1xuICAgICAgLy8gU3VidHJhY3QgdGhlIGRlbHRhIGZvciB0aGlzIGZhaWxlZCBwYXRjaCBmcm9tIHN1YnNlcXVlbnQgcGF0Y2hlcy5cbiAgICAgIGRlbHRhIC09IHBhdGNoZXNbeF0ubGVuZ3RoMiAtIHBhdGNoZXNbeF0ubGVuZ3RoMTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gRm91bmQgYSBtYXRjaC4gIDopXG4gICAgICByZXN1bHRzW3hdID0gdHJ1ZTtcbiAgICAgIGRlbHRhID0gc3RhcnRfbG9jIC0gZXhwZWN0ZWRfbG9jO1xuICAgICAgdmFyIHRleHQyO1xuICAgICAgaWYgKGVuZF9sb2MgPT0gLTEpIHtcbiAgICAgICAgdGV4dDIgPSB0ZXh0LnN1YnN0cmluZyhzdGFydF9sb2MsIHN0YXJ0X2xvYyArIHRleHQxLmxlbmd0aCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0ZXh0MiA9IHRleHQuc3Vic3RyaW5nKHN0YXJ0X2xvYywgZW5kX2xvYyArIHRoaXMuTWF0Y2hfTWF4Qml0cyk7XG4gICAgICB9XG4gICAgICBpZiAodGV4dDEgPT0gdGV4dDIpIHtcbiAgICAgICAgLy8gUGVyZmVjdCBtYXRjaCwganVzdCBzaG92ZSB0aGUgcmVwbGFjZW1lbnQgdGV4dCBpbi5cbiAgICAgICAgdGV4dCA9IHRleHQuc3Vic3RyaW5nKDAsIHN0YXJ0X2xvYykgK1xuICAgICAgICAgICAgICAgdGhpcy5kaWZmX3RleHQyKHBhdGNoZXNbeF0uZGlmZnMpICtcbiAgICAgICAgICAgICAgIHRleHQuc3Vic3RyaW5nKHN0YXJ0X2xvYyArIHRleHQxLmxlbmd0aCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBJbXBlcmZlY3QgbWF0Y2guICBSdW4gYSBkaWZmIHRvIGdldCBhIGZyYW1ld29yayBvZiBlcXVpdmFsZW50XG4gICAgICAgIC8vIGluZGljZXMuXG4gICAgICAgIHZhciBkaWZmcyA9IHRoaXMuZGlmZl9tYWluKHRleHQxLCB0ZXh0MiwgZmFsc2UpO1xuICAgICAgICBpZiAodGV4dDEubGVuZ3RoID4gdGhpcy5NYXRjaF9NYXhCaXRzICYmXG4gICAgICAgICAgICB0aGlzLmRpZmZfbGV2ZW5zaHRlaW4oZGlmZnMpIC8gdGV4dDEubGVuZ3RoID5cbiAgICAgICAgICAgIHRoaXMuUGF0Y2hfRGVsZXRlVGhyZXNob2xkKSB7XG4gICAgICAgICAgLy8gVGhlIGVuZCBwb2ludHMgbWF0Y2gsIGJ1dCB0aGUgY29udGVudCBpcyB1bmFjY2VwdGFibHkgYmFkLlxuICAgICAgICAgIHJlc3VsdHNbeF0gPSBmYWxzZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmRpZmZfY2xlYW51cFNlbWFudGljTG9zc2xlc3MoZGlmZnMpO1xuICAgICAgICAgIHZhciBpbmRleDEgPSAwO1xuICAgICAgICAgIHZhciBpbmRleDI7XG4gICAgICAgICAgZm9yICh2YXIgeSA9IDA7IHkgPCBwYXRjaGVzW3hdLmRpZmZzLmxlbmd0aDsgeSsrKSB7XG4gICAgICAgICAgICB2YXIgbW9kID0gcGF0Y2hlc1t4XS5kaWZmc1t5XTtcbiAgICAgICAgICAgIGlmIChtb2RbMF0gIT09IERJRkZfRVFVQUwpIHtcbiAgICAgICAgICAgICAgaW5kZXgyID0gdGhpcy5kaWZmX3hJbmRleChkaWZmcywgaW5kZXgxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChtb2RbMF0gPT09IERJRkZfSU5TRVJUKSB7ICAvLyBJbnNlcnRpb25cbiAgICAgICAgICAgICAgdGV4dCA9IHRleHQuc3Vic3RyaW5nKDAsIHN0YXJ0X2xvYyArIGluZGV4MikgKyBtb2RbMV0gK1xuICAgICAgICAgICAgICAgICAgICAgdGV4dC5zdWJzdHJpbmcoc3RhcnRfbG9jICsgaW5kZXgyKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobW9kWzBdID09PSBESUZGX0RFTEVURSkgeyAgLy8gRGVsZXRpb25cbiAgICAgICAgICAgICAgdGV4dCA9IHRleHQuc3Vic3RyaW5nKDAsIHN0YXJ0X2xvYyArIGluZGV4MikgK1xuICAgICAgICAgICAgICAgICAgICAgdGV4dC5zdWJzdHJpbmcoc3RhcnRfbG9jICsgdGhpcy5kaWZmX3hJbmRleChkaWZmcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICBpbmRleDEgKyBtb2RbMV0ubGVuZ3RoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobW9kWzBdICE9PSBESUZGX0RFTEVURSkge1xuICAgICAgICAgICAgICBpbmRleDEgKz0gbW9kWzFdLmxlbmd0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgLy8gU3RyaXAgdGhlIHBhZGRpbmcgb2ZmLlxuICB0ZXh0ID0gdGV4dC5zdWJzdHJpbmcobnVsbFBhZGRpbmcubGVuZ3RoLCB0ZXh0Lmxlbmd0aCAtIG51bGxQYWRkaW5nLmxlbmd0aCk7XG4gIHJldHVybiBbdGV4dCwgcmVzdWx0c107XG59O1xuXG5cbi8qKlxuICogQWRkIHNvbWUgcGFkZGluZyBvbiB0ZXh0IHN0YXJ0IGFuZCBlbmQgc28gdGhhdCBlZGdlcyBjYW4gbWF0Y2ggc29tZXRoaW5nLlxuICogSW50ZW5kZWQgdG8gYmUgY2FsbGVkIG9ubHkgZnJvbSB3aXRoaW4gcGF0Y2hfYXBwbHkuXG4gKiBAcGFyYW0geyFBcnJheS48IWRpZmZfbWF0Y2hfcGF0Y2gucGF0Y2hfb2JqPn0gcGF0Y2hlcyBBcnJheSBvZiBwYXRjaCBvYmplY3RzLlxuICogQHJldHVybiB7c3RyaW5nfSBUaGUgcGFkZGluZyBzdHJpbmcgYWRkZWQgdG8gZWFjaCBzaWRlLlxuICovXG5kaWZmX21hdGNoX3BhdGNoLnByb3RvdHlwZS5wYXRjaF9hZGRQYWRkaW5nID0gZnVuY3Rpb24ocGF0Y2hlcykge1xuICB2YXIgcGFkZGluZ0xlbmd0aCA9IHRoaXMuUGF0Y2hfTWFyZ2luO1xuICB2YXIgbnVsbFBhZGRpbmcgPSAnJztcbiAgZm9yICh2YXIgeCA9IDE7IHggPD0gcGFkZGluZ0xlbmd0aDsgeCsrKSB7XG4gICAgbnVsbFBhZGRpbmcgKz0gU3RyaW5nLmZyb21DaGFyQ29kZSh4KTtcbiAgfVxuXG4gIC8vIEJ1bXAgYWxsIHRoZSBwYXRjaGVzIGZvcndhcmQuXG4gIGZvciAodmFyIHggPSAwOyB4IDwgcGF0Y2hlcy5sZW5ndGg7IHgrKykge1xuICAgIHBhdGNoZXNbeF0uc3RhcnQxICs9IHBhZGRpbmdMZW5ndGg7XG4gICAgcGF0Y2hlc1t4XS5zdGFydDIgKz0gcGFkZGluZ0xlbmd0aDtcbiAgfVxuXG4gIC8vIEFkZCBzb21lIHBhZGRpbmcgb24gc3RhcnQgb2YgZmlyc3QgZGlmZi5cbiAgdmFyIHBhdGNoID0gcGF0Y2hlc1swXTtcbiAgdmFyIGRpZmZzID0gcGF0Y2guZGlmZnM7XG4gIGlmIChkaWZmcy5sZW5ndGggPT0gMCB8fCBkaWZmc1swXVswXSAhPSBESUZGX0VRVUFMKSB7XG4gICAgLy8gQWRkIG51bGxQYWRkaW5nIGVxdWFsaXR5LlxuICAgIGRpZmZzLnVuc2hpZnQoW0RJRkZfRVFVQUwsIG51bGxQYWRkaW5nXSk7XG4gICAgcGF0Y2guc3RhcnQxIC09IHBhZGRpbmdMZW5ndGg7ICAvLyBTaG91bGQgYmUgMC5cbiAgICBwYXRjaC5zdGFydDIgLT0gcGFkZGluZ0xlbmd0aDsgIC8vIFNob3VsZCBiZSAwLlxuICAgIHBhdGNoLmxlbmd0aDEgKz0gcGFkZGluZ0xlbmd0aDtcbiAgICBwYXRjaC5sZW5ndGgyICs9IHBhZGRpbmdMZW5ndGg7XG4gIH0gZWxzZSBpZiAocGFkZGluZ0xlbmd0aCA+IGRpZmZzWzBdWzFdLmxlbmd0aCkge1xuICAgIC8vIEdyb3cgZmlyc3QgZXF1YWxpdHkuXG4gICAgdmFyIGV4dHJhTGVuZ3RoID0gcGFkZGluZ0xlbmd0aCAtIGRpZmZzWzBdWzFdLmxlbmd0aDtcbiAgICBkaWZmc1swXVsxXSA9IG51bGxQYWRkaW5nLnN1YnN0cmluZyhkaWZmc1swXVsxXS5sZW5ndGgpICsgZGlmZnNbMF1bMV07XG4gICAgcGF0Y2guc3RhcnQxIC09IGV4dHJhTGVuZ3RoO1xuICAgIHBhdGNoLnN0YXJ0MiAtPSBleHRyYUxlbmd0aDtcbiAgICBwYXRjaC5sZW5ndGgxICs9IGV4dHJhTGVuZ3RoO1xuICAgIHBhdGNoLmxlbmd0aDIgKz0gZXh0cmFMZW5ndGg7XG4gIH1cblxuICAvLyBBZGQgc29tZSBwYWRkaW5nIG9uIGVuZCBvZiBsYXN0IGRpZmYuXG4gIHBhdGNoID0gcGF0Y2hlc1twYXRjaGVzLmxlbmd0aCAtIDFdO1xuICBkaWZmcyA9IHBhdGNoLmRpZmZzO1xuICBpZiAoZGlmZnMubGVuZ3RoID09IDAgfHwgZGlmZnNbZGlmZnMubGVuZ3RoIC0gMV1bMF0gIT0gRElGRl9FUVVBTCkge1xuICAgIC8vIEFkZCBudWxsUGFkZGluZyBlcXVhbGl0eS5cbiAgICBkaWZmcy5wdXNoKFtESUZGX0VRVUFMLCBudWxsUGFkZGluZ10pO1xuICAgIHBhdGNoLmxlbmd0aDEgKz0gcGFkZGluZ0xlbmd0aDtcbiAgICBwYXRjaC5sZW5ndGgyICs9IHBhZGRpbmdMZW5ndGg7XG4gIH0gZWxzZSBpZiAocGFkZGluZ0xlbmd0aCA+IGRpZmZzW2RpZmZzLmxlbmd0aCAtIDFdWzFdLmxlbmd0aCkge1xuICAgIC8vIEdyb3cgbGFzdCBlcXVhbGl0eS5cbiAgICB2YXIgZXh0cmFMZW5ndGggPSBwYWRkaW5nTGVuZ3RoIC0gZGlmZnNbZGlmZnMubGVuZ3RoIC0gMV1bMV0ubGVuZ3RoO1xuICAgIGRpZmZzW2RpZmZzLmxlbmd0aCAtIDFdWzFdICs9IG51bGxQYWRkaW5nLnN1YnN0cmluZygwLCBleHRyYUxlbmd0aCk7XG4gICAgcGF0Y2gubGVuZ3RoMSArPSBleHRyYUxlbmd0aDtcbiAgICBwYXRjaC5sZW5ndGgyICs9IGV4dHJhTGVuZ3RoO1xuICB9XG5cbiAgcmV0dXJuIG51bGxQYWRkaW5nO1xufTtcblxuXG4vKipcbiAqIExvb2sgdGhyb3VnaCB0aGUgcGF0Y2hlcyBhbmQgYnJlYWsgdXAgYW55IHdoaWNoIGFyZSBsb25nZXIgdGhhbiB0aGUgbWF4aW11bVxuICogbGltaXQgb2YgdGhlIG1hdGNoIGFsZ29yaXRobS5cbiAqIEludGVuZGVkIHRvIGJlIGNhbGxlZCBvbmx5IGZyb20gd2l0aGluIHBhdGNoX2FwcGx5LlxuICogQHBhcmFtIHshQXJyYXkuPCFkaWZmX21hdGNoX3BhdGNoLnBhdGNoX29iaj59IHBhdGNoZXMgQXJyYXkgb2YgcGF0Y2ggb2JqZWN0cy5cbiAqL1xuZGlmZl9tYXRjaF9wYXRjaC5wcm90b3R5cGUucGF0Y2hfc3BsaXRNYXggPSBmdW5jdGlvbihwYXRjaGVzKSB7XG4gIHZhciBwYXRjaF9zaXplID0gdGhpcy5NYXRjaF9NYXhCaXRzO1xuICBmb3IgKHZhciB4ID0gMDsgeCA8IHBhdGNoZXMubGVuZ3RoOyB4KyspIHtcbiAgICBpZiAocGF0Y2hlc1t4XS5sZW5ndGgxID4gcGF0Y2hfc2l6ZSkge1xuICAgICAgdmFyIGJpZ3BhdGNoID0gcGF0Y2hlc1t4XTtcbiAgICAgIC8vIFJlbW92ZSB0aGUgYmlnIG9sZCBwYXRjaC5cbiAgICAgIHBhdGNoZXMuc3BsaWNlKHgtLSwgMSk7XG4gICAgICB2YXIgc3RhcnQxID0gYmlncGF0Y2guc3RhcnQxO1xuICAgICAgdmFyIHN0YXJ0MiA9IGJpZ3BhdGNoLnN0YXJ0MjtcbiAgICAgIHZhciBwcmVjb250ZXh0ID0gJyc7XG4gICAgICB3aGlsZSAoYmlncGF0Y2guZGlmZnMubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgIC8vIENyZWF0ZSBvbmUgb2Ygc2V2ZXJhbCBzbWFsbGVyIHBhdGNoZXMuXG4gICAgICAgIHZhciBwYXRjaCA9IG5ldyBkaWZmX21hdGNoX3BhdGNoLnBhdGNoX29iaigpO1xuICAgICAgICB2YXIgZW1wdHkgPSB0cnVlO1xuICAgICAgICBwYXRjaC5zdGFydDEgPSBzdGFydDEgLSBwcmVjb250ZXh0Lmxlbmd0aDtcbiAgICAgICAgcGF0Y2guc3RhcnQyID0gc3RhcnQyIC0gcHJlY29udGV4dC5sZW5ndGg7XG4gICAgICAgIGlmIChwcmVjb250ZXh0ICE9PSAnJykge1xuICAgICAgICAgIHBhdGNoLmxlbmd0aDEgPSBwYXRjaC5sZW5ndGgyID0gcHJlY29udGV4dC5sZW5ndGg7XG4gICAgICAgICAgcGF0Y2guZGlmZnMucHVzaChbRElGRl9FUVVBTCwgcHJlY29udGV4dF0pO1xuICAgICAgICB9XG4gICAgICAgIHdoaWxlIChiaWdwYXRjaC5kaWZmcy5sZW5ndGggIT09IDAgJiZcbiAgICAgICAgICAgICAgIHBhdGNoLmxlbmd0aDEgPCBwYXRjaF9zaXplIC0gdGhpcy5QYXRjaF9NYXJnaW4pIHtcbiAgICAgICAgICB2YXIgZGlmZl90eXBlID0gYmlncGF0Y2guZGlmZnNbMF1bMF07XG4gICAgICAgICAgdmFyIGRpZmZfdGV4dCA9IGJpZ3BhdGNoLmRpZmZzWzBdWzFdO1xuICAgICAgICAgIGlmIChkaWZmX3R5cGUgPT09IERJRkZfSU5TRVJUKSB7XG4gICAgICAgICAgICAvLyBJbnNlcnRpb25zIGFyZSBoYXJtbGVzcy5cbiAgICAgICAgICAgIHBhdGNoLmxlbmd0aDIgKz0gZGlmZl90ZXh0Lmxlbmd0aDtcbiAgICAgICAgICAgIHN0YXJ0MiArPSBkaWZmX3RleHQubGVuZ3RoO1xuICAgICAgICAgICAgcGF0Y2guZGlmZnMucHVzaChiaWdwYXRjaC5kaWZmcy5zaGlmdCgpKTtcbiAgICAgICAgICAgIGVtcHR5ID0gZmFsc2U7XG4gICAgICAgICAgfSBlbHNlIGlmIChkaWZmX3R5cGUgPT09IERJRkZfREVMRVRFICYmIHBhdGNoLmRpZmZzLmxlbmd0aCA9PSAxICYmXG4gICAgICAgICAgICAgICAgICAgICBwYXRjaC5kaWZmc1swXVswXSA9PSBESUZGX0VRVUFMICYmXG4gICAgICAgICAgICAgICAgICAgICBkaWZmX3RleHQubGVuZ3RoID4gMiAqIHBhdGNoX3NpemUpIHtcbiAgICAgICAgICAgIC8vIFRoaXMgaXMgYSBsYXJnZSBkZWxldGlvbi4gIExldCBpdCBwYXNzIGluIG9uZSBjaHVuay5cbiAgICAgICAgICAgIHBhdGNoLmxlbmd0aDEgKz0gZGlmZl90ZXh0Lmxlbmd0aDtcbiAgICAgICAgICAgIHN0YXJ0MSArPSBkaWZmX3RleHQubGVuZ3RoO1xuICAgICAgICAgICAgZW1wdHkgPSBmYWxzZTtcbiAgICAgICAgICAgIHBhdGNoLmRpZmZzLnB1c2goW2RpZmZfdHlwZSwgZGlmZl90ZXh0XSk7XG4gICAgICAgICAgICBiaWdwYXRjaC5kaWZmcy5zaGlmdCgpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBEZWxldGlvbiBvciBlcXVhbGl0eS4gIE9ubHkgdGFrZSBhcyBtdWNoIGFzIHdlIGNhbiBzdG9tYWNoLlxuICAgICAgICAgICAgZGlmZl90ZXh0ID0gZGlmZl90ZXh0LnN1YnN0cmluZygwLFxuICAgICAgICAgICAgICAgIHBhdGNoX3NpemUgLSBwYXRjaC5sZW5ndGgxIC0gdGhpcy5QYXRjaF9NYXJnaW4pO1xuICAgICAgICAgICAgcGF0Y2gubGVuZ3RoMSArPSBkaWZmX3RleHQubGVuZ3RoO1xuICAgICAgICAgICAgc3RhcnQxICs9IGRpZmZfdGV4dC5sZW5ndGg7XG4gICAgICAgICAgICBpZiAoZGlmZl90eXBlID09PSBESUZGX0VRVUFMKSB7XG4gICAgICAgICAgICAgIHBhdGNoLmxlbmd0aDIgKz0gZGlmZl90ZXh0Lmxlbmd0aDtcbiAgICAgICAgICAgICAgc3RhcnQyICs9IGRpZmZfdGV4dC5sZW5ndGg7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBlbXB0eSA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcGF0Y2guZGlmZnMucHVzaChbZGlmZl90eXBlLCBkaWZmX3RleHRdKTtcbiAgICAgICAgICAgIGlmIChkaWZmX3RleHQgPT0gYmlncGF0Y2guZGlmZnNbMF1bMV0pIHtcbiAgICAgICAgICAgICAgYmlncGF0Y2guZGlmZnMuc2hpZnQoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGJpZ3BhdGNoLmRpZmZzWzBdWzFdID1cbiAgICAgICAgICAgICAgICAgIGJpZ3BhdGNoLmRpZmZzWzBdWzFdLnN1YnN0cmluZyhkaWZmX3RleHQubGVuZ3RoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gQ29tcHV0ZSB0aGUgaGVhZCBjb250ZXh0IGZvciB0aGUgbmV4dCBwYXRjaC5cbiAgICAgICAgcHJlY29udGV4dCA9IHRoaXMuZGlmZl90ZXh0MihwYXRjaC5kaWZmcyk7XG4gICAgICAgIHByZWNvbnRleHQgPVxuICAgICAgICAgICAgcHJlY29udGV4dC5zdWJzdHJpbmcocHJlY29udGV4dC5sZW5ndGggLSB0aGlzLlBhdGNoX01hcmdpbik7XG4gICAgICAgIC8vIEFwcGVuZCB0aGUgZW5kIGNvbnRleHQgZm9yIHRoaXMgcGF0Y2guXG4gICAgICAgIHZhciBwb3N0Y29udGV4dCA9IHRoaXMuZGlmZl90ZXh0MShiaWdwYXRjaC5kaWZmcylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zdWJzdHJpbmcoMCwgdGhpcy5QYXRjaF9NYXJnaW4pO1xuICAgICAgICBpZiAocG9zdGNvbnRleHQgIT09ICcnKSB7XG4gICAgICAgICAgcGF0Y2gubGVuZ3RoMSArPSBwb3N0Y29udGV4dC5sZW5ndGg7XG4gICAgICAgICAgcGF0Y2gubGVuZ3RoMiArPSBwb3N0Y29udGV4dC5sZW5ndGg7XG4gICAgICAgICAgaWYgKHBhdGNoLmRpZmZzLmxlbmd0aCAhPT0gMCAmJlxuICAgICAgICAgICAgICBwYXRjaC5kaWZmc1twYXRjaC5kaWZmcy5sZW5ndGggLSAxXVswXSA9PT0gRElGRl9FUVVBTCkge1xuICAgICAgICAgICAgcGF0Y2guZGlmZnNbcGF0Y2guZGlmZnMubGVuZ3RoIC0gMV1bMV0gKz0gcG9zdGNvbnRleHQ7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHBhdGNoLmRpZmZzLnB1c2goW0RJRkZfRVFVQUwsIHBvc3Rjb250ZXh0XSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICghZW1wdHkpIHtcbiAgICAgICAgICBwYXRjaGVzLnNwbGljZSgrK3gsIDAsIHBhdGNoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufTtcblxuXG4vKipcbiAqIFRha2UgYSBsaXN0IG9mIHBhdGNoZXMgYW5kIHJldHVybiBhIHRleHR1YWwgcmVwcmVzZW50YXRpb24uXG4gKiBAcGFyYW0geyFBcnJheS48IWRpZmZfbWF0Y2hfcGF0Y2gucGF0Y2hfb2JqPn0gcGF0Y2hlcyBBcnJheSBvZiBwYXRjaCBvYmplY3RzLlxuICogQHJldHVybiB7c3RyaW5nfSBUZXh0IHJlcHJlc2VudGF0aW9uIG9mIHBhdGNoZXMuXG4gKi9cbmRpZmZfbWF0Y2hfcGF0Y2gucHJvdG90eXBlLnBhdGNoX3RvVGV4dCA9IGZ1bmN0aW9uKHBhdGNoZXMpIHtcbiAgdmFyIHRleHQgPSBbXTtcbiAgZm9yICh2YXIgeCA9IDA7IHggPCBwYXRjaGVzLmxlbmd0aDsgeCsrKSB7XG4gICAgdGV4dFt4XSA9IHBhdGNoZXNbeF07XG4gIH1cbiAgcmV0dXJuIHRleHQuam9pbignJyk7XG59O1xuXG5cbi8qKlxuICogUGFyc2UgYSB0ZXh0dWFsIHJlcHJlc2VudGF0aW9uIG9mIHBhdGNoZXMgYW5kIHJldHVybiBhIGxpc3Qgb2YgcGF0Y2ggb2JqZWN0cy5cbiAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0bGluZSBUZXh0IHJlcHJlc2VudGF0aW9uIG9mIHBhdGNoZXMuXG4gKiBAcmV0dXJuIHshQXJyYXkuPCFkaWZmX21hdGNoX3BhdGNoLnBhdGNoX29iaj59IEFycmF5IG9mIHBhdGNoIG9iamVjdHMuXG4gKiBAdGhyb3dzIHshRXJyb3J9IElmIGludmFsaWQgaW5wdXQuXG4gKi9cbmRpZmZfbWF0Y2hfcGF0Y2gucHJvdG90eXBlLnBhdGNoX2Zyb21UZXh0ID0gZnVuY3Rpb24odGV4dGxpbmUpIHtcbiAgdmFyIHBhdGNoZXMgPSBbXTtcbiAgaWYgKCF0ZXh0bGluZSkge1xuICAgIHJldHVybiBwYXRjaGVzO1xuICB9XG4gIHZhciB0ZXh0ID0gdGV4dGxpbmUuc3BsaXQoJ1xcbicpO1xuICB2YXIgdGV4dFBvaW50ZXIgPSAwO1xuICB2YXIgcGF0Y2hIZWFkZXIgPSAvXkBAIC0oXFxkKyksPyhcXGQqKSBcXCsoXFxkKyksPyhcXGQqKSBAQCQvO1xuICB3aGlsZSAodGV4dFBvaW50ZXIgPCB0ZXh0Lmxlbmd0aCkge1xuICAgIHZhciBtID0gdGV4dFt0ZXh0UG9pbnRlcl0ubWF0Y2gocGF0Y2hIZWFkZXIpO1xuICAgIGlmICghbSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIHBhdGNoIHN0cmluZzogJyArIHRleHRbdGV4dFBvaW50ZXJdKTtcbiAgICB9XG4gICAgdmFyIHBhdGNoID0gbmV3IGRpZmZfbWF0Y2hfcGF0Y2gucGF0Y2hfb2JqKCk7XG4gICAgcGF0Y2hlcy5wdXNoKHBhdGNoKTtcbiAgICBwYXRjaC5zdGFydDEgPSBwYXJzZUludChtWzFdLCAxMCk7XG4gICAgaWYgKG1bMl0gPT09ICcnKSB7XG4gICAgICBwYXRjaC5zdGFydDEtLTtcbiAgICAgIHBhdGNoLmxlbmd0aDEgPSAxO1xuICAgIH0gZWxzZSBpZiAobVsyXSA9PSAnMCcpIHtcbiAgICAgIHBhdGNoLmxlbmd0aDEgPSAwO1xuICAgIH0gZWxzZSB7XG4gICAgICBwYXRjaC5zdGFydDEtLTtcbiAgICAgIHBhdGNoLmxlbmd0aDEgPSBwYXJzZUludChtWzJdLCAxMCk7XG4gICAgfVxuXG4gICAgcGF0Y2guc3RhcnQyID0gcGFyc2VJbnQobVszXSwgMTApO1xuICAgIGlmIChtWzRdID09PSAnJykge1xuICAgICAgcGF0Y2guc3RhcnQyLS07XG4gICAgICBwYXRjaC5sZW5ndGgyID0gMTtcbiAgICB9IGVsc2UgaWYgKG1bNF0gPT0gJzAnKSB7XG4gICAgICBwYXRjaC5sZW5ndGgyID0gMDtcbiAgICB9IGVsc2Uge1xuICAgICAgcGF0Y2guc3RhcnQyLS07XG4gICAgICBwYXRjaC5sZW5ndGgyID0gcGFyc2VJbnQobVs0XSwgMTApO1xuICAgIH1cbiAgICB0ZXh0UG9pbnRlcisrO1xuXG4gICAgd2hpbGUgKHRleHRQb2ludGVyIDwgdGV4dC5sZW5ndGgpIHtcbiAgICAgIHZhciBzaWduID0gdGV4dFt0ZXh0UG9pbnRlcl0uY2hhckF0KDApO1xuICAgICAgdHJ5IHtcbiAgICAgICAgdmFyIGxpbmUgPSBkZWNvZGVVUkkodGV4dFt0ZXh0UG9pbnRlcl0uc3Vic3RyaW5nKDEpKTtcbiAgICAgIH0gY2F0Y2ggKGV4KSB7XG4gICAgICAgIC8vIE1hbGZvcm1lZCBVUkkgc2VxdWVuY2UuXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignSWxsZWdhbCBlc2NhcGUgaW4gcGF0Y2hfZnJvbVRleHQ6ICcgKyBsaW5lKTtcbiAgICAgIH1cbiAgICAgIGlmIChzaWduID09ICctJykge1xuICAgICAgICAvLyBEZWxldGlvbi5cbiAgICAgICAgcGF0Y2guZGlmZnMucHVzaChbRElGRl9ERUxFVEUsIGxpbmVdKTtcbiAgICAgIH0gZWxzZSBpZiAoc2lnbiA9PSAnKycpIHtcbiAgICAgICAgLy8gSW5zZXJ0aW9uLlxuICAgICAgICBwYXRjaC5kaWZmcy5wdXNoKFtESUZGX0lOU0VSVCwgbGluZV0pO1xuICAgICAgfSBlbHNlIGlmIChzaWduID09ICcgJykge1xuICAgICAgICAvLyBNaW5vciBlcXVhbGl0eS5cbiAgICAgICAgcGF0Y2guZGlmZnMucHVzaChbRElGRl9FUVVBTCwgbGluZV0pO1xuICAgICAgfSBlbHNlIGlmIChzaWduID09ICdAJykge1xuICAgICAgICAvLyBTdGFydCBvZiBuZXh0IHBhdGNoLlxuICAgICAgICBicmVhaztcbiAgICAgIH0gZWxzZSBpZiAoc2lnbiA9PT0gJycpIHtcbiAgICAgICAgLy8gQmxhbmsgbGluZT8gIFdoYXRldmVyLlxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gV1RGP1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgcGF0Y2ggbW9kZSBcIicgKyBzaWduICsgJ1wiIGluOiAnICsgbGluZSk7XG4gICAgICB9XG4gICAgICB0ZXh0UG9pbnRlcisrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcGF0Y2hlcztcbn07XG5cblxuLyoqXG4gKiBDbGFzcyByZXByZXNlbnRpbmcgb25lIHBhdGNoIG9wZXJhdGlvbi5cbiAqIEBjb25zdHJ1Y3RvclxuICovXG5kaWZmX21hdGNoX3BhdGNoLnBhdGNoX29iaiA9IGZ1bmN0aW9uKCkge1xuICAvKiogQHR5cGUgeyFBcnJheS48IWRpZmZfbWF0Y2hfcGF0Y2guRGlmZj59ICovXG4gIHRoaXMuZGlmZnMgPSBbXTtcbiAgLyoqIEB0eXBlIHs/bnVtYmVyfSAqL1xuICB0aGlzLnN0YXJ0MSA9IG51bGw7XG4gIC8qKiBAdHlwZSB7P251bWJlcn0gKi9cbiAgdGhpcy5zdGFydDIgPSBudWxsO1xuICAvKiogQHR5cGUge251bWJlcn0gKi9cbiAgdGhpcy5sZW5ndGgxID0gMDtcbiAgLyoqIEB0eXBlIHtudW1iZXJ9ICovXG4gIHRoaXMubGVuZ3RoMiA9IDA7XG59O1xuXG5cbi8qKlxuICogRW1tdWxhdGUgR05VIGRpZmYncyBmb3JtYXQuXG4gKiBIZWFkZXI6IEBAIC0zODIsOCArNDgxLDkgQEBcbiAqIEluZGljaWVzIGFyZSBwcmludGVkIGFzIDEtYmFzZWQsIG5vdCAwLWJhc2VkLlxuICogQHJldHVybiB7c3RyaW5nfSBUaGUgR05VIGRpZmYgc3RyaW5nLlxuICovXG5kaWZmX21hdGNoX3BhdGNoLnBhdGNoX29iai5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGNvb3JkczEsIGNvb3JkczI7XG4gIGlmICh0aGlzLmxlbmd0aDEgPT09IDApIHtcbiAgICBjb29yZHMxID0gdGhpcy5zdGFydDEgKyAnLDAnO1xuICB9IGVsc2UgaWYgKHRoaXMubGVuZ3RoMSA9PSAxKSB7XG4gICAgY29vcmRzMSA9IHRoaXMuc3RhcnQxICsgMTtcbiAgfSBlbHNlIHtcbiAgICBjb29yZHMxID0gKHRoaXMuc3RhcnQxICsgMSkgKyAnLCcgKyB0aGlzLmxlbmd0aDE7XG4gIH1cbiAgaWYgKHRoaXMubGVuZ3RoMiA9PT0gMCkge1xuICAgIGNvb3JkczIgPSB0aGlzLnN0YXJ0MiArICcsMCc7XG4gIH0gZWxzZSBpZiAodGhpcy5sZW5ndGgyID09IDEpIHtcbiAgICBjb29yZHMyID0gdGhpcy5zdGFydDIgKyAxO1xuICB9IGVsc2Uge1xuICAgIGNvb3JkczIgPSAodGhpcy5zdGFydDIgKyAxKSArICcsJyArIHRoaXMubGVuZ3RoMjtcbiAgfVxuICB2YXIgdGV4dCA9IFsnQEAgLScgKyBjb29yZHMxICsgJyArJyArIGNvb3JkczIgKyAnIEBAXFxuJ107XG4gIHZhciBvcDtcbiAgLy8gRXNjYXBlIHRoZSBib2R5IG9mIHRoZSBwYXRjaCB3aXRoICV4eCBub3RhdGlvbi5cbiAgZm9yICh2YXIgeCA9IDA7IHggPCB0aGlzLmRpZmZzLmxlbmd0aDsgeCsrKSB7XG4gICAgc3dpdGNoICh0aGlzLmRpZmZzW3hdWzBdKSB7XG4gICAgICBjYXNlIERJRkZfSU5TRVJUOlxuICAgICAgICBvcCA9ICcrJztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIERJRkZfREVMRVRFOlxuICAgICAgICBvcCA9ICctJztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIERJRkZfRVFVQUw6XG4gICAgICAgIG9wID0gJyAnO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gICAgdGV4dFt4ICsgMV0gPSBvcCArIGVuY29kZVVSSSh0aGlzLmRpZmZzW3hdWzFdKSArICdcXG4nO1xuICB9XG4gIHJldHVybiB0ZXh0LmpvaW4oJycpLnJlcGxhY2UoLyUyMC9nLCAnICcpO1xufTtcblxuXG4vLyBFeHBvcnQgdGhlc2UgZ2xvYmFsIHZhcmlhYmxlcyBzbyB0aGF0IHRoZXkgc3Vydml2ZSBHb29nbGUncyBKUyBjb21waWxlci5cbi8vIEluIGEgYnJvd3NlciwgJ3RoaXMnIHdpbGwgYmUgJ3dpbmRvdycuXG4vLyBJbiBub2RlLmpzICd0aGlzJyB3aWxsIGJlIGEgZ2xvYmFsIG9iamVjdC5cbnRoaXNbJ2RpZmZfbWF0Y2hfcGF0Y2gnXSA9IGRpZmZfbWF0Y2hfcGF0Y2g7XG50aGlzWydESUZGX0RFTEVURSddID0gRElGRl9ERUxFVEU7XG50aGlzWydESUZGX0lOU0VSVCddID0gRElGRl9JTlNFUlQ7XG50aGlzWydESUZGX0VRVUFMJ10gPSBESUZGX0VRVUFMO1xuXG4iLCJcbnZhciBQaXBlID0gcmVxdWlyZSgnLi4vcGlwZScpLlBpcGU7XG5cbnZhciBDb250ZXh0ID0gZnVuY3Rpb24gQ29udGV4dCgpe1xufTtcblxuQ29udGV4dC5wcm90b3R5cGUuc2V0UmVzdWx0ID0gZnVuY3Rpb24ocmVzdWx0KSB7XG5cdHRoaXMucmVzdWx0ID0gcmVzdWx0O1xuXHR0aGlzLmhhc1Jlc3VsdCA9IHRydWU7XG5cdHJldHVybiB0aGlzO1xufTtcblxuQ29udGV4dC5wcm90b3R5cGUuZXhpdCA9IGZ1bmN0aW9uKCkge1xuXHR0aGlzLmV4aXRpbmcgPSB0cnVlO1xuXHRyZXR1cm4gdGhpcztcbn07XG5cbkNvbnRleHQucHJvdG90eXBlLnN3aXRjaFRvID0gZnVuY3Rpb24obmV4dCwgcGlwZSkge1xuXHRpZiAodHlwZW9mIG5leHQgPT09ICdzdHJpbmcnIHx8IG5leHQgaW5zdGFuY2VvZiBQaXBlKSB7XG5cdFx0dGhpcy5uZXh0UGlwZSA9IG5leHQ7XG5cdH0gZWxzZSB7XG5cdFx0dGhpcy5uZXh0ID0gbmV4dDtcblx0XHRpZiAocGlwZSkge1xuXHRcdFx0dGhpcy5uZXh0UGlwZSA9IHBpcGU7XG5cdFx0fVxuXHR9XG5cdHJldHVybiB0aGlzO1xufTtcblxuQ29udGV4dC5wcm90b3R5cGUucHVzaCA9IGZ1bmN0aW9uKGNoaWxkLCBuYW1lKSB7XG5cdGNoaWxkLnBhcmVudCA9IHRoaXM7XG5cdGlmICh0eXBlb2YgbmFtZSAhPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRjaGlsZC5jaGlsZE5hbWUgPSBuYW1lO1xuXHR9XG5cdGNoaWxkLnJvb3QgPSB0aGlzLnJvb3QgfHwgdGhpcztcblx0Y2hpbGQub3B0aW9ucyA9IGNoaWxkLm9wdGlvbnMgfHwgdGhpcy5vcHRpb25zO1xuXHRpZiAoIXRoaXMuY2hpbGRyZW4pIHtcblx0XHR0aGlzLmNoaWxkcmVuID0gW2NoaWxkXTtcblx0XHR0aGlzLm5leHRBZnRlckNoaWxkcmVuID0gdGhpcy5uZXh0IHx8IG51bGw7XG5cdFx0dGhpcy5uZXh0ID0gY2hpbGQ7XG5cdH0gZWxzZSB7XG5cdFx0dGhpcy5jaGlsZHJlblt0aGlzLmNoaWxkcmVuLmxlbmd0aCAtIDFdLm5leHQgPSBjaGlsZDtcblx0XHR0aGlzLmNoaWxkcmVuLnB1c2goY2hpbGQpO1xuXHR9XG5cdGNoaWxkLm5leHQgPSB0aGlzO1xuXHRyZXR1cm4gdGhpcztcbn07XG5cbmV4cG9ydHMuQ29udGV4dCA9IENvbnRleHQ7XG4iLCJ2YXIgQ29udGV4dCA9IHJlcXVpcmUoJy4vY29udGV4dCcpLkNvbnRleHQ7XG5cbnZhciBEaWZmQ29udGV4dCA9IGZ1bmN0aW9uIERpZmZDb250ZXh0KGxlZnQsIHJpZ2h0KSB7XG4gIHRoaXMubGVmdCA9IGxlZnQ7XG4gIHRoaXMucmlnaHQgPSByaWdodDtcbiAgdGhpcy5waXBlID0gJ2RpZmYnO1xufTtcblxuRGlmZkNvbnRleHQucHJvdG90eXBlID0gbmV3IENvbnRleHQoKTtcblxuZXhwb3J0cy5EaWZmQ29udGV4dCA9IERpZmZDb250ZXh0O1xuIiwidmFyIENvbnRleHQgPSByZXF1aXJlKCcuL2NvbnRleHQnKS5Db250ZXh0O1xuXG52YXIgUGF0Y2hDb250ZXh0ID0gZnVuY3Rpb24gUGF0Y2hDb250ZXh0KGxlZnQsIGRlbHRhKSB7XG4gIHRoaXMubGVmdCA9IGxlZnQ7XG4gIHRoaXMuZGVsdGEgPSBkZWx0YTtcbiAgdGhpcy5waXBlID0gJ3BhdGNoJztcbn07XG5cblBhdGNoQ29udGV4dC5wcm90b3R5cGUgPSBuZXcgQ29udGV4dCgpO1xuXG5leHBvcnRzLlBhdGNoQ29udGV4dCA9IFBhdGNoQ29udGV4dDtcbiIsInZhciBDb250ZXh0ID0gcmVxdWlyZSgnLi9jb250ZXh0JykuQ29udGV4dDtcblxudmFyIFJldmVyc2VDb250ZXh0ID0gZnVuY3Rpb24gUmV2ZXJzZUNvbnRleHQoZGVsdGEpIHtcbiAgdGhpcy5kZWx0YSA9IGRlbHRhO1xuICB0aGlzLnBpcGUgPSAncmV2ZXJzZSc7XG59O1xuXG5SZXZlcnNlQ29udGV4dC5wcm90b3R5cGUgPSBuZXcgQ29udGV4dCgpO1xuXG5leHBvcnRzLlJldmVyc2VDb250ZXh0ID0gUmV2ZXJzZUNvbnRleHQ7XG4iLCIvLyB1c2UgYXMgMm5kIHBhcmFtZXRlciBmb3IgSlNPTi5wYXJzZSB0byByZXZpdmUgRGF0ZSBpbnN0YW5jZXNcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZGF0ZVJldml2ZXIoa2V5LCB2YWx1ZSkge1xuICB2YXIgcGFydHM7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgcGFydHMgPSAvXihcXGR7NH0pLShcXGR7Mn0pLShcXGR7Mn0pVChcXGR7Mn0pOihcXGR7Mn0pOihcXGR7Mn0pKD86XFwuKFxcZCopKT8oWnwoWytcXC1dKShcXGR7Mn0pOihcXGR7Mn0pKSQvLmV4ZWModmFsdWUpO1xuICAgIGlmIChwYXJ0cykge1xuICAgICAgcmV0dXJuIG5ldyBEYXRlKERhdGUuVVRDKCtwYXJ0c1sxXSwgK3BhcnRzWzJdIC0gMSwgK3BhcnRzWzNdLCArcGFydHNbNF0sICtwYXJ0c1s1XSwgK3BhcnRzWzZdLCArKHBhcnRzWzddIHx8IDApKSk7XG4gICAgfVxuICB9XG4gIHJldHVybiB2YWx1ZTtcbn07XG4iLCJ2YXIgUHJvY2Vzc29yID0gcmVxdWlyZSgnLi9wcm9jZXNzb3InKS5Qcm9jZXNzb3I7XG52YXIgUGlwZSA9IHJlcXVpcmUoJy4vcGlwZScpLlBpcGU7XG52YXIgRGlmZkNvbnRleHQgPSByZXF1aXJlKCcuL2NvbnRleHRzL2RpZmYnKS5EaWZmQ29udGV4dDtcbnZhciBQYXRjaENvbnRleHQgPSByZXF1aXJlKCcuL2NvbnRleHRzL3BhdGNoJykuUGF0Y2hDb250ZXh0O1xudmFyIFJldmVyc2VDb250ZXh0ID0gcmVxdWlyZSgnLi9jb250ZXh0cy9yZXZlcnNlJykuUmV2ZXJzZUNvbnRleHQ7XG5cbnZhciB0cml2aWFsID0gcmVxdWlyZSgnLi9maWx0ZXJzL3RyaXZpYWwnKTtcbnZhciBuZXN0ZWQgPSByZXF1aXJlKCcuL2ZpbHRlcnMvbmVzdGVkJyk7XG52YXIgYXJyYXlzID0gcmVxdWlyZSgnLi9maWx0ZXJzL2FycmF5cycpO1xudmFyIGRhdGVzID0gcmVxdWlyZSgnLi9maWx0ZXJzL2RhdGVzJyk7XG52YXIgdGV4dHMgPSByZXF1aXJlKCcuL2ZpbHRlcnMvdGV4dHMnKTtcblxudmFyIERpZmZQYXRjaGVyID0gZnVuY3Rpb24gRGlmZlBhdGNoZXIob3B0aW9ucykge1xuICB0aGlzLnByb2Nlc3NvciA9IG5ldyBQcm9jZXNzb3Iob3B0aW9ucyk7XG4gIHRoaXMucHJvY2Vzc29yLnBpcGUobmV3IFBpcGUoJ2RpZmYnKS5hcHBlbmQoXG4gICAgbmVzdGVkLmNvbGxlY3RDaGlsZHJlbkRpZmZGaWx0ZXIsXG4gICAgdHJpdmlhbC5kaWZmRmlsdGVyLFxuICAgIGRhdGVzLmRpZmZGaWx0ZXIsXG4gICAgdGV4dHMuZGlmZkZpbHRlcixcbiAgICBuZXN0ZWQub2JqZWN0c0RpZmZGaWx0ZXIsXG4gICAgYXJyYXlzLmRpZmZGaWx0ZXJcbiAgKS5zaG91bGRIYXZlUmVzdWx0KCkpO1xuICB0aGlzLnByb2Nlc3Nvci5waXBlKG5ldyBQaXBlKCdwYXRjaCcpLmFwcGVuZChcbiAgICBuZXN0ZWQuY29sbGVjdENoaWxkcmVuUGF0Y2hGaWx0ZXIsXG4gICAgYXJyYXlzLmNvbGxlY3RDaGlsZHJlblBhdGNoRmlsdGVyLFxuICAgIHRyaXZpYWwucGF0Y2hGaWx0ZXIsXG4gICAgdGV4dHMucGF0Y2hGaWx0ZXIsXG4gICAgbmVzdGVkLnBhdGNoRmlsdGVyLFxuICAgIGFycmF5cy5wYXRjaEZpbHRlclxuICApLnNob3VsZEhhdmVSZXN1bHQoKSk7XG4gIHRoaXMucHJvY2Vzc29yLnBpcGUobmV3IFBpcGUoJ3JldmVyc2UnKS5hcHBlbmQoXG4gICAgbmVzdGVkLmNvbGxlY3RDaGlsZHJlblJldmVyc2VGaWx0ZXIsXG4gICAgYXJyYXlzLmNvbGxlY3RDaGlsZHJlblJldmVyc2VGaWx0ZXIsXG4gICAgdHJpdmlhbC5yZXZlcnNlRmlsdGVyLFxuICAgIHRleHRzLnJldmVyc2VGaWx0ZXIsXG4gICAgbmVzdGVkLnJldmVyc2VGaWx0ZXIsXG4gICAgYXJyYXlzLnJldmVyc2VGaWx0ZXJcbiAgKS5zaG91bGRIYXZlUmVzdWx0KCkpO1xufTtcblxuRGlmZlBhdGNoZXIucHJvdG90eXBlLm9wdGlvbnMgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMucHJvY2Vzc29yLm9wdGlvbnMuYXBwbHkodGhpcy5wcm9jZXNzb3IsIGFyZ3VtZW50cyk7XG59O1xuXG5EaWZmUGF0Y2hlci5wcm90b3R5cGUuZGlmZiA9IGZ1bmN0aW9uKGxlZnQsIHJpZ2h0KSB7XG4gIHJldHVybiB0aGlzLnByb2Nlc3Nvci5wcm9jZXNzKG5ldyBEaWZmQ29udGV4dChsZWZ0LCByaWdodCkpO1xufTtcblxuRGlmZlBhdGNoZXIucHJvdG90eXBlLnBhdGNoID0gZnVuY3Rpb24obGVmdCwgZGVsdGEpIHtcbiAgcmV0dXJuIHRoaXMucHJvY2Vzc29yLnByb2Nlc3MobmV3IFBhdGNoQ29udGV4dChsZWZ0LCBkZWx0YSkpO1xufTtcblxuRGlmZlBhdGNoZXIucHJvdG90eXBlLnJldmVyc2UgPSBmdW5jdGlvbihkZWx0YSkge1xuICByZXR1cm4gdGhpcy5wcm9jZXNzb3IucHJvY2VzcyhuZXcgUmV2ZXJzZUNvbnRleHQoZGVsdGEpKTtcbn07XG5cbkRpZmZQYXRjaGVyLnByb3RvdHlwZS51bnBhdGNoID0gZnVuY3Rpb24ocmlnaHQsIGRlbHRhKSB7XG4gIHJldHVybiB0aGlzLnBhdGNoKHJpZ2h0LCB0aGlzLnJldmVyc2UoZGVsdGEpKTtcbn07XG5cbmV4cG9ydHMuRGlmZlBhdGNoZXIgPSBEaWZmUGF0Y2hlcjtcbiIsIlxuZXhwb3J0cy5pc0Jyb3dzZXIgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJztcbiIsInZhciBEaWZmQ29udGV4dCA9IHJlcXVpcmUoJy4uL2NvbnRleHRzL2RpZmYnKS5EaWZmQ29udGV4dDtcbnZhciBQYXRjaENvbnRleHQgPSByZXF1aXJlKCcuLi9jb250ZXh0cy9wYXRjaCcpLlBhdGNoQ29udGV4dDtcbnZhciBSZXZlcnNlQ29udGV4dCA9IHJlcXVpcmUoJy4uL2NvbnRleHRzL3JldmVyc2UnKS5SZXZlcnNlQ29udGV4dDtcblxudmFyIGxjcyA9IHJlcXVpcmUoJy4vbGNzJyk7XG5cbnZhciBBUlJBWV9NT1ZFID0gMztcblxudmFyIGlzQXJyYXkgPSAodHlwZW9mIEFycmF5LmlzQXJyYXkgPT09ICdmdW5jdGlvbicpID9cbiAgLy8gdXNlIG5hdGl2ZSBmdW5jdGlvblxuICBBcnJheS5pc0FycmF5IDpcbiAgLy8gdXNlIGluc3RhbmNlb2Ygb3BlcmF0b3JcbiAgZnVuY3Rpb24oYSkge1xuICAgIHJldHVybiBhIGluc3RhbmNlb2YgQXJyYXk7XG4gIH07XG5cbnZhciBhcnJheUluZGV4T2YgPSB0eXBlb2YgQXJyYXkucHJvdG90eXBlLmluZGV4T2YgPT09ICdmdW5jdGlvbicgP1xuICBmdW5jdGlvbihhcnJheSwgaXRlbSkge1xuICAgIHJldHVybiBhcnJheS5pbmRleE9mKGl0ZW0pO1xuICB9IDogZnVuY3Rpb24oYXJyYXksIGl0ZW0pIHtcbiAgICB2YXIgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChhcnJheVtpXSA9PT0gaXRlbSkge1xuICAgICAgICByZXR1cm4gaTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIC0xO1xuICB9O1xuXG5mdW5jdGlvbiBhcnJheXNIYXZlTWF0Y2hCeVJlZihhcnJheTEsIGFycmF5MiwgbGVuMSwgbGVuMikge1xuICBmb3IgKHZhciBpbmRleDEgPSAwOyBpbmRleDEgPCBsZW4xOyBpbmRleDErKykge1xuICAgIHZhciB2YWwxID0gYXJyYXkxW2luZGV4MV07XG4gICAgZm9yICh2YXIgaW5kZXgyID0gMDsgaW5kZXgyIDwgbGVuMjsgaW5kZXgyKyspIHtcbiAgICAgIHZhciB2YWwyID0gYXJyYXkyW2luZGV4Ml07XG4gICAgICBpZiAodmFsMSA9PT0gdmFsMikge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gbWF0Y2hJdGVtcyhhcnJheTEsIGFycmF5MiwgaW5kZXgxLCBpbmRleDIsIGNvbnRleHQpIHtcbiAgdmFyIHZhbHVlMSA9IGFycmF5MVtpbmRleDFdO1xuICB2YXIgdmFsdWUyID0gYXJyYXkyW2luZGV4Ml07XG4gIGlmICh2YWx1ZTEgPT09IHZhbHVlMikge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIGlmICh0eXBlb2YgdmFsdWUxICE9PSAnb2JqZWN0JyB8fCB0eXBlb2YgdmFsdWUyICE9PSAnb2JqZWN0Jykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICB2YXIgb2JqZWN0SGFzaCA9IGNvbnRleHQub2JqZWN0SGFzaDtcbiAgaWYgKCFvYmplY3RIYXNoKSB7XG4gICAgLy8gbm8gd2F5IHRvIG1hdGNoIG9iamVjdHMgd2FzIHByb3ZpZGVkLCB0cnkgbWF0Y2ggYnkgcG9zaXRpb25cbiAgICByZXR1cm4gY29udGV4dC5tYXRjaEJ5UG9zaXRpb24gJiYgaW5kZXgxID09PSBpbmRleDI7XG4gIH1cbiAgdmFyIGhhc2gxO1xuICB2YXIgaGFzaDI7XG4gIGlmICh0eXBlb2YgaW5kZXgxID09PSAnbnVtYmVyJykge1xuICAgIGNvbnRleHQuaGFzaENhY2hlMSA9IGNvbnRleHQuaGFzaENhY2hlMSB8fCBbXTtcbiAgICBoYXNoMSA9IGNvbnRleHQuaGFzaENhY2hlMVtpbmRleDFdO1xuICAgIGlmICh0eXBlb2YgaGFzaDEgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjb250ZXh0Lmhhc2hDYWNoZTFbaW5kZXgxXSA9IGhhc2gxID0gb2JqZWN0SGFzaCh2YWx1ZTEsIGluZGV4MSk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGhhc2gxID0gb2JqZWN0SGFzaCh2YWx1ZTEpO1xuICB9XG4gIGlmICh0eXBlb2YgaGFzaDEgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlmICh0eXBlb2YgaW5kZXgyID09PSAnbnVtYmVyJykge1xuICAgIGNvbnRleHQuaGFzaENhY2hlMiA9IGNvbnRleHQuaGFzaENhY2hlMiB8fCBbXTtcbiAgICBoYXNoMiA9IGNvbnRleHQuaGFzaENhY2hlMltpbmRleDJdO1xuICAgIGlmICh0eXBlb2YgaGFzaDIgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjb250ZXh0Lmhhc2hDYWNoZTJbaW5kZXgyXSA9IGhhc2gyID0gb2JqZWN0SGFzaCh2YWx1ZTIsIGluZGV4Mik7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGhhc2gyID0gb2JqZWN0SGFzaCh2YWx1ZTIpO1xuICB9XG4gIGlmICh0eXBlb2YgaGFzaDIgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHJldHVybiBoYXNoMSA9PT0gaGFzaDI7XG59XG5cbnZhciBkaWZmRmlsdGVyID0gZnVuY3Rpb24gYXJyYXlzRGlmZkZpbHRlcihjb250ZXh0KSB7XG4gIGlmICghY29udGV4dC5sZWZ0SXNBcnJheSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHZhciBtYXRjaENvbnRleHQgPSB7XG4gICAgb2JqZWN0SGFzaDogY29udGV4dC5vcHRpb25zICYmIGNvbnRleHQub3B0aW9ucy5vYmplY3RIYXNoLFxuICAgIG1hdGNoQnlQb3NpdGlvbjogY29udGV4dC5vcHRpb25zICYmIGNvbnRleHQub3B0aW9ucy5tYXRjaEJ5UG9zaXRpb25cbiAgfTtcbiAgdmFyIGNvbW1vbkhlYWQgPSAwO1xuICB2YXIgY29tbW9uVGFpbCA9IDA7XG4gIHZhciBpbmRleDtcbiAgdmFyIGluZGV4MTtcbiAgdmFyIGluZGV4MjtcbiAgdmFyIGFycmF5MSA9IGNvbnRleHQubGVmdDtcbiAgdmFyIGFycmF5MiA9IGNvbnRleHQucmlnaHQ7XG4gIHZhciBsZW4xID0gYXJyYXkxLmxlbmd0aDtcbiAgdmFyIGxlbjIgPSBhcnJheTIubGVuZ3RoO1xuXG4gIHZhciBjaGlsZDtcblxuICBpZiAobGVuMSA+IDAgJiYgbGVuMiA+IDAgJiYgIW1hdGNoQ29udGV4dC5vYmplY3RIYXNoICYmXG4gICAgdHlwZW9mIG1hdGNoQ29udGV4dC5tYXRjaEJ5UG9zaXRpb24gIT09ICdib29sZWFuJykge1xuICAgIG1hdGNoQ29udGV4dC5tYXRjaEJ5UG9zaXRpb24gPSAhYXJyYXlzSGF2ZU1hdGNoQnlSZWYoYXJyYXkxLCBhcnJheTIsIGxlbjEsIGxlbjIpO1xuICB9XG5cbiAgLy8gc2VwYXJhdGUgY29tbW9uIGhlYWRcbiAgd2hpbGUgKGNvbW1vbkhlYWQgPCBsZW4xICYmIGNvbW1vbkhlYWQgPCBsZW4yICYmXG4gICAgbWF0Y2hJdGVtcyhhcnJheTEsIGFycmF5MiwgY29tbW9uSGVhZCwgY29tbW9uSGVhZCwgbWF0Y2hDb250ZXh0KSkge1xuICAgIGluZGV4ID0gY29tbW9uSGVhZDtcbiAgICBjaGlsZCA9IG5ldyBEaWZmQ29udGV4dChjb250ZXh0LmxlZnRbaW5kZXhdLCBjb250ZXh0LnJpZ2h0W2luZGV4XSk7XG4gICAgY29udGV4dC5wdXNoKGNoaWxkLCBpbmRleCk7XG4gICAgY29tbW9uSGVhZCsrO1xuICB9XG4gIC8vIHNlcGFyYXRlIGNvbW1vbiB0YWlsXG4gIHdoaWxlIChjb21tb25UYWlsICsgY29tbW9uSGVhZCA8IGxlbjEgJiYgY29tbW9uVGFpbCArIGNvbW1vbkhlYWQgPCBsZW4yICYmXG4gICAgbWF0Y2hJdGVtcyhhcnJheTEsIGFycmF5MiwgbGVuMSAtIDEgLSBjb21tb25UYWlsLCBsZW4yIC0gMSAtIGNvbW1vblRhaWwsIG1hdGNoQ29udGV4dCkpIHtcbiAgICBpbmRleDEgPSBsZW4xIC0gMSAtIGNvbW1vblRhaWw7XG4gICAgaW5kZXgyID0gbGVuMiAtIDEgLSBjb21tb25UYWlsO1xuICAgIGNoaWxkID0gbmV3IERpZmZDb250ZXh0KGNvbnRleHQubGVmdFtpbmRleDFdLCBjb250ZXh0LnJpZ2h0W2luZGV4Ml0pO1xuICAgIGNvbnRleHQucHVzaChjaGlsZCwgaW5kZXgyKTtcbiAgICBjb21tb25UYWlsKys7XG4gIH1cbiAgdmFyIHJlc3VsdDtcbiAgaWYgKGNvbW1vbkhlYWQgKyBjb21tb25UYWlsID09PSBsZW4xKSB7XG4gICAgaWYgKGxlbjEgPT09IGxlbjIpIHtcbiAgICAgIC8vIGFycmF5cyBhcmUgaWRlbnRpY2FsXG4gICAgICBjb250ZXh0LnNldFJlc3VsdCh1bmRlZmluZWQpLmV4aXQoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gdHJpdmlhbCBjYXNlLCBhIGJsb2NrICgxIG9yIG1vcmUgY29uc2VjdXRpdmUgaXRlbXMpIHdhcyBhZGRlZFxuICAgIHJlc3VsdCA9IHJlc3VsdCB8fCB7XG4gICAgICBfdDogJ2EnXG4gICAgfTtcbiAgICBmb3IgKGluZGV4ID0gY29tbW9uSGVhZDsgaW5kZXggPCBsZW4yIC0gY29tbW9uVGFpbDsgaW5kZXgrKykge1xuICAgICAgcmVzdWx0W2luZGV4XSA9IFthcnJheTJbaW5kZXhdXTtcbiAgICB9XG4gICAgY29udGV4dC5zZXRSZXN1bHQocmVzdWx0KS5leGl0KCk7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChjb21tb25IZWFkICsgY29tbW9uVGFpbCA9PT0gbGVuMikge1xuICAgIC8vIHRyaXZpYWwgY2FzZSwgYSBibG9jayAoMSBvciBtb3JlIGNvbnNlY3V0aXZlIGl0ZW1zKSB3YXMgcmVtb3ZlZFxuICAgIHJlc3VsdCA9IHJlc3VsdCB8fCB7XG4gICAgICBfdDogJ2EnXG4gICAgfTtcbiAgICBmb3IgKGluZGV4ID0gY29tbW9uSGVhZDsgaW5kZXggPCBsZW4xIC0gY29tbW9uVGFpbDsgaW5kZXgrKykge1xuICAgICAgcmVzdWx0WydfJyArIGluZGV4XSA9IFthcnJheTFbaW5kZXhdLCAwLCAwXTtcbiAgICB9XG4gICAgY29udGV4dC5zZXRSZXN1bHQocmVzdWx0KS5leGl0KCk7XG4gICAgcmV0dXJuO1xuICB9XG4gIC8vIHJlc2V0IGhhc2ggY2FjaGVcbiAgZGVsZXRlIG1hdGNoQ29udGV4dC5oYXNoQ2FjaGUxO1xuICBkZWxldGUgbWF0Y2hDb250ZXh0Lmhhc2hDYWNoZTI7XG5cbiAgLy8gZGlmZiBpcyBub3QgdHJpdmlhbCwgZmluZCB0aGUgTENTIChMb25nZXN0IENvbW1vbiBTdWJzZXF1ZW5jZSlcbiAgdmFyIHRyaW1tZWQxID0gYXJyYXkxLnNsaWNlKGNvbW1vbkhlYWQsIGxlbjEgLSBjb21tb25UYWlsKTtcbiAgdmFyIHRyaW1tZWQyID0gYXJyYXkyLnNsaWNlKGNvbW1vbkhlYWQsIGxlbjIgLSBjb21tb25UYWlsKTtcbiAgdmFyIHNlcSA9IGxjcy5nZXQoXG4gICAgdHJpbW1lZDEsIHRyaW1tZWQyLFxuICAgIG1hdGNoSXRlbXMsXG4gICAgbWF0Y2hDb250ZXh0XG4gICk7XG4gIHZhciByZW1vdmVkSXRlbXMgPSBbXTtcbiAgcmVzdWx0ID0gcmVzdWx0IHx8IHtcbiAgICBfdDogJ2EnXG4gIH07XG4gIGZvciAoaW5kZXggPSBjb21tb25IZWFkOyBpbmRleCA8IGxlbjEgLSBjb21tb25UYWlsOyBpbmRleCsrKSB7XG4gICAgaWYgKGFycmF5SW5kZXhPZihzZXEuaW5kaWNlczEsIGluZGV4IC0gY29tbW9uSGVhZCkgPCAwKSB7XG4gICAgICAvLyByZW1vdmVkXG4gICAgICByZXN1bHRbJ18nICsgaW5kZXhdID0gW2FycmF5MVtpbmRleF0sIDAsIDBdO1xuICAgICAgcmVtb3ZlZEl0ZW1zLnB1c2goaW5kZXgpO1xuICAgIH1cbiAgfVxuXG4gIHZhciBkZXRlY3RNb3ZlID0gdHJ1ZTtcbiAgaWYgKGNvbnRleHQub3B0aW9ucyAmJiBjb250ZXh0Lm9wdGlvbnMuYXJyYXlzICYmIGNvbnRleHQub3B0aW9ucy5hcnJheXMuZGV0ZWN0TW92ZSA9PT0gZmFsc2UpIHtcbiAgICBkZXRlY3RNb3ZlID0gZmFsc2U7XG4gIH1cbiAgdmFyIGluY2x1ZGVWYWx1ZU9uTW92ZSA9IGZhbHNlO1xuICBpZiAoY29udGV4dC5vcHRpb25zICYmIGNvbnRleHQub3B0aW9ucy5hcnJheXMgJiYgY29udGV4dC5vcHRpb25zLmFycmF5cy5pbmNsdWRlVmFsdWVPbk1vdmUpIHtcbiAgICBpbmNsdWRlVmFsdWVPbk1vdmUgPSB0cnVlO1xuICB9XG5cbiAgdmFyIHJlbW92ZWRJdGVtc0xlbmd0aCA9IHJlbW92ZWRJdGVtcy5sZW5ndGg7XG4gIGZvciAoaW5kZXggPSBjb21tb25IZWFkOyBpbmRleCA8IGxlbjIgLSBjb21tb25UYWlsOyBpbmRleCsrKSB7XG4gICAgdmFyIGluZGV4T25BcnJheTIgPSBhcnJheUluZGV4T2Yoc2VxLmluZGljZXMyLCBpbmRleCAtIGNvbW1vbkhlYWQpO1xuICAgIGlmIChpbmRleE9uQXJyYXkyIDwgMCkge1xuICAgICAgLy8gYWRkZWQsIHRyeSB0byBtYXRjaCB3aXRoIGEgcmVtb3ZlZCBpdGVtIGFuZCByZWdpc3RlciBhcyBwb3NpdGlvbiBtb3ZlXG4gICAgICB2YXIgaXNNb3ZlID0gZmFsc2U7XG4gICAgICBpZiAoZGV0ZWN0TW92ZSAmJiByZW1vdmVkSXRlbXNMZW5ndGggPiAwKSB7XG4gICAgICAgIGZvciAodmFyIHJlbW92ZUl0ZW1JbmRleDEgPSAwOyByZW1vdmVJdGVtSW5kZXgxIDwgcmVtb3ZlZEl0ZW1zTGVuZ3RoOyByZW1vdmVJdGVtSW5kZXgxKyspIHtcbiAgICAgICAgICBpbmRleDEgPSByZW1vdmVkSXRlbXNbcmVtb3ZlSXRlbUluZGV4MV07XG4gICAgICAgICAgaWYgKG1hdGNoSXRlbXModHJpbW1lZDEsIHRyaW1tZWQyLCBpbmRleDEgLSBjb21tb25IZWFkLFxuICAgICAgICAgICAgaW5kZXggLSBjb21tb25IZWFkLCBtYXRjaENvbnRleHQpKSB7XG4gICAgICAgICAgICAvLyBzdG9yZSBwb3NpdGlvbiBtb3ZlIGFzOiBbb3JpZ2luYWxWYWx1ZSwgbmV3UG9zaXRpb24sIEFSUkFZX01PVkVdXG4gICAgICAgICAgICByZXN1bHRbJ18nICsgaW5kZXgxXS5zcGxpY2UoMSwgMiwgaW5kZXgsIEFSUkFZX01PVkUpO1xuICAgICAgICAgICAgaWYgKCFpbmNsdWRlVmFsdWVPbk1vdmUpIHtcbiAgICAgICAgICAgICAgLy8gZG9uJ3QgaW5jbHVkZSBtb3ZlZCB2YWx1ZSBvbiBkaWZmLCB0byBzYXZlIGJ5dGVzXG4gICAgICAgICAgICAgIHJlc3VsdFsnXycgKyBpbmRleDFdWzBdID0gJyc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGluZGV4MiA9IGluZGV4O1xuICAgICAgICAgICAgY2hpbGQgPSBuZXcgRGlmZkNvbnRleHQoY29udGV4dC5sZWZ0W2luZGV4MV0sIGNvbnRleHQucmlnaHRbaW5kZXgyXSk7XG4gICAgICAgICAgICBjb250ZXh0LnB1c2goY2hpbGQsIGluZGV4Mik7XG4gICAgICAgICAgICByZW1vdmVkSXRlbXMuc3BsaWNlKHJlbW92ZUl0ZW1JbmRleDEsIDEpO1xuICAgICAgICAgICAgaXNNb3ZlID0gdHJ1ZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKCFpc01vdmUpIHtcbiAgICAgICAgLy8gYWRkZWRcbiAgICAgICAgcmVzdWx0W2luZGV4XSA9IFthcnJheTJbaW5kZXhdXTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gbWF0Y2gsIGRvIGlubmVyIGRpZmZcbiAgICAgIGluZGV4MSA9IHNlcS5pbmRpY2VzMVtpbmRleE9uQXJyYXkyXSArIGNvbW1vbkhlYWQ7XG4gICAgICBpbmRleDIgPSBzZXEuaW5kaWNlczJbaW5kZXhPbkFycmF5Ml0gKyBjb21tb25IZWFkO1xuICAgICAgY2hpbGQgPSBuZXcgRGlmZkNvbnRleHQoY29udGV4dC5sZWZ0W2luZGV4MV0sIGNvbnRleHQucmlnaHRbaW5kZXgyXSk7XG4gICAgICBjb250ZXh0LnB1c2goY2hpbGQsIGluZGV4Mik7XG4gICAgfVxuICB9XG5cbiAgY29udGV4dC5zZXRSZXN1bHQocmVzdWx0KS5leGl0KCk7XG5cbn07XG5kaWZmRmlsdGVyLmZpbHRlck5hbWUgPSAnYXJyYXlzJztcblxudmFyIGNvbXBhcmUgPSB7XG4gIG51bWVyaWNhbGx5OiBmdW5jdGlvbihhLCBiKSB7XG4gICAgcmV0dXJuIGEgLSBiO1xuICB9LFxuICBudW1lcmljYWxseUJ5OiBmdW5jdGlvbihuYW1lKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKGEsIGIpIHtcbiAgICAgIHJldHVybiBhW25hbWVdIC0gYltuYW1lXTtcbiAgICB9O1xuICB9XG59O1xuXG52YXIgcGF0Y2hGaWx0ZXIgPSBmdW5jdGlvbiBuZXN0ZWRQYXRjaEZpbHRlcihjb250ZXh0KSB7XG4gIGlmICghY29udGV4dC5uZXN0ZWQpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKGNvbnRleHQuZGVsdGEuX3QgIT09ICdhJykge1xuICAgIHJldHVybjtcbiAgfVxuICB2YXIgaW5kZXgsIGluZGV4MTtcblxuICB2YXIgZGVsdGEgPSBjb250ZXh0LmRlbHRhO1xuICB2YXIgYXJyYXkgPSBjb250ZXh0LmxlZnQ7XG5cbiAgLy8gZmlyc3QsIHNlcGFyYXRlIHJlbW92YWxzLCBpbnNlcnRpb25zIGFuZCBtb2RpZmljYXRpb25zXG4gIHZhciB0b1JlbW92ZSA9IFtdO1xuICB2YXIgdG9JbnNlcnQgPSBbXTtcbiAgdmFyIHRvTW9kaWZ5ID0gW107XG4gIGZvciAoaW5kZXggaW4gZGVsdGEpIHtcbiAgICBpZiAoaW5kZXggIT09ICdfdCcpIHtcbiAgICAgIGlmIChpbmRleFswXSA9PT0gJ18nKSB7XG4gICAgICAgIC8vIHJlbW92ZWQgaXRlbSBmcm9tIG9yaWdpbmFsIGFycmF5XG4gICAgICAgIGlmIChkZWx0YVtpbmRleF1bMl0gPT09IDAgfHwgZGVsdGFbaW5kZXhdWzJdID09PSBBUlJBWV9NT1ZFKSB7XG4gICAgICAgICAgdG9SZW1vdmUucHVzaChwYXJzZUludChpbmRleC5zbGljZSgxKSwgMTApKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ29ubHkgcmVtb3ZhbCBvciBtb3ZlIGNhbiBiZSBhcHBsaWVkIGF0IG9yaWdpbmFsIGFycmF5IGluZGljZXMnICtcbiAgICAgICAgICAgICcsIGludmFsaWQgZGlmZiB0eXBlOiAnICsgZGVsdGFbaW5kZXhdWzJdKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGRlbHRhW2luZGV4XS5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAvLyBhZGRlZCBpdGVtIGF0IG5ldyBhcnJheVxuICAgICAgICAgIHRvSW5zZXJ0LnB1c2goe1xuICAgICAgICAgICAgaW5kZXg6IHBhcnNlSW50KGluZGV4LCAxMCksXG4gICAgICAgICAgICB2YWx1ZTogZGVsdGFbaW5kZXhdWzBdXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gbW9kaWZpZWQgaXRlbSBhdCBuZXcgYXJyYXlcbiAgICAgICAgICB0b01vZGlmeS5wdXNoKHtcbiAgICAgICAgICAgIGluZGV4OiBwYXJzZUludChpbmRleCwgMTApLFxuICAgICAgICAgICAgZGVsdGE6IGRlbHRhW2luZGV4XVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gcmVtb3ZlIGl0ZW1zLCBpbiByZXZlcnNlIG9yZGVyIHRvIGF2b2lkIHNhd2luZyBvdXIgb3duIGZsb29yXG4gIHRvUmVtb3ZlID0gdG9SZW1vdmUuc29ydChjb21wYXJlLm51bWVyaWNhbGx5KTtcbiAgZm9yIChpbmRleCA9IHRvUmVtb3ZlLmxlbmd0aCAtIDE7IGluZGV4ID49IDA7IGluZGV4LS0pIHtcbiAgICBpbmRleDEgPSB0b1JlbW92ZVtpbmRleF07XG4gICAgdmFyIGluZGV4RGlmZiA9IGRlbHRhWydfJyArIGluZGV4MV07XG4gICAgdmFyIHJlbW92ZWRWYWx1ZSA9IGFycmF5LnNwbGljZShpbmRleDEsIDEpWzBdO1xuICAgIGlmIChpbmRleERpZmZbMl0gPT09IEFSUkFZX01PVkUpIHtcbiAgICAgIC8vIHJlaW5zZXJ0IGxhdGVyXG4gICAgICB0b0luc2VydC5wdXNoKHtcbiAgICAgICAgaW5kZXg6IGluZGV4RGlmZlsxXSxcbiAgICAgICAgdmFsdWU6IHJlbW92ZWRWYWx1ZVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLy8gaW5zZXJ0IGl0ZW1zLCBpbiByZXZlcnNlIG9yZGVyIHRvIGF2b2lkIG1vdmluZyBvdXIgb3duIGZsb29yXG4gIHRvSW5zZXJ0ID0gdG9JbnNlcnQuc29ydChjb21wYXJlLm51bWVyaWNhbGx5QnkoJ2luZGV4JykpO1xuICB2YXIgdG9JbnNlcnRMZW5ndGggPSB0b0luc2VydC5sZW5ndGg7XG4gIGZvciAoaW5kZXggPSAwOyBpbmRleCA8IHRvSW5zZXJ0TGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgdmFyIGluc2VydGlvbiA9IHRvSW5zZXJ0W2luZGV4XTtcbiAgICBhcnJheS5zcGxpY2UoaW5zZXJ0aW9uLmluZGV4LCAwLCBpbnNlcnRpb24udmFsdWUpO1xuICB9XG5cbiAgLy8gYXBwbHkgbW9kaWZpY2F0aW9uc1xuICB2YXIgdG9Nb2RpZnlMZW5ndGggPSB0b01vZGlmeS5sZW5ndGg7XG4gIHZhciBjaGlsZDtcbiAgaWYgKHRvTW9kaWZ5TGVuZ3RoID4gMCkge1xuICAgIGZvciAoaW5kZXggPSAwOyBpbmRleCA8IHRvTW9kaWZ5TGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICB2YXIgbW9kaWZpY2F0aW9uID0gdG9Nb2RpZnlbaW5kZXhdO1xuICAgICAgY2hpbGQgPSBuZXcgUGF0Y2hDb250ZXh0KGNvbnRleHQubGVmdFttb2RpZmljYXRpb24uaW5kZXhdLCBtb2RpZmljYXRpb24uZGVsdGEpO1xuICAgICAgY29udGV4dC5wdXNoKGNoaWxkLCBtb2RpZmljYXRpb24uaW5kZXgpO1xuICAgIH1cbiAgfVxuXG4gIGlmICghY29udGV4dC5jaGlsZHJlbikge1xuICAgIGNvbnRleHQuc2V0UmVzdWx0KGNvbnRleHQubGVmdCkuZXhpdCgpO1xuICAgIHJldHVybjtcbiAgfVxuICBjb250ZXh0LmV4aXQoKTtcbn07XG5wYXRjaEZpbHRlci5maWx0ZXJOYW1lID0gJ2FycmF5cyc7XG5cbnZhciBjb2xsZWN0Q2hpbGRyZW5QYXRjaEZpbHRlciA9IGZ1bmN0aW9uIGNvbGxlY3RDaGlsZHJlblBhdGNoRmlsdGVyKGNvbnRleHQpIHtcbiAgaWYgKCFjb250ZXh0IHx8ICFjb250ZXh0LmNoaWxkcmVuKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChjb250ZXh0LmRlbHRhLl90ICE9PSAnYScpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIGxlbmd0aCA9IGNvbnRleHQuY2hpbGRyZW4ubGVuZ3RoO1xuICB2YXIgY2hpbGQ7XG4gIGZvciAodmFyIGluZGV4ID0gMDsgaW5kZXggPCBsZW5ndGg7IGluZGV4KyspIHtcbiAgICBjaGlsZCA9IGNvbnRleHQuY2hpbGRyZW5baW5kZXhdO1xuICAgIGNvbnRleHQubGVmdFtjaGlsZC5jaGlsZE5hbWVdID0gY2hpbGQucmVzdWx0O1xuICB9XG4gIGNvbnRleHQuc2V0UmVzdWx0KGNvbnRleHQubGVmdCkuZXhpdCgpO1xufTtcbmNvbGxlY3RDaGlsZHJlblBhdGNoRmlsdGVyLmZpbHRlck5hbWUgPSAnYXJyYXlzQ29sbGVjdENoaWxkcmVuJztcblxudmFyIHJldmVyc2VGaWx0ZXIgPSBmdW5jdGlvbiBhcnJheXNSZXZlcnNlRmlsdGVyKGNvbnRleHQpIHtcbiAgaWYgKCFjb250ZXh0Lm5lc3RlZCkge1xuICAgIGlmIChjb250ZXh0LmRlbHRhWzJdID09PSBBUlJBWV9NT1ZFKSB7XG4gICAgICBjb250ZXh0Lm5ld05hbWUgPSAnXycgKyBjb250ZXh0LmRlbHRhWzFdO1xuICAgICAgY29udGV4dC5zZXRSZXN1bHQoW2NvbnRleHQuZGVsdGFbMF0sIHBhcnNlSW50KGNvbnRleHQuY2hpbGROYW1lLnN1YnN0cigxKSwgMTApLCBBUlJBWV9NT1ZFXSkuZXhpdCgpO1xuICAgIH1cbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKGNvbnRleHQuZGVsdGEuX3QgIT09ICdhJykge1xuICAgIHJldHVybjtcbiAgfVxuICB2YXIgbmFtZSwgY2hpbGQ7XG4gIGZvciAobmFtZSBpbiBjb250ZXh0LmRlbHRhKSB7XG4gICAgaWYgKG5hbWUgPT09ICdfdCcpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICBjaGlsZCA9IG5ldyBSZXZlcnNlQ29udGV4dChjb250ZXh0LmRlbHRhW25hbWVdKTtcbiAgICBjb250ZXh0LnB1c2goY2hpbGQsIG5hbWUpO1xuICB9XG4gIGNvbnRleHQuZXhpdCgpO1xufTtcbnJldmVyc2VGaWx0ZXIuZmlsdGVyTmFtZSA9ICdhcnJheXMnO1xuXG52YXIgcmV2ZXJzZUFycmF5RGVsdGFJbmRleCA9IGZ1bmN0aW9uKGRlbHRhLCBpbmRleCwgaXRlbURlbHRhKSB7XG4gIGlmICh0eXBlb2YgaW5kZXggPT09ICdzdHJpbmcnICYmIGluZGV4WzBdID09PSAnXycpIHtcbiAgICByZXR1cm4gcGFyc2VJbnQoaW5kZXguc3Vic3RyKDEpLCAxMCk7XG4gIH0gZWxzZSBpZiAoaXNBcnJheShpdGVtRGVsdGEpICYmIGl0ZW1EZWx0YVsyXSA9PT0gMCkge1xuICAgIHJldHVybiAnXycgKyBpbmRleDtcbiAgfVxuXG4gIHZhciByZXZlcnNlSW5kZXggPSAraW5kZXg7XG4gIGZvciAodmFyIGRlbHRhSW5kZXggaW4gZGVsdGEpIHtcbiAgICB2YXIgZGVsdGFJdGVtID0gZGVsdGFbZGVsdGFJbmRleF07XG4gICAgaWYgKGlzQXJyYXkoZGVsdGFJdGVtKSkge1xuICAgICAgaWYgKGRlbHRhSXRlbVsyXSA9PT0gQVJSQVlfTU9WRSkge1xuICAgICAgICB2YXIgbW92ZUZyb21JbmRleCA9IHBhcnNlSW50KGRlbHRhSW5kZXguc3Vic3RyKDEpLCAxMCk7XG4gICAgICAgIHZhciBtb3ZlVG9JbmRleCA9IGRlbHRhSXRlbVsxXTtcbiAgICAgICAgaWYgKG1vdmVUb0luZGV4ID09PSAraW5kZXgpIHtcbiAgICAgICAgICByZXR1cm4gbW92ZUZyb21JbmRleDtcbiAgICAgICAgfVxuICAgICAgICBpZiAobW92ZUZyb21JbmRleCA8PSByZXZlcnNlSW5kZXggJiYgbW92ZVRvSW5kZXggPiByZXZlcnNlSW5kZXgpIHtcbiAgICAgICAgICByZXZlcnNlSW5kZXgrKztcbiAgICAgICAgfSBlbHNlIGlmIChtb3ZlRnJvbUluZGV4ID49IHJldmVyc2VJbmRleCAmJiBtb3ZlVG9JbmRleCA8IHJldmVyc2VJbmRleCkge1xuICAgICAgICAgIHJldmVyc2VJbmRleC0tO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGRlbHRhSXRlbVsyXSA9PT0gMCkge1xuICAgICAgICB2YXIgZGVsZXRlSW5kZXggPSBwYXJzZUludChkZWx0YUluZGV4LnN1YnN0cigxKSwgMTApO1xuICAgICAgICBpZiAoZGVsZXRlSW5kZXggPD0gcmV2ZXJzZUluZGV4KSB7XG4gICAgICAgICAgcmV2ZXJzZUluZGV4Kys7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoZGVsdGFJdGVtLmxlbmd0aCA9PT0gMSAmJiBkZWx0YUluZGV4IDw9IHJldmVyc2VJbmRleCkge1xuICAgICAgICByZXZlcnNlSW5kZXgtLTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmV2ZXJzZUluZGV4O1xufTtcblxudmFyIGNvbGxlY3RDaGlsZHJlblJldmVyc2VGaWx0ZXIgPSBmdW5jdGlvbiBjb2xsZWN0Q2hpbGRyZW5SZXZlcnNlRmlsdGVyKGNvbnRleHQpIHtcbiAgaWYgKCFjb250ZXh0IHx8ICFjb250ZXh0LmNoaWxkcmVuKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChjb250ZXh0LmRlbHRhLl90ICE9PSAnYScpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIGxlbmd0aCA9IGNvbnRleHQuY2hpbGRyZW4ubGVuZ3RoO1xuICB2YXIgY2hpbGQ7XG4gIHZhciBkZWx0YSA9IHtcbiAgICBfdDogJ2EnXG4gIH07XG5cbiAgZm9yICh2YXIgaW5kZXggPSAwOyBpbmRleCA8IGxlbmd0aDsgaW5kZXgrKykge1xuICAgIGNoaWxkID0gY29udGV4dC5jaGlsZHJlbltpbmRleF07XG4gICAgdmFyIG5hbWUgPSBjaGlsZC5uZXdOYW1lO1xuICAgIGlmICh0eXBlb2YgbmFtZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIG5hbWUgPSByZXZlcnNlQXJyYXlEZWx0YUluZGV4KGNvbnRleHQuZGVsdGEsIGNoaWxkLmNoaWxkTmFtZSwgY2hpbGQucmVzdWx0KTtcbiAgICB9XG4gICAgaWYgKGRlbHRhW25hbWVdICE9PSBjaGlsZC5yZXN1bHQpIHtcbiAgICAgIGRlbHRhW25hbWVdID0gY2hpbGQucmVzdWx0O1xuICAgIH1cbiAgfVxuICBjb250ZXh0LnNldFJlc3VsdChkZWx0YSkuZXhpdCgpO1xufTtcbmNvbGxlY3RDaGlsZHJlblJldmVyc2VGaWx0ZXIuZmlsdGVyTmFtZSA9ICdhcnJheXNDb2xsZWN0Q2hpbGRyZW4nO1xuXG5leHBvcnRzLmRpZmZGaWx0ZXIgPSBkaWZmRmlsdGVyO1xuZXhwb3J0cy5wYXRjaEZpbHRlciA9IHBhdGNoRmlsdGVyO1xuZXhwb3J0cy5jb2xsZWN0Q2hpbGRyZW5QYXRjaEZpbHRlciA9IGNvbGxlY3RDaGlsZHJlblBhdGNoRmlsdGVyO1xuZXhwb3J0cy5yZXZlcnNlRmlsdGVyID0gcmV2ZXJzZUZpbHRlcjtcbmV4cG9ydHMuY29sbGVjdENoaWxkcmVuUmV2ZXJzZUZpbHRlciA9IGNvbGxlY3RDaGlsZHJlblJldmVyc2VGaWx0ZXI7XG4iLCJ2YXIgZGlmZkZpbHRlciA9IGZ1bmN0aW9uIGRhdGVzRGlmZkZpbHRlcihjb250ZXh0KSB7XG4gIGlmIChjb250ZXh0LmxlZnQgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgaWYgKGNvbnRleHQucmlnaHQgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICBpZiAoY29udGV4dC5sZWZ0LmdldFRpbWUoKSAhPT0gY29udGV4dC5yaWdodC5nZXRUaW1lKCkpIHtcbiAgICAgICAgY29udGV4dC5zZXRSZXN1bHQoW2NvbnRleHQubGVmdCwgY29udGV4dC5yaWdodF0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29udGV4dC5zZXRSZXN1bHQodW5kZWZpbmVkKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY29udGV4dC5zZXRSZXN1bHQoW2NvbnRleHQubGVmdCwgY29udGV4dC5yaWdodF0pO1xuICAgIH1cbiAgICBjb250ZXh0LmV4aXQoKTtcbiAgfSBlbHNlIGlmIChjb250ZXh0LnJpZ2h0IGluc3RhbmNlb2YgRGF0ZSkge1xuICAgIGNvbnRleHQuc2V0UmVzdWx0KFtjb250ZXh0LmxlZnQsIGNvbnRleHQucmlnaHRdKS5leGl0KCk7XG4gIH1cbn07XG5kaWZmRmlsdGVyLmZpbHRlck5hbWUgPSAnZGF0ZXMnO1xuXG5leHBvcnRzLmRpZmZGaWx0ZXIgPSBkaWZmRmlsdGVyO1xuIiwiLypcblxuTENTIGltcGxlbWVudGF0aW9uIHRoYXQgc3VwcG9ydHMgYXJyYXlzIG9yIHN0cmluZ3NcblxucmVmZXJlbmNlOiBodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0xvbmdlc3RfY29tbW9uX3N1YnNlcXVlbmNlX3Byb2JsZW1cblxuKi9cblxudmFyIGRlZmF1bHRNYXRjaCA9IGZ1bmN0aW9uKGFycmF5MSwgYXJyYXkyLCBpbmRleDEsIGluZGV4Mikge1xuICByZXR1cm4gYXJyYXkxW2luZGV4MV0gPT09IGFycmF5MltpbmRleDJdO1xufTtcblxudmFyIGxlbmd0aE1hdHJpeCA9IGZ1bmN0aW9uKGFycmF5MSwgYXJyYXkyLCBtYXRjaCwgY29udGV4dCkge1xuICB2YXIgbGVuMSA9IGFycmF5MS5sZW5ndGg7XG4gIHZhciBsZW4yID0gYXJyYXkyLmxlbmd0aDtcbiAgdmFyIHgsIHk7XG5cbiAgLy8gaW5pdGlhbGl6ZSBlbXB0eSBtYXRyaXggb2YgbGVuMSsxIHggbGVuMisxXG4gIHZhciBtYXRyaXggPSBbbGVuMSArIDFdO1xuICBmb3IgKHggPSAwOyB4IDwgbGVuMSArIDE7IHgrKykge1xuICAgIG1hdHJpeFt4XSA9IFtsZW4yICsgMV07XG4gICAgZm9yICh5ID0gMDsgeSA8IGxlbjIgKyAxOyB5KyspIHtcbiAgICAgIG1hdHJpeFt4XVt5XSA9IDA7XG4gICAgfVxuICB9XG4gIG1hdHJpeC5tYXRjaCA9IG1hdGNoO1xuICAvLyBzYXZlIHNlcXVlbmNlIGxlbmd0aHMgZm9yIGVhY2ggY29vcmRpbmF0ZVxuICBmb3IgKHggPSAxOyB4IDwgbGVuMSArIDE7IHgrKykge1xuICAgIGZvciAoeSA9IDE7IHkgPCBsZW4yICsgMTsgeSsrKSB7XG4gICAgICBpZiAobWF0Y2goYXJyYXkxLCBhcnJheTIsIHggLSAxLCB5IC0gMSwgY29udGV4dCkpIHtcbiAgICAgICAgbWF0cml4W3hdW3ldID0gbWF0cml4W3ggLSAxXVt5IC0gMV0gKyAxO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbWF0cml4W3hdW3ldID0gTWF0aC5tYXgobWF0cml4W3ggLSAxXVt5XSwgbWF0cml4W3hdW3kgLSAxXSk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBtYXRyaXg7XG59O1xuXG52YXIgYmFja3RyYWNrID0gZnVuY3Rpb24obWF0cml4LCBhcnJheTEsIGFycmF5MiwgaW5kZXgxLCBpbmRleDIsIGNvbnRleHQpIHtcbiAgaWYgKGluZGV4MSA9PT0gMCB8fCBpbmRleDIgPT09IDApIHtcbiAgICByZXR1cm4ge1xuICAgICAgc2VxdWVuY2U6IFtdLFxuICAgICAgaW5kaWNlczE6IFtdLFxuICAgICAgaW5kaWNlczI6IFtdXG4gICAgfTtcbiAgfVxuXG4gIGlmIChtYXRyaXgubWF0Y2goYXJyYXkxLCBhcnJheTIsIGluZGV4MSAtIDEsIGluZGV4MiAtIDEsIGNvbnRleHQpKSB7XG4gICAgdmFyIHN1YnNlcXVlbmNlID0gYmFja3RyYWNrKG1hdHJpeCwgYXJyYXkxLCBhcnJheTIsIGluZGV4MSAtIDEsIGluZGV4MiAtIDEsIGNvbnRleHQpO1xuICAgIHN1YnNlcXVlbmNlLnNlcXVlbmNlLnB1c2goYXJyYXkxW2luZGV4MSAtIDFdKTtcbiAgICBzdWJzZXF1ZW5jZS5pbmRpY2VzMS5wdXNoKGluZGV4MSAtIDEpO1xuICAgIHN1YnNlcXVlbmNlLmluZGljZXMyLnB1c2goaW5kZXgyIC0gMSk7XG4gICAgcmV0dXJuIHN1YnNlcXVlbmNlO1xuICB9XG5cbiAgaWYgKG1hdHJpeFtpbmRleDFdW2luZGV4MiAtIDFdID4gbWF0cml4W2luZGV4MSAtIDFdW2luZGV4Ml0pIHtcbiAgICByZXR1cm4gYmFja3RyYWNrKG1hdHJpeCwgYXJyYXkxLCBhcnJheTIsIGluZGV4MSwgaW5kZXgyIC0gMSwgY29udGV4dCk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGJhY2t0cmFjayhtYXRyaXgsIGFycmF5MSwgYXJyYXkyLCBpbmRleDEgLSAxLCBpbmRleDIsIGNvbnRleHQpO1xuICB9XG59O1xuXG52YXIgZ2V0ID0gZnVuY3Rpb24oYXJyYXkxLCBhcnJheTIsIG1hdGNoLCBjb250ZXh0KSB7XG4gIGNvbnRleHQgPSBjb250ZXh0IHx8IHt9O1xuICB2YXIgbWF0cml4ID0gbGVuZ3RoTWF0cml4KGFycmF5MSwgYXJyYXkyLCBtYXRjaCB8fCBkZWZhdWx0TWF0Y2gsIGNvbnRleHQpO1xuICB2YXIgcmVzdWx0ID0gYmFja3RyYWNrKG1hdHJpeCwgYXJyYXkxLCBhcnJheTIsIGFycmF5MS5sZW5ndGgsIGFycmF5Mi5sZW5ndGgsIGNvbnRleHQpO1xuICBpZiAodHlwZW9mIGFycmF5MSA9PT0gJ3N0cmluZycgJiYgdHlwZW9mIGFycmF5MiA9PT0gJ3N0cmluZycpIHtcbiAgICByZXN1bHQuc2VxdWVuY2UgPSByZXN1bHQuc2VxdWVuY2Uuam9pbignJyk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn07XG5cbmV4cG9ydHMuZ2V0ID0gZ2V0O1xuIiwidmFyIERpZmZDb250ZXh0ID0gcmVxdWlyZSgnLi4vY29udGV4dHMvZGlmZicpLkRpZmZDb250ZXh0O1xudmFyIFBhdGNoQ29udGV4dCA9IHJlcXVpcmUoJy4uL2NvbnRleHRzL3BhdGNoJykuUGF0Y2hDb250ZXh0O1xudmFyIFJldmVyc2VDb250ZXh0ID0gcmVxdWlyZSgnLi4vY29udGV4dHMvcmV2ZXJzZScpLlJldmVyc2VDb250ZXh0O1xuXG52YXIgY29sbGVjdENoaWxkcmVuRGlmZkZpbHRlciA9IGZ1bmN0aW9uIGNvbGxlY3RDaGlsZHJlbkRpZmZGaWx0ZXIoY29udGV4dCkge1xuICBpZiAoIWNvbnRleHQgfHwgIWNvbnRleHQuY2hpbGRyZW4pIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIGxlbmd0aCA9IGNvbnRleHQuY2hpbGRyZW4ubGVuZ3RoO1xuICB2YXIgY2hpbGQ7XG4gIHZhciByZXN1bHQgPSBjb250ZXh0LnJlc3VsdDtcbiAgZm9yICh2YXIgaW5kZXggPSAwOyBpbmRleCA8IGxlbmd0aDsgaW5kZXgrKykge1xuICAgIGNoaWxkID0gY29udGV4dC5jaGlsZHJlbltpbmRleF07XG4gICAgaWYgKHR5cGVvZiBjaGlsZC5yZXN1bHQgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgcmVzdWx0ID0gcmVzdWx0IHx8IHt9O1xuICAgIHJlc3VsdFtjaGlsZC5jaGlsZE5hbWVdID0gY2hpbGQucmVzdWx0O1xuICB9XG4gIGlmIChyZXN1bHQgJiYgY29udGV4dC5sZWZ0SXNBcnJheSkge1xuICAgIHJlc3VsdC5fdCA9ICdhJztcbiAgfVxuICBjb250ZXh0LnNldFJlc3VsdChyZXN1bHQpLmV4aXQoKTtcbn07XG5jb2xsZWN0Q2hpbGRyZW5EaWZmRmlsdGVyLmZpbHRlck5hbWUgPSAnY29sbGVjdENoaWxkcmVuJztcblxudmFyIG9iamVjdHNEaWZmRmlsdGVyID0gZnVuY3Rpb24gb2JqZWN0c0RpZmZGaWx0ZXIoY29udGV4dCkge1xuICBpZiAoY29udGV4dC5sZWZ0SXNBcnJheSB8fCBjb250ZXh0LmxlZnRUeXBlICE9PSAnb2JqZWN0Jykge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHZhciBuYW1lLCBjaGlsZDtcbiAgZm9yIChuYW1lIGluIGNvbnRleHQubGVmdCkge1xuICAgIGNoaWxkID0gbmV3IERpZmZDb250ZXh0KGNvbnRleHQubGVmdFtuYW1lXSwgY29udGV4dC5yaWdodFtuYW1lXSk7XG4gICAgY29udGV4dC5wdXNoKGNoaWxkLCBuYW1lKTtcbiAgfVxuICBmb3IgKG5hbWUgaW4gY29udGV4dC5yaWdodCkge1xuICAgIGlmICh0eXBlb2YgY29udGV4dC5sZWZ0W25hbWVdID09PSAndW5kZWZpbmVkJykge1xuICAgICAgY2hpbGQgPSBuZXcgRGlmZkNvbnRleHQodW5kZWZpbmVkLCBjb250ZXh0LnJpZ2h0W25hbWVdKTtcbiAgICAgIGNvbnRleHQucHVzaChjaGlsZCwgbmFtZSk7XG4gICAgfVxuICB9XG5cbiAgaWYgKCFjb250ZXh0LmNoaWxkcmVuIHx8IGNvbnRleHQuY2hpbGRyZW4ubGVuZ3RoID09PSAwKSB7XG4gICAgY29udGV4dC5zZXRSZXN1bHQodW5kZWZpbmVkKS5leGl0KCk7XG4gICAgcmV0dXJuO1xuICB9XG4gIGNvbnRleHQuZXhpdCgpO1xufTtcbm9iamVjdHNEaWZmRmlsdGVyLmZpbHRlck5hbWUgPSAnb2JqZWN0cyc7XG5cbnZhciBwYXRjaEZpbHRlciA9IGZ1bmN0aW9uIG5lc3RlZFBhdGNoRmlsdGVyKGNvbnRleHQpIHtcbiAgaWYgKCFjb250ZXh0Lm5lc3RlZCkge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoY29udGV4dC5kZWx0YS5fdCkge1xuICAgIHJldHVybjtcbiAgfVxuICB2YXIgbmFtZSwgY2hpbGQ7XG4gIGZvciAobmFtZSBpbiBjb250ZXh0LmRlbHRhKSB7XG4gICAgY2hpbGQgPSBuZXcgUGF0Y2hDb250ZXh0KGNvbnRleHQubGVmdFtuYW1lXSwgY29udGV4dC5kZWx0YVtuYW1lXSk7XG4gICAgY29udGV4dC5wdXNoKGNoaWxkLCBuYW1lKTtcbiAgfVxuICBjb250ZXh0LmV4aXQoKTtcbn07XG5wYXRjaEZpbHRlci5maWx0ZXJOYW1lID0gJ29iamVjdHMnO1xuXG52YXIgY29sbGVjdENoaWxkcmVuUGF0Y2hGaWx0ZXIgPSBmdW5jdGlvbiBjb2xsZWN0Q2hpbGRyZW5QYXRjaEZpbHRlcihjb250ZXh0KSB7XG4gIGlmICghY29udGV4dCB8fCAhY29udGV4dC5jaGlsZHJlbikge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoY29udGV4dC5kZWx0YS5fdCkge1xuICAgIHJldHVybjtcbiAgfVxuICB2YXIgbGVuZ3RoID0gY29udGV4dC5jaGlsZHJlbi5sZW5ndGg7XG4gIHZhciBjaGlsZDtcbiAgZm9yICh2YXIgaW5kZXggPSAwOyBpbmRleCA8IGxlbmd0aDsgaW5kZXgrKykge1xuICAgIGNoaWxkID0gY29udGV4dC5jaGlsZHJlbltpbmRleF07XG4gICAgaWYgKGNvbnRleHQubGVmdC5oYXNPd25Qcm9wZXJ0eShjaGlsZC5jaGlsZE5hbWUpICYmIGNoaWxkLnJlc3VsdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBkZWxldGUgY29udGV4dC5sZWZ0W2NoaWxkLmNoaWxkTmFtZV07XG4gICAgfSBlbHNlIGlmIChjb250ZXh0LmxlZnRbY2hpbGQuY2hpbGROYW1lXSAhPT0gY2hpbGQucmVzdWx0KSB7XG4gICAgICBjb250ZXh0LmxlZnRbY2hpbGQuY2hpbGROYW1lXSA9IGNoaWxkLnJlc3VsdDtcbiAgICB9XG4gIH1cbiAgY29udGV4dC5zZXRSZXN1bHQoY29udGV4dC5sZWZ0KS5leGl0KCk7XG59O1xuY29sbGVjdENoaWxkcmVuUGF0Y2hGaWx0ZXIuZmlsdGVyTmFtZSA9ICdjb2xsZWN0Q2hpbGRyZW4nO1xuXG52YXIgcmV2ZXJzZUZpbHRlciA9IGZ1bmN0aW9uIG5lc3RlZFJldmVyc2VGaWx0ZXIoY29udGV4dCkge1xuICBpZiAoIWNvbnRleHQubmVzdGVkKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChjb250ZXh0LmRlbHRhLl90KSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciBuYW1lLCBjaGlsZDtcbiAgZm9yIChuYW1lIGluIGNvbnRleHQuZGVsdGEpIHtcbiAgICBjaGlsZCA9IG5ldyBSZXZlcnNlQ29udGV4dChjb250ZXh0LmRlbHRhW25hbWVdKTtcbiAgICBjb250ZXh0LnB1c2goY2hpbGQsIG5hbWUpO1xuICB9XG4gIGNvbnRleHQuZXhpdCgpO1xufTtcbnJldmVyc2VGaWx0ZXIuZmlsdGVyTmFtZSA9ICdvYmplY3RzJztcblxudmFyIGNvbGxlY3RDaGlsZHJlblJldmVyc2VGaWx0ZXIgPSBmdW5jdGlvbiBjb2xsZWN0Q2hpbGRyZW5SZXZlcnNlRmlsdGVyKGNvbnRleHQpIHtcbiAgaWYgKCFjb250ZXh0IHx8ICFjb250ZXh0LmNoaWxkcmVuKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChjb250ZXh0LmRlbHRhLl90KSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciBsZW5ndGggPSBjb250ZXh0LmNoaWxkcmVuLmxlbmd0aDtcbiAgdmFyIGNoaWxkO1xuICB2YXIgZGVsdGEgPSB7fTtcbiAgZm9yICh2YXIgaW5kZXggPSAwOyBpbmRleCA8IGxlbmd0aDsgaW5kZXgrKykge1xuICAgIGNoaWxkID0gY29udGV4dC5jaGlsZHJlbltpbmRleF07XG4gICAgaWYgKGRlbHRhW2NoaWxkLmNoaWxkTmFtZV0gIT09IGNoaWxkLnJlc3VsdCkge1xuICAgICAgZGVsdGFbY2hpbGQuY2hpbGROYW1lXSA9IGNoaWxkLnJlc3VsdDtcbiAgICB9XG4gIH1cbiAgY29udGV4dC5zZXRSZXN1bHQoZGVsdGEpLmV4aXQoKTtcbn07XG5jb2xsZWN0Q2hpbGRyZW5SZXZlcnNlRmlsdGVyLmZpbHRlck5hbWUgPSAnY29sbGVjdENoaWxkcmVuJztcblxuZXhwb3J0cy5jb2xsZWN0Q2hpbGRyZW5EaWZmRmlsdGVyID0gY29sbGVjdENoaWxkcmVuRGlmZkZpbHRlcjtcbmV4cG9ydHMub2JqZWN0c0RpZmZGaWx0ZXIgPSBvYmplY3RzRGlmZkZpbHRlcjtcbmV4cG9ydHMucGF0Y2hGaWx0ZXIgPSBwYXRjaEZpbHRlcjtcbmV4cG9ydHMuY29sbGVjdENoaWxkcmVuUGF0Y2hGaWx0ZXIgPSBjb2xsZWN0Q2hpbGRyZW5QYXRjaEZpbHRlcjtcbmV4cG9ydHMucmV2ZXJzZUZpbHRlciA9IHJldmVyc2VGaWx0ZXI7XG5leHBvcnRzLmNvbGxlY3RDaGlsZHJlblJldmVyc2VGaWx0ZXIgPSBjb2xsZWN0Q2hpbGRyZW5SZXZlcnNlRmlsdGVyO1xuIiwiLyogZ2xvYmFsIGRpZmZfbWF0Y2hfcGF0Y2ggKi9cbnZhciBURVhUX0RJRkYgPSAyO1xudmFyIERFRkFVTFRfTUlOX0xFTkdUSCA9IDYwO1xudmFyIGNhY2hlZERpZmZQYXRjaCA9IG51bGw7XG5cbnZhciBnZXREaWZmTWF0Y2hQYXRjaCA9IGZ1bmN0aW9uKHJlcXVpcmVkKSB7XG4gIC8qanNoaW50IGNhbWVsY2FzZTogZmFsc2UgKi9cblxuICBpZiAoIWNhY2hlZERpZmZQYXRjaCkge1xuICAgIHZhciBpbnN0YW5jZTtcbiAgICBpZiAodHlwZW9mIGRpZmZfbWF0Y2hfcGF0Y2ggIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAvLyBhbHJlYWR5IGxvYWRlZCwgcHJvYmFibHkgYSBicm93c2VyXG4gICAgICBpbnN0YW5jZSA9IHR5cGVvZiBkaWZmX21hdGNoX3BhdGNoID09PSAnZnVuY3Rpb24nID9cbiAgICAgICAgbmV3IGRpZmZfbWF0Y2hfcGF0Y2goKSA6IG5ldyBkaWZmX21hdGNoX3BhdGNoLmRpZmZfbWF0Y2hfcGF0Y2goKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiByZXF1aXJlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0cnkge1xuICAgICAgICB2YXIgZG1wTW9kdWxlTmFtZSA9ICdkaWZmX21hdGNoX3BhdGNoX3VuY29tcHJlc3NlZCc7XG4gICAgICAgIHZhciBkbXAgPSByZXF1aXJlKCcuLi8uLi9wdWJsaWMvZXh0ZXJuYWwvJyArIGRtcE1vZHVsZU5hbWUpO1xuICAgICAgICBpbnN0YW5jZSA9IG5ldyBkbXAuZGlmZl9tYXRjaF9wYXRjaCgpO1xuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGluc3RhbmNlID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKCFpbnN0YW5jZSkge1xuICAgICAgaWYgKCFyZXF1aXJlZCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICAgIHZhciBlcnJvciA9IG5ldyBFcnJvcigndGV4dCBkaWZmX21hdGNoX3BhdGNoIGxpYnJhcnkgbm90IGZvdW5kJyk7XG4gICAgICBlcnJvci5kaWZmX21hdGNoX3BhdGNoX25vdF9mb3VuZCA9IHRydWU7XG4gICAgICB0aHJvdyBlcnJvcjtcbiAgICB9XG4gICAgY2FjaGVkRGlmZlBhdGNoID0ge1xuICAgICAgZGlmZjogZnVuY3Rpb24odHh0MSwgdHh0Mikge1xuICAgICAgICByZXR1cm4gaW5zdGFuY2UucGF0Y2hfdG9UZXh0KGluc3RhbmNlLnBhdGNoX21ha2UodHh0MSwgdHh0MikpO1xuICAgICAgfSxcbiAgICAgIHBhdGNoOiBmdW5jdGlvbih0eHQxLCBwYXRjaCkge1xuICAgICAgICB2YXIgcmVzdWx0cyA9IGluc3RhbmNlLnBhdGNoX2FwcGx5KGluc3RhbmNlLnBhdGNoX2Zyb21UZXh0KHBhdGNoKSwgdHh0MSk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmVzdWx0c1sxXS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGlmICghcmVzdWx0c1sxXVtpXSkge1xuICAgICAgICAgICAgdmFyIGVycm9yID0gbmV3IEVycm9yKCd0ZXh0IHBhdGNoIGZhaWxlZCcpO1xuICAgICAgICAgICAgZXJyb3IudGV4dFBhdGNoRmFpbGVkID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdHNbMF07XG4gICAgICB9XG4gICAgfTtcbiAgfVxuICByZXR1cm4gY2FjaGVkRGlmZlBhdGNoO1xufTtcblxudmFyIGRpZmZGaWx0ZXIgPSBmdW5jdGlvbiB0ZXh0c0RpZmZGaWx0ZXIoY29udGV4dCkge1xuICBpZiAoY29udGV4dC5sZWZ0VHlwZSAhPT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIG1pbkxlbmd0aCA9IChjb250ZXh0Lm9wdGlvbnMgJiYgY29udGV4dC5vcHRpb25zLnRleHREaWZmICYmXG4gICAgY29udGV4dC5vcHRpb25zLnRleHREaWZmLm1pbkxlbmd0aCkgfHwgREVGQVVMVF9NSU5fTEVOR1RIO1xuICBpZiAoY29udGV4dC5sZWZ0Lmxlbmd0aCA8IG1pbkxlbmd0aCB8fFxuICAgIGNvbnRleHQucmlnaHQubGVuZ3RoIDwgbWluTGVuZ3RoKSB7XG4gICAgY29udGV4dC5zZXRSZXN1bHQoW2NvbnRleHQubGVmdCwgY29udGV4dC5yaWdodF0pLmV4aXQoKTtcbiAgICByZXR1cm47XG4gIH1cbiAgLy8gbGFyZ2UgdGV4dCwgdHJ5IHRvIHVzZSBhIHRleHQtZGlmZiBhbGdvcml0aG1cbiAgdmFyIGRpZmZNYXRjaFBhdGNoID0gZ2V0RGlmZk1hdGNoUGF0Y2goKTtcbiAgaWYgKCFkaWZmTWF0Y2hQYXRjaCkge1xuICAgIC8vIGRpZmYtbWF0Y2gtcGF0Y2ggbGlicmFyeSBub3QgYXZhaWxhYmxlLCBmYWxsYmFjayB0byByZWd1bGFyIHN0cmluZyByZXBsYWNlXG4gICAgY29udGV4dC5zZXRSZXN1bHQoW2NvbnRleHQubGVmdCwgY29udGV4dC5yaWdodF0pLmV4aXQoKTtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIGRpZmYgPSBkaWZmTWF0Y2hQYXRjaC5kaWZmO1xuICBjb250ZXh0LnNldFJlc3VsdChbZGlmZihjb250ZXh0LmxlZnQsIGNvbnRleHQucmlnaHQpLCAwLCBURVhUX0RJRkZdKS5leGl0KCk7XG59O1xuZGlmZkZpbHRlci5maWx0ZXJOYW1lID0gJ3RleHRzJztcblxudmFyIHBhdGNoRmlsdGVyID0gZnVuY3Rpb24gdGV4dHNQYXRjaEZpbHRlcihjb250ZXh0KSB7XG4gIGlmIChjb250ZXh0Lm5lc3RlZCkge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoY29udGV4dC5kZWx0YVsyXSAhPT0gVEVYVF9ESUZGKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gdGV4dC1kaWZmLCB1c2UgYSB0ZXh0LXBhdGNoIGFsZ29yaXRobVxuICB2YXIgcGF0Y2ggPSBnZXREaWZmTWF0Y2hQYXRjaCh0cnVlKS5wYXRjaDtcbiAgY29udGV4dC5zZXRSZXN1bHQocGF0Y2goY29udGV4dC5sZWZ0LCBjb250ZXh0LmRlbHRhWzBdKSkuZXhpdCgpO1xufTtcbnBhdGNoRmlsdGVyLmZpbHRlck5hbWUgPSAndGV4dHMnO1xuXG52YXIgdGV4dERlbHRhUmV2ZXJzZSA9IGZ1bmN0aW9uKGRlbHRhKSB7XG4gIHZhciBpLCBsLCBsaW5lcywgbGluZSwgbGluZVRtcCwgaGVhZGVyID0gbnVsbCxcbiAgICBoZWFkZXJSZWdleCA9IC9eQEAgK1xcLShcXGQrKSwoXFxkKykgK1xcKyhcXGQrKSwoXFxkKykgK0BAJC8sXG4gICAgbGluZUhlYWRlciwgbGluZUFkZCwgbGluZVJlbW92ZTtcbiAgbGluZXMgPSBkZWx0YS5zcGxpdCgnXFxuJyk7XG4gIGZvciAoaSA9IDAsIGwgPSBsaW5lcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICBsaW5lID0gbGluZXNbaV07XG4gICAgdmFyIGxpbmVTdGFydCA9IGxpbmUuc2xpY2UoMCwgMSk7XG4gICAgaWYgKGxpbmVTdGFydCA9PT0gJ0AnKSB7XG4gICAgICBoZWFkZXIgPSBoZWFkZXJSZWdleC5leGVjKGxpbmUpO1xuICAgICAgbGluZUhlYWRlciA9IGk7XG4gICAgICBsaW5lQWRkID0gbnVsbDtcbiAgICAgIGxpbmVSZW1vdmUgPSBudWxsO1xuXG4gICAgICAvLyBmaXggaGVhZGVyXG4gICAgICBsaW5lc1tsaW5lSGVhZGVyXSA9ICdAQCAtJyArIGhlYWRlclszXSArICcsJyArIGhlYWRlcls0XSArICcgKycgKyBoZWFkZXJbMV0gKyAnLCcgKyBoZWFkZXJbMl0gKyAnIEBAJztcbiAgICB9IGVsc2UgaWYgKGxpbmVTdGFydCA9PT0gJysnKSB7XG4gICAgICBsaW5lQWRkID0gaTtcbiAgICAgIGxpbmVzW2ldID0gJy0nICsgbGluZXNbaV0uc2xpY2UoMSk7XG4gICAgICBpZiAobGluZXNbaSAtIDFdLnNsaWNlKDAsIDEpID09PSAnKycpIHtcbiAgICAgICAgLy8gc3dhcCBsaW5lcyB0byBrZWVwIGRlZmF1bHQgb3JkZXIgKC0rKVxuICAgICAgICBsaW5lVG1wID0gbGluZXNbaV07XG4gICAgICAgIGxpbmVzW2ldID0gbGluZXNbaSAtIDFdO1xuICAgICAgICBsaW5lc1tpIC0gMV0gPSBsaW5lVG1wO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAobGluZVN0YXJ0ID09PSAnLScpIHtcbiAgICAgIGxpbmVSZW1vdmUgPSBpO1xuICAgICAgbGluZXNbaV0gPSAnKycgKyBsaW5lc1tpXS5zbGljZSgxKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGxpbmVzLmpvaW4oJ1xcbicpO1xufTtcblxudmFyIHJldmVyc2VGaWx0ZXIgPSBmdW5jdGlvbiB0ZXh0c1JldmVyc2VGaWx0ZXIoY29udGV4dCkge1xuICBpZiAoY29udGV4dC5uZXN0ZWQpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKGNvbnRleHQuZGVsdGFbMl0gIT09IFRFWFRfRElGRikge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIHRleHQtZGlmZiwgdXNlIGEgdGV4dC1kaWZmIGFsZ29yaXRobVxuICBjb250ZXh0LnNldFJlc3VsdChbdGV4dERlbHRhUmV2ZXJzZShjb250ZXh0LmRlbHRhWzBdKSwgMCwgVEVYVF9ESUZGXSkuZXhpdCgpO1xufTtcbnJldmVyc2VGaWx0ZXIuZmlsdGVyTmFtZSA9ICd0ZXh0cyc7XG5cbmV4cG9ydHMuZGlmZkZpbHRlciA9IGRpZmZGaWx0ZXI7XG5leHBvcnRzLnBhdGNoRmlsdGVyID0gcGF0Y2hGaWx0ZXI7XG5leHBvcnRzLnJldmVyc2VGaWx0ZXIgPSByZXZlcnNlRmlsdGVyO1xuIiwidmFyIGlzQXJyYXkgPSAodHlwZW9mIEFycmF5LmlzQXJyYXkgPT09ICdmdW5jdGlvbicpID9cbiAgLy8gdXNlIG5hdGl2ZSBmdW5jdGlvblxuICBBcnJheS5pc0FycmF5IDpcbiAgLy8gdXNlIGluc3RhbmNlb2Ygb3BlcmF0b3JcbiAgZnVuY3Rpb24oYSkge1xuICAgIHJldHVybiBhIGluc3RhbmNlb2YgQXJyYXk7XG4gIH07XG5cbnZhciBkaWZmRmlsdGVyID0gZnVuY3Rpb24gdHJpdmlhbE1hdGNoZXNEaWZmRmlsdGVyKGNvbnRleHQpIHtcbiAgaWYgKGNvbnRleHQubGVmdCA9PT0gY29udGV4dC5yaWdodCkge1xuICAgIGNvbnRleHQuc2V0UmVzdWx0KHVuZGVmaW5lZCkuZXhpdCgpO1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAodHlwZW9mIGNvbnRleHQubGVmdCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBpZiAodHlwZW9mIGNvbnRleHQucmlnaHQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignZnVuY3Rpb25zIGFyZSBub3Qgc3VwcG9ydGVkJyk7XG4gICAgfVxuICAgIGNvbnRleHQuc2V0UmVzdWx0KFtjb250ZXh0LnJpZ2h0XSkuZXhpdCgpO1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAodHlwZW9mIGNvbnRleHQucmlnaHQgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgY29udGV4dC5zZXRSZXN1bHQoW2NvbnRleHQubGVmdCwgMCwgMF0pLmV4aXQoKTtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKHR5cGVvZiBjb250ZXh0LmxlZnQgPT09ICdmdW5jdGlvbicgfHwgdHlwZW9mIGNvbnRleHQucmlnaHQgPT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2Z1bmN0aW9ucyBhcmUgbm90IHN1cHBvcnRlZCcpO1xuICB9XG4gIGNvbnRleHQubGVmdFR5cGUgPSBjb250ZXh0LmxlZnQgPT09IG51bGwgPyAnbnVsbCcgOiB0eXBlb2YgY29udGV4dC5sZWZ0O1xuICBjb250ZXh0LnJpZ2h0VHlwZSA9IGNvbnRleHQucmlnaHQgPT09IG51bGwgPyAnbnVsbCcgOiB0eXBlb2YgY29udGV4dC5yaWdodDtcbiAgaWYgKGNvbnRleHQubGVmdFR5cGUgIT09IGNvbnRleHQucmlnaHRUeXBlKSB7XG4gICAgY29udGV4dC5zZXRSZXN1bHQoW2NvbnRleHQubGVmdCwgY29udGV4dC5yaWdodF0pLmV4aXQoKTtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKGNvbnRleHQubGVmdFR5cGUgPT09ICdib29sZWFuJyB8fCBjb250ZXh0LmxlZnRUeXBlID09PSAnbnVtYmVyJykge1xuICAgIGNvbnRleHQuc2V0UmVzdWx0KFtjb250ZXh0LmxlZnQsIGNvbnRleHQucmlnaHRdKS5leGl0KCk7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChjb250ZXh0LmxlZnRUeXBlID09PSAnb2JqZWN0Jykge1xuICAgIGNvbnRleHQubGVmdElzQXJyYXkgPSBpc0FycmF5KGNvbnRleHQubGVmdCk7XG4gIH1cbiAgaWYgKGNvbnRleHQucmlnaHRUeXBlID09PSAnb2JqZWN0Jykge1xuICAgIGNvbnRleHQucmlnaHRJc0FycmF5ID0gaXNBcnJheShjb250ZXh0LnJpZ2h0KTtcbiAgfVxuICBpZiAoY29udGV4dC5sZWZ0SXNBcnJheSAhPT0gY29udGV4dC5yaWdodElzQXJyYXkpIHtcbiAgICBjb250ZXh0LnNldFJlc3VsdChbY29udGV4dC5sZWZ0LCBjb250ZXh0LnJpZ2h0XSkuZXhpdCgpO1xuICAgIHJldHVybjtcbiAgfVxufTtcbmRpZmZGaWx0ZXIuZmlsdGVyTmFtZSA9ICd0cml2aWFsJztcblxudmFyIHBhdGNoRmlsdGVyID0gZnVuY3Rpb24gdHJpdmlhbE1hdGNoZXNQYXRjaEZpbHRlcihjb250ZXh0KSB7XG4gIGlmICh0eXBlb2YgY29udGV4dC5kZWx0YSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBjb250ZXh0LnNldFJlc3VsdChjb250ZXh0LmxlZnQpLmV4aXQoKTtcbiAgICByZXR1cm47XG4gIH1cbiAgY29udGV4dC5uZXN0ZWQgPSAhaXNBcnJheShjb250ZXh0LmRlbHRhKTtcbiAgaWYgKGNvbnRleHQubmVzdGVkKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChjb250ZXh0LmRlbHRhLmxlbmd0aCA9PT0gMSkge1xuICAgIGNvbnRleHQuc2V0UmVzdWx0KGNvbnRleHQuZGVsdGFbMF0pLmV4aXQoKTtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKGNvbnRleHQuZGVsdGEubGVuZ3RoID09PSAyKSB7XG4gICAgY29udGV4dC5zZXRSZXN1bHQoY29udGV4dC5kZWx0YVsxXSkuZXhpdCgpO1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoY29udGV4dC5kZWx0YS5sZW5ndGggPT09IDMgJiYgY29udGV4dC5kZWx0YVsyXSA9PT0gMCkge1xuICAgIGNvbnRleHQuc2V0UmVzdWx0KHVuZGVmaW5lZCkuZXhpdCgpO1xuICAgIHJldHVybjtcbiAgfVxufTtcbnBhdGNoRmlsdGVyLmZpbHRlck5hbWUgPSAndHJpdmlhbCc7XG5cbnZhciByZXZlcnNlRmlsdGVyID0gZnVuY3Rpb24gdHJpdmlhbFJlZmVyc2VGaWx0ZXIoY29udGV4dCkge1xuICBpZiAodHlwZW9mIGNvbnRleHQuZGVsdGEgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgY29udGV4dC5zZXRSZXN1bHQoY29udGV4dC5kZWx0YSkuZXhpdCgpO1xuICAgIHJldHVybjtcbiAgfVxuICBjb250ZXh0Lm5lc3RlZCA9ICFpc0FycmF5KGNvbnRleHQuZGVsdGEpO1xuICBpZiAoY29udGV4dC5uZXN0ZWQpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKGNvbnRleHQuZGVsdGEubGVuZ3RoID09PSAxKSB7XG4gICAgY29udGV4dC5zZXRSZXN1bHQoW2NvbnRleHQuZGVsdGFbMF0sIDAsIDBdKS5leGl0KCk7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChjb250ZXh0LmRlbHRhLmxlbmd0aCA9PT0gMikge1xuICAgIGNvbnRleHQuc2V0UmVzdWx0KFtjb250ZXh0LmRlbHRhWzFdLCBjb250ZXh0LmRlbHRhWzBdXSkuZXhpdCgpO1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoY29udGV4dC5kZWx0YS5sZW5ndGggPT09IDMgJiYgY29udGV4dC5kZWx0YVsyXSA9PT0gMCkge1xuICAgIGNvbnRleHQuc2V0UmVzdWx0KFtjb250ZXh0LmRlbHRhWzBdXSkuZXhpdCgpO1xuICAgIHJldHVybjtcbiAgfVxufTtcbnJldmVyc2VGaWx0ZXIuZmlsdGVyTmFtZSA9ICd0cml2aWFsJztcblxuZXhwb3J0cy5kaWZmRmlsdGVyID0gZGlmZkZpbHRlcjtcbmV4cG9ydHMucGF0Y2hGaWx0ZXIgPSBwYXRjaEZpbHRlcjtcbmV4cG9ydHMucmV2ZXJzZUZpbHRlciA9IHJldmVyc2VGaWx0ZXI7XG4iLCJcbnZhciBlbnZpcm9ubWVudCA9IHJlcXVpcmUoJy4vZW52aXJvbm1lbnQnKTtcblxudmFyIERpZmZQYXRjaGVyID0gcmVxdWlyZSgnLi9kaWZmcGF0Y2hlcicpLkRpZmZQYXRjaGVyO1xuZXhwb3J0cy5EaWZmUGF0Y2hlciA9IERpZmZQYXRjaGVyO1xuXG5leHBvcnRzLmNyZWF0ZSA9IGZ1bmN0aW9uKG9wdGlvbnMpe1xuXHRyZXR1cm4gbmV3IERpZmZQYXRjaGVyKG9wdGlvbnMpO1xufTtcblxuZXhwb3J0cy5kYXRlUmV2aXZlciA9IHJlcXVpcmUoJy4vZGF0ZS1yZXZpdmVyJyk7XG5cbnZhciBkZWZhdWx0SW5zdGFuY2U7XG5cbmV4cG9ydHMuZGlmZiA9IGZ1bmN0aW9uKCkge1xuXHRpZiAoIWRlZmF1bHRJbnN0YW5jZSkge1xuXHRcdGRlZmF1bHRJbnN0YW5jZSA9IG5ldyBEaWZmUGF0Y2hlcigpO1xuXHR9XG5cdHJldHVybiBkZWZhdWx0SW5zdGFuY2UuZGlmZi5hcHBseShkZWZhdWx0SW5zdGFuY2UsIGFyZ3VtZW50cyk7XG59O1xuXG5leHBvcnRzLnBhdGNoID0gZnVuY3Rpb24oKSB7XG5cdGlmICghZGVmYXVsdEluc3RhbmNlKSB7XG5cdFx0ZGVmYXVsdEluc3RhbmNlID0gbmV3IERpZmZQYXRjaGVyKCk7XG5cdH1cblx0cmV0dXJuIGRlZmF1bHRJbnN0YW5jZS5wYXRjaC5hcHBseShkZWZhdWx0SW5zdGFuY2UsIGFyZ3VtZW50cyk7XG59O1xuXG5leHBvcnRzLnVucGF0Y2ggPSBmdW5jdGlvbigpIHtcblx0aWYgKCFkZWZhdWx0SW5zdGFuY2UpIHtcblx0XHRkZWZhdWx0SW5zdGFuY2UgPSBuZXcgRGlmZlBhdGNoZXIoKTtcblx0fVxuXHRyZXR1cm4gZGVmYXVsdEluc3RhbmNlLnVucGF0Y2guYXBwbHkoZGVmYXVsdEluc3RhbmNlLCBhcmd1bWVudHMpO1xufTtcblxuZXhwb3J0cy5yZXZlcnNlID0gZnVuY3Rpb24oKSB7XG5cdGlmICghZGVmYXVsdEluc3RhbmNlKSB7XG5cdFx0ZGVmYXVsdEluc3RhbmNlID0gbmV3IERpZmZQYXRjaGVyKCk7XG5cdH1cblx0cmV0dXJuIGRlZmF1bHRJbnN0YW5jZS5yZXZlcnNlLmFwcGx5KGRlZmF1bHRJbnN0YW5jZSwgYXJndW1lbnRzKTtcbn07XG5cbmlmIChlbnZpcm9ubWVudC5pc0Jyb3dzZXIpIHtcblx0ZXhwb3J0cy5ob21lcGFnZSA9ICd7e3BhY2thZ2UtaG9tZXBhZ2V9fSc7XG5cdGV4cG9ydHMudmVyc2lvbiA9ICd7e3BhY2thZ2UtdmVyc2lvbn19Jztcbn0gZWxzZSB7XG5cdHZhciBwYWNrYWdlSW5mb01vZHVsZU5hbWUgPSAnLi4vcGFja2FnZS5qc29uJztcblx0dmFyIHBhY2thZ2VJbmZvID0gcmVxdWlyZShwYWNrYWdlSW5mb01vZHVsZU5hbWUpO1xuXHRleHBvcnRzLmhvbWVwYWdlID0gcGFja2FnZUluZm8uaG9tZXBhZ2U7XG5cdGV4cG9ydHMudmVyc2lvbiA9IHBhY2thZ2VJbmZvLnZlcnNpb247XG5cblx0dmFyIGZvcm1hdHRlck1vZHVsZU5hbWUgPSAnLi9mb3JtYXR0ZXJzJztcblx0dmFyIGZvcm1hdHRlcnMgPSByZXF1aXJlKGZvcm1hdHRlck1vZHVsZU5hbWUpO1xuXHRleHBvcnRzLmZvcm1hdHRlcnMgPSBmb3JtYXR0ZXJzO1xuXHQvLyBzaG9ydGN1dCBmb3IgY29uc29sZVxuXHRleHBvcnRzLmNvbnNvbGUgPSBmb3JtYXR0ZXJzLmNvbnNvbGU7XG59XG4iLCJ2YXIgUGlwZSA9IGZ1bmN0aW9uIFBpcGUobmFtZSkge1xuICB0aGlzLm5hbWUgPSBuYW1lO1xuICB0aGlzLmZpbHRlcnMgPSBbXTtcbn07XG5cblBpcGUucHJvdG90eXBlLnByb2Nlc3MgPSBmdW5jdGlvbihpbnB1dCkge1xuICBpZiAoIXRoaXMucHJvY2Vzc29yKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdhZGQgdGhpcyBwaXBlIHRvIGEgcHJvY2Vzc29yIGJlZm9yZSB1c2luZyBpdCcpO1xuICB9XG4gIHZhciBkZWJ1ZyA9IHRoaXMuZGVidWc7XG4gIHZhciBsZW5ndGggPSB0aGlzLmZpbHRlcnMubGVuZ3RoO1xuICB2YXIgY29udGV4dCA9IGlucHV0O1xuICBmb3IgKHZhciBpbmRleCA9IDA7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgdmFyIGZpbHRlciA9IHRoaXMuZmlsdGVyc1tpbmRleF07XG4gICAgaWYgKGRlYnVnKSB7XG4gICAgICB0aGlzLmxvZygnZmlsdGVyOiAnICsgZmlsdGVyLmZpbHRlck5hbWUpO1xuICAgIH1cbiAgICBmaWx0ZXIoY29udGV4dCk7XG4gICAgaWYgKHR5cGVvZiBjb250ZXh0ID09PSAnb2JqZWN0JyAmJiBjb250ZXh0LmV4aXRpbmcpIHtcbiAgICAgIGNvbnRleHQuZXhpdGluZyA9IGZhbHNlO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIGlmICghY29udGV4dC5uZXh0ICYmIHRoaXMucmVzdWx0Q2hlY2spIHtcbiAgICB0aGlzLnJlc3VsdENoZWNrKGNvbnRleHQpO1xuICB9XG59O1xuXG5QaXBlLnByb3RvdHlwZS5sb2cgPSBmdW5jdGlvbihtc2cpIHtcbiAgY29uc29sZS5sb2coJ1tqc29uZGlmZnBhdGNoXSAnICsgdGhpcy5uYW1lICsgJyBwaXBlLCAnICsgbXNnKTtcbn07XG5cblBpcGUucHJvdG90eXBlLmFwcGVuZCA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmZpbHRlcnMucHVzaC5hcHBseSh0aGlzLmZpbHRlcnMsIGFyZ3VtZW50cyk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuUGlwZS5wcm90b3R5cGUucHJlcGVuZCA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmZpbHRlcnMudW5zaGlmdC5hcHBseSh0aGlzLmZpbHRlcnMsIGFyZ3VtZW50cyk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuUGlwZS5wcm90b3R5cGUuaW5kZXhPZiA9IGZ1bmN0aW9uKGZpbHRlck5hbWUpIHtcbiAgaWYgKCFmaWx0ZXJOYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdhIGZpbHRlciBuYW1lIGlzIHJlcXVpcmVkJyk7XG4gIH1cbiAgZm9yICh2YXIgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuZmlsdGVycy5sZW5ndGg7IGluZGV4KyspIHtcbiAgICB2YXIgZmlsdGVyID0gdGhpcy5maWx0ZXJzW2luZGV4XTtcbiAgICBpZiAoZmlsdGVyLmZpbHRlck5hbWUgPT09IGZpbHRlck5hbWUpIHtcbiAgICAgIHJldHVybiBpbmRleDtcbiAgICB9XG4gIH1cbiAgdGhyb3cgbmV3IEVycm9yKCdmaWx0ZXIgbm90IGZvdW5kOiAnICsgZmlsdGVyTmFtZSk7XG59O1xuXG5QaXBlLnByb3RvdHlwZS5saXN0ID0gZnVuY3Rpb24oKSB7XG4gIHZhciBuYW1lcyA9IFtdO1xuICBmb3IgKHZhciBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5maWx0ZXJzLmxlbmd0aDsgaW5kZXgrKykge1xuICAgIHZhciBmaWx0ZXIgPSB0aGlzLmZpbHRlcnNbaW5kZXhdO1xuICAgIG5hbWVzLnB1c2goZmlsdGVyLmZpbHRlck5hbWUpO1xuICB9XG4gIHJldHVybiBuYW1lcztcbn07XG5cblBpcGUucHJvdG90eXBlLmFmdGVyID0gZnVuY3Rpb24oZmlsdGVyTmFtZSkge1xuICB2YXIgaW5kZXggPSB0aGlzLmluZGV4T2YoZmlsdGVyTmFtZSk7XG4gIHZhciBwYXJhbXMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuICBpZiAoIXBhcmFtcy5sZW5ndGgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2EgZmlsdGVyIGlzIHJlcXVpcmVkJyk7XG4gIH1cbiAgcGFyYW1zLnVuc2hpZnQoaW5kZXggKyAxLCAwKTtcbiAgQXJyYXkucHJvdG90eXBlLnNwbGljZS5hcHBseSh0aGlzLmZpbHRlcnMsIHBhcmFtcyk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuUGlwZS5wcm90b3R5cGUuYmVmb3JlID0gZnVuY3Rpb24oZmlsdGVyTmFtZSkge1xuICB2YXIgaW5kZXggPSB0aGlzLmluZGV4T2YoZmlsdGVyTmFtZSk7XG4gIHZhciBwYXJhbXMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuICBpZiAoIXBhcmFtcy5sZW5ndGgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2EgZmlsdGVyIGlzIHJlcXVpcmVkJyk7XG4gIH1cbiAgcGFyYW1zLnVuc2hpZnQoaW5kZXgsIDApO1xuICBBcnJheS5wcm90b3R5cGUuc3BsaWNlLmFwcGx5KHRoaXMuZmlsdGVycywgcGFyYW1zKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5QaXBlLnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmZpbHRlcnMubGVuZ3RoID0gMDtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5QaXBlLnByb3RvdHlwZS5zaG91bGRIYXZlUmVzdWx0ID0gZnVuY3Rpb24oc2hvdWxkKSB7XG4gIGlmIChzaG91bGQgPT09IGZhbHNlKSB7XG4gICAgdGhpcy5yZXN1bHRDaGVjayA9IG51bGw7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmICh0aGlzLnJlc3VsdENoZWNrKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciBwaXBlID0gdGhpcztcbiAgdGhpcy5yZXN1bHRDaGVjayA9IGZ1bmN0aW9uKGNvbnRleHQpIHtcbiAgICBpZiAoIWNvbnRleHQuaGFzUmVzdWx0KSB7XG4gICAgICBjb25zb2xlLmxvZyhjb250ZXh0KTtcbiAgICAgIHZhciBlcnJvciA9IG5ldyBFcnJvcihwaXBlLm5hbWUgKyAnIGZhaWxlZCcpO1xuICAgICAgZXJyb3Iubm9SZXN1bHQgPSB0cnVlO1xuICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxuICB9O1xuICByZXR1cm4gdGhpcztcbn07XG5cbmV4cG9ydHMuUGlwZSA9IFBpcGU7XG4iLCJcbnZhciBQcm9jZXNzb3IgPSBmdW5jdGlvbiBQcm9jZXNzb3Iob3B0aW9ucyl7XG5cdHRoaXMuc2VsZk9wdGlvbnMgPSBvcHRpb25zO1xuXHR0aGlzLnBpcGVzID0ge307XG59O1xuXG5Qcm9jZXNzb3IucHJvdG90eXBlLm9wdGlvbnMgPSBmdW5jdGlvbihvcHRpb25zKSB7XG5cdGlmIChvcHRpb25zKSB7XG5cdFx0dGhpcy5zZWxmT3B0aW9ucyA9IG9wdGlvbnM7XG5cdH1cblx0cmV0dXJuIHRoaXMuc2VsZk9wdGlvbnM7XG59O1xuXG5Qcm9jZXNzb3IucHJvdG90eXBlLnBpcGUgPSBmdW5jdGlvbihuYW1lLCBwaXBlKSB7XG5cdGlmICh0eXBlb2YgbmFtZSA9PT0gJ3N0cmluZycpIHtcblx0XHRpZiAodHlwZW9mIHBpcGUgPT09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5waXBlc1tuYW1lXTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5waXBlc1tuYW1lXSA9IHBpcGU7XG5cdFx0fVxuXHR9XG5cdGlmIChuYW1lICYmIG5hbWUubmFtZSkge1xuXHRcdHBpcGUgPSBuYW1lO1xuXHRcdGlmIChwaXBlLnByb2Nlc3NvciA9PT0gdGhpcykgeyByZXR1cm4gcGlwZTsgfVxuXHRcdHRoaXMucGlwZXNbcGlwZS5uYW1lXSA9IHBpcGU7XG5cdH1cblx0cGlwZS5wcm9jZXNzb3IgPSB0aGlzO1xuXHRyZXR1cm4gcGlwZTtcbn07XG5cblByb2Nlc3Nvci5wcm90b3R5cGUucHJvY2VzcyA9IGZ1bmN0aW9uKGlucHV0LCBwaXBlKSB7XG5cdHZhciBjb250ZXh0ID0gaW5wdXQ7XG5cdGNvbnRleHQub3B0aW9ucyA9IHRoaXMub3B0aW9ucygpO1xuXHR2YXIgbmV4dFBpcGUgPSBwaXBlIHx8IGlucHV0LnBpcGUgfHwgJ2RlZmF1bHQnO1xuXHR2YXIgbGFzdFBpcGUsIGxhc3RDb250ZXh0O1xuXHR3aGlsZSAobmV4dFBpcGUpIHtcblx0XHRpZiAodHlwZW9mIGNvbnRleHQubmV4dEFmdGVyQ2hpbGRyZW4gIT09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHQvLyBjaGlsZHJlbiBwcm9jZXNzZWQgYW5kIGNvbWluZyBiYWNrIHRvIHBhcmVudFxuXHRcdFx0Y29udGV4dC5uZXh0ID0gY29udGV4dC5uZXh0QWZ0ZXJDaGlsZHJlbjtcblx0XHRcdGNvbnRleHQubmV4dEFmdGVyQ2hpbGRyZW4gPSBudWxsO1xuXHRcdH1cblxuXHRcdGlmICh0eXBlb2YgbmV4dFBpcGUgPT09ICdzdHJpbmcnKSB7XG5cdFx0XHRuZXh0UGlwZSA9IHRoaXMucGlwZShuZXh0UGlwZSk7XG5cdFx0fVxuXHRcdG5leHRQaXBlLnByb2Nlc3MoY29udGV4dCk7XG5cdFx0bGFzdENvbnRleHQgPSBjb250ZXh0O1xuXHRcdGxhc3RQaXBlID0gbmV4dFBpcGU7XG5cdFx0bmV4dFBpcGUgPSBudWxsO1xuXHRcdGlmIChjb250ZXh0KSB7XG5cdFx0XHRpZiAoY29udGV4dC5uZXh0KSB7XG5cdFx0XHRcdGNvbnRleHQgPSBjb250ZXh0Lm5leHQ7XG5cdFx0XHRcdG5leHRQaXBlID0gbGFzdENvbnRleHQubmV4dFBpcGUgfHwgY29udGV4dC5waXBlIHx8IGxhc3RQaXBlO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRyZXR1cm4gY29udGV4dC5oYXNSZXN1bHQgPyBjb250ZXh0LnJlc3VsdCA6IHVuZGVmaW5lZDtcbn07XG5cbmV4cG9ydHMuUHJvY2Vzc29yID0gUHJvY2Vzc29yO1xuIl19
                                                                                                                   // 3493
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['benjamine:jsondiffpatch'] = {};

})();

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
var Blaze = Package.ui.Blaze;
var UI = Package.ui.UI;
var Handlebars = Package.ui.Handlebars;
var Spacebars = Package.spacebars.Spacebars;
var Template = Package.templating.Template;
var HTML = Package.htmljs.HTML;

(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                             //
// packages/dotansimha_accounts-ui-angular/accounts-ui-angular.js                              //
//                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                               //
if (!angular) {                                                                                // 1
  throw 'AngularJS could not be found, please load the `angular` package in the root project!'
}                                                                                              // 3
else {                                                                                         // 4
  angular.module('accounts.ui', []);                                                           // 5
}                                                                                              // 6
/////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                             //
// packages/dotansimha_accounts-ui-angular/login-buttons-directive.js                          //
//                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                               //
angular.module('accounts.ui').directive('loginButtons', function() {                           // 1
  return {                                                                                     // 2
    restrict: 'EA',                                                                            // 3
    scope: true,                                                                               // 4
    template: '<div></div>',                                                                   // 5
    link: function(scope, element) {                                                           // 6
      Blaze.render(Template.loginButtons, element[0]);                                         // 7
    }                                                                                          // 8
  }                                                                                            // 9
});                                                                                            // 10
/////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['dotansimha:accounts-ui-angular'] = {};

})();

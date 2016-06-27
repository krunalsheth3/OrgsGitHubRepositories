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

///////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                           //
// packages/angular-templates/templates-handler.js                                           //
//                                                                                           //
///////////////////////////////////////////////////////////////////////////////////////////////
                                                                                             //
if (!window.angular) {                                                                       // 1
  try {                                                                                      // 2
    if (Package['modules-runtime']) {                                                        // 3
      var require = Package['modules-runtime'].meteorInstall();                              // 4
      require('angular');                                                                    // 5
    }                                                                                        // 6
  } catch(e) {                                                                               // 7
    throw new Error('angular package is missing');                                           // 8
  }                                                                                          // 9
}                                                                                            // 10
                                                                                             // 11
angular.module('angular-templates', []).config([                                             // 12
  '$provide',                                                                                // 13
  function ($provide) {                                                                      // 14
    var templatesFileExtension = ['html', 'tpl', 'tmpl', 'template', 'view'];                // 15
                                                                                             // 16
    $provide.decorator('$templateCache', ['$delegate', '$angularTemplatesSettings',          // 17
      function($delegate, $angularTemplatesSettings) {                                       // 18
        var originalGet = $delegate.get;                                                     // 19
                                                                                             // 20
        $delegate.get = function(templatePath) {                                             // 21
          var originalResult = originalGet(templatePath);                                    // 22
                                                                                             // 23
          if (angular.isUndefined(originalResult)) {                                         // 24
            var fileExtension = ((templatePath.split('.') || []).pop() || '').toLowerCase();
                                                                                             // 26
            if (templatesFileExtension.indexOf(fileExtension) > -1) {                        // 27
              function getMsg(type) {                                                        // 28
                return '[angular-meteor][err][404] ' + templatePath + ' - HTML template does not exists! You can disable this ' + type + ' by following this guide http://www.angular-meteor.com/api/1.3.11/templates';
              }                                                                              // 30
                                                                                             // 31
              if ($angularTemplatesSettings.error === true) {                                // 32
                throw new Error(getMsg('error'));                                            // 33
              } else if ($angularTemplatesSettings.warning === true) {                       // 34
                console.warn(getMsg('warning'));                                             // 35
              }                                                                              // 36
            }                                                                                // 37
          }                                                                                  // 38
                                                                                             // 39
          return originalResult;                                                             // 40
        };                                                                                   // 41
                                                                                             // 42
        return $delegate;                                                                    // 43
    }]);                                                                                     // 44
  }                                                                                          // 45
]).constant('$angularTemplatesSettings', {                                                   // 46
  error: true,                                                                               // 47
  warning: true                                                                              // 48
});;                                                                                         // 49
                                                                                             // 50
///////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['angular-templates'] = {};

})();

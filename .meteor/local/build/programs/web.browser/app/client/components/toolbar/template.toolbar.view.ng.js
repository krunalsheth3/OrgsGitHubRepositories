(function(){
  var templateUrl = "client/components/toolbar/toolbar.view.ng.html";
  angular.module('angular-templates')
    .run(['$templateCache', function($templateCache) {
      $templateCache.put(templateUrl, "<div layout=\"\" data-ng-cloak> <md-sidenav class=\"md-sidenav-left md-whiteframe-z2\" md-component-id=\"left\" md-is-locked-open=\"false\"> <md-toolbar class=\"md-tall md-hue-2\"> <span flex></span> <div layout=\"column\" class=\"md-toolbar-tools-bottom inset\"> <div class=\"avatarParent\"> <user-avatar></user-avatar> </div> <span></span> <div> <blaze-template name=\"loginButtons\"></blaze-template> </div> </div> </md-toolbar> </md-sidenav> <div layout=\"column\" class=\"relative\" layout-fill role=\"main\"> <md-toolbar> <div class=\"md-toolbar-tools\"> <md-button class=\"md-icon-button\" hide-gt-md aria-label=\"”Menu”\" data-ng-click=\"toggleSidenav('left')\"> <md-icon class=\"md-default-theme material-icons\"> <i class=\"material-icons\">line_weight</i> </md-icon> </md-button> <md-button class=\"md-button\" aria-label=\"Icon\" data-ng-click=\"navigateToJustPage('/')\"> <md-tooltip>Provides list of all organizations repositories & commits</md-tooltip> <md-icon> <i class=\"material-icons\">home</i> </md-icon> <span> <span>Organizations Repositories</span> </span> </md-button> <span flex></span> <md-button class=\"md-icon-button\" aria-label=\"About project\" ng-click=\"navigateToJustPage('/about')\"> <md-tooltip>About project</md-tooltip> <md-icon> <i class=\"material-icons\">face</i> </md-icon> </md-button> <md-button class=\"md-icon-button\" aria-label=\"GitHub\" ng-click=\"goToGitHub()\"> <md-tooltip>GitHub</md-tooltip> <md-icon> <i class=\"material-icons\">whatshot</i> </md-icon> </md-button> </div> </md-toolbar> </div> </div>");
    }]);
  if (typeof exports !== 'undefined') {
    exports.__esModule = true;
    exports.default = templateUrl;
  }
  
}).call(this);
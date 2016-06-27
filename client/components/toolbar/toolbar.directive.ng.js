'use strict'

angular.module('orgReposApp')
.directive('toolbar',['$rootScope','$window', '$mdSidenav','$location', function($rootScope, $window, $mdSidenav, $location) {
  return {
    restrict: 'AE',
    templateUrl: 'client/components/toolbar/toolbar.view.ng.html',
    replace: false,
    link: function($scope, iElm, iAttrs, controller) {
      $scope.showErrorMessage = false;

      /*
       *   To toggle the slide Nav in and out
       */
      $scope.toggleSidenav = function(menuId) {
        $mdSidenav(menuId).toggle();
      };

      $scope.goToGitHub = function() {
        $window.location.href = "https://github.com/";
      }

      /*
       *  Page navigation to Just page
       */
      $scope.navigateToJustPage = function(link) {
        $location.path(link);
      }


    }
  };
}]);

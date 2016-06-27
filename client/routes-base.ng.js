'use strict';

angular.module('orgReposApp')

.config(function($urlRouterProvider, $locationProvider, $mdThemingProvider) {
  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/');

  

}).run(['$rootScope', '$state', function($rootScope, $state) {
  $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
    switch(error) {
      case 'AUTH_REQUIRED':
      case 'FORBIDDEN':
      case 'UNAUTHORIZED':
        $state.go('main');
        break;
    }
  });
}])


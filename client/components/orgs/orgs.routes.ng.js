'use strict'

angular.module('orgReposApp')
.config(function($stateProvider) {
  $stateProvider
  .state('orgs', {
    url: '/',
    templateUrl: 'client/components/orgs/orgs.view.ng.html',
    controller: 'OrgsCtrl'
  });
});
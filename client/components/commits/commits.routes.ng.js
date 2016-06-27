'use strict'

angular.module('orgReposApp')
.config(function($stateProvider) {
  $stateProvider
      .state('commits-list', {
        url: '/repos/:orgName/:repoName/commits',
        templateUrl: 'client/components/commits/commits-list.view.ng.html',
        controller: 'CommitsListCtrl'
      })
 
});
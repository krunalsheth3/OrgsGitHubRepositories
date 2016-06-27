'use strict'

angular.module('orgReposApp')
.config(function($stateProvider) {
  $stateProvider
  .state('repos-list', {
    url: '/repos/:repoId',
    templateUrl: 'client/components/repos/repos-list.view.ng.html',
    controller: 'ReposListCtrl'
  })
});
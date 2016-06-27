'use strict'

angular.module('orgReposApp')
.controller('CommitsListCtrl', function($scope, $meteor, $stateParams) {
  $scope.page = 1;
  $scope.perPage = 3;
  $scope.sort = {name_sort : 1};
  $scope.orderProperty = '1';


  /*
   * Fetch the list of commits for of that particular repo
   */
  $meteor.call('fetchCommits',$stateParams.orgName, $stateParams.repoName).then(
      function(data) {
        console.log(data);
        $scope.commits = data;
      },
      function(err) {
        console.log("Error in fetchRepos");
      }
  );

})

/*
 * Filter to perform limit to description text in Unified Dashboard
 */
.filter('serviceInfoLimit', function() {
  return function(input) {
    if(input.length > 100) {
      return input.substr(0, 100) + "<span id='filterMore'> ...</span>";
    } else {
      return input;
    }
  }

})
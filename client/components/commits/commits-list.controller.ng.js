'use strict'

angular.module('orgReposApp')
.controller('CommitsListCtrl', function($scope, $meteor, $stateParams) {
  $scope.page = 1;
  $scope.perPage = 3;
  $scope.sort = {name_sort : 1};
  $scope.orderProperty = '1';


    $scope.showIndicator = true;
  /*
   * Fetch the list of commits for of that particular repo
   */
  $meteor.call('fetchCommits',$stateParams.orgName, $stateParams.repoName).then(
      function(data) {
          $scope.showIndicator = false;
        console.log(data);
        $scope.commits = data;
      },
      function(err) {
          $scope.showIndicator = false;
        console.log("Error in fetchRepos");
      }
  );

})

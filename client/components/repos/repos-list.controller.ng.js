'use strict'

angular.module('orgReposApp')
.controller('ReposListCtrl', function($scope, $stateParams, $meteor) {
  $scope.page = 1;
  $scope.perPage = 5;
  $scope.orderProperty = '1';
  $scope.organizationId = $stateParams.repoId;
  $scope.sortType     = 'forks_count'; // set the default sort type
  $scope.sortReverse  = true;
  $scope.defaultSortOrder = "Forks count: High to Low";


  /*
  * Sort the data by its type and by ascending or descending order
  * type: forks_count, stargazers_count, watchers_count
   */
  $scope.sortRepos = function(type, val) {
    $scope.sortType     = type;
    $scope.sortReverse = val;
  }

  /*
   * Fetch the details of that particular ID
   */
    $scope.showIndicator = true;
  $meteor.call('fetchRepos',$stateParams.repoId).then(
      function(data) {
          $scope.showIndicator = false;
        console.log(data);
        $scope.repositories = data;
      },
      function(err) {
          $scope.showIndicator = false;
        console.log("Error in fetchRepos");
      }
  );

  // $scope.helpers({
  //   repo: function() {
  //     return Repos.findOne({ _id: $stateParams.repoId });
  //   }
  // });

  // $scope.helpers({
  //   repos: function() {
  //     return Repos.find({}, {
  //       sort: $scope.getReactively('sort')
  //     });
  //   },
  //   reposCount: function() {
  //     return Counts.get('numberOfRepos');
  //   }
  // });
  //
  // $scope.subscribe('repos', function() {
  //   return [{
  //     sort: $scope.getReactively('sort'),
  //     limit: parseInt($scope.getReactively('perPage')),
  //     skip: ((parseInt($scope.getReactively('page'))) - 1) * (parseInt($scope.getReactively('perPage')))
  //   }, $scope.getReactively('search')];
  // });


  // $scope.pageChanged = function(newPage) {
  //   $scope.page = newPage;
  // };
  //
  // return $scope.$watch('orderProperty', function() {
  //   if ($scope.orderProperty) {
  //     $scope.sort = {
  //       name_sort: parseInt($scope.orderProperty)
  //     };
  //   }
  // });
});
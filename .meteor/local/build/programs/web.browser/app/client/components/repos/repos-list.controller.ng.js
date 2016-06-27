(function(){'use strict';

angular.module('orgReposApp').controller('ReposListCtrl', ["$scope", "$stateParams", "$meteor", function ($scope, $stateParams, $meteor) {
  $scope.page = 1;
  $scope.perPage = 5;
  $scope.orderProperty = '1';
  $scope.organizationId = $stateParams.repoId;
  $scope.sortType = 'forks_count'; // set the default sort type
  $scope.sortReverse = true;
  $scope.defaultSortOrder = "Forks count: High to Low";

  /*
  * Sort the data by its type and by ascending or descending order
  * type: forks_count, stargazers_count, watchers_count
   */
  $scope.sortRepos = function (type, val) {
    $scope.sortType = type;
    $scope.sortReverse = val;
  };

  /*
   * Fetch the details of that particular ID
   */
  $meteor.call('fetchRepos', $stateParams.repoId).then(function (data) {
    console.log(data);
    $scope.repositories = data;
  }, function (err) {
    console.log("Error in fetchRepos");
  });

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
}]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9jbGllbnQvY29tcG9uZW50cy9yZXBvcy9yZXBvcy1saXN0LmNvbnRyb2xsZXIubmcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFBOztBQUVaLE9BQU8sQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQzVCLFVBQVUsQ0FBQyxlQUFlLEVBQUUsVUFBUyxNQUFNLEVBQUUsWUFBWSxFQUFFLE9BQU8sRUFBRTtBQUNuRSxRQUFNLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQztBQUNoQixRQUFNLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQztBQUNuQixRQUFNLENBQUMsYUFBYSxHQUFHLEdBQUcsQ0FBQztBQUMzQixRQUFNLENBQUMsY0FBYyxHQUFHLFlBQVksQ0FBQyxNQUFNLENBQUM7QUFDNUMsUUFBTSxDQUFDLFFBQVEsR0FBTyxhQUFhLENBQUM7QUFDcEMsUUFBTSxDQUFDLFdBQVcsR0FBSSxJQUFJLENBQUM7QUFDM0IsUUFBTSxDQUFDLGdCQUFnQixHQUFHLDBCQUEwQixDQUFDOzs7Ozs7QUFPckQsUUFBTSxDQUFDLFNBQVMsR0FBRyxVQUFTLElBQUksRUFBRSxHQUFHLEVBQUU7QUFDckMsVUFBTSxDQUFDLFFBQVEsR0FBTyxJQUFJLENBQUM7QUFDM0IsVUFBTSxDQUFDLFdBQVcsR0FBRyxHQUFHLENBQUM7R0FDMUIsQ0FBQTs7Ozs7QUFLRCxTQUFPLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUMvQyxVQUFTLElBQUksRUFBRTtBQUNiLFdBQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDbEIsVUFBTSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7R0FDNUIsRUFDRCxVQUFTLEdBQUcsRUFBRTtBQUNaLFdBQU8sQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUMsQ0FBQztHQUNwQyxDQUNKLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBdUNILENBQUMsQ0FBQyIsImZpbGUiOiIvY2xpZW50L2NvbXBvbmVudHMvcmVwb3MvcmVwb3MtbGlzdC5jb250cm9sbGVyLm5nLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnXHJcblxyXG5hbmd1bGFyLm1vZHVsZSgnb3JnUmVwb3NBcHAnKVxyXG4uY29udHJvbGxlcignUmVwb3NMaXN0Q3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgJHN0YXRlUGFyYW1zLCAkbWV0ZW9yKSB7XHJcbiAgJHNjb3BlLnBhZ2UgPSAxO1xyXG4gICRzY29wZS5wZXJQYWdlID0gNTtcclxuICAkc2NvcGUub3JkZXJQcm9wZXJ0eSA9ICcxJztcclxuICAkc2NvcGUub3JnYW5pemF0aW9uSWQgPSAkc3RhdGVQYXJhbXMucmVwb0lkO1xyXG4gICRzY29wZS5zb3J0VHlwZSAgICAgPSAnZm9ya3NfY291bnQnOyAvLyBzZXQgdGhlIGRlZmF1bHQgc29ydCB0eXBlXHJcbiAgJHNjb3BlLnNvcnRSZXZlcnNlICA9IHRydWU7XHJcbiAgJHNjb3BlLmRlZmF1bHRTb3J0T3JkZXIgPSBcIkZvcmtzIGNvdW50OiBIaWdoIHRvIExvd1wiO1xyXG5cclxuXHJcbiAgLypcclxuICAqIFNvcnQgdGhlIGRhdGEgYnkgaXRzIHR5cGUgYW5kIGJ5IGFzY2VuZGluZyBvciBkZXNjZW5kaW5nIG9yZGVyXHJcbiAgKiB0eXBlOiBmb3Jrc19jb3VudCwgc3RhcmdhemVyc19jb3VudCwgd2F0Y2hlcnNfY291bnRcclxuICAgKi9cclxuICAkc2NvcGUuc29ydFJlcG9zID0gZnVuY3Rpb24odHlwZSwgdmFsKSB7XHJcbiAgICAkc2NvcGUuc29ydFR5cGUgICAgID0gdHlwZTtcclxuICAgICRzY29wZS5zb3J0UmV2ZXJzZSA9IHZhbDtcclxuICB9XHJcblxyXG4gIC8qXHJcbiAgICogRmV0Y2ggdGhlIGRldGFpbHMgb2YgdGhhdCBwYXJ0aWN1bGFyIElEXHJcbiAgICovXHJcbiAgJG1ldGVvci5jYWxsKCdmZXRjaFJlcG9zJywkc3RhdGVQYXJhbXMucmVwb0lkKS50aGVuKFxyXG4gICAgICBmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XHJcbiAgICAgICAgJHNjb3BlLnJlcG9zaXRvcmllcyA9IGRhdGE7XHJcbiAgICAgIH0sXHJcbiAgICAgIGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgaW4gZmV0Y2hSZXBvc1wiKTtcclxuICAgICAgfVxyXG4gICk7XHJcbiAgICBcclxuICAvLyAkc2NvcGUuaGVscGVycyh7XHJcbiAgLy8gICByZXBvOiBmdW5jdGlvbigpIHtcclxuICAvLyAgICAgcmV0dXJuIFJlcG9zLmZpbmRPbmUoeyBfaWQ6ICRzdGF0ZVBhcmFtcy5yZXBvSWQgfSk7XHJcbiAgLy8gICB9XHJcbiAgLy8gfSk7XHJcblxyXG4gIC8vICRzY29wZS5oZWxwZXJzKHtcclxuICAvLyAgIHJlcG9zOiBmdW5jdGlvbigpIHtcclxuICAvLyAgICAgcmV0dXJuIFJlcG9zLmZpbmQoe30sIHtcclxuICAvLyAgICAgICBzb3J0OiAkc2NvcGUuZ2V0UmVhY3RpdmVseSgnc29ydCcpXHJcbiAgLy8gICAgIH0pO1xyXG4gIC8vICAgfSxcclxuICAvLyAgIHJlcG9zQ291bnQ6IGZ1bmN0aW9uKCkge1xyXG4gIC8vICAgICByZXR1cm4gQ291bnRzLmdldCgnbnVtYmVyT2ZSZXBvcycpO1xyXG4gIC8vICAgfVxyXG4gIC8vIH0pO1xyXG4gIC8vXHJcbiAgLy8gJHNjb3BlLnN1YnNjcmliZSgncmVwb3MnLCBmdW5jdGlvbigpIHtcclxuICAvLyAgIHJldHVybiBbe1xyXG4gIC8vICAgICBzb3J0OiAkc2NvcGUuZ2V0UmVhY3RpdmVseSgnc29ydCcpLFxyXG4gIC8vICAgICBsaW1pdDogcGFyc2VJbnQoJHNjb3BlLmdldFJlYWN0aXZlbHkoJ3BlclBhZ2UnKSksXHJcbiAgLy8gICAgIHNraXA6ICgocGFyc2VJbnQoJHNjb3BlLmdldFJlYWN0aXZlbHkoJ3BhZ2UnKSkpIC0gMSkgKiAocGFyc2VJbnQoJHNjb3BlLmdldFJlYWN0aXZlbHkoJ3BlclBhZ2UnKSkpXHJcbiAgLy8gICB9LCAkc2NvcGUuZ2V0UmVhY3RpdmVseSgnc2VhcmNoJyldO1xyXG4gIC8vIH0pO1xyXG5cclxuXHJcbiAgLy8gJHNjb3BlLnBhZ2VDaGFuZ2VkID0gZnVuY3Rpb24obmV3UGFnZSkge1xyXG4gIC8vICAgJHNjb3BlLnBhZ2UgPSBuZXdQYWdlO1xyXG4gIC8vIH07XHJcbiAgLy9cclxuICAvLyByZXR1cm4gJHNjb3BlLiR3YXRjaCgnb3JkZXJQcm9wZXJ0eScsIGZ1bmN0aW9uKCkge1xyXG4gIC8vICAgaWYgKCRzY29wZS5vcmRlclByb3BlcnR5KSB7XHJcbiAgLy8gICAgICRzY29wZS5zb3J0ID0ge1xyXG4gIC8vICAgICAgIG5hbWVfc29ydDogcGFyc2VJbnQoJHNjb3BlLm9yZGVyUHJvcGVydHkpXHJcbiAgLy8gICAgIH07XHJcbiAgLy8gICB9XHJcbiAgLy8gfSk7XHJcbn0pOyJdfQ==
}).call(this);

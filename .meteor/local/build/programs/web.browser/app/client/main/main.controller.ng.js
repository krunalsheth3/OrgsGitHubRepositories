(function(){'use strict';

angular.module('orgReposApp').controller('MainCtrl', ["$scope", function ($scope) {
  $scope.page = 1;
  $scope.perPage = 3;
  $scope.sort = { name_sort: 1 };
  $scope.orderProperty = '1';

  $scope.helpers({
    things: function things() {
      return Things.find({}, {
        sort: $scope.getReactively('sort')
      });
    },
    thingsCount: function thingsCount() {
      return Counts.get('numberOfThings');
    }
  });

  $scope.subscribe('things', function () {
    return [{
      sort: $scope.getReactively('sort'),
      limit: parseInt($scope.getReactively('perPage')),
      skip: (parseInt($scope.getReactively('page')) - 1) * parseInt($scope.getReactively('perPage'))
    }, $scope.getReactively('search')];
  });

  $scope.save = function () {
    if ($scope.form.$valid) {
      Things.insert($scope.newThing);
      $scope.newThing = undefined;
    }
  };

  $scope.remove = function (thing) {
    Things.remove({ _id: thing._id });
  };

  $scope.pageChanged = function (newPage) {
    $scope.page = newPage;
  };

  return $scope.$watch('orderProperty', function () {
    if ($scope.orderProperty) {
      $scope.sort = {
        name_sort: parseInt($scope.orderProperty)
      };
    }
  });
}]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9jbGllbnQvbWFpbi9tYWluLmNvbnRyb2xsZXIubmcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFBOztBQUVaLE9BQU8sQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQzVCLFVBQVUsQ0FBQyxVQUFVLEVBQUUsVUFBUyxNQUFNLEVBQUU7QUFDdkMsUUFBTSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUM7QUFDaEIsUUFBTSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7QUFDbkIsUUFBTSxDQUFDLElBQUksR0FBRyxFQUFDLFNBQVMsRUFBRyxDQUFDLEVBQUMsQ0FBQztBQUM5QixRQUFNLENBQUMsYUFBYSxHQUFHLEdBQUcsQ0FBQzs7QUFFM0IsUUFBTSxDQUFDLE9BQU8sQ0FBQztBQUNiLFVBQU0sRUFBRSxrQkFBVztBQUNqQixhQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFO0FBQ3JCLFlBQUksRUFBRSxNQUFNLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQztPQUNuQyxDQUFDLENBQUM7S0FDSjtBQUNELGVBQVcsRUFBRSx1QkFBVztBQUN0QixhQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztLQUNyQztHQUNGLENBQUMsQ0FBQzs7QUFFSCxRQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxZQUFXO0FBQ3BDLFdBQU8sQ0FBQztBQUNOLFVBQUksRUFBRSxNQUFNLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQztBQUNsQyxXQUFLLEVBQUUsUUFBUSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDaEQsVUFBSSxFQUFFLENBQUMsQUFBQyxRQUFRLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFJLENBQUMsQ0FBQSxHQUFLLFFBQVEsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEFBQUM7S0FDbkcsRUFBRSxNQUFNLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7R0FDcEMsQ0FBQyxDQUFDOztBQUVILFFBQU0sQ0FBQyxJQUFJLEdBQUcsWUFBVztBQUN2QixRQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO0FBQ3RCLFlBQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQy9CLFlBQU0sQ0FBQyxRQUFRLEdBQUcsU0FBUyxDQUFDO0tBQzdCO0dBQ0YsQ0FBQzs7QUFFRixRQUFNLENBQUMsTUFBTSxHQUFHLFVBQVMsS0FBSyxFQUFFO0FBQzlCLFVBQU0sQ0FBQyxNQUFNLENBQUMsRUFBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLEdBQUcsRUFBQyxDQUFDLENBQUM7R0FDakMsQ0FBQzs7QUFFRixRQUFNLENBQUMsV0FBVyxHQUFHLFVBQVMsT0FBTyxFQUFFO0FBQ3JDLFVBQU0sQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDO0dBQ3ZCLENBQUM7O0FBRUYsU0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLGVBQWUsRUFBRSxZQUFXO0FBQy9DLFFBQUksTUFBTSxDQUFDLGFBQWEsRUFBRTtBQUN4QixZQUFNLENBQUMsSUFBSSxHQUFHO0FBQ1osaUJBQVMsRUFBRSxRQUFRLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQztPQUMxQyxDQUFDO0tBQ0g7R0FDRixDQUFDLENBQUM7Q0FDSixDQUFDLENBQUMiLCJmaWxlIjoiL2NsaWVudC9tYWluL21haW4uY29udHJvbGxlci5uZy5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0J1xyXG5cclxuYW5ndWxhci5tb2R1bGUoJ29yZ1JlcG9zQXBwJylcclxuLmNvbnRyb2xsZXIoJ01haW5DdHJsJywgZnVuY3Rpb24oJHNjb3BlKSB7XHJcbiAgJHNjb3BlLnBhZ2UgPSAxO1xyXG4gICRzY29wZS5wZXJQYWdlID0gMztcclxuICAkc2NvcGUuc29ydCA9IHtuYW1lX3NvcnQgOiAxfTtcclxuICAkc2NvcGUub3JkZXJQcm9wZXJ0eSA9ICcxJztcclxuICBcclxuICAkc2NvcGUuaGVscGVycyh7XHJcbiAgICB0aGluZ3M6IGZ1bmN0aW9uKCkge1xyXG4gICAgICByZXR1cm4gVGhpbmdzLmZpbmQoe30sIHtcclxuICAgICAgICBzb3J0OiAkc2NvcGUuZ2V0UmVhY3RpdmVseSgnc29ydCcpXHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIHRoaW5nc0NvdW50OiBmdW5jdGlvbigpIHtcclxuICAgICAgcmV0dXJuIENvdW50cy5nZXQoJ251bWJlck9mVGhpbmdzJyk7XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gICRzY29wZS5zdWJzY3JpYmUoJ3RoaW5ncycsIGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIFt7XHJcbiAgICAgIHNvcnQ6ICRzY29wZS5nZXRSZWFjdGl2ZWx5KCdzb3J0JyksXHJcbiAgICAgIGxpbWl0OiBwYXJzZUludCgkc2NvcGUuZ2V0UmVhY3RpdmVseSgncGVyUGFnZScpKSxcclxuICAgICAgc2tpcDogKChwYXJzZUludCgkc2NvcGUuZ2V0UmVhY3RpdmVseSgncGFnZScpKSkgLSAxKSAqIChwYXJzZUludCgkc2NvcGUuZ2V0UmVhY3RpdmVseSgncGVyUGFnZScpKSlcclxuICAgIH0sICRzY29wZS5nZXRSZWFjdGl2ZWx5KCdzZWFyY2gnKV07XHJcbiAgfSk7XHJcblxyXG4gICRzY29wZS5zYXZlID0gZnVuY3Rpb24oKSB7XHJcbiAgICBpZiAoJHNjb3BlLmZvcm0uJHZhbGlkKSB7XHJcbiAgICAgIFRoaW5ncy5pbnNlcnQoJHNjb3BlLm5ld1RoaW5nKTtcclxuICAgICAgJHNjb3BlLm5ld1RoaW5nID0gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gICRzY29wZS5yZW1vdmUgPSBmdW5jdGlvbih0aGluZykge1xyXG4gICAgVGhpbmdzLnJlbW92ZSh7X2lkOiB0aGluZy5faWR9KTtcclxuICB9O1xyXG5cclxuICAkc2NvcGUucGFnZUNoYW5nZWQgPSBmdW5jdGlvbihuZXdQYWdlKSB7XHJcbiAgICAkc2NvcGUucGFnZSA9IG5ld1BhZ2U7XHJcbiAgfTtcclxuICAgICAgICAgICAgICAgICAgXHJcbiAgcmV0dXJuICRzY29wZS4kd2F0Y2goJ29yZGVyUHJvcGVydHknLCBmdW5jdGlvbigpIHtcclxuICAgIGlmICgkc2NvcGUub3JkZXJQcm9wZXJ0eSkge1xyXG4gICAgICAkc2NvcGUuc29ydCA9IHtcclxuICAgICAgICBuYW1lX3NvcnQ6IHBhcnNlSW50KCRzY29wZS5vcmRlclByb3BlcnR5KVxyXG4gICAgICB9O1xyXG4gICAgfVxyXG4gIH0pO1xyXG59KTsiXX0=
}).call(this);

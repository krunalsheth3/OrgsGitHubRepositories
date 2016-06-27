(function(){'use strict';

angular.module('orgReposApp').directive('toolbar', ['$rootScope', '$window', '$mdSidenav', '$location', function ($rootScope, $window, $mdSidenav, $location) {
  return {
    restrict: 'AE',
    templateUrl: 'client/components/toolbar/toolbar.view.ng.html',
    replace: false,
    link: function link($scope, iElm, iAttrs, controller) {
      $scope.showErrorMessage = false;

      /*
       *   To toggle the slide Nav in and out
       */
      $scope.toggleSidenav = function (menuId) {
        $mdSidenav(menuId).toggle();
      };

      $scope.goToGitHub = function () {
        $window.location.href = "https://github.com/";
      };

      /*
       *  Page navigation to Just page
       */
      $scope.navigateToJustPage = function (link) {
        $location.path(link);
      };
    }
  };
}]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9jbGllbnQvY29tcG9uZW50cy90b29sYmFyL3Rvb2xiYXIuZGlyZWN0aXZlLm5nLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQTs7QUFFWixPQUFPLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUM1QixTQUFTLENBQUMsU0FBUyxFQUFDLENBQUMsWUFBWSxFQUFDLFNBQVMsRUFBRSxZQUFZLEVBQUMsV0FBVyxFQUFFLFVBQVMsVUFBVSxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFO0FBQzNILFNBQU87QUFDTCxZQUFRLEVBQUUsSUFBSTtBQUNkLGVBQVcsRUFBRSxnREFBZ0Q7QUFDN0QsV0FBTyxFQUFFLEtBQUs7QUFDZCxRQUFJLEVBQUUsY0FBUyxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUU7QUFDL0MsWUFBTSxDQUFDLGdCQUFnQixHQUFHLEtBQUssQ0FBQzs7Ozs7QUFLaEMsWUFBTSxDQUFDLGFBQWEsR0FBRyxVQUFTLE1BQU0sRUFBRTtBQUN0QyxrQkFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO09BQzdCLENBQUM7O0FBRUYsWUFBTSxDQUFDLFVBQVUsR0FBRyxZQUFXO0FBQzdCLGVBQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFHLHFCQUFxQixDQUFDO09BQy9DLENBQUE7Ozs7O0FBS0QsWUFBTSxDQUFDLGtCQUFrQixHQUFHLFVBQVMsSUFBSSxFQUFFO0FBQ3pDLGlCQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO09BQ3RCLENBQUE7S0FHRjtHQUNGLENBQUM7Q0FDSCxDQUFDLENBQUMsQ0FBQyIsImZpbGUiOiIvY2xpZW50L2NvbXBvbmVudHMvdG9vbGJhci90b29sYmFyLmRpcmVjdGl2ZS5uZy5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0J1xyXG5cclxuYW5ndWxhci5tb2R1bGUoJ29yZ1JlcG9zQXBwJylcclxuLmRpcmVjdGl2ZSgndG9vbGJhcicsWyckcm9vdFNjb3BlJywnJHdpbmRvdycsICckbWRTaWRlbmF2JywnJGxvY2F0aW9uJywgZnVuY3Rpb24oJHJvb3RTY29wZSwgJHdpbmRvdywgJG1kU2lkZW5hdiwgJGxvY2F0aW9uKSB7XHJcbiAgcmV0dXJuIHtcclxuICAgIHJlc3RyaWN0OiAnQUUnLFxyXG4gICAgdGVtcGxhdGVVcmw6ICdjbGllbnQvY29tcG9uZW50cy90b29sYmFyL3Rvb2xiYXIudmlldy5uZy5odG1sJyxcclxuICAgIHJlcGxhY2U6IGZhbHNlLFxyXG4gICAgbGluazogZnVuY3Rpb24oJHNjb3BlLCBpRWxtLCBpQXR0cnMsIGNvbnRyb2xsZXIpIHtcclxuICAgICAgJHNjb3BlLnNob3dFcnJvck1lc3NhZ2UgPSBmYWxzZTtcclxuXHJcbiAgICAgIC8qXHJcbiAgICAgICAqICAgVG8gdG9nZ2xlIHRoZSBzbGlkZSBOYXYgaW4gYW5kIG91dFxyXG4gICAgICAgKi9cclxuICAgICAgJHNjb3BlLnRvZ2dsZVNpZGVuYXYgPSBmdW5jdGlvbihtZW51SWQpIHtcclxuICAgICAgICAkbWRTaWRlbmF2KG1lbnVJZCkudG9nZ2xlKCk7XHJcbiAgICAgIH07XHJcblxyXG4gICAgICAkc2NvcGUuZ29Ub0dpdEh1YiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICR3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiaHR0cHM6Ly9naXRodWIuY29tL1wiO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvKlxyXG4gICAgICAgKiAgUGFnZSBuYXZpZ2F0aW9uIHRvIEp1c3QgcGFnZVxyXG4gICAgICAgKi9cclxuICAgICAgJHNjb3BlLm5hdmlnYXRlVG9KdXN0UGFnZSA9IGZ1bmN0aW9uKGxpbmspIHtcclxuICAgICAgICAkbG9jYXRpb24ucGF0aChsaW5rKTtcclxuICAgICAgfVxyXG5cclxuXHJcbiAgICB9XHJcbiAgfTtcclxufV0pO1xyXG4iXX0=
}).call(this);

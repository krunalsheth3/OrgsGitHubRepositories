(function(){angular.module('orgReposApp', ['angular-meteor', 'ui.router', 'ngMaterial', 'angularUtils.directives.dirPagination', 'accounts.ui']);

onReady = function () {
  angular.bootstrap(document, ['orgReposApp']);
};

if (Meteor.isCordova) {
  angular.element(document).on('deviceready', onReady);
} else {
  angular.element(document).ready(onReady);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9jbGllbnQvbGliL2FwcC5uZy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRSxDQUM1QixnQkFBZ0IsRUFDaEIsV0FBVyxFQUNYLFlBQVksRUFDWix1Q0FBdUMsRUFDdkMsYUFBYSxDQUNkLENBQUMsQ0FBQzs7QUFFSCxPQUFPLEdBQUcsWUFBVztBQUNuQixTQUFPLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7Q0FDOUMsQ0FBQzs7QUFFRixJQUFHLE1BQU0sQ0FBQyxTQUFTLEVBQUU7QUFDbkIsU0FBTyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0NBQ3RELE1BQU07QUFDTCxTQUFPLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztDQUMxQyIsImZpbGUiOiIvY2xpZW50L2xpYi9hcHAubmcuanMiLCJzb3VyY2VzQ29udGVudCI6WyJhbmd1bGFyLm1vZHVsZSgnb3JnUmVwb3NBcHAnLCBbXHJcbiAgJ2FuZ3VsYXItbWV0ZW9yJyxcclxuICAndWkucm91dGVyJyxcclxuICAnbmdNYXRlcmlhbCcsXHJcbiAgJ2FuZ3VsYXJVdGlscy5kaXJlY3RpdmVzLmRpclBhZ2luYXRpb24nLFxyXG4gICdhY2NvdW50cy51aSdcclxuXSk7XHJcblxyXG5vblJlYWR5ID0gZnVuY3Rpb24oKSB7XHJcbiAgYW5ndWxhci5ib290c3RyYXAoZG9jdW1lbnQsIFsnb3JnUmVwb3NBcHAnXSk7XHJcbn07XHJcbiAgXHJcbmlmKE1ldGVvci5pc0NvcmRvdmEpIHtcclxuICBhbmd1bGFyLmVsZW1lbnQoZG9jdW1lbnQpLm9uKCdkZXZpY2VyZWFkeScsIG9uUmVhZHkpO1xyXG59IGVsc2Uge1xyXG4gIGFuZ3VsYXIuZWxlbWVudChkb2N1bWVudCkucmVhZHkob25SZWFkeSk7XHJcbn0iXX0=
}).call(this);
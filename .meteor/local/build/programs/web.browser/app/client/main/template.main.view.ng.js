(function(){
  var templateUrl = "client/main/main.view.ng.html";
  angular.module('angular-templates')
    .run(['$templateCache', function($templateCache) {
      $templateCache.put(templateUrl, "<div class=\"main\" layout=\"row\"> <span flex=\"\"></span> <div layout=\"column\"> <h1>Things</h1> <form class=\"md-whiteframe-z1\" ng-submit=\"save()\" name=\"form\" novalidate layout-padding=\"\"> <p>Add a thing</p> <md-input-container> <label>Name</label> <input ng-model=\"newThing.name\" placeholder=\"Name\"> </md-input-container> <input class=\"md-button\" type=\"submit\" value=\"Add\"> </form> <div layout=\"row\" layout-padding=\"\"> <md-input-container flex=\"65\"> <label>Search</label> <input type=\"Search\" ng-model=\"search\" placeholder=\"Search\"> </md-input-container> <md-select ng-model=\"orderProperty\" flex=\"35\"> <md-option value=\"1\">Ascending</md-option> <md-option value=\"-1\">Descending</md-option> </md-select> </div> <ul> <li dir-paginate=\"thing in things | itemsPerPage: perPage\" total-items=\"thingsCount\" current-page=\"page\"> <p>{{ thing.name }} <button ng-click=\"remove(thing)\">&times;</button></p> </li> </ul> <dir-pagination-controls on-page-change=\"pageChanged(newPageNumber)\"></dir-pagination-controls> <p>Total number of things: {{thingsCount}}</p> </div> <span flex=\"\"></span> </div>");
    }]);
  if (typeof exports !== 'undefined') {
    exports.__esModule = true;
    exports.default = templateUrl;
  }
  
}).call(this);

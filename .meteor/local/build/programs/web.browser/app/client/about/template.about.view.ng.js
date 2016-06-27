(function(){
  var templateUrl = "client/about/about.view.ng.html";
  angular.module('angular-templates')
    .run(['$templateCache', function($templateCache) {
      $templateCache.put(templateUrl, "<div layout=\"column\" ng-cloak> <section class=\"container\"> <md-content flex layout-padding> <ul class=\"\"> <b>Steps to run this project</b> <li> Follow the steps mentioned <a href=\"http://www.angular-meteor.com/tutorials/socially/angular1/bootstrapping\"> here .</a> </li> <li> If using a LINUX machine install meteor using curl https://install.meteor.com/ | sh </li> <li> If using Windows machine install meteor using <a href=\"https://www.meteor.com/install?__hstc=219992390.0e9e1fa36fbded6488a15fc6c188a555.1466715831960.1466715831960.1466994732048.2&__hssc=219992390.1.1466994732048&__hsfp=1440650216\"> this .</a> </li> <li> Download the project from <a href=\"https://github.com/krunalsheth3/OrganizationsGitRepos\"> GitHub </a> and place it under the the path where meteor was installed </li> <li> From command line just type in : meteor </li> <li> Your project will start running on http://localhost:3000 </li> </ul> <p> Built a simple interactive UI to display a list of an arbitrary organization's Github projects ranked </p> <p> by any meaningful metric like number of Forks, Watchers, Stargazers etc . </p> <p> One can even search and sort the repositories by name and type using the filtering options at the top </p> <p> of the page. </p> <p> Browsing recent commits with commit description and the UserID is also provided for that repo </p> <p> The framework used for building this prototype is Meteor.js . </p> <p> REST api calls are made the api.github.com to fetch the list of repositories and its commits </p> <p> The project is loaded initially with dummy names of company inserted in the database during initialization </p> </md-content> </section> </div>");
    }]);
  if (typeof exports !== 'undefined') {
    exports.__esModule = true;
    exports.default = templateUrl;
  }
  
}).call(this);
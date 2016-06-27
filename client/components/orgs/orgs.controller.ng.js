'use strict'

angular.module('orgReposApp')
.controller('OrgsCtrl', function($scope) {
    $scope.page = 1;
    $scope.perPage = 20;
    $scope.sort = {name_sort : 1};
    $scope.orderProperty = '1';
    $scope.defaultSortOrder = "Name: A-Z";
    
    $scope.helpers({
        organizations: function() {
            return Orgs.find({}, {
                sort: $scope.getReactively('sort')
            });
        },
        orgsCount: function() {
            return Counts.get('numberOfOrgs');
        }
    });

    $scope.subscribe('orgs', function() {
        return [{
            sort: $scope.getReactively('sort'),
            limit: parseInt($scope.getReactively('perPage')),
            skip: ((parseInt($scope.getReactively('page'))) - 1) * (parseInt($scope.getReactively('perPage')))
        }, $scope.getReactively('search')];
    });

    /*
     * Sort the data by Name
     */
    $scope.sortByName = function(sortOrder) {
        if(sortOrder) {
            $scope.sort = {name_sort: parseInt(sortOrder)};
        }
    };

    /*
     * Sort the data by Name
     */
    $scope.sortByRepo = function(sortOrder) {
        if(sortOrder) {
            $scope.sort = {public_repos: parseInt(sortOrder)};
        }
    };

    /*
     * Sort the data by Name
     */
    $scope.sortByDate = function(sortOrder) {
        if(sortOrder) {
            $scope.sort = {created_at: parseInt(sortOrder)};
        }
    };

});



'use strict'

Meteor.publish('repos', function(options, searchString) {
  var where = {
    'name': {
      '$regex': '.*' + (searchString || '') + '.*',
      '$options': 'i'
    }
  };
  Counts.publish(this, 'numberOfRepos', Repos.find(where), {noReady: true});
  return Repos.find(where, options);
});

Meteor.methods({

  /*
   * Fetch repositories for given org
   */
  'fetchRepos': function (orgId, startPage, pageLimit) {
    try {
      var result = HTTP.get(
          'https://api.github.com/orgs/' + orgId + '/repos',
          {
            'headers': {'user-agent': 'node.js'},
            'params': {
              'page': startPage,
              'per_page': pageLimit
            }
          }
      )
      return result.data;
    } catch (err) {
       throw new Meteor.error("Failed to fetch repositories: "+err);
    }


  }

});
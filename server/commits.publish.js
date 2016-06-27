'use strict'

Meteor.publish('commits', function(options, searchString) {
  var where = {
    'name': {
      '$regex': '.*' + (searchString || '') + '.*',
      '$options': 'i'
    }
  };
  Counts.publish(this, 'numberOfCommits', Commits.find(where), {noReady: true});
  return Commits.find(where, options);
});


Meteor.methods({

  /*
   * Fetch commits for given repo
   */
  'fetchCommits': function (orgName, repoName) {

    try {
      var result = HTTP.get(
          'https://api.github.com/repos/' + orgName + '/' + repoName + '/commits',
          {
            'headers': {'user-agent': 'node.js'},
            'params': {

            }
          }
      )
      return result.data;
    } catch (err) {
      throw new Meteor.error("Failed to fetch commits : "+err);
    }


  }

});
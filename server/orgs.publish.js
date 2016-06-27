'use strict'

Meteor.publish('orgs', function(options, searchString) {
  var where = {
    'name': {
      '$regex': '.*' + (searchString || '') + '.*',
      '$options': 'i'
    }
  };
  Counts.publish(this, 'numberOfOrgs', Orgs.find(where), {noReady: true});
  return Orgs.find(where, options);
});

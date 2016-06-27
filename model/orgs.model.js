Orgs = new Mongo.Collection('orgs');

// Orgs.allow({
//   insert: function(userId, org) {
//     return true;
//   },
//   update: function(userId, org, fields, modifier) {
//     return true;
//   },
//   remove: function(userId, org) {
//     return true;
//   }
// });
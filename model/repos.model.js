Repos = new Mongo.Collection('repos');

// Repos.allow({
//   insert: function(userId, repo) {
//     return true;
//   },
//   update: function(userId, repo, fields, modifier) {
//     return true;
//   },
//   remove: function(userId, repo) {
//     return true;
//   }
// });
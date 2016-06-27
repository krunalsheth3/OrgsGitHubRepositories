Commits = new Mongo.Collection('commits');

Commits.allow({
  insert: function(userId, commit) {
    return true;
  },
  update: function(userId, commit, fields, modifier) {
    return true;
  },
  remove: function(userId, commit) {
    return true;
  }
});
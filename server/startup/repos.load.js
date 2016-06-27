Meteor.startup(function() {
  if(Repos.find().count() === 0) {
    // var repos = [
    //   {
    //     'name': 'repo 1'
    //   },
    //   {
    //     'name': 'repo 2'
    //   }
    // ];
    // repos.forEach(function(repo) {
    //   Repos.insert(repo);
    // });
  }
});
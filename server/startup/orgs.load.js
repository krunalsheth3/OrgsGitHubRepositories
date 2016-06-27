Meteor.startup(function() {

  if(Orgs.find().count() === 0) {
    var orgs = [
      {
        'name': 'NETFLIX'
      },
      {
        'name': 'FACEBOOK'
      },
      {
        'name': 'TWITTER'
      },
      {
        'name': 'GOOGLE'
      },
      {
        'name': 'MICROSOFT'
      },
      {
        'name': 'CISCO'
      },
      {
        'name': 'YAHOO'
      },
      {
        'name': 'UBER'
      },
      {
        'name': 'AIRBNB'
      },
      {
        'name': 'LINKEDIN'

      },
      {
        'name': 'VMWARE'
      }
    ];

    orgs.forEach(function(item) {
      HTTP.call('GET',
          'https://api.github.com/orgs/' + item.name,
          {
            'headers': {'user-agent': 'node.js'}
          },

          function(error, response) {

            if(error) {
              console.log(error);
              return new Meteor.Error("Failed to fetch org details: " +error);
            } else {
              response.data["name_sort"] = response.data.login.toLowerCase();
              console.log(response.data);
              Orgs.insert(response.data);
            }

          }
      )
    });
  }
});
(function(){'use strict';

Meteor.publish('orgs', function (options, searchString) {
  var where = {
    'name': {
      '$regex': '.*' + (searchString || '') + '.*',
      '$options': 'i'
    }
  };
  Counts.publish(this, 'numberOfOrgs', Orgs.find(where), { noReady: true });
  return Orgs.find(where, options);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9zZXJ2ZXIvb3Jncy5wdWJsaXNoLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQTs7QUFFWixNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxVQUFTLE9BQU8sRUFBRSxZQUFZLEVBQUU7QUFDckQsTUFBSSxLQUFLLEdBQUc7QUFDVixVQUFNLEVBQUU7QUFDTixjQUFRLEVBQUUsSUFBSSxJQUFJLFlBQVksSUFBSSxFQUFFLENBQUEsQUFBQyxHQUFHLElBQUk7QUFDNUMsZ0JBQVUsRUFBRSxHQUFHO0tBQ2hCO0dBQ0YsQ0FBQztBQUNGLFFBQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLGNBQWMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUMsT0FBTyxFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7QUFDeEUsU0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQztDQUNsQyxDQUFDLENBQUMiLCJmaWxlIjoiL3NlcnZlci9vcmdzLnB1Ymxpc2guanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCdcclxuXHJcbk1ldGVvci5wdWJsaXNoKCdvcmdzJywgZnVuY3Rpb24ob3B0aW9ucywgc2VhcmNoU3RyaW5nKSB7XHJcbiAgdmFyIHdoZXJlID0ge1xyXG4gICAgJ25hbWUnOiB7XHJcbiAgICAgICckcmVnZXgnOiAnLionICsgKHNlYXJjaFN0cmluZyB8fCAnJykgKyAnLionLFxyXG4gICAgICAnJG9wdGlvbnMnOiAnaSdcclxuICAgIH1cclxuICB9O1xyXG4gIENvdW50cy5wdWJsaXNoKHRoaXMsICdudW1iZXJPZk9yZ3MnLCBPcmdzLmZpbmQod2hlcmUpLCB7bm9SZWFkeTogdHJ1ZX0pO1xyXG4gIHJldHVybiBPcmdzLmZpbmQod2hlcmUsIG9wdGlvbnMpO1xyXG59KTtcclxuIl19
}).call(this);

//# sourceMappingURL=orgs.publish.js.map

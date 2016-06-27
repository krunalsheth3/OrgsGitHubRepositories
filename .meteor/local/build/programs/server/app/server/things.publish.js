(function(){'use strict';

Meteor.publish('things', function (options, searchString) {
  var where = {
    'name': {
      '$regex': '.*' + (searchString || '') + '.*',
      '$options': 'i'
    }
  };
  Counts.publish(this, 'numberOfThings', Things.find(where), { noReady: true });
  return Things.find(where, options);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9zZXJ2ZXIvdGhpbmdzLnB1Ymxpc2guanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFBOztBQUVaLE1BQU0sQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLFVBQVMsT0FBTyxFQUFFLFlBQVksRUFBRTtBQUN2RCxNQUFJLEtBQUssR0FBRztBQUNWLFVBQU0sRUFBRTtBQUNOLGNBQVEsRUFBRSxJQUFJLElBQUksWUFBWSxJQUFJLEVBQUUsQ0FBQSxBQUFDLEdBQUcsSUFBSTtBQUM1QyxnQkFBVSxFQUFFLEdBQUc7S0FDaEI7R0FDRixDQUFDO0FBQ0YsUUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO0FBQzVFLFNBQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUM7Q0FDcEMsQ0FBQyxDQUFDIiwiZmlsZSI6Ii9zZXJ2ZXIvdGhpbmdzLnB1Ymxpc2guanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCdcclxuXHJcbk1ldGVvci5wdWJsaXNoKCd0aGluZ3MnLCBmdW5jdGlvbihvcHRpb25zLCBzZWFyY2hTdHJpbmcpIHtcclxuICB2YXIgd2hlcmUgPSB7XHJcbiAgICAnbmFtZSc6IHtcclxuICAgICAgJyRyZWdleCc6ICcuKicgKyAoc2VhcmNoU3RyaW5nIHx8ICcnKSArICcuKicsXHJcbiAgICAgICckb3B0aW9ucyc6ICdpJ1xyXG4gICAgfVxyXG4gIH07XHJcbiAgQ291bnRzLnB1Ymxpc2godGhpcywgJ251bWJlck9mVGhpbmdzJywgVGhpbmdzLmZpbmQod2hlcmUpLCB7bm9SZWFkeTogdHJ1ZX0pO1xyXG4gIHJldHVybiBUaGluZ3MuZmluZCh3aGVyZSwgb3B0aW9ucyk7XHJcbn0pO1xyXG4iXX0=
}).call(this);

//# sourceMappingURL=things.publish.js.map
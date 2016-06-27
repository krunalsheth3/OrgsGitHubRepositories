(function(){'use strict';

Meteor.publish('commits', function (options, searchString) {
  var where = {
    'name': {
      '$regex': '.*' + (searchString || '') + '.*',
      '$options': 'i'
    }
  };
  Counts.publish(this, 'numberOfCommits', Commits.find(where), { noReady: true });
  return Commits.find(where, options);
});

Meteor.methods({

  /*
   * Fetch commits for given repo
   */
  'fetchCommits': function fetchCommits(orgName, repoName) {

    try {
      var result = HTTP.get('https://api.github.com/repos/' + orgName + '/' + repoName + '/commits', {
        'headers': { 'user-agent': 'node.js' },
        'params': {}
      });
      return result.data;
    } catch (err) {
      throw new Meteor.error("Failed to fetch commits : " + err);
    }
  }

});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9zZXJ2ZXIvY29tbWl0cy5wdWJsaXNoLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQTs7QUFFWixNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxVQUFTLE9BQU8sRUFBRSxZQUFZLEVBQUU7QUFDeEQsTUFBSSxLQUFLLEdBQUc7QUFDVixVQUFNLEVBQUU7QUFDTixjQUFRLEVBQUUsSUFBSSxJQUFJLFlBQVksSUFBSSxFQUFFLENBQUEsQUFBQyxHQUFHLElBQUk7QUFDNUMsZ0JBQVUsRUFBRSxHQUFHO0tBQ2hCO0dBQ0YsQ0FBQztBQUNGLFFBQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLGlCQUFpQixFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBQyxPQUFPLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQztBQUM5RSxTQUFPLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0NBQ3JDLENBQUMsQ0FBQzs7QUFHSCxNQUFNLENBQUMsT0FBTyxDQUFDOzs7OztBQUtiLGdCQUFjLEVBQUUsc0JBQVUsT0FBTyxFQUFFLFFBQVEsRUFBRTs7QUFFM0MsUUFBSTtBQUNGLFVBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQ2pCLCtCQUErQixHQUFHLE9BQU8sR0FBRyxHQUFHLEdBQUcsUUFBUSxHQUFHLFVBQVUsRUFDdkU7QUFDRSxpQkFBUyxFQUFFLEVBQUMsWUFBWSxFQUFFLFNBQVMsRUFBQztBQUNwQyxnQkFBUSxFQUFFLEVBRVQ7T0FDRixDQUNKLENBQUE7QUFDRCxhQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUM7S0FDcEIsQ0FBQyxPQUFPLEdBQUcsRUFBRTtBQUNaLFlBQU0sSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLDRCQUE0QixHQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQzFEO0dBR0Y7O0NBRUYsQ0FBQyxDQUFDIiwiZmlsZSI6Ii9zZXJ2ZXIvY29tbWl0cy5wdWJsaXNoLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnXHJcblxyXG5NZXRlb3IucHVibGlzaCgnY29tbWl0cycsIGZ1bmN0aW9uKG9wdGlvbnMsIHNlYXJjaFN0cmluZykge1xyXG4gIHZhciB3aGVyZSA9IHtcclxuICAgICduYW1lJzoge1xyXG4gICAgICAnJHJlZ2V4JzogJy4qJyArIChzZWFyY2hTdHJpbmcgfHwgJycpICsgJy4qJyxcclxuICAgICAgJyRvcHRpb25zJzogJ2knXHJcbiAgICB9XHJcbiAgfTtcclxuICBDb3VudHMucHVibGlzaCh0aGlzLCAnbnVtYmVyT2ZDb21taXRzJywgQ29tbWl0cy5maW5kKHdoZXJlKSwge25vUmVhZHk6IHRydWV9KTtcclxuICByZXR1cm4gQ29tbWl0cy5maW5kKHdoZXJlLCBvcHRpb25zKTtcclxufSk7XHJcblxyXG5cclxuTWV0ZW9yLm1ldGhvZHMoe1xyXG5cclxuICAvKlxyXG4gICAqIEZldGNoIGNvbW1pdHMgZm9yIGdpdmVuIHJlcG9cclxuICAgKi9cclxuICAnZmV0Y2hDb21taXRzJzogZnVuY3Rpb24gKG9yZ05hbWUsIHJlcG9OYW1lKSB7XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgdmFyIHJlc3VsdCA9IEhUVFAuZ2V0KFxyXG4gICAgICAgICAgJ2h0dHBzOi8vYXBpLmdpdGh1Yi5jb20vcmVwb3MvJyArIG9yZ05hbWUgKyAnLycgKyByZXBvTmFtZSArICcvY29tbWl0cycsXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgICdoZWFkZXJzJzogeyd1c2VyLWFnZW50JzogJ25vZGUuanMnfSxcclxuICAgICAgICAgICAgJ3BhcmFtcyc6IHtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgKVxyXG4gICAgICByZXR1cm4gcmVzdWx0LmRhdGE7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgdGhyb3cgbmV3IE1ldGVvci5lcnJvcihcIkZhaWxlZCB0byBmZXRjaCBjb21taXRzIDogXCIrZXJyKTtcclxuICAgIH1cclxuXHJcblxyXG4gIH1cclxuXHJcbn0pOyJdfQ==
}).call(this);

//# sourceMappingURL=commits.publish.js.map

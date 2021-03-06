(function(){Meteor.startup(function () {
  if (Things.find().count() === 0) {
    var things = ['Data on the Wire', 'One Language', 'Database Everywhere', 'Latency Compensation', 'Full Stack Reactivity', 'Embrace the Ecosystem', 'Simplicity Equals Productivity'];
    things.forEach(function (thing) {
      Things.insert({
        name: thing,
        name_sort: thing.toLowerCase(),
        createdAt: new Date()
      });
    });
  }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9zZXJ2ZXIvc3RhcnR1cC90aGluZ3MubG9hZC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxDQUFDLFlBQVc7QUFDeEIsTUFBRyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxFQUFFO0FBQzlCLFFBQUksTUFBTSxHQUFHLENBQ1gsa0JBQWtCLEVBQ2xCLGNBQWMsRUFDZCxxQkFBcUIsRUFDckIsc0JBQXNCLEVBQ3RCLHVCQUF1QixFQUN2Qix1QkFBdUIsRUFDdkIsZ0NBQWdDLENBQ2pDLENBQUM7QUFDRixVQUFNLENBQUMsT0FBTyxDQUFDLFVBQVMsS0FBSyxFQUFFO0FBQzdCLFlBQU0sQ0FBQyxNQUFNLENBQUM7QUFDWixZQUFJLEVBQUUsS0FBSztBQUNYLGlCQUFTLEVBQUUsS0FBSyxDQUFDLFdBQVcsRUFBRTtBQUM5QixpQkFBUyxFQUFFLElBQUksSUFBSSxFQUFFO09BQ3RCLENBQUMsQ0FBQztLQUNKLENBQUMsQ0FBQztHQUNKO0NBQ0YsQ0FBQyxDQUFDIiwiZmlsZSI6Ii9zZXJ2ZXIvc3RhcnR1cC90aGluZ3MubG9hZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIk1ldGVvci5zdGFydHVwKGZ1bmN0aW9uKCkge1xyXG4gIGlmKFRoaW5ncy5maW5kKCkuY291bnQoKSA9PT0gMCkge1xyXG4gICAgdmFyIHRoaW5ncyA9IFtcclxuICAgICAgJ0RhdGEgb24gdGhlIFdpcmUnLFxyXG4gICAgICAnT25lIExhbmd1YWdlJyxcclxuICAgICAgJ0RhdGFiYXNlIEV2ZXJ5d2hlcmUnLFxyXG4gICAgICAnTGF0ZW5jeSBDb21wZW5zYXRpb24nLFxyXG4gICAgICAnRnVsbCBTdGFjayBSZWFjdGl2aXR5JyxcclxuICAgICAgJ0VtYnJhY2UgdGhlIEVjb3N5c3RlbScsXHJcbiAgICAgICdTaW1wbGljaXR5IEVxdWFscyBQcm9kdWN0aXZpdHknXHJcbiAgICBdO1xyXG4gICAgdGhpbmdzLmZvckVhY2goZnVuY3Rpb24odGhpbmcpIHtcclxuICAgICAgVGhpbmdzLmluc2VydCh7XHJcbiAgICAgICAgbmFtZTogdGhpbmcsXHJcbiAgICAgICAgbmFtZV9zb3J0OiB0aGluZy50b0xvd2VyQ2FzZSgpLFxyXG4gICAgICAgIGNyZWF0ZWRBdDogbmV3IERhdGUoKVxyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxufSk7Il19
}).call(this);

//# sourceMappingURL=things.load.js.map

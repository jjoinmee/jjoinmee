angular.module('jauntly.myEventsCtrl', [])

.controller('myEventsCtrl', function ($scope, $state, Auth, Event) {
  $scope.data;
  $scope.getEvents = function() {
    Event.getAllEvents(Auth.authData.facebook.email).then(function(data) {
      $scope.data = data;
    })
  }
});

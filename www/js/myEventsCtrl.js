angular.module('jauntly.myEventsCtrl', [])

.controller('myEventsCtrl', function ($scope, $state, Auth, Event) {
  $scope.data;
  console.log('this is authdata email', Auth.authData.facebook.email);
  $scope.getMine = function() {
    console.log('inside get mine');
    Event.getMyEvents(Auth.authData.facebook.email).then(function(data) {
      console.log('data inside getmine');
      $scope.data = data.data
    })
  };

  $scope.getID = function () {
    Event.getMyID(Auth.authData.facebook.email).then(function(data) {
      console.log('id data: ', data);
    })
  }

  $scope.getID();
});

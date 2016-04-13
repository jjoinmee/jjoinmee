angular.module('jauntly.myEventsCtrl', [])

.controller('myEventsCtrl', function ($scope, $state, Auth, Event) {
  $scope.data;
  $scope.id;
  console.log('this is authdata email', Auth.authData.facebook.email);
  $scope.getMine = function() {
    console.log('inside get mine');
    Event.getMyEvents(Auth.authData.facebook.email).then(function(data) {
      console.log('data inside getmine');
      $scope.data = data.data
    }).then(function() {
      Event.getMyID(Auth.authData.facebook.email).then(function(data) {
      $scope.id = data.data[0].id;
      console.log('id data: ', $scope.id);
      })
    })
  };

  // $scope.getID = function () {
  //   Event.getMyID(Auth.authData.facebook.email).then(function(data) {
  //     $scope.id = data.data[0].id;
  //     console.log('id data: ', $scope.id);
  //   })
  // }

  // $scope.getID();
  $scope.getMine();
})

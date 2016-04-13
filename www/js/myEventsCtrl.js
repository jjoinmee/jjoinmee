angular.module('jauntly.myEventsCtrl', [])

.controller('myEventsCtrl', function ($http, $scope, $state, $ionicHistory, Auth, Event) {
  $scope.data;
  $scope.id;
  console.log('this is authdata email', Auth.authData.facebook.email);
  $scope.getMine = function() {
    console.log('inside get mine');
    Event.getMyEvents(Auth.authData.facebook.email).then(function(data) {
      console.log('data inside getmine');
      $scope.data = data.data
      console.log($scope.data);
    }).then(function() {
      Event.getMyID(Auth.authData.facebook.email).then(function(data) {
      $scope.id = data.data[0].id;
      console.log('id data: ', $scope.id);
      })
    })
  };

  $scope.deleteEvent = function(id) {
    $http({
      method    : 'DELETE',
      url       : 'http://localhost:8100/api/myevents/' + id,
      data      : $scope.data,
      headers   : {'Content-Type': 'application/json'}
    })
    .then(function(){
      console.log('inside reload');
      $state.go($state.current, {}, {reload: true, inherit: false});
      // $ionicHistory.clearCache().then(function() {
      //   $state.go('app.myEvents');
      // })
    })
  }

  // $scope.getID = function () {
  //   Event.getMyID(Auth.authData.facebook.email).then(function(data) {
  //     $scope.id = data.data[0].id;
  //     console.log('id data: ', $scope.id);
  //   })
  // }

  // $scope.getID();
  $scope.getMine();
})

angular.module('jauntly.searchCtrl', [])

.controller('searchCtrl', function($scope, Event, Auth) {
  $scope.data;
  $scope.myID;

  $scope.getSearchResult = function() {
  console.log('inside get mine');
  Event.getMyEvents(Auth.authData.facebook.email).then(function(data) {
    console.log('data inside getmine');
    $scope.data = data.data
    console.log($scope.data);
  }).then(function() {
      Event.getMyID(Auth.authData.facebook.email).then(function(data) {
      $scope.myID = data.data[0].id;
      console.log('id data: ', $scope.myID);
      })
    })
  };

  $scope.joinEvent = function(eventID) {
    Event.postToJoint(eventID, $scope.myID);
  }

  $scope.getSearchResult();
})

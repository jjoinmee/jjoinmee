angular.module('jauntly.searchCtrl', [])

.controller('searchCtrl', function($scope, Event, Auth) {
  $scope.data;
  $scope.myID;

  $scope.getSearchResult = function() {
  Event.getMyEvents(Auth.authData.facebook.email)
    .then(function(data) {
    $scope.data = data.data;
  })
    .then(function() {
      Event.getMyID(Auth.authData.facebook.email)
        .then(function(data) {
      $scope.myID = data.data[0].id;
      })
    })
  };

  $scope.joinEvent = function(eventID) {
    Event.postToJoint(eventID, $scope.myID);
  };
  
  $scope.getSearchResult();
});

angular.module('jauntly.addEventCtrl', [])

.controller('addEventCtrl', function($scope, ExpediaInfo) {
  $scope.results = {};

  $scope.search = function (location, activity) {
    ExpediaInfo.getExpInfo(location, activity)
    .then(function (results){
      $scope.results = results.data.activities;
      console.log('ajax get results ', $scope.results);
    })
    .catch(function (error) {
      console.error(error);
    });
  };


});

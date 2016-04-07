angular.module('jauntly.addEventCtrl', [])

.controller('addEventCtrl', function($scope, $http) {
  $scope.url = "http://terminal2.expedia.com/x/activities/search?location=London&apikey=" + expKey;
  $http.get($scope.url)
  .then(function(res){
    $scope.obj = res.data;
    console.log(res.data);
  })

});

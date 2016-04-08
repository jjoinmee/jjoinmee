angular.module('jauntly.addEventCtrl', [])

.controller('addEventCtrl', function ($scope, ExpediaInfo, GoogleGeocodeInfo) {
  $scope.results = {};
  $scope.address;

  $scope.search = function (location, activity) {
    ExpediaInfo.getExpInfo(location, activity)
    .then(function (results) {
      $scope.results = results.data.activities;
      console.log('ajax get results ', $scope.results);
    })
    .catch(function (error) {
      console.error(error);
    });
  };

  $scope.clickInfo = function (result) {
    $scope.inputTitle = result.title;
    $scope.inputAddress = result.latLng;
  };

  $scope.getAddress = function (latlng) {
    GoogleGeocodeInfo.getAddress(latlng)
    .then(function (address) {
      $scope.address = address.data.results[0].formatted_address;
      console.log($scope.address);
    })
  };

  // $scope.map = function() {
  //   new google.maps.Map(document.getElementById('map'), {
  //     center: {lat: -34.397, lng: 150.644},
  //     zoom: 8
  //   });
  // }

});

angular.module('jauntly.addEventCtrl', [])

.controller('addEventCtrl', function ($scope, $state, ExpediaInfo, GoogleGeocodeInfo, Auth) {

  // (function(){
  //   // console.log(!Auth.ref.getAuth().token);
  //   console.log('getuaht' , Auth.isSignedIn);
  //   if (!Auth.isSignedIn) {
  //     // $state.reload();
  //     $state.go('app.login');
  //   } else {
  //     $state.reload();
  //   }
  // })();

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

})
  .run(function (Auth, $state) {
    console.log('token on run' , window.localStorage.getItem('token'));
    if (window.localStorage.getItem('token') === null) {
      // $state.reload();
      console.log('token is null');
      $state.go('app.login');
    }
  });

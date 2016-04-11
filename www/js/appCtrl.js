angular.module('jauntly.appCtrl', [])


.controller('AppCtrl', function($scope, $state, Auth, ParentFactory, $timeout) {


  $scope.isLoggedIn = false;
  $scope.data;

  $scope.login = function() {
    console.log('calling facebook auth');
    Auth.auth.$authWithOAuthPopup('facebook')
      .then(function(authData) {
        console.log(authData);
        Auth.authData = authData;
        $scope.data = authData;
        window.localStorage.setItem('token', $scope.data.token);
        console.log('window token: ' , window.localStorage.getItem('token'));
        $scope.isLoggedIn = true;
        Auth.isSignedIn = true;
        $state.reload();
      })
      .catch(function(error) {
        console.log('error getting facebook auth ', error);
      })
  };

  $scope.logout = function () {
    console.log(Auth.ref.unauth);
    Auth.ref.unauth();
    window.localStorage.removeItem('token');
    console.log('window token: ' , window.localStorage.getItem('token'));
    Auth.authData = null;
    Auth.isSignedIn = false;
    $scope.isLoggedIn = false;
    $state.reload();
  }
});


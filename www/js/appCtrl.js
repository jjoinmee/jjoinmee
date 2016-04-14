angular.module('jauntly.appCtrl', [])


.controller('AppCtrl', function($scope, $state, Auth, ParentFactory, $timeout, FB) {


  $scope.isLoggedIn = window.localStorage.getItem('token') !== null;
  $scope.data;

  $scope.login = function() {
    console.log('calling facebook auth');
    Auth.auth.$authWithOAuthPopup('facebook', {remember: "sessionOnly", scope: "email"})
      .then(function(authData) {
        Auth.authData = authData;
        console.log('authData ', authData);
        $scope.data = authData;
        window.localStorage.setItem('token', $scope.data.token);
        window.localStorage.setItem('displayName', $scope.data.facebook.displayName);
        $scope.isLoggedIn = true;
        Auth.isSignedIn = true;
        // $state.reload();
        return Auth.authData;
      })
      .then(function(data) {
        console.log('this should log', Auth.authData);
        FB.postEmail(Auth.authData.facebook.email).then(function(data) {
          console.log('inside fb post email');
        });
      })
      .catch(function(error) {
        console.log('error getting facebook auth ', error);
      })
  };

  $scope.displayName = window.localStorage.getItem('displayName');

  $scope.logout = function () {
    console.log(Auth.ref.unauth);
    Auth.ref.unauth();
    window.localStorage.removeItem('token');
    console.log('window token: ' , window.localStorage.getItem('token'));
    window.localStorage.removeItem('displayName');
    Auth.authData = null;
    Auth.isSignedIn = false;
    $scope.isLoggedIn = false;
    $state.reload();
  }
});


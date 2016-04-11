angular.module('jauntly.appCtrl', [])


.controller('AppCtrl', function($scope, $state, Auth, ParentFactory, $timeout) {

  $scope.login = function() {
    console.log('calling facebook auth');
    Auth.auth.$authWithOAuthPopup('facebook')
      .then(function(authData) {
        console.log(authData);
        $scope.authData = authData;
        $state.reload();
      })
      .catch(function(error) {
        console.log('error getting facebook auth ', error);
      })
  };

  $scope.logout = function () {
    Auth.auth.$unauth();
    $scope.authData = null;
    $state.reload();
  }
});


angular.module('jauntly.menuCtrl', [])

.controller('menuCtrl', function($scope, Auth) {
  $scope.isLoggedIn = function(){
    if (Auth.authData.facebook.accessToken) {
      return true;
    } else {
      return false;
    }
  }

});

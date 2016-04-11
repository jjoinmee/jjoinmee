angular.module('jauntly.myEventsCtrl', [])

.controller('myEventsCtrl', function ($scope, $state, Auth) {
  (function(){
    // console.log(!Auth.ref.getAuth().token);
    if (Auth.ref.getAuth() === null) {
      $state.go('app.login');
    }
  })();
})

angular.module('jauntly.myEventsCtrl', [])

.controller('myEventsCtrl', function ($scope, $state, Auth) {
  (function(){
    // console.log(!Auth.ref.getAuth().token);
    if (window.localStorage.getItem('token') === null) {
      $state.go('app.login', {});
    }
  })();
})


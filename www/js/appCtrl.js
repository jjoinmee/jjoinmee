angular.module('jauntly.appCtrl', [])

// .controller('AppCtrl', function ($scope, $ionicModal, $timeout) {

//   // $scope.callback = function (input) {
//   //   OAuth.callback(input)
//   //   .done(function(result) {
//   //     console.log(result);
//   //     //use result.access_token in your API request
//   //     //or use result.get|post|put|del|patch|me methods (see below)
//   //   })
//   // .fail(function (err) {
//   //     //handle error with err
//   //     console.log(err);
//   // });
//   // }
//   // OAuth.redirect('facebook', $scope.callback('facebook'));

//   // $scope.oauthGet = function(provider){
//   //   OAuth.popup(provider)
//   //   .done(function(result) {
//   //       result.get('/me')
//   //       .done(function (response) {
//   //           //this will display "John Doe" in the console
//   //           console.log(response.name);
//   //       })
//   //       .fail(function (err) {
//   //           console.error(err);
//   //       });
//   //   })
//   //   .fail(function (err) {
//   //      console.error(err);
//   //   });
//   // };
// })

.controller('AppCtrl', function($scope, Auth, ParentFactory) {
  // $scope.login = function() {
  //   Auth.$authWithOAuthRedirect("facebook");
  // };
  Auth.ref.onAuth(function(authData) {
   if (authData === null) {
     console.log("Not logged in yet");
   } else {
     console.log("Logged in as", authData.uid);
   }
   $scope.authData = authData; // This will display the user's name in our view
  });

  $scope.login = function() {
    Auth.$authWithOAuthRedirect("facebook").then(function(authData) {
      // User successfully logged in
      console.log('successful login', authData)
      ParentFactory.loggedIn = true;
    }).catch(function(error) {
      if (error.code === "TRANSPORT_UNAVAILABLE") {
        Auth.ref.authWithOAuthPopup("facebook").then(function(authData) {
          // User successfully logged in. We can log to the console
          // since we’re using a popup here
          console.log(authData);
        });
      } else {
        // Another error occurred
        console.log(error);
      }
    });
  };

  $scope.logout = function() {

  }

//     $scope.facebookLogin = function() {
//         $cordovaOauth.facebook(fbAppKey, ["email"]).then(function(result) {
//             // results
//             console.log(result);
//         }, function(error) {
//             // error
//             console.log(error);
//         });
//     }
});


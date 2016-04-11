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

.controller('AppCtrl', function($scope, $state, Auth, ParentFactory, $timeout) {
  // $scope.login = function() {
  //   Auth.$authWithOAuthRedirect("facebook");
  // };
  $scope.random = function () {
    console.log('random');
    $state.reload();
  }

  Auth.ref.onAuth(function(authData) {
   if (authData === null) {
     console.log("Not logged in yet");
   } else {
     console.log("Logged in as", authData.uid);
   }

   $scope.authData = authData; // This will display the user's name in our view
   return new Promise (function(resolve) {
    $timeout(resolve($scope.random()), 3000);
   })
  });


  $scope.login = function() {
    return Auth.ref.authWithOAuthRedirect("facebook", function(error, authData) {
      if (error) {
         console.log("Login Failed!", error);
       } else {
         // the access token will allow us to make Open Graph API calls
         console.log('$scope.login success', authData.facebook.accessToken);
       }
    }, {
      scope: "email" // the permissions requested
    })

    // .then(function(error, authData) {
    //   // User successfully logged in
    //   console.log('successful login', authData)
    //   ParentFactory.loggedIn = true;
    //   // $state.reload();
    // })

    // .catch(function(error) {
    //   if (error.code === "TRANSPORT_UNAVAILABLE") {
    //     Auth.ref.authWithOAuthPopup("facebook").then(function(authData) {
    //       // User successfully logged in. We can log to the console
    //       // since we’re using a popup here
    //      console.log(authData);
    //     });
    //   } else {
    //     // Another error occurred
    //     console.log(error);
    //   }
    // });
  };

  $scope.requestHandler = function() {
    console.log('logging out button');
    Auth.ref.unauth();
    return new Promise (function(resolve) {
      resolve($scope.logout(true));
    })
    // $state.reload();
  };

  $scope.logout = function (input) {
    $state.go('app.login');
    console.log(input)
    $state.reload();
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


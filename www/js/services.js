angular.module('jauntly.services', [])

.factory('ExpediaInfo', function ($http) {
  var getExpInfo = function (location, activity) {
    return $http({
      method      : 'GET',
      contentType : 'application/json',
      params      : {
        location   : location,
        activity   : activity,
        apikey     : expKey,
        limitTo    : 5
      },
      url         : 'http://terminal2.expedia.com/x/activities/search'
    })
  };
  return {
    getExpInfo : getExpInfo
  };
})


.factory('GoogleGeocodeInfo', function ($http) {
  var getAddress = function (latlng) {
    return $http({
      method      : 'GET',
      contentType : 'application/json',
      params      : {
        latlng : latlng,
        key    : googleMapsApiKey
      },
      url         : 'https://maps.googleapis.com/maps/api/geocode/json'
    })
  };
  return {
    getAddress : getAddress
  };
})

.factory("Auth", function($firebaseAuth) {
  // var usersRef = new Firebase("https://amber-fire-6746.firebaseio.com/users");
  // return $firebaseAuth(usersRef);
  var ref = new Firebase("https://amber-fire-6746.firebaseio.com");
  ref.authWithOAuthPopup("facebook", function(error, authData) {
   if (error) {
     console.log("Login Failed!", error);
   } else {
     // the access token will allow us to make Open Graph API calls
     console.log(authData.facebook.accessToken);
   }
  }, {
   scope: "email" // the permissions requested
  });

  ref.onAuth(function(authData) {
   if (authData) {
     console.log("Authenticated with uid:", authData.uid);
   } else {
     console.log("Client unauthenticated.")
   }
  });

  return {
    ref : ref
  }

});


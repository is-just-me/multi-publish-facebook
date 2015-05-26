angular.module('app', ['facebook'])

  .config(function(FacebookProvider) {
     // Set your appId through the setAppId method or
     // use the shortcut in the initialize method directly.
     FacebookProvider.init('833569036680674');
  })
  .controller('authenticationCtrl', function($scope, Facebook) {

      $scope.login = function() {
        // From now on you can use the Facebook service just as Facebook api says
        Facebook.login(function(response) {
          console.debug(response);
          // Do something with response.
        });
      };

      $scope.getLoginStatus = function() {
        Facebook.getLoginStatus(function(response) {
          if(response.status === 'connected') {
            $scope.loggedIn = true;
          } else {
            $scope.loggedIn = false;
          }
        });
      };

      $scope.me = function() {
        Facebook.api('/me/groups', function(response) {
          console.log(response);
        });
      };
    });

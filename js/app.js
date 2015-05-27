angular.module('app', ['facebook']).config(['FacebookProvider',
  function(FacebookProvider) {
     FacebookProvider.init('833569036680674');
   }
]);

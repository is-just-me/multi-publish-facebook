/**
 * Work Around para hacer funcionar plugin Jquery
 */
angular.module('app').directive('selecter', function($timeout){
 return {
   link : function(scope, element, attrs) {
        $timeout(function(){
          $(element.parent()).selecter();
        },10);
   }
 };
});

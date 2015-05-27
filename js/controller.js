angular.module('app').controller('baseCtrl', function($scope, Facebook) {

    /**
     * Grupos Seleccionados
     */
    $scope.groups = [];

    /**
     * Grupos Cargados
     */
    $scope.fb_groups = [];

    /**
     * ¿ Se cargaron los grupos ?
     */
    $scope.groupLoaded = false;

    /**
     * ¿ Se esta publicando en este momento ?
     */
    $scope.sendingPost = false;

    /**
     * Imagenes que se subiran
     */
    $scope.post_link = "";

    /**
     * array de errores
     */
    $scope.hasError = false;
    $scope.errors = [];
    $scope.successCounter = 0;

    /**
     * toJson and fromJson
     */
     $scope.toJson = angular.toJson;
     $scope.fromJson = angular.fromJson;

    /**
     * Iniciar Sesion
     */
    $scope.login = function() {
      Facebook.login(function(response) {
        console.info(response);
      },{
         scope: 'user_groups, publish_actions',
         return_scopes: true
       });
    };

    /**
     * Grupos del usuario
     */
    $scope.myGroups = function() {
      $scope.groupLoaded = true;
      Facebook.api('/me/groups', function(response) {
       $scope.fb_groups = response.data;

      });
    };

    /**
     * Crear posts en los grupos seleccionados
     */
    $scope.doPost = function() {
      $scope.hasError = false;
      $scope.successCounter = 0;
      $scope.groups.forEach(function(item){
        item = $scope.fromJson( item );
        this.sendingPost = true;
        type = "feed";
        obj = {"message": this.post_content};
        if(this.post_link !== ""){
          obj.url = this.post_link;
          type = "photos";
        }
        Facebook.api("/"+item.id+"/"+type, "POST", obj, function (response) {
            if(response.error) {
              $scope.hasError = true;
              $scope.errors.push({on: item.name, error: response.error});
            } else {
              $scope.successCounter++;
            }
            console.info(response);
        });
        this.sendingPost = false;
      }, $scope);
    };
  });

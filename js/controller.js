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
    $scope.post_link = [];

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
     * Limpiar array de url
     */
    $scope.cleanImgArray = function(){
      real_imgs = [];
      for(var index in $scope.post_link){
        if($scope.post_link[ index ] !== "") real_imgs.push($scope.post_link[ index ]);
      }
      return real_imgs;
    };

    /**
     * Crear posts en los grupos seleccionados
     */
    $scope.doPost = function() {
      $scope.groups.forEach(function(item){
        this.sendingPost = true;
        imgs = this.cleanImgArray();
        obj = {"message": self.post_content, "url": imgs};
        Facebook.api("/"+item+"/photos","POST",obj, function (response) {
            console.info(response);
          }
      );
        this.sendingPost = false;
      }, $scope);
    };
  });

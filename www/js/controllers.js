angular.module('starter.controllers', ['ngCordova','ngCordovaOauth','ionic'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {



})

.controller('dataCtrl', function($scope, $ionicModal, $timeout,$window) {
  $scope.data={}
$scope.initData=function(){
console.log("initData")

$scope.data.name=$window.localStorage["name"]
$scope.data.pic=$window.localStorage["picture"]
$scope.data.email=$window.localStorage["email"]
$scope.data.id=$window.localStorage["userid"]
$scope.data.gender=$window.localStorage["gender"]

}


})

.controller('loginCtrl', function($location,$scope,$cordovaOauth,$window,$http) {


  $scope.facebookLogin = function() {
    console.log("facebookLogin")
      $cordovaOauth.facebook("492273994229679", ["email", "public_profile"], {redirect_uri: "http://localhost/callback"}).then(function(result) {
              $scope.loginData($http, result.access_token)

      }, function(error) {
          // error
      });
  }




  $scope.loginData=function($http, access_token)
  {

    $window.localStorage["name"]="";
    $window.localStorage["picture"]="";
    $window.localStorage["email"]="";
    $window.localStorage["userid"]="";
    $window.localStorage["gender"]="";



      $http.get("https://graph.facebook.com/v2.8/me", {params: {access_token: access_token, fields: "name,gender,location,picture,email", format: "json" }}).then(function(result) {

          var name = result.data.name;
          var gender = result.data.gender;
          var picture = result.data.picture.data.url;
            var email = result.data.email;
              var id = result.data.id;
              var fbLoginStatus = result.data.status;

  $window.localStorage["name"]=name;
  $window.localStorage["picture"]=picture;
  $window.localStorage["email"]=email;
  $window.localStorage["userid"]=id;
    $window.localStorage["gender"]=gender;
$location.path("app/data")

      }, function(error) {

          alert("Error: " + error);
      });
  }




});

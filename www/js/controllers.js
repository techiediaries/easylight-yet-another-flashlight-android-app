angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('HomeCtrl', function($scope,$cordovaFlashlight,$cordovaDeviceMotion) {
  $scope.accEnabled = false;
  $scope.isOn = true;
  $scope.turnOn = function(){
        nativeclick.trigger();
        $scope.isOn = true;
        $cordovaFlashlight.switchOn().then(
          function (success) { 
              console.log("Flashlight is on !");
          },
          function (error) { 
            console.log('Error while switching Flashlight on')
          }
        );          
  }
  $scope.turnOff = function(){
        nativeclick.trigger();
        $scope.isOn = false;
        $cordovaFlashlight.switchOff().then(
          function (success) { 
              console.log("Flashlight is off !");
          },
          function (error) { 
            console.log('Error while switching Flashlight off')
          }
        );    
  }
  $scope.switchAccelerometer = function(){
    nativeclick.trigger();
    if($scope.accEnabled)
    {
      
      $scope.disableAccelerometer();
    }
    else
    {

      $scope.enableAccelerometer();
    }
  }
  $scope.enableAccelerometer = function(){
      $scope.watchId = $cordovaDeviceMotion.watchAcceleration({frequency:500}).then(null,function(){
        alert('Error');
      },
      function(result){
        $scope.x = result.x;
        $scope.y = result.y;
        $scope.z = result.z;
        $scope.timestamp = result.timestamp;
        $scope.accEnabled = true;

        if(Math.abs(result.z) > 5 )
        {
          if($scope.isOn)
          {  
            $scope.turnOff();
          }  
        }
        else
        {
          if( ! $scope.isOn)
          { 
            $scope.turnOn();
          }
        }
        //alert('Accelerometer enabled');
      });
  }
  $scope.disableAccelerometer = function(){
      $cordovaDeviceMotion.clearWatch($scope.watchId).then(function(){
        $scope.accEnabled = false;
      });
  }

})

.controller('AboutCtrl', function($scope,$cordovaAppRate) {
  $scope.rate = function(){
      $cordovaAppRate.promptForRating(true).then(function(r){

      });
      /*$cordovaAppRate.navigateToAppStore().then(function (result) {
        
      });*/
  }

})


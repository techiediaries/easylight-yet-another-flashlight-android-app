// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic','ngCordova','pascalprecht.translate','starter.controllers'])

.run(function($ionicPlatform,$cordovaFlashlight,$cordovaGlobalization,$translate) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)

    screen.lockOrientation('portrait');
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    $cordovaFlashlight.available().then(function(availability) {
       
        $cordovaFlashlight.switchOn().then(
          function (success) { 
              console.log("Flashlight is on !");
          },
          function (error) { 
            console.log('Error while switching Flashlight on')
          }
        );      

    }, function () {

      alert('Flashlight is not available');

    });
    /*if(typeof navigator.globalization !== "undefined") {
      navigator.globalization.getPreferredLanguage(function(language) {
          $translate.use((language.value).split("-")[0]).then(function(data) {
              console.log("SUCCESS -> " + data);
          }, function(error) {
              console.log("ERROR -> " + error);
          });
      }, null);
    }*/

    $cordovaGlobalization.getPreferredLanguage().then(
    function(result) {
      console.log("the language " + angular.toJson(result));
      var parts = result.value.split('-');
      if(parts.length > 0)
      {
        var lang = parts[0];
        $translate.use(lang);
      }else
      {
        $translate.use('en');
      }
    },
    function(error) {

    });  
    /*$cordovaAdMob.setOptions( {
          publisherId: 'ca-app-pub-9293763250492023/8573028797',
          interstitialAdId: '',
          bannerAtTop: false, // set to true, to put banner at top
          overlap: false, // set to true, to allow banner overlap webview
          offsetTopBar: false, // set to true to avoid ios7 status bar overlap
          isTesting: true, // receiving test ad
          autoShow: true // auto show interstitial ad when loaded
    });

    $cordovaAdMob.createBannerView();*/

    window.plugins.AdMob.setOptions( {
          publisherId: 'ca-app-pub-9293763250492023/8573028797',
          interstitialAdId: '',
          bannerAtTop: false, // set to true, to put banner at top
          overlap: false, // set to true, to allow banner overlap webview
          offsetTopBar: false, // set to true to avoid ios7 status bar overlap
          isTesting: false, // receiving test ad
          autoShow: true // auto show interstitial ad when loaded
    });

    window.plugins.AdMob.createBannerView(); 

  //AppRate.promptForRating(true);
  
  /*  $cordovaGlobalization.getLocaleName().then(
    function(result) {
      alert("the local " + angular.toJson(result));
    },
    function(error) {});  */

  })})

  //$translate.fallbackLanguage("en");
  //$translate.preferredLanguage("en");
    


.config(function($stateProvider, $urlRouterProvider,$translateProvider,$ionicConfigProvider) {
    
  $ionicConfigProvider.navBar.alignTitle('center');
  $ionicConfigProvider.scrolling.jsScrolling(false);

  var en_translations = {
    app_title : "EasyLight",
    app_desc : "EasyLight lets you use your mobile as a flashlight",
    app_author : "Built by Ahmed Bouchefra",
    light_on : "Switch the light on",
    light_off : "Switch the light off",
    enable_accelo : "Enable/Disable the accelometer",
    menu_home: "Home",
    menu_about: "About",
    rate: "Rate"


  };
  var fr_translations = {
    app_title : "TorcheSimple",
    app_desc : "TorcheSimple vous permets d'utiliser votre phone comme une torche ",
    app_author : "Crée par Ahmed Bouchefra",    
    light_on : "Activer l'éclairage",
    light_off : "Éteindre l'éclairage ",
    enable_accelo : "Activer l'accéléromètre" ,
    menu_home: "Principal",
    menu_about: "A Propos",
    rate: "Rate"
  };
  var ar_translations = {
    app_title : "شعلة",
    app_desc : "شعلة تطبيق يسمح لك باستعمال المحمول كمصباح يدوي بكل سهولة",
    app_author : "المبرمج : احمد بوشفرة",        
    light_on : "أشعل النور",
    light_off : "أطفئ النور",
    enable_accelo : "تمكين التسارع",
    menu_home: "الصفحة الرئيسية",
    menu_about: "حول",
    rate: "Rate"     
  };
   
  $translateProvider
    .translations('en', en_translations)
    .translations('fr',fr_translations)
    .translations('ar',ar_translations)
    .preferredLanguage('en');
    
  var prefs = {
     language: 'en',
     appName: 'Techie Diaries',
     iosURL: '<my_app_id>',
     androidURL: 'market://details?id=com.techiediaries.blog',
     windowsURL: 'ms-windows-store:Review?name=<...>'
  };

  //$cordovaAppRateProvider.setPreferences(prefs);
  
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.about', {
    url: '/about',
    views: {
      'menuContent': {
        templateUrl: 'templates/about.html',
        controller: 'AboutCtrl'
      }
    }
  })
  .state('app.home', {
      url: '/home',
      views: {
        'menuContent': {
          templateUrl: 'templates/home.html',
          controller: 'HomeCtrl'
        }
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
});

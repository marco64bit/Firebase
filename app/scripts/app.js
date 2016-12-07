'use strict';

/**
 * @ngdoc overview
 * @name testApp
 * @description
 * # testApp
 *
 * Main module of the application.
 */
angular
  .module('testApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'firebase'
  ])
  .run(function() {
      var config = {
        apiKey: "AIzaSyAPC6K5W_8-yNzz8dHcfEgRYQqIQ31CdNU",
        authDomain: "test-marco-p.firebaseapp.com",
        databaseURL: "https://test-marco-p.firebaseio.com",
        storageBucket: "test-marco-p.appspot.com",
        messagingSenderId: "654705272114"
      };
      firebase.initializeApp(config);
  })
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

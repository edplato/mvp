var app = angular.module('mainApp', ['ngRoute']);

app.config(function($routeProvider, $locationProvider) {

  $routeProvider
    .when('/', {
      templateUrl: 'app/templates/app.html',
      controller: 'AppController'
    })
    .when('/login', {
      templateUrl: 'app/templates/login.html',
      controller: 'LoginController'
    })
    .when('/register', {
      templateUrl: 'app/templates/register.html',
      controller: 'RegisterController'
    })
    .otherwise({ redirectTo: '/' });

  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });

});
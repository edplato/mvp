angular.module('mainApp')
  .service('auth', function() {
    var userAuthenticated = false;

    this.setUserAuthenticated = function(value) {
      userAuthenticated = value;
    }

    this.getUserAuthenticated = function() {
      return userAuthenticated;
    }
  });
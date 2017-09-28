app.component('login', {

  controller: 'LoginController'
}).controller('LoginController', function($scope, $http, $location, auth) {

  $scope.setAuth = auth.setUserAuthenticated;
  $scope.getAuth = auth.getUserAuthenticated();

  $scope.onClick = function(username, password) {

    var user = {
      username: username,
      password: password
    };

    var config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    var url = 'http://localhost:3000/api/login';

    $http.post(url, user, config)
      .then(function(data) {
        if (data.data.success === true) {
          $scope.setAuth(true);
          $location.path('/');
        } else {
          $scope.setAuth(false);
          $location.path('/login');
        }
      })
  }
})
app.component('app', {
  bindings: {
    reload: '<'
  },
  controller: 'AppController'
}).controller('AppController', function($scope, $http, $route, loaded, auth) {

  $scope.reloadData = function() {
    $route.reload();
  };

  $scope.initLoad = loaded.tracksCheck();
  $scope.load = loaded.tracksLoad;
  $scope.TopTracksdata = loaded.getTracksData() || [];
  $scope.SaveTracksdata = loaded.setTracksData;

  $scope.queryMade = loaded.checkQuery();
  $scope.artistFocus = loaded.artistFocusCheck();
  $scope.artistFocusData = loaded.getArtistFocusData();
  $scope.artistFocusSave = loaded.setArtistFocusData;

  $scope.queryClear = loaded.clearQuery;

  $scope.setAuth = auth.setUserAuthenticated;
  $scope.getAuth = auth.getUserAuthenticated();

  if ($scope.queryMade || $scope.initLoad === false) {

    if ($scope.TopTracksdata.length === 0) {

      $http({
        url: 'http://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&limit=10&api_key=c651d6ac80087cf3588a44f57990d7aa&format=json',
        method: 'GET',
      }).then(function(response) {

        $scope.TopTracksdata = response.data.artists.artist;
        $scope.load();

      }).then(function() {
        angular.forEach($scope.TopTracksdata, function(track) {

          var artistCheck = track.name;
          var url = 'http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=' + artistCheck + '&api_key=c651d6ac80087cf3588a44f57990d7aa&format=json';
          $http({
            url: url,
            method: 'GET',
          }).then(function(res) {
            track.bio = res.data.artist;
          });
        });
      }).then(function() {
        $scope.SaveTracksdata($scope.TopTracksdata);
      });

    } else if ($scope.artistFocus) {

      var artistCheck = $scope.artistFocusData[0].name;
      var url = 'http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=' + artistCheck + '&api_key=c651d6ac80087cf3588a44f57990d7aa&format=json';
      $http({
        url: url,
        method: 'GET',
      }).then(function(res) {
        $scope.artistFocusData[0].bio = res.data.artist;

      }).then(function() {
        $scope.artistFocusSave($scope.artistFocusData);
      });

    } else {
      angular.forEach($scope.TopTracksdata, function(track) {

        var artistCheck = track.name;
        var url = 'http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=' + artistCheck + '&api_key=c651d6ac80087cf3588a44f57990d7aa&format=json';
        $http({
          url: url,
          method: 'GET',
        }).then(function(res) {
          track.bio = res.data.artist;

        }).then(function() {
          $scope.SaveTracksdata($scope.TopTracksdata);
        });
      });
    }
  }
});

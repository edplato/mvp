angular.module('mainApp')
  .component('search', {
    bindings: {
      reload: '<',
      searchquery: '<',
      authorize: '<'
    },
    templateUrl: 'app/templates/search.html',
    controller: 'SearchController'
  })
  .controller('SearchController', function($scope, $http, $route, $location, loaded, auth) {

    $scope.authz = auth.getUserAuthenticated;
    $scope.$watch('authz', function() {
      $route.reload();
    });

    $scope.ArtistLoad = loaded.artistFocusLoad;
    $scope.ArtistData = loaded.getArtistFocusData() || [];
    $scope.SaveArtistdata = loaded.setArtistFocusData;

    $scope.QueryMade = loaded.setQuery;

    $scope.clickArtistSearch = function(searchArtist, callback) {

      var url = 'http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=' + searchArtist + '&limit=1&api_key=c651d6ac80087cf3588a44f57990d7aa&format=json';

      $http({
        url: url,
        method: 'GET',
      }).then(function(response) {

        $scope.ArtistData = response.data.results.artistmatches.artist;
      })

        .then(function() {

          $scope.SaveArtistdata($scope.ArtistData);
          $scope.ArtistLoad();
          $scope.QueryMade();
          $location.path('/');
          callback();
        });
    };
  });

angular.module('mainApp')
  .component('genreSearch', {
    bindings: {
      reload: '<'
    },
    templateUrl: 'app/templates/genreSearch.html',
    controller: 'GenreSearchController'
  })

  .controller('GenreSearchController', function($scope, $http, loaded, $location) {
    $scope.initGenreLoad = loaded.genresCheck();
    $scope.genreLoad = loaded.genresLoad;
    $scope.TopGenresData = loaded.getGenresData() || [];
    $scope.SaveGenresdata = loaded.setGenresData;

    if ($scope.initGenreLoad === false) {
      $http({
        url: 'http://ws.audioscrobbler.com/2.0/?method=chart.gettoptags&limit=30&api_key=c651d6ac80087cf3588a44f57990d7aa&format=json',
        method: 'GET',
      }).then(function(response) {

        $scope.TopGenresData = response.data.tags.tag;
        $scope.genreLoad();

      }).then(function() {

        $scope.SaveGenresdata($scope.TopGenresData);
      });
    }

    $scope.SaveTracksdata = loaded.setTracksData;
    $scope.GenreTracksdata = [];
    $scope.QueryMade = loaded.setQuery;
    $scope.clearArtist = loaded.clearArtistFocusLoad;

    $scope.clickGenreSearch = function(genre, callback) {

      var url = 'http://ws.audioscrobbler.com/2.0/?method=tag.gettopartists&tag=' + genre + '&limit=20&api_key=c651d6ac80087cf3588a44f57990d7aa&format=json';

      $http({
        url: url,
        method: 'GET',
      }).then(function(response) {

        $scope.GenreTracksdata = response.data.topartists.artist;
      }).then(function() {

        $scope.SaveTracksdata($scope.GenreTracksdata);
        $scope.QueryMade();
        $scope.clearArtist();
        $location.path('/');
        callback();
      });
    };
  });
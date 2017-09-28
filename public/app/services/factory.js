angular.module('mainApp').factory('loaded', function() {
    var tracksLoad = false;
    var genreLoad = false;
    var artistLoad = false;

    var trackData = [];
    var genreData = [];
    var artistData = [];

    var query = false;
    var loadedService = {};

    loadedService.setQuery = function() {
      query = true;
    }
    loadedService.checkQuery = function() {
      return query;
    }
    loadedService.clearQuery = function() {
      query = false;
      return query;
    }

    // TRACKS
    loadedService.tracksLoad = function() {
      tracksLoad = true;
    };
    loadedService.tracksCheck = function() {
      return tracksLoad;
    };
    loadedService.getTracksData = function() {
      return trackData;
    };
    loadedService.setTracksData = function(data) {
      trackData = data;
    };

    // GENRES
    loadedService.genresLoad = function() {
      genreLoad = true;
    };
    loadedService.genresCheck = function() {
      return genreLoad;
    };
    loadedService.getGenresData = function() {
      return genreData;
    };
    loadedService.setGenresData = function(data) {
      genreData = data;
    };

    // ARTIST
    loadedService.artistFocusLoad = function() {
      artistLoad = true;
    };
    loadedService.artistFocusCheck = function() {
      return artistLoad;
    };
    loadedService.clearArtistFocusLoad = function() {
      artistLoad = false;
    };
    loadedService.getArtistFocusData = function() {
      return artistData;
    };
    loadedService.setArtistFocusData = function(data) {
      artistData = data;
    };

    return loadedService;
});
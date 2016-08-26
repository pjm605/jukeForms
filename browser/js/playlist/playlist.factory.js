'use strict';

juke.factory('PlaylistFactory', function ($http, SongFactory) {

	var cachedPlaylists = [];
  var PlaylistFactory = {};

  PlaylistFactory.create = function (playlistObj) {
  	return $http.post('/api/playlists/', playlistObj)
  		.then( function (res) {
  			var playlist = res.data
  			cachedPlaylists.push(playlist)
  			return playlist;
  		})
  }

  PlaylistFactory.getList = function () {
  	return $http.get('/api/playlists/')
  		.then(function (res) {
  			angular.copy(res.data, cachedPlaylists)
  			return cachedPlaylists
  		})
  }

  PlaylistFactory.fetchById = function (id) {

  	return $http.get('/api/playlists/' + id)
  		.then(function (res) {
  			return res.data
  		})

  }

  PlaylistFactory.addSong = function (id, song) {
    return $http.post('/api/playlists/' + id  + '/songs', song)
      .then(function (res) {
        return SongFactory.convert(res.data)
      })
  }

  PlaylistFactory.deleteSong = function (playlistId, songId) {
    return $http.delete ('/api/playlists/' + playlistId + '/songs/' + songId)
      .then (function (res) {
        return res.data
      })
  }

  return PlaylistFactory


});


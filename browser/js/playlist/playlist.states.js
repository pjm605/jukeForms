juke.config(function ($stateProvider) {


  $stateProvider.state('createPlaylist', {
    url: '/createPlaylist',
    templateUrl: '/js/playlist/createPlaylist.html',
    controller: 'PlaylistCtrl'

  })

  $stateProvider.state('playlist', {
    url: '/playlist/:id',
    templateUrl: '/js/playlist/playlist.html',
    controller: 'displayPlaylistCtrl'
  })

});

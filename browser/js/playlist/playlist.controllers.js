juke.controller('PlaylistCtrl', function ($scope, PlaylistFactory, $state) {


	$scope.makePlaylist = function () {
		PlaylistFactory.create($scope.playlist)
			.then(function (data) {
				$scope.playlist = {};
        $state.go('playlist', {id: data.id})
			})
	}

});


juke.controller('displayPlaylistCtrl', function ($scope, PlaylistFactory, PlayerFactory, $stateParams, SongFactory) {



  $scope.toggle = function (song) {
    if (song !== PlayerFactory.getCurrentSong()) {
      PlayerFactory.start(song, $scope.playlist.songs);
    } else if ( PlayerFactory.isPlaying() ) {
      PlayerFactory.pause();
    } else {
      PlayerFactory.resume();
    }
  };

  $scope.getCurrentSong = function () {
    return PlayerFactory.getCurrentSong();
  };

  $scope.isPlaying = function (song) {
    return PlayerFactory.isPlaying() && PlayerFactory.getCurrentSong() === song;
  };

  $scope.delete = function (song) {
    
    $scope.playlist.songs = $scope.playlist.songs.filter(function(songInArr){
      return songInArr.id !== song.id; 
    })
    return PlaylistFactory.deleteSong($stateParams.id, song.id);
  }


PlaylistFactory.fetchById ($stateParams.id)
	.then( function (data) {
		$scope.playlist = data;
     if (!$scope.playlist.songs) $scope.playlist.songs = [];
	}); 

SongFactory.fetchAll () 
  .then(function (res) {
    $scope.allSongs = res
  });

$scope.addSong = function () {
  PlaylistFactory.addSong($stateParams.id, $scope.selected)
  .then(function(song){
     $scope.playlist.songs.push(song); 
     $scope.selected = null; 
  })
 
}


});
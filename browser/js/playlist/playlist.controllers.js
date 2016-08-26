juke.controller('PlaylistCtrl', function ($scope, PlaylistFactory, $state) {


	$scope.makePlaylist = function () {
		PlaylistFactory.create($scope.playlist)
			.then(function (data) {
				$scope.playlist = {};
        $state.go('playlist', {id: data.id})
			})
	}

});


juke.controller('displayPlaylistCtrl', function ($scope, PlaylistFactory, PlayerFactory, $stateParams) {

  // $scope.album = theAlbum;

  // $scope.toggle = function (song) {
  //   if (song !== PlayerFactory.getCurrentSong()) {
  //     PlayerFactory.start(song, $scope.album.songs);
  //   } else if ( PlayerFactory.isPlaying() ) {
  //     PlayerFactory.pause();
  //   } else {
  //     PlayerFactory.resume();
  //   }
  // };

  // $scope.getCurrentSong = function () {
  //   return PlayerFactory.getCurrentSong();
  // };

  // $scope.isPlaying = function (song) {
  //   return PlayerFactory.isPlaying() && PlayerFactory.getCurrentSong() === song;
  // };


PlaylistFactory.fetchById ($stateParams.id)
	.then( function (data) {
		$scope.playlist = data
	}) 


});
(function() {
	function SongPlayer(Fixtures) {
		var SongPlayer = {};
		
		/**
		*@desc loads the currently playing album to local variable
		*@type {Object}
		*/
		var currentAlbum = Fixtures.getAlbum();
		
		var currentBuzzObject = null;
		
		/**
		* @function setSong
		* @desc Stops currently playing song and loads new audio file as currentBuzzObject
		* @param {Object} song
		*/
		
		var setSong = function(song) {
			if (currentBuzzObject) {
				stopSong();
			}
			
			/**
			*@desc Buzz object audio file
			*@type {Object}
			*/
			currentBuzzObject = new buzz.sound(song.audioUrl, {
				formats: ['mp3'],
				preload: true
			});
			
			SongPlayer.currentSong = song;
		};
		
		/**
		* @function playSong
		* @desc Plays the song that has been clicked and sets the playing value to true
		* @param {Object} song
		*/
		var playSong = function(song) {
			currentBuzzObject.play();
			song.playing = true;
		};
		
		var getSongIndex = function(song) {
			return currentAlbum.songs.indexOf(song);
		};
		
		var stopSong = function(song) {
			currentBuzzObject.stop();
			SongPlayer.currentSong.playing = null;
		};
		
		SongPlayer.currentSong = null;
		
		/**
		* @function play
		* @desc Plays the song that has been clicked if not already playing or is paused
		* @param {Object} song
		*/
		SongPlayer.play = function(song) {
			song = song || SongPlayer.currentSong;
			if (SongPlayer.currentSong !== song) {
				setSong(song);
				playSong(song);
			} else if (SongPlayer.currentSong === song) {
				if (currentBuzzObject.isPaused()) {
					playSong(song);
				}
			}
		};
		
		/**
		* @function pause
		* @desc Pauses the song that has been clicked if it is currently playing
		* @param {Object} song
		*/
		SongPlayer.pause = function(song) {
			song = song || SongPlayer.currentSong;
     		currentBuzzObject.pause();
     		song.playing = false;
 		};
		
		/**
		* @function previous
		* @desc Changes to the song with the previous index
		*/
		SongPlayer.previous = function() {
			var currentSongIndex = getSongIndex(SongPlayer.currentSong);
			currentSongIndex--;
			
			if (currentSongIndex < 0) {
				stopSong();
			} else {
				var song = currentAlbum.songs[currentSongIndex];
				setSong(song);
				playSong(song);
			}
		}
		
		/**
		* @function next
		* @desc Changes to the song with the next index
		*/
		SongPlayer.next = function() {
			var currentSongIndex = getSongIndex(SongPlayer.currentSong);
			currentSongIndex++;
			
			if (currentSongIndex >= currentAlbum.songs.length) {
				stopSong();
			} else {
				var song = currentAlbum.songs[currentSongIndex];
				setSong(song);
				playSong(song);
			}
		}
		
		return SongPlayer;
	}
		
angular
	.module('blocJams')
	.factory('SongPlayer', ['Fixtures', SongPlayer])
})();
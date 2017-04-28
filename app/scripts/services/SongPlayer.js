(function() {
	function SongPlayer() {
		var SongPlayer = {};
		
		var currentSong = null;
		var currentBuzzObject = null;
		
		/**
		* @function setSong
		* @desc Stops currently playing song and loads new audio file as currentBuzzObject
		* @param {Object} song
		*/
		
		var setSong = function(song) {
			if (currentBuzzObject) {
				currentBuzzObject.stop();
				currentSong.playing = null;
			}
			
			/**
			*@desc Buzz object audio file
			*@type {Object}
			*/
			currentBuzzObject = new buzz.sound(song.audioUrl, {
				formats: ['mp3'],
				preload: true
			});
			
			currentSong = song;
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
		
		/**
		* @function play
		* @desc Plays the song that has been clicked if not already playing or is paused
		* @param {Object} song
		*/
		SongPlayer.play = function(song) {
			if (currentSong !== song) {
				setSong(song);
				playSong(song);
			} else if (currentSong === song) {
				if (currentBuzzObject.isPaused()) {
					currentBuzzObject.play();
				}
			}
		};
		
		/**
		* @function pause
		* @desc Pauses the song that has been clicked if it is currently playing
		* @param {Object} song
		*/
		SongPlayer.pause = function(song) {
     		currentBuzzObject.pause();
     		song.playing = false;
 		};
		
		return SongPlayer;
	}
		
angular
	.module('blocJams')
	.factory('SongPlayer', SongPlayer)
})();